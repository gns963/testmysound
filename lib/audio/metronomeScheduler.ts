// Lookahead scheduler ("A Tale of Two Clocks" pattern) — a standard,
// publicly documented technique for precise Web Audio timing. setInterval
// alone drifts and jitters (it's not sample-accurate and can be delayed by
// other JS work), so instead we:
//  1. Every `lookaheadMs`, schedule any click due in the next
//     `scheduleAheadS` seconds using exact AudioContext.currentTime values
//     (sample-accurate; the browser's own audio clock handles playback).
//  2. Separately, drive the *visual* beat indicator off a requestAnimationFrame
//     loop that fires each callback only once real time reaches that click's
//     scheduled time — so the UI flashes in sync with what you actually hear,
//     not up to ~100ms early (which scheduling-ahead alone would cause).

const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD_S = 0.1;
const CLICK_DURATION_S = 0.05;

type BeatEvent = { beatIndex: number; time: number };

export class MetronomeScheduler {
  private ctx: AudioContext;
  private masterGain: GainNode;
  private bpm = 120;
  private beatsPerBar = 4;
  private accentEnabled = true;
  private currentBeat = 0;
  private nextNoteTime = 0;
  private timerId: number | null = null;
  private rafId: number | null = null;
  private queue: BeatEvent[] = [];
  private onVisualBeat: ((beatIndex: number) => void) | null = null;
  private running = false;

  constructor(ctx: AudioContext, masterGain: GainNode) {
    this.ctx = ctx;
    this.masterGain = masterGain;
  }

  setBpm(bpm: number) {
    this.bpm = bpm;
  }

  setBeatsPerBar(beats: number) {
    this.beatsPerBar = beats;
    if (this.currentBeat >= beats) this.currentBeat = 0;
  }

  setAccentEnabled(enabled: boolean) {
    this.accentEnabled = enabled;
  }

  isRunning() {
    return this.running;
  }

  private scheduleClick(beatIndex: number, time: number) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.masterGain);

    const isAccent = this.accentEnabled && beatIndex === 0;
    osc.type = "sine";
    osc.frequency.value = isAccent ? 1500 : 1000;

    const peak = isAccent ? 0.9 : 0.5;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(peak, time + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + CLICK_DURATION_S);

    osc.start(time);
    osc.stop(time + CLICK_DURATION_S + 0.01);

    this.queue.push({ beatIndex, time });
  }

  private tick = () => {
    const secondsPerBeat = 60 / this.bpm;
    while (this.nextNoteTime < this.ctx.currentTime + SCHEDULE_AHEAD_S) {
      this.scheduleClick(this.currentBeat, this.nextNoteTime);
      this.nextNoteTime += secondsPerBeat;
      this.currentBeat = (this.currentBeat + 1) % this.beatsPerBar;
    }
    this.timerId = window.setTimeout(this.tick, LOOKAHEAD_MS);
  };

  private drawLoop = () => {
    const now = this.ctx.currentTime;
    while (this.queue.length > 0 && this.queue[0].time <= now) {
      const event = this.queue.shift();
      if (event) this.onVisualBeat?.(event.beatIndex);
    }
    this.rafId = requestAnimationFrame(this.drawLoop);
  };

  start(onVisualBeat: (beatIndex: number) => void) {
    if (this.running) return;
    this.running = true;
    this.onVisualBeat = onVisualBeat;
    this.currentBeat = 0;
    this.queue = [];
    this.nextNoteTime = this.ctx.currentTime + 0.05;
    this.tick();
    this.drawLoop();
  }

  stop() {
    this.running = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.queue = [];
  }
}
