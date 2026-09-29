// Autocorrelation-based pitch detector (blueprint: "autocorrelation or YIN").
// Autocorrelation was chosen over full YIN for this batch — it's simpler to
// implement correctly and fast enough at typical AnalyserNode buffer sizes
// (2048 samples), and is accurate enough for tuning a musical instrument
// (not lab-grade pitch analysis). The technique itself is standard, publicly
// documented DSP: find the lag that best repeats the waveform against
// itself, refine it with parabolic interpolation, then convert lag -> Hz.

const MIN_FREQ_HZ = 30; // below a bass guitar's lowest open string
const MAX_FREQ_HZ = 1500; // above a violin's open E string with headroom
const SILENCE_RMS_THRESHOLD = 0.01;
// How much stronger the best correlation must be than the signal's own
// energy to be trusted as a real pitch, not just noise repeating loosely.
const MIN_NORMALIZED_CORRELATION = 0.35;

/**
 * Returns the detected fundamental frequency in Hz, or null if the input is
 * too quiet or doesn't show a clear periodic pitch (e.g. noise, silence, or
 * unpitched percussive sound).
 */
export function detectPitch(buffer: Float32Array, sampleRate: number): number | null {
  const size = buffer.length;

  let sumSquares = 0;
  for (let i = 0; i < size; i++) sumSquares += buffer[i] * buffer[i];
  const rms = Math.sqrt(sumSquares / size);
  if (rms < SILENCE_RMS_THRESHOLD) return null;

  const minLag = Math.floor(sampleRate / MAX_FREQ_HZ);
  const maxLag = Math.min(Math.floor(sampleRate / MIN_FREQ_HZ), size - 1);
  if (maxLag <= minLag) return null;

  let bestLag = -1;
  let bestCorrelation = 0;
  for (let lag = minLag; lag <= maxLag; lag++) {
    let correlation = 0;
    for (let i = 0; i < size - lag; i++) {
      correlation += buffer[i] * buffer[i + lag];
    }
    if (correlation > bestCorrelation) {
      bestCorrelation = correlation;
      bestLag = lag;
    }
  }

  if (bestLag <= 0) return null;

  // Normalize against zero-lag energy so quiet/noisy signals with no real
  // periodicity get rejected instead of returning a confident-looking guess.
  const normalized = bestCorrelation / (sumSquares || 1);
  if (normalized < MIN_NORMALIZED_CORRELATION) return null;

  // Parabolic interpolation around the best lag for sub-sample precision —
  // without this, pitch estimates snap to whole-sample steps and sound/look
  // jumpy even when the actual pitch is perfectly steady.
  let refinedLag = bestLag;
  if (bestLag > minLag && bestLag < maxLag) {
    const corrAt = (lag: number) => {
      let c = 0;
      for (let i = 0; i < size - lag; i++) c += buffer[i] * buffer[i + lag];
      return c;
    };
    const y1 = corrAt(bestLag - 1);
    const y2 = bestCorrelation;
    const y3 = corrAt(bestLag + 1);
    const denominator = y1 - 2 * y2 + y3;
    if (denominator !== 0) {
      const shift = (0.5 * (y1 - y3)) / denominator;
      refinedLag = bestLag + shift;
    }
  }

  return sampleRate / refinedLag;
}

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const;
const A4_FREQUENCY = 440;
const A4_MIDI = 69;

export type NoteInfo = {
  name: string;
  octave: number;
  /** MIDI note number (A4 = 69), rounded to the nearest semitone. */
  midi: number;
  /** How far the input frequency is from that semitone, in cents (-50 to +50). */
  cents: number;
};

/** Nearest equal-tempered semitone (A4 = 440Hz) for a given frequency — used in Chromatic mode. */
export function frequencyToNote(freq: number): NoteInfo {
  const midiExact = 12 * Math.log2(freq / A4_FREQUENCY) + A4_MIDI;
  const midi = Math.round(midiExact);
  const cents = Math.round((midiExact - midi) * 100);
  const name = NOTE_NAMES[((midi % 12) + 12) % 12];
  const octave = Math.floor(midi / 12) - 1;
  return { name, octave, midi, cents };
}

/** Frequency of a given equal-tempered semitone (A4 = 440Hz). */
export function noteToFrequency(midi: number): number {
  return A4_FREQUENCY * Math.pow(2, (midi - A4_MIDI) / 12);
}

/** Cents deviation of `freq` from a specific target frequency (not the nearest semitone). */
export function centsFromTarget(freq: number, targetFreq: number): number {
  return Math.round(1200 * Math.log2(freq / targetFreq));
}
