"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getEngine } from "@/lib/audio/engine";
import { detectPitch, frequencyToNote, centsFromTarget } from "@/lib/audio/pitchDetection";
import { getTunerPreset, closestString, type TunerPresetId } from "@/lib/audio/tunerPresets";
import { trackMicPermission } from "@/lib/analytics";

export type TunerStatus = "idle" | "requesting" | "active" | "error";
export type TunerErrorKind = "denied" | "not-found" | "in-use" | "unsupported" | "unknown";
export type TunerReading = { frequency: number; noteName: string; cents: number; inTune: boolean };

const IN_TUNE_CENTS = 5;
// Smooths the displayed cents value over the last few frames, and requires a
// full window before showing a reading, so a single noisy sample can't make
// the needle or note name jump.
const SMOOTHING_SAMPLES = 5;

function classifyError(error: unknown): TunerErrorKind {
  const name = error instanceof DOMException ? error.name : "";
  if (name === "NotAllowedError" || name === "PermissionDeniedError") return "denied";
  if (name === "NotFoundError" || name === "DevicesNotFoundError") return "not-found";
  if (name === "NotReadableError" || name === "TrackStartError") return "in-use";
  return "unknown";
}

/** Mic pitch detection + note/cents readout for a given instrument preset. */
export function useTuner(presetId: TunerPresetId) {
  const [status, setStatus] = useState<TunerStatus>("idle");
  const [errorKind, setErrorKind] = useState<TunerErrorKind>("unknown");
  const [reading, setReading] = useState<TunerReading | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const centsHistoryRef = useRef<number[]>([]);
  // Read inside the rAF loop without needing to restart the stream/loop when
  // the user switches presets mid-session.
  const presetIdRef = useRef(presetId);
  useEffect(() => {
    presetIdRef.current = presetId;
  }, [presetId]);

  const stop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    analyserRef.current = null;
    centsHistoryRef.current = [];
    setReading(null);
    setStatus("idle");
  }, []);

  useEffect(() => {
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loop = useCallback(function tick() {
    const analyser = analyserRef.current;
    if (!analyser) return;

    const buffer = new Float32Array(analyser.fftSize);
    analyser.getFloatTimeDomainData(buffer);
    const freq = detectPitch(buffer, analyser.context.sampleRate);

    if (freq) {
      const preset = getTunerPreset(presetIdRef.current);
      let noteName: string;
      let cents: number;
      if (preset.strings) {
        const target = closestString(preset.strings, freq);
        noteName = target.note;
        cents = centsFromTarget(freq, target.freq);
      } else {
        const info = frequencyToNote(freq);
        noteName = `${info.name}${info.octave}`;
        cents = info.cents;
      }

      const history = centsHistoryRef.current;
      history.push(cents);
      if (history.length > SMOOTHING_SAMPLES) history.shift();

      if (history.length >= SMOOTHING_SAMPLES) {
        const smoothedCents = Math.round(history.reduce((a, b) => a + b, 0) / history.length);
        setReading({
          frequency: freq,
          noteName,
          cents: smoothedCents,
          inTune: Math.abs(smoothedCents) <= IN_TUNE_CENTS,
        });
      }
    } else {
      centsHistoryRef.current = [];
      setReading(null);
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const start = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setErrorKind("unsupported");
      setStatus("error");
      return;
    }

    setStatus("requesting");
    try {
      // Ask the browser not to apply voice-call processing (echo
      // cancellation, noise suppression, auto gain) — it's tuned for speech
      // and can distort or suppress an instrument's actual pitch. Not every
      // browser/OS honors this fully, which is part of why accuracy varies.
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      });
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

  return { status, errorKind, reading, start, stop };
}
