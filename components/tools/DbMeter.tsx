"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getEngine } from "@/lib/audio/engine";
import { trackMicPermission } from "@/lib/analytics";
import { ToolShell } from "@/components/tools/shell/ToolShell";

type MicStatus = "idle" | "requesting" | "active" | "error";
type MicErrorKind = "denied" | "not-found" | "in-use" | "unknown";

// Rough, non-calibrated dBFS -> "dB SPL-ish" offset. Phone/laptop mics have no
// consistent calibration, so this is explicitly labeled an approximation on
// the page — never presented as a real sound-level-meter reading.
const SPL_OFFSET = 100;
const MIN_DISPLAY_DB = 20;
const MAX_DISPLAY_DB = 130;

const REFERENCE_LEVELS = [
  { label: "Whisper", db: 30 },
  { label: "Quiet room", db: 40 },
  { label: "Normal conversation", db: 60 },
  { label: "Busy traffic", db: 85 },
  { label: "Loud concert", db: 110 },
];

const ERROR_COPY: Record<MicErrorKind, { title: string; fix: string }> = {
  denied: {
    title: "Microphone permission was denied.",
    fix: "Click the lock/camera icon in your browser's address bar, allow microphone access, then reload.",
  },
  "not-found": {
    title: "No microphone was found.",
    fix: "Check that a microphone is connected and not disabled in your system's sound settings.",
  },
  "in-use": {
    title: "Your microphone is being used by another app.",
    fix: "Close other apps or tabs that might be using it (video calls, other recorders), then try again.",
  },
  unknown: {
    title: "Couldn't access the microphone.",
    fix: "Try reloading the page, or check your browser's site permissions for the microphone.",
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

function rmsToApproxDb(rms: number): number {
  const dBFS = 20 * Math.log10(Math.max(rms, 1e-6));
  return Math.min(MAX_DISPLAY_DB, Math.max(MIN_DISPLAY_DB, dBFS + SPL_OFFSET));
}

/** Tool 11 (blueprint §4.4): mic RMS -> approximate dB with min/avg/max and a reference chart. */
export function DbMeter() {
  const [status, setStatus] = useState<MicStatus>("idle");
  const [errorKind, setErrorKind] = useState<MicErrorKind>("unknown");
  const [current, setCurrent] = useState(MIN_DISPLAY_DB);
  const [stats, setStats] = useState({
    min: MAX_DISPLAY_DB,
    max: MIN_DISPLAY_DB,
    sum: 0,
    count: 0,
  });

  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    analyserRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setStatus("idle");
  }, []);

  useEffect(() => {
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loop = useCallback(function tick() {
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
    const db = rmsToApproxDb(rms);

    setCurrent(db);
    setStats((prev) => ({
      min: Math.min(prev.min, db),
      max: Math.max(prev.max, db),
      sum: prev.sum + db,
      count: prev.count + 1,
    }));

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const start = useCallback(async () => {
    setStatus("requesting");
    setStats({ min: MAX_DISPLAY_DB, max: MIN_DISPLAY_DB, sum: 0, count: 0 });
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

      setStatus("active");
      rafRef.current = requestAnimationFrame(loop);
    } catch (error) {
      const kind = classifyError(error);
      setErrorKind(kind);
      setStatus("error");
      trackMicPermission(kind === "denied" ? "denied" : "error");
    }
  }, [loop]);

  const avg = stats.count > 0 ? stats.sum / stats.count : 0;

  return (
    <ToolShell>
      <p className="text-muted max-w-sm text-center text-xs">
        This is an approximation, not a calibrated sound level meter — phone and
        laptop mics aren&apos;t calibrated for dB SPL. Your audio never leaves
        your device.
      </p>

      {status === "idle" && (
        <button
          type="button"
          onClick={() => void start()}
          className="bg-primary hover:bg-primary-strong rounded-full px-6 py-3 text-base font-semibold text-white"
        >
          Start dB meter
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
          <p
            className="text-text text-5xl font-semibold tabular-nums"
            aria-live="polite"
          >
            ~{Math.round(current)} dB
          </p>

          <div className="text-muted grid grid-cols-3 gap-6 text-center text-sm">
            <div>
              <p className="text-text font-medium">{Math.round(stats.min)}</p>
              Min
            </div>
            <div>
              <p className="text-text font-medium">{Math.round(avg)}</p>
              Avg
            </div>
            <div>
              <p className="text-text font-medium">{Math.round(stats.max)}</p>
              Max
            </div>
          </div>

          <button
            type="button"
            onClick={stop}
            className="text-muted hover:text-text text-sm"
          >
            Stop
          </button>

          <div className="border-border w-full max-w-sm rounded-xl border p-3 text-sm">
            <p className="text-text mb-2 font-medium">Typical noise levels</p>
            <ul className="text-muted space-y-1">
              {REFERENCE_LEVELS.map((ref) => (
                <li key={ref.label} className="flex justify-between">
                  <span>{ref.label}</span>
                  <span>~{ref.db} dB</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </ToolShell>
  );
}
