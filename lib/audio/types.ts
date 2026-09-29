// Program model shared by every timed tone-based tool (Speaker Cleaner, Deep
// Cleaner, Earpiece Cleaner, Dust Remover). A Program is an ordered list of
// Stages; the engine plays them back-to-back and reports progress as it goes.

export type ToneStage = {
  kind: "tone";
  label: string;
  freq: number;
  type?: OscillatorType;
  gain?: number;
  duration: number; // ms
};

export type SweepStage = {
  kind: "sweep";
  label: string;
  from: number;
  to: number;
  type?: OscillatorType;
  gain?: number;
  duration: number; // ms, total stage duration
  /** Repeat the from->to ramp back-to-back for the whole stage duration. */
  loop?: boolean;
  /** Duration of a single from->to ramp when looping. Default 2000ms. */
  cycleMs?: number;
};

export type PulseStage = {
  kind: "pulse";
  label: string;
  freq: number;
  onMs: number;
  offMs: number;
  type?: OscillatorType;
  gain?: number;
  duration: number; // ms, total stage duration
};

export type Stage = ToneStage | SweepStage | PulseStage;
export type Program = Stage[];

export function programDuration(program: Program): number {
  return program.reduce((sum, stage) => sum + stage.duration, 0);
}
