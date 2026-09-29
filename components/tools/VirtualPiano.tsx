"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getEngine } from "@/lib/audio/engine";
import { noteToFrequency } from "@/lib/audio/pitchDetection";
import { ToolShell } from "@/components/tools/shell/ToolShell";

type PianoKey = { note: string; midiOffset: number; keyBinding: string };

const WHITE_KEYS: PianoKey[] = [
  { note: "C", midiOffset: 0, keyBinding: "a" },
  { note: "D", midiOffset: 2, keyBinding: "s" },
  { note: "E", midiOffset: 4, keyBinding: "d" },
  { note: "F", midiOffset: 5, keyBinding: "f" },
  { note: "G", midiOffset: 7, keyBinding: "g" },
  { note: "A", midiOffset: 9, keyBinding: "h" },
  { note: "B", midiOffset: 11, keyBinding: "j" },
  { note: "C", midiOffset: 12, keyBinding: "k" },
];

// leftPct positions each black key centered on the boundary between two
// white keys, for 8 equal-width (12.5%) white keys.
const BLACK_KEYS: (PianoKey & { leftPct: number })[] = [
  { note: "C#", midiOffset: 1, keyBinding: "w", leftPct: 8.5 },
  { note: "D#", midiOffset: 3, keyBinding: "e", leftPct: 21 },
  { note: "F#", midiOffset: 6, keyBinding: "t", leftPct: 46 },
  { note: "G#", midiOffset: 8, keyBinding: "y", leftPct: 58.5 },
  { note: "A#", midiOffset: 10, keyBinding: "u", leftPct: 71 },
];

const BASE_MIDI = 60; // C4
const WAVEFORMS: OscillatorType[] = ["triangle", "sine", "square", "sawtooth"];
const MIN_OCTAVE_SHIFT = -3;
const MAX_OCTAVE_SHIFT = 3;

type NoteController = ReturnType<ReturnType<typeof getEngine>["playNote"]>;

/** Virtual Piano: synthesized (not sampled) tones, mouse/touch + physical-keyboard playable, polyphonic. */
export function VirtualPiano() {
  const [octaveShift, setOctaveShift] = useState(0);
  const [waveform, setWaveform] = useState<OscillatorType>("triangle");
  const [activeNotes, setActiveNotes] = useState<Set<number>>(new Set());

  const voicesRef = useRef<Map<number, NoteController>>(new Map());
  const heldPhysicalKeysRef = useRef<Set<string>>(new Set());
  const octaveShiftRef = useRef(octaveShift);
  const waveformRef = useRef(waveform);

  useEffect(() => {
    octaveShiftRef.current = octaveShift;
  }, [octaveShift]);

  useEffect(() => {
    waveformRef.current = waveform;
  }, [waveform]);

  const allKeys = useMemo(() => [...WHITE_KEYS, ...BLACK_KEYS], []);

  const noteOn = useCallback((midiOffset: number) => {
    if (voicesRef.current.has(midiOffset)) return;
    const midi = BASE_MIDI + midiOffset + octaveShiftRef.current * 12;
    const freq = noteToFrequency(midi);
    const controller = getEngine().playNote({ freq, type: waveformRef.current, gain: 0.5 });
    voicesRef.current.set(midiOffset, controller);
    setActiveNotes((prev) => new Set(prev).add(midiOffset));
  }, []);

  const noteOff = useCallback((midiOffset: number) => {
    const controller = voicesRef.current.get(midiOffset);
    if (!controller) return;
    controller.release();
    voicesRef.current.delete(midiOffset);
    setActiveNotes((prev) => {
      const next = new Set(prev);
      next.delete(midiOffset);
      return next;
    });
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.repeat) return;
      const key = e.key.toLowerCase();
      const match = allKeys.find((k) => k.keyBinding === key);
      if (!match || heldPhysicalKeysRef.current.has(key)) return;
      heldPhysicalKeysRef.current.add(key);
      noteOn(match.midiOffset);
    }
    function handleKeyUp(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      const match = allKeys.find((k) => k.keyBinding === key);
      if (!match) return;
      heldPhysicalKeysRef.current.delete(key);
      noteOff(match.midiOffset);
    }
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [allKeys, noteOn, noteOff]);

  useEffect(() => {
    const voices = voicesRef.current;
    return () => {
      voices.forEach((controller) => controller.release());
      voices.clear();
    };
  }, []);

  return (
    <ToolShell>
      <p className="text-muted max-w-sm text-center text-xs">
        Synthesized tones, not a sampled piano — play with your mouse/finger or the A S D F G H J K row on your
        keyboard.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setOctaveShift((s) => Math.max(MIN_OCTAVE_SHIFT, s - 1))}
            disabled={octaveShift <= MIN_OCTAVE_SHIFT}
            aria-label="Shift one octave down"
            className="border-border text-text flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>
          <span className="text-muted w-16 text-center text-xs">Octave {octaveShift >= 0 ? `+${octaveShift}` : octaveShift}</span>
          <button
            type="button"
            onClick={() => setOctaveShift((s) => Math.min(MAX_OCTAVE_SHIFT, s + 1))}
            disabled={octaveShift >= MAX_OCTAVE_SHIFT}
            aria-label="Shift one octave up"
            className="border-border text-text flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold disabled:cursor-not-allowed disabled:opacity-40"
          >
            +
          </button>
        </div>

        <label className="text-muted flex items-center gap-2 text-xs">
          Waveform
          <select
            value={waveform}
            onChange={(e) => setWaveform(e.target.value as OscillatorType)}
            className="border-border bg-bg text-text rounded-md border px-2 py-1"
          >
            {WAVEFORMS.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        className="relative h-40 w-full max-w-xl select-none"
        onContextMenu={(e) => e.preventDefault()}
        aria-label="Piano keyboard"
      >
        <div className="absolute inset-0 flex">
          {WHITE_KEYS.map((key) => (
            <button
              key={key.midiOffset}
              type="button"
              onPointerDown={() => noteOn(key.midiOffset)}
              onPointerUp={() => noteOff(key.midiOffset)}
              onPointerLeave={() => noteOff(key.midiOffset)}
              aria-pressed={activeNotes.has(key.midiOffset)}
              aria-label={`Play ${key.note}`}
              className={`flex-1 rounded-b-lg border border-border last:border-r-0 ${
                activeNotes.has(key.midiOffset) ? "bg-primary/20" : "bg-white"
              } flex items-end justify-center pb-2 text-[10px] font-medium text-slate-400`}
            >
              {key.keyBinding.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0">
          {BLACK_KEYS.map((key) => (
            <button
              key={key.midiOffset}
              type="button"
              onPointerDown={() => noteOn(key.midiOffset)}
              onPointerUp={() => noteOff(key.midiOffset)}
              onPointerLeave={() => noteOff(key.midiOffset)}
              aria-pressed={activeNotes.has(key.midiOffset)}
              aria-label={`Play ${key.note}`}
              style={{ left: `${key.leftPct}%`, width: "8%" }}
              className={`pointer-events-auto absolute top-0 flex h-[60%] items-end justify-center rounded-b-md pb-1 text-[9px] font-medium text-slate-300 ${
                activeNotes.has(key.midiOffset) ? "bg-primary" : "bg-slate-900"
              }`}
            >
              {key.keyBinding.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </ToolShell>
  );
}
