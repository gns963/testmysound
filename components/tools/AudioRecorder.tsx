"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getEngine } from "@/lib/audio/engine";
import { trackMicPermission } from "@/lib/analytics";
import { ToolShell } from "@/components/tools/shell/ToolShell";

type Status = "idle" | "requesting" | "recording" | "paused" | "error";
type ErrorKind = "denied" | "not-found" | "in-use" | "unsupported" | "unknown";
type Take = { id: string; url: string; durationS: number; mimeType: string };

const ERROR_COPY: Record<ErrorKind, { title: string; fix: string }> = {
  denied: {
    title: "Microphone permission was denied.",
    fix: "Chrome/Edge: click the mic icon in the address bar and allow it. Firefox: click the mic icon, allow, then reload. Safari (Mac): Safari menu → Settings for This Website → Microphone → Allow. iPhone/Android: check the browser's site permissions in your phone's Settings app too, then reload this page.",
  },
  "not-found": {
    title: "No microphone was found.",
    fix: "Check that a microphone is connected, or built in, and isn't disabled in your system's sound settings, then try again.",
  },
  "in-use": {
    title: "Your microphone is being used by another app.",
    fix: "Close other apps or browser tabs that might already be using the microphone, then try again.",
  },
  unsupported: {
    title: "Your browser doesn't support audio recording.",
    fix: "This needs a modern browser (recent Chrome, Edge, Firefox or Safari) on a secure (https) page. Try updating your browser, or open this page in a different one.",
  },
  unknown: {
    title: "Couldn't access the microphone.",
    fix: "Try reloading the page. If it keeps failing, check your browser's site permissions for the microphone.",
  },
};

function classifyError(error: unknown): ErrorKind {
  const name = error instanceof DOMException ? error.name : "";
  if (name === "NotAllowedError" || name === "PermissionDeniedError") return "denied";
  if (name === "NotFoundError" || name === "DevicesNotFoundError") return "not-found";
  if (name === "NotReadableError" || name === "TrackStartError") return "in-use";
  return "unknown";
}

function extensionFor(mimeType: string): string {
  if (mimeType.includes("webm")) return "webm";
  if (mimeType.includes("ogg")) return "ogg";
  if (mimeType.includes("mp4")) return "m4a";
  return "webm";
}

function formatElapsed(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** Audio Recorder: mic capture via MediaRecorder, pause/resume, playback and local-only download. */
export function AudioRecorder() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorKind, setErrorKind] = useState<ErrorKind>("unknown");
  const [elapsedS, setElapsedS] = useState(0);
  const [level, setLevel] = useState(0);
  const [takes, setTakes] = useState<Take[]>([]);

  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const tickIntervalRef = useRef<number | null>(null);
  const startTimeRef = useRef(0);
  const accumulatedSRef = useRef(0);

  const stopLevelLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const levelLoop = useCallback(function tick() {
    const analyser = analyserRef.current;
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
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const stopTicker = useCallback(() => {
    if (tickIntervalRef.current !== null) {
      window.clearInterval(tickIntervalRef.current);
      tickIntervalRef.current = null;
    }
  }, []);

  const startTicker = useCallback(() => {
    startTimeRef.current = performance.now();
    tickIntervalRef.current = window.setInterval(() => {
      setElapsedS(accumulatedSRef.current + (performance.now() - startTimeRef.current) / 1000);
    }, 200);
  }, []);

  const cleanupStream = useCallback(() => {
    stopLevelLoop();
    stopTicker();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    analyserRef.current = null;
    recorderRef.current = null;
  }, [stopLevelLoop, stopTicker]);

  useEffect(() => cleanupStream, [cleanupStream]);
  useEffect(() => {
    return () => {
      takes.forEach((take) => URL.revokeObjectURL(take.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setErrorKind("unsupported");
      setStatus("error");
      return;
    }

    setStatus("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      trackMicPermission("granted");

      const ctx = getEngine().ensureContext();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);
      analyserRef.current = analyser;

      const supportedType = ["audio/webm", "audio/ogg", "audio/mp4"].find((t) => MediaRecorder.isTypeSupported(t));
      const recorder = supportedType ? new MediaRecorder(stream, { mimeType: supportedType }) : new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const mimeType = recorder.mimeType || "audio/webm";
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        setTakes((prev) => [{ id: `${Date.now()}`, url, durationS: accumulatedSRef.current, mimeType }, ...prev]);
        cleanupStream();
        setStatus("idle");
        setElapsedS(0);
        accumulatedSRef.current = 0;
      };

      recorderRef.current = recorder;
      accumulatedSRef.current = 0;
      recorder.start();
      setStatus("recording");
      setElapsedS(0);
      rafRef.current = requestAnimationFrame(levelLoop);
      startTicker();
    } catch (error) {
      const kind = classifyError(error);
      setErrorKind(kind);
      setStatus("error");
      trackMicPermission(kind === "denied" ? "denied" : "error");
    }
  }, [levelLoop, startTicker, cleanupStream]);

  const pause = useCallback(() => {
    recorderRef.current?.pause();
    accumulatedSRef.current += (performance.now() - startTimeRef.current) / 1000;
    stopLevelLoop();
    stopTicker();
    setStatus("paused");
  }, [stopLevelLoop, stopTicker]);

  const resume = useCallback(() => {
    recorderRef.current?.resume();
    setStatus("recording");
    rafRef.current = requestAnimationFrame(levelLoop);
    startTicker();
  }, [levelLoop, startTicker]);

  const stop = useCallback(() => {
    if (status === "recording") {
      accumulatedSRef.current += (performance.now() - startTimeRef.current) / 1000;
    }
    recorderRef.current?.stop();
  }, [status]);

  const deleteTake = useCallback((id: string) => {
    setTakes((prev) => {
      const target = prev.find((t) => t.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((t) => t.id !== id);
    });
  }, []);

  return (
    <ToolShell>
      <p className="text-muted max-w-sm text-center text-xs">
        Recordings stay in this browser tab only — nothing is uploaded, and everything disappears when you leave the
        page unless you download it.
      </p>

      {status === "idle" && (
        <button
          type="button"
          onClick={() => void start()}
          className="bg-primary hover:bg-primary-strong rounded-full px-6 py-3 text-base font-semibold text-white"
        >
          Start recording
        </button>
      )}

      {status === "requesting" && (
        <p className="text-muted text-sm" aria-live="polite">
          Requesting microphone access…
        </p>
      )}

      {status === "error" && (
        <div className="flex max-w-sm flex-col items-center gap-2 text-center" aria-live="polite">
          <p className="text-text text-sm font-medium">{ERROR_COPY[errorKind].title}</p>
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

      {(status === "recording" || status === "paused") && (
        <div className="flex w-full flex-col items-center gap-4">
          <div className="flex items-center gap-2" aria-live="polite">
            {status === "recording" && (
              <span className="bg-danger h-2.5 w-2.5 rounded-full motion-safe:animate-pulse" aria-hidden="true" />
            )}
            <p className="text-text text-2xl font-extrabold tabular-nums">{formatElapsed(elapsedS)}</p>
          </div>

          <div className="bg-bg h-2 w-full max-w-sm overflow-hidden rounded-full">
            <div className="bg-accent h-full rounded-full transition-[width]" style={{ width: `${Math.round(level * 100)}%` }} />
          </div>

          <div className="flex items-center gap-3">
            {status === "recording" ? (
              <button
                type="button"
                onClick={pause}
                className="border-border text-text hover:border-primary hover:text-primary rounded-full border px-4 py-1.5 text-sm font-medium"
              >
                Pause
              </button>
            ) : (
              <button
                type="button"
                onClick={resume}
                className="border-border text-text hover:border-primary hover:text-primary rounded-full border px-4 py-1.5 text-sm font-medium"
              >
                Resume
              </button>
            )}
            <button
              type="button"
              onClick={stop}
              className="bg-danger rounded-full px-5 py-2 text-sm font-semibold text-white hover:brightness-110"
            >
              Stop
            </button>
          </div>
        </div>
      )}

      {takes.length > 0 && (
        <div className="flex w-full max-w-sm flex-col gap-2">
          <p className="text-muted text-xs font-bold tracking-wide uppercase">This session&apos;s recordings</p>
          {takes.map((take, index) => (
            <div key={take.id} className="border-border bg-surface flex flex-col gap-2 rounded-xl border p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text font-semibold">
                  Take {takes.length - index} · {formatElapsed(take.durationS)}
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={take.url}
                    download={`recording-${takes.length - index}.${extensionFor(take.mimeType)}`}
                    className="text-primary hover:underline"
                  >
                    Download
                  </a>
                  <button type="button" onClick={() => deleteTake(take.id)} className="text-muted hover:text-danger">
                    Delete
                  </button>
                </div>
              </div>
              <audio controls src={take.url} className="w-full" />
            </div>
          ))}
        </div>
      )}
    </ToolShell>
  );
}
