"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getEngine } from "@/lib/audio/engine";
import { trackMicPermission } from "@/lib/analytics";
import { ToolShell } from "@/components/tools/shell/ToolShell";

type MicStatus = "idle" | "requesting" | "active" | "error";
type MicErrorKind = "denied" | "not-found" | "in-use" | "unknown";
type RecordingState = "idle" | "recording" | "playback";

const RECORD_MS = 5000;

const ERROR_COPY: Record<MicErrorKind, { title: string; fix: string }> = {
  denied: {
    title: "Microphone permission was denied.",
    fix: "Click the lock/camera icon in your browser's address bar, allow microphone access for this site, then reload the page.",
  },
  "not-found": {
    title: "No microphone was found.",
    fix: "Check that a microphone is connected (or built in) and not disabled in your system's sound settings, then try again.",
  },
  "in-use": {
    title: "Your microphone is being used by another app.",
    fix: "Close other apps or browser tabs that might be using the microphone (video calls, other recorders), then try again.",
  },
  unknown: {
    title: "Couldn't access the microphone.",
    fix: "Try reloading the page. If it keeps failing, check your browser's site permissions for the microphone.",
  },
};

function classifyError(error: unknown): MicErrorKind {
  const name = error instanceof DOMException ? error.name : "";
  if (name === "NotAllowedError" || name === "PermissionDeniedError")
    return "denied";
  if (name === "NotFoundError" || name === "DevicesNotFoundError")
    return "not-found";
  if (name === "NotReadableError" || name === "TrackStartError")
    return "in-use";
  return "unknown";
}

/** Tool 7 (blueprint §4.3): live waveform + level meter, 5s record/playback, device picker. */
export function MicTest() {
  const [status, setStatus] = useState<MicStatus>("idle");
  const [errorKind, setErrorKind] = useState<MicErrorKind>("unknown");
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [level, setLevel] = useState(0);
  const [recording, setRecording] = useState<RecordingState>("idle");
  const [recordSecondsLeft, setRecordSecondsLeft] = useState(0);
  const [playbackUrl, setPlaybackUrl] = useState<string | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordTimerRef = useRef<number | null>(null);

  const stopStream = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (recordTimerRef.current !== null) {
      window.clearInterval(recordTimerRef.current);
      recordTimerRef.current = null;
    }
    sourceRef.current?.disconnect();
    sourceRef.current = null;
    analyserRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    mediaRecorderRef.current = null;
    setRecording("idle");
    setLevel(0);
    setStatus("idle");
  }, []);

  useEffect(() => {
    return () => {
      stopStream();
      if (playbackUrl) URL.revokeObjectURL(playbackUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawLoop = useCallback(function tick() {
    const analyser = analyserRef.current;
    const canvas = canvasRef.current;
    if (!analyser) return;

    const data = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(data);

    let sumSquares = 0;
    for (let i = 0; i < data.length; i++) {
      const normalized = (data[i] - 128) / 128;
      sumSquares += normalized * normalized;
    }
    const rms = Math.sqrt(sumSquares / data.length);
    setLevel(Math.min(1, rms * 4));

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const { width, height } = canvas;
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = "var(--primary)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        const step = width / data.length;
        for (let i = 0; i < data.length; i++) {
          const y = (data[i] / 255) * height;
          const x = i * step;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const start = useCallback(
    async (deviceId?: string) => {
      setStatus("requesting");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: deviceId ? { deviceId: { exact: deviceId } } : true,
        });
        streamRef.current = stream;
        trackMicPermission("granted");

        const allDevices = await navigator.mediaDevices.enumerateDevices();
        setDevices(allDevices.filter((d) => d.kind === "audioinput"));
        const activeTrackSettings = stream.getAudioTracks()[0]?.getSettings();
        setSelectedDeviceId(activeTrackSettings?.deviceId ?? deviceId ?? "");

        const ctx = getEngine().ensureContext();
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 2048;
        source.connect(analyser);
        sourceRef.current = source;
        analyserRef.current = analyser;

        setStatus("active");
        rafRef.current = requestAnimationFrame(drawLoop);
      } catch (error) {
        const kind = classifyError(error);
        setErrorKind(kind);
        setStatus("error");
        trackMicPermission(kind === "denied" ? "denied" : "error");
      }
    },
    [drawLoop],
  );

  const switchDevice = useCallback(
    (deviceId: string) => {
      stopStream();
      void start(deviceId);
    },
    [stopStream, start],
  );

  const record = useCallback(() => {
    const stream = streamRef.current;
    if (!stream || recording === "recording") return;

    if (playbackUrl) {
      URL.revokeObjectURL(playbackUrl);
      setPlaybackUrl(null);
    }

    const mimeType = MediaRecorder.isTypeSupported("audio/webm")
      ? "audio/webm"
      : undefined;
    const recorder = new MediaRecorder(
      stream,
      mimeType ? { mimeType } : undefined,
    );
    const chunks: BlobPart[] = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType ?? "audio/webm" });
      setPlaybackUrl(URL.createObjectURL(blob));
      setRecording("playback");
    };

    mediaRecorderRef.current = recorder;
    recorder.start();
    setRecording("recording");
    setRecordSecondsLeft(Math.ceil(RECORD_MS / 1000));

    const startedAt = performance.now();
    recordTimerRef.current = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const left = Math.max(0, Math.ceil((RECORD_MS - elapsed) / 1000));
      setRecordSecondsLeft(left);
      if (elapsed >= RECORD_MS) {
        if (recordTimerRef.current !== null) {
          window.clearInterval(recordTimerRef.current);
          recordTimerRef.current = null;
        }
        recorder.stop();
      }
    }, 100);
  }, [recording, playbackUrl]);

  return (
    <ToolShell>
      <p className="text-muted max-w-sm text-center text-xs">
        Your audio never leaves your device — nothing is uploaded anywhere.
      </p>

      {status === "idle" && (
        <button
          type="button"
          onClick={() => void start()}
          className="bg-primary hover:bg-primary-strong rounded-full px-6 py-3 text-base font-semibold text-white"
        >
          Test my mic
        </button>
      )}

      {status === "requesting" && (
        <p className="text-muted text-sm">Requesting microphone access…</p>
      )}

      {status === "error" && (
        <div className="flex max-w-sm flex-col items-center gap-2 text-center">
          <p className="text-text text-sm font-medium">
            {ERROR_COPY[errorKind].title}
          </p>
          <p className="text-muted text-sm">{ERROR_COPY[errorKind].fix}</p>
          <button
            type="button"
            onClick={() => void start()}
            className="border-border text-text hover:border-primary hover:text-primary mt-2 rounded-full border px-4 py-1.5 text-sm font-medium"
          >
            Try again
          </button>
        </div>
      )}

      {status === "active" && (
        <div className="flex w-full flex-col items-center gap-4">
          {devices.length > 1 && (
            <label className="text-muted flex items-center gap-2 text-sm">
              Microphone
              <select
                value={selectedDeviceId}
                onChange={(e) => switchDevice(e.target.value)}
                className="border-border bg-bg text-text rounded-md border px-2 py-1"
              >
                {devices.map((d) => (
                  <option key={d.deviceId} value={d.deviceId}>
                    {d.label || "Microphone"}
                  </option>
                ))}
              </select>
            </label>
          )}

          <canvas
            ref={canvasRef}
            width={320}
            height={100}
            className="bg-bg w-full max-w-sm rounded-lg"
          />

          <div className="bg-bg h-2 w-full max-w-sm overflow-hidden rounded-full">
            <div
              className="bg-accent h-full rounded-full transition-[width]"
              style={{ width: `${Math.round(level * 100)}%` }}
            />
          </div>

          {recording !== "recording" && (
            <button
              type="button"
              onClick={record}
              className="border-border text-text hover:border-primary hover:text-primary rounded-full border px-4 py-1.5 text-sm font-medium"
            >
              Record 5s
            </button>
          )}

          {recording === "recording" && (
            <p className="text-muted text-sm" aria-live="polite">
              Recording… {recordSecondsLeft}s
            </p>
          )}

          {recording === "playback" && playbackUrl && (
            <audio controls src={playbackUrl} className="w-full max-w-sm" />
          )}

          <button
            type="button"
            onClick={stopStream}
            className="text-muted hover:text-text text-sm"
          >
            Stop mic test
          </button>
        </div>
      )}
    </ToolShell>
  );
}
