"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getEngine } from "@/lib/audio/engine";
import { trackCameraPermission, trackMicPermission } from "@/lib/analytics";
import { ToolShell } from "@/components/tools/shell/ToolShell";

type Status = "idle" | "requesting" | "active" | "error";
type DeviceOutcome = "ok" | "denied" | "not-found" | "in-use" | "unknown";
type SpeakerCheck = "untested" | "playing" | "yes" | "no";

function classify(error: unknown): DeviceOutcome {
  const name = error instanceof DOMException ? error.name : "";
  if (name === "NotAllowedError" || name === "PermissionDeniedError") return "denied";
  if (name === "NotFoundError" || name === "DevicesNotFoundError") return "not-found";
  if (name === "NotReadableError" || name === "TrackStartError") return "in-use";
  return "unknown";
}

const OUTCOME_LABEL: Record<DeviceOutcome, string> = {
  ok: "Working",
  denied: "Permission denied",
  "not-found": "Not found",
  "in-use": "In use by another app",
  unknown: "Couldn't access",
};

/** Camera & Mic Test: a single combined permission flow (like a real meeting app) with per-device diagnosis on failure. */
export function CameraMicTest() {
  const [status, setStatus] = useState<Status>("idle");
  const [unsupported, setUnsupported] = useState(false);
  const [cameraOutcome, setCameraOutcome] = useState<DeviceOutcome | null>(null);
  const [micOutcome, setMicOutcome] = useState<DeviceOutcome | null>(null);
  const [level, setLevel] = useState(0);
  const [speakerCheck, setSpeakerCheck] = useState<SpeakerCheck>("untested");

  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);

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

  const cleanup = useCallback(() => {
    stopLevelLoop();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    analyserRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }, [stopLevelLoop]);

  useEffect(() => cleanup, [cleanup]);

  const stop = useCallback(() => {
    cleanup();
    setStatus("idle");
    setLevel(0);
    setSpeakerCheck("untested");
  }, [cleanup]);

  const diagnoseSeparately = useCallback(async () => {
    const [videoResult, audioResult] = await Promise.allSettled([
      navigator.mediaDevices.getUserMedia({ video: true }),
      navigator.mediaDevices.getUserMedia({ audio: true }),
    ]);

    if (videoResult.status === "fulfilled") {
      videoResult.value.getTracks().forEach((track) => track.stop());
      setCameraOutcome("ok");
    } else {
      setCameraOutcome(classify(videoResult.reason));
    }

    if (audioResult.status === "fulfilled") {
      audioResult.value.getTracks().forEach((track) => track.stop());
      setMicOutcome("ok");
    } else {
      setMicOutcome(classify(audioResult.reason));
    }
  }, []);

  const start = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setUnsupported(true);
      setStatus("error");
      return;
    }

    setStatus("requesting");
    setCameraOutcome(null);
    setMicOutcome(null);
    setSpeakerCheck("untested");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      trackCameraPermission("granted");
      trackMicPermission("granted");
      setCameraOutcome("ok");
      setMicOutcome("ok");

      if (videoRef.current) videoRef.current.srcObject = stream;

      const ctx = getEngine().ensureContext();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);
      analyserRef.current = analyser;

      setStatus("active");
      rafRef.current = requestAnimationFrame(levelLoop);
    } catch {
      // The combined request failed — diagnose camera and mic separately so
      // the user knows which one is actually the problem, not just "it failed."
      await diagnoseSeparately();
      setStatus("error");
      trackCameraPermission("error");
      trackMicPermission("error");
    }
  }, [levelLoop, diagnoseSeparately]);

  const playTestSound = useCallback(() => {
    setSpeakerCheck("playing");
    const ctx = getEngine().ensureContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    osc.connect(gain);
    gain.connect(getEngine().getMasterGain());
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.02);
    gain.gain.setValueAtTime(0.4, now + 0.25);
    gain.gain.linearRampToValueAtTime(0, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.35);
  }, []);

  if (unsupported) {
    return (
      <ToolShell>
        <p className="text-text text-sm font-medium">Your browser doesn&apos;t support camera or microphone access.</p>
        <p className="text-muted text-sm">Try a recent version of Chrome, Edge, Safari or Firefox.</p>
      </ToolShell>
    );
  }

  return (
    <ToolShell>
      <p className="text-muted max-w-sm text-center text-xs">
        Checks camera and microphone together, the way a video-call app does — nothing is uploaded, everything stays
        in this tab.
      </p>

      {status === "idle" && (
        <button
          type="button"
          onClick={() => void start()}
          className="bg-primary hover:bg-primary-strong rounded-full px-6 py-3 text-base font-semibold text-white"
        >
          Test camera & mic
        </button>
      )}

      {status === "requesting" && (
        <p className="text-muted text-sm" aria-live="polite">
          Requesting camera and microphone access…
        </p>
      )}

      {status === "error" && (
        <div className="flex w-full max-w-sm flex-col items-center gap-3 text-center" aria-live="polite">
          <p className="text-text text-sm font-medium">Camera and microphone couldn&apos;t both be accessed.</p>
          <div className="border-border bg-surface w-full rounded-xl border p-3 text-left text-sm">
            <p className="text-text flex items-center justify-between">
              <span>📷 Camera</span>
              <span className={cameraOutcome === "ok" ? "text-accent" : "text-danger"}>
                {cameraOutcome ? OUTCOME_LABEL[cameraOutcome] : "Checking…"}
              </span>
            </p>
            <p className="text-text mt-1 flex items-center justify-between">
              <span>🎙️ Microphone</span>
              <span className={micOutcome === "ok" ? "text-accent" : "text-danger"}>
                {micOutcome ? OUTCOME_LABEL[micOutcome] : "Checking…"}
              </span>
            </p>
          </div>
          <p className="text-muted text-xs">
            Chrome/Edge: click the camera/mic icon in the address bar and allow access. Safari (Mac): Safari menu →
            Settings for This Website. iPhone/Android: check the browser&apos;s site permissions in your phone&apos;s
            Settings app too, then reload.
          </p>
          <button
            type="button"
            onClick={() => void start()}
            className="border-border text-text hover:border-primary hover:text-primary mt-1 rounded-full border px-4 py-1.5 text-sm font-medium"
          >
            Try again
          </button>
        </div>
      )}

      {status === "active" && (
        <div className="flex w-full flex-col items-center gap-4">
          <div className="relative w-full max-w-sm overflow-hidden rounded-lg bg-black">
            <video ref={videoRef} autoPlay playsInline muted className="w-full" />
          </div>

          <div className="w-full max-w-sm">
            <p className="text-muted mb-1 text-xs">Mic level</p>
            <div className="bg-bg h-2 w-full overflow-hidden rounded-full">
              <div className="bg-accent h-full rounded-full transition-[width]" style={{ width: `${Math.round(level * 100)}%` }} />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            {speakerCheck === "untested" && (
              <button
                type="button"
                onClick={playTestSound}
                className="border-border text-text hover:border-primary hover:text-primary rounded-full border px-4 py-1.5 text-sm font-medium"
              >
                Play test sound
              </button>
            )}
            {speakerCheck === "playing" && (
              <div className="flex flex-col items-center gap-2" aria-live="polite">
                <p className="text-muted text-sm">Did you hear a short beep?</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSpeakerCheck("yes")}
                    className="bg-accent rounded-full px-4 py-1.5 text-sm font-semibold text-white"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setSpeakerCheck("no")}
                    className="border-danger text-danger rounded-full border px-4 py-1.5 text-sm font-medium"
                  >
                    No
                  </button>
                </div>
              </div>
            )}
            {(speakerCheck === "yes" || speakerCheck === "no") && (
              <button type="button" onClick={playTestSound} className="text-muted hover:text-text text-xs">
                Play again
              </button>
            )}
          </div>

          <div className="border-border bg-surface w-full max-w-sm rounded-xl border p-3 text-sm" aria-live="polite">
            <p className="text-text flex items-center justify-between">
              <span>📷 Camera</span>
              <span className="text-accent">Working</span>
            </p>
            <p className="text-text mt-1 flex items-center justify-between">
              <span>🎙️ Microphone</span>
              <span className="text-accent">Working</span>
            </p>
            <p className="text-text mt-1 flex items-center justify-between">
              <span>🔊 Speaker</span>
              <span className={speakerCheck === "yes" ? "text-accent" : speakerCheck === "no" ? "text-danger" : "text-muted"}>
                {speakerCheck === "yes" ? "Confirmed" : speakerCheck === "no" ? "Not confirmed" : "Not tested yet"}
              </span>
            </p>
          </div>

          <button type="button" onClick={stop} className="text-muted hover:text-text text-sm">
            Stop
          </button>
        </div>
      )}
    </ToolShell>
  );
}
