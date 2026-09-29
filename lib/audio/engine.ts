import { isIOS } from "@/lib/platform";
import type {
  Program,
  PulseStage,
  Stage,
  SweepStage,
  ToneStage,
} from "@/lib/audio/types";

// Blueprint §4.1: shared audio engine. One AudioContext per page, created lazily
// on a user gesture (autoplay rules), routed through a capped master gain +
// compressor so no tool can exceed a safe output level.
const MASTER_GAIN_CAP = 0.8;
const RAMP_S = 0.05; // 50ms ramp to avoid clicks/pops
const DEFAULT_SWEEP_CYCLE_MS = 2000;

export type StageController = {
  /** Ramp to silence and end the stage immediately. */
  stop: () => void;
  /** Resolves when the stage ends, whether naturally or via stop(). */
  done: Promise<void>;
};

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private activeSources = new Set<AudioScheduledSourceNode>();

  /** Must be called synchronously from a user-gesture handler (e.g. onClick). */
  ensureContext(): AudioContext {
    if (this.ctx) {
      if (this.ctx.state === "suspended") void this.ctx.resume();
      return this.ctx;
    }

    const AudioContextCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AudioContextCtor();

    const compressor = ctx.createDynamicsCompressor();
    const masterGain = ctx.createGain();
    masterGain.gain.value = MASTER_GAIN_CAP;
    masterGain.connect(compressor);
    compressor.connect(ctx.destination);

    this.ctx = ctx;
    this.masterGain = masterGain;
    this.compressor = compressor;

    if (isIOS() && ctx.state !== "closed" && "audioSession" in navigator) {
      try {
        // Safari 16.4+: hint that this is deliberate media playback so it can
        // play over the ring/silent switch. Best-effort; feature-detected.
        navigator.audioSession!.type = "playback";
      } catch {
        // Unsupported on this Safari version — the on-screen hint covers it.
      }
    }

    return ctx;
  }

  /** The capped master bus every tool's audio should route through. */
  getMasterGain(): GainNode {
    this.ensureContext();
    return this.masterGain!;
  }

  private trackSource(node: AudioScheduledSourceNode) {
    this.activeSources.add(node);
    node.addEventListener("ended", () => this.activeSources.delete(node));
  }

  /** Immediately ramps everything to silence and stops all active sources. */
  stopAll() {
    const ctx = this.ctx;
    const masterGain = this.masterGain;
    if (!ctx || !masterGain) return;

    const now = ctx.currentTime;
    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.setValueAtTime(masterGain.gain.value, now);
    masterGain.gain.linearRampToValueAtTime(0, now + RAMP_S);

    for (const source of this.activeSources) {
      try {
        source.stop(now + RAMP_S);
      } catch {
        // Already stopped/scheduled — ignore.
      }
    }

    // Restore master gain for the next run, after the ramp finishes.
    window.setTimeout(
      () => {
        if (this.masterGain) {
          this.masterGain.gain.cancelScheduledValues(0);
          this.masterGain.gain.value = MASTER_GAIN_CAP;
        }
      },
      RAMP_S * 1000 + 10,
    );
  }

  private playTone(stage: ToneStage): StageController {
    const ctx = this.ensureContext();
    const masterGain = this.masterGain!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = stage.type ?? "sine";
    osc.frequency.value = stage.freq;
    osc.connect(gain);
    gain.connect(masterGain);

    const peak = stage.gain ?? 1;
    const durationS = stage.duration / 1000;
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(peak, now + RAMP_S);
    gain.gain.setValueAtTime(peak, now + durationS - RAMP_S);
    gain.gain.linearRampToValueAtTime(0, now + durationS);

    osc.start(now);
    osc.stop(now + durationS);
    this.trackSource(osc);

    let stopped = false;
    const done = new Promise<void>((resolve) => {
      osc.addEventListener("ended", () => resolve());
    });

    return {
      done,
      stop: () => {
        if (stopped) return;
        stopped = true;
        const t = ctx.currentTime;
        gain.gain.cancelScheduledValues(t);
        gain.gain.setValueAtTime(gain.gain.value, t);
        gain.gain.linearRampToValueAtTime(0, t + RAMP_S);
        try {
          osc.stop(t + RAMP_S);
        } catch {
          // Ignore if already scheduled to stop.
        }
      },
    };
  }

  private playSweep(stage: SweepStage): StageController {
    const ctx = this.ensureContext();
    const masterGain = this.masterGain!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = stage.type ?? "sine";
    osc.connect(gain);
    gain.connect(masterGain);

    const peak = stage.gain ?? 1;
    const durationS = stage.duration / 1000;
    const cycleS = (stage.cycleMs ?? DEFAULT_SWEEP_CYCLE_MS) / 1000;
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(stage.from, now);
    if (stage.loop) {
      let t = now;
      const end = now + durationS;
      while (t < end) {
        const cycleEnd = Math.min(t + cycleS, end);
        osc.frequency.setValueAtTime(stage.from, t);
        osc.frequency.exponentialRampToValueAtTime(stage.to, cycleEnd);
        t = cycleEnd;
      }
    } else {
      osc.frequency.exponentialRampToValueAtTime(stage.to, now + durationS);
    }

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(peak, now + RAMP_S);
    gain.gain.setValueAtTime(peak, now + durationS - RAMP_S);
    gain.gain.linearRampToValueAtTime(0, now + durationS);

    osc.start(now);
    osc.stop(now + durationS);
    this.trackSource(osc);

    let stopped = false;
    const done = new Promise<void>((resolve) => {
      osc.addEventListener("ended", () => resolve());
    });

    return {
      done,
      stop: () => {
        if (stopped) return;
        stopped = true;
        const t = ctx.currentTime;
        gain.gain.cancelScheduledValues(t);
        gain.gain.setValueAtTime(gain.gain.value, t);
        gain.gain.linearRampToValueAtTime(0, t + RAMP_S);
        try {
          osc.stop(t + RAMP_S);
        } catch {
          // Ignore if already scheduled to stop.
        }
      },
    };
  }

  private playPulse(stage: PulseStage): StageController {
    const ctx = this.ensureContext();
    const masterGain = this.masterGain!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = stage.type ?? "sine";
    osc.frequency.value = stage.freq;
    osc.connect(gain);
    gain.connect(masterGain);

    const peak = stage.gain ?? 1;
    const durationS = stage.duration / 1000;
    const onS = stage.onMs / 1000;
    const offS = stage.offMs / 1000;
    const now = ctx.currentTime;
    const end = now + durationS;
    const rampS = Math.min(RAMP_S, onS / 4 || RAMP_S);

    gain.gain.setValueAtTime(0, now);
    let t = now;
    while (t < end) {
      const onEnd = Math.min(t + onS, end);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(peak, Math.min(t + rampS, onEnd));
      if (onEnd - rampS > t + rampS) {
        gain.gain.setValueAtTime(peak, onEnd - rampS);
      }
      gain.gain.linearRampToValueAtTime(0, onEnd);
      t = onEnd + offS;
    }

    osc.start(now);
    osc.stop(end);
    this.trackSource(osc);

    let stopped = false;
    const done = new Promise<void>((resolve) => {
      osc.addEventListener("ended", () => resolve());
    });

    return {
      done,
      stop: () => {
        if (stopped) return;
        stopped = true;
        const tt = ctx.currentTime;
        gain.gain.cancelScheduledValues(tt);
        gain.gain.setValueAtTime(gain.gain.value, tt);
        gain.gain.linearRampToValueAtTime(0, tt + RAMP_S);
        try {
          osc.stop(tt + RAMP_S);
        } catch {
          // Ignore if already scheduled to stop.
        }
      },
    };
  }

  playStage(stage: Stage): StageController {
    switch (stage.kind) {
      case "tone":
        return this.playTone(stage);
      case "sweep":
        return this.playSweep(stage);
      case "pulse":
        return this.playPulse(stage);
    }
  }

  /** A tone that plays until stop() is called — used by continuous tools (L/R test). */
  startContinuousTone(params: {
    freq: number;
    type?: OscillatorType;
    gain?: number;
    pan?: number;
  }) {
    const ctx = this.ensureContext();
    const masterGain = this.masterGain!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = ctx.createStereoPanner();
    osc.type = params.type ?? "sine";
    osc.frequency.value = params.freq;
    panner.pan.value = params.pan ?? 0;

    osc.connect(gain);
    gain.connect(panner);
    panner.connect(masterGain);

    const peak = params.gain ?? 1;
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(peak, now + RAMP_S);

    osc.start(now);
    this.trackSource(osc);

    let stopped = false;
    return {
      setPan: (value: number, rampS = 0.1) => {
        const t = ctx.currentTime;
        panner.pan.cancelScheduledValues(t);
        panner.pan.setValueAtTime(panner.pan.value, t);
        panner.pan.linearRampToValueAtTime(value, t + rampS);
      },
      setFreq: (value: number, rampS = 0.05) => {
        const t = ctx.currentTime;
        osc.frequency.cancelScheduledValues(t);
        osc.frequency.setValueAtTime(osc.frequency.value, t);
        osc.frequency.linearRampToValueAtTime(value, t + rampS);
      },
      /** OscillatorType is a plain attribute — safe to change on a running node. */
      setType: (value: OscillatorType) => {
        osc.type = value;
      },
      setGain: (value: number, rampS = 0.05) => {
        const t = ctx.currentTime;
        gain.gain.cancelScheduledValues(t);
        gain.gain.setValueAtTime(gain.gain.value, t);
        gain.gain.linearRampToValueAtTime(value, t + rampS);
      },
      stop: () => {
        if (stopped) return;
        stopped = true;
        const t = ctx.currentTime;
        gain.gain.cancelScheduledValues(t);
        gain.gain.setValueAtTime(gain.gain.value, t);
        gain.gain.linearRampToValueAtTime(0, t + RAMP_S);
        try {
          osc.stop(t + RAMP_S);
        } catch {
          // Ignore if already scheduled to stop.
        }
      },
    };
  }

  /** Looping colored-noise playback (white/pink/brown) until stop() is called. */
  startNoise(params: { buffer: AudioBuffer; gain?: number }) {
    const ctx = this.ensureContext();
    const masterGain = this.masterGain!;
    const source = ctx.createBufferSource();
    const gain = ctx.createGain();
    source.buffer = params.buffer;
    source.loop = true;
    source.connect(gain);
    gain.connect(masterGain);

    const peak = params.gain ?? 0.5;
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(peak, now + RAMP_S);

    source.start(now);
    this.trackSource(source);

    let stopped = false;
    return {
      setGain: (value: number, rampS = 0.1) => {
        const t = ctx.currentTime;
        gain.gain.cancelScheduledValues(t);
        gain.gain.setValueAtTime(gain.gain.value, t);
        gain.gain.linearRampToValueAtTime(value, t + rampS);
      },
      stop: () => {
        if (stopped) return;
        stopped = true;
        const t = ctx.currentTime;
        gain.gain.cancelScheduledValues(t);
        gain.gain.setValueAtTime(gain.gain.value, t);
        gain.gain.linearRampToValueAtTime(0, t + RAMP_S);
        try {
          source.stop(t + RAMP_S);
        } catch {
          // Ignore if already scheduled to stop.
        }
      },
    };
  }

  /**
   * Looping noise playback with an optional filter (shapes white/pink/brown
   * noise toward a "rain" or "ocean" character) and an optional slow LFO on
   * the gain (the rising-and-falling "wave swell" for ocean sounds). Used by
   * Sleep/Focus Sounds — kept as its own engine method, like startNoise(),
   * rather than a one-off outside the shared master-gain bus.
   */
  startAmbientNoise(params: {
    buffer: AudioBuffer;
    filter?: { type: BiquadFilterType; frequency: number; q?: number };
    lfo?: { rateHz: number; depth: number };
    gain?: number;
  }) {
    const ctx = this.ensureContext();
    const masterGain = this.masterGain!;
    const source = ctx.createBufferSource();
    source.buffer = params.buffer;
    source.loop = true;

    let node: AudioNode = source;
    if (params.filter) {
      const biquad = ctx.createBiquadFilter();
      biquad.type = params.filter.type;
      biquad.frequency.value = params.filter.frequency;
      if (params.filter.q) biquad.Q.value = params.filter.q;
      node.connect(biquad);
      node = biquad;
    }

    const gain = ctx.createGain();
    node.connect(gain);
    gain.connect(masterGain);

    const peak = params.gain ?? 0.5;
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(peak, now + RAMP_S);

    let lfoOsc: OscillatorNode | null = null;
    let lfoGain: GainNode | null = null;
    if (params.lfo) {
      lfoOsc = ctx.createOscillator();
      lfoOsc.frequency.value = params.lfo.rateHz;
      lfoGain = ctx.createGain();
      // Modulates gain.gain around its current value — depth is a fraction
      // of peak, so "ocean" swells between roughly peak*(1-depth) and peak.
      lfoGain.gain.value = peak * params.lfo.depth;
      lfoOsc.connect(lfoGain);
      lfoGain.connect(gain.gain);
      lfoOsc.start(now);
    }

    source.start(now);
    this.trackSource(source);

    let stopped = false;
    return {
      setGain: (value: number, rampS = 0.1) => {
        const t = ctx.currentTime;
        gain.gain.cancelScheduledValues(t);
        gain.gain.setValueAtTime(gain.gain.value, t);
        gain.gain.linearRampToValueAtTime(value, t + rampS);
        if (lfoGain && params.lfo) {
          lfoGain.gain.cancelScheduledValues(t);
          lfoGain.gain.setValueAtTime(lfoGain.gain.value, t);
          lfoGain.gain.linearRampToValueAtTime(value * params.lfo.depth, t + rampS);
        }
      },
      /** `fadeS` lets the sleep timer fade out gently instead of the usual quick ramp. */
      stop: (fadeS = RAMP_S) => {
        if (stopped) return;
        stopped = true;
        const t = ctx.currentTime;
        gain.gain.cancelScheduledValues(t);
        gain.gain.setValueAtTime(gain.gain.value, t);
        gain.gain.linearRampToValueAtTime(0, t + fadeS);
        try {
          source.stop(t + fadeS);
        } catch {
          // Ignore if already scheduled to stop.
        }
        try {
          lfoOsc?.stop(t + fadeS);
        } catch {
          // Ignore if already scheduled to stop.
        }
      },
    };
  }

  /**
   * Speaker Phase/Polarity Test: one oscillator feeds both a hard-left and a
   * hard-right panner, so the two channels start perfectly in sync. Flipping
   * the right channel's gain between +peak and -peak is a literal polarity
   * inversion of that channel — exactly what happens electrically when a
   * speaker's +/- wires are swapped — so the user can A/B it live by ear.
   */
  startPolarityTest(params: { freq?: number; gain?: number }) {
    const ctx = this.ensureContext();
    const masterGain = this.masterGain!;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = params.freq ?? 80;

    const leftGain = ctx.createGain();
    const rightGain = ctx.createGain();
    const leftPanner = ctx.createStereoPanner();
    const rightPanner = ctx.createStereoPanner();
    leftPanner.pan.value = -1;
    rightPanner.pan.value = 1;

    osc.connect(leftGain);
    osc.connect(rightGain);
    leftGain.connect(leftPanner);
    rightGain.connect(rightPanner);
    leftPanner.connect(masterGain);
    rightPanner.connect(masterGain);

    const peak = params.gain ?? 0.6;
    const now = ctx.currentTime;
    leftGain.gain.setValueAtTime(0, now);
    rightGain.gain.setValueAtTime(0, now);
    leftGain.gain.linearRampToValueAtTime(peak, now + RAMP_S);
    rightGain.gain.linearRampToValueAtTime(peak, now + RAMP_S);

    osc.start(now);
    this.trackSource(osc);

    let stopped = false;
    return {
      setInverted: (value: boolean, rampS = 0.05) => {
        const t = ctx.currentTime;
        rightGain.gain.cancelScheduledValues(t);
        rightGain.gain.setValueAtTime(rightGain.gain.value, t);
        rightGain.gain.linearRampToValueAtTime(value ? -peak : peak, t + rampS);
      },
      stop: () => {
        if (stopped) return;
        stopped = true;
        const t = ctx.currentTime;
        leftGain.gain.cancelScheduledValues(t);
        rightGain.gain.cancelScheduledValues(t);
        leftGain.gain.setValueAtTime(leftGain.gain.value, t);
        rightGain.gain.setValueAtTime(rightGain.gain.value, t);
        leftGain.gain.linearRampToValueAtTime(0, t + RAMP_S);
        rightGain.gain.linearRampToValueAtTime(0, t + RAMP_S);
        try {
          osc.stop(t + RAMP_S);
        } catch {
          // Ignore if already scheduled to stop.
        }
      },
    };
  }

  /** How many discrete output channels the browser currently reports as available — the honest ceiling for the Surround Sound Test. */
  getMaxChannelCount(): number {
    const ctx = this.ensureContext();
    return ctx.destination.maxChannelCount || 2;
  }

  /**
   * Surround Sound Test: sends a tone to exactly one discrete channel index
   * of a ChannelMergerNode. Deliberately connects straight to
   * ctx.destination instead of through getMasterGain() — DynamicsCompressorNode
   * is spec-limited to 2 channels, so routing a >2-channel signal through the
   * shared master bus would silently collapse it back to stereo. A manual
   * gain cap here keeps the same safety intent as the shared bus.
   */
  startSurroundChannelTest(params: { channelIndex: number; totalChannels: number; freq?: number; gain?: number }) {
    const ctx = this.ensureContext();
    const destination = ctx.destination;
    const channelCount = Math.max(2, Math.min(params.totalChannels, destination.maxChannelCount || 2));

    try {
      destination.channelCount = channelCount;
      destination.channelCountMode = "explicit";
      destination.channelInterpretation = "discrete";
    } catch {
      // Some browsers/devices don't allow changing destination channel
      // properties at all — the test still runs, just possibly downmixed.
    }

    const merger = ctx.createChannelMerger(channelCount);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = params.freq ?? 440;
    osc.connect(gain);
    gain.connect(merger, 0, Math.min(params.channelIndex, channelCount - 1));
    merger.connect(destination);

    const peak = Math.min(params.gain ?? 0.5, 0.65);
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(peak, now + RAMP_S);

    osc.start(now);
    this.trackSource(osc);

    let stopped = false;
    return {
      stop: () => {
        if (stopped) return;
        stopped = true;
        const t = ctx.currentTime;
        gain.gain.cancelScheduledValues(t);
        gain.gain.setValueAtTime(gain.gain.value, t);
        gain.gain.linearRampToValueAtTime(0, t + RAMP_S);
        try {
          osc.stop(t + RAMP_S);
        } catch {
          // Ignore if already scheduled to stop.
        }
      },
    };
  }

  /**
   * One independent voice — used by the Virtual Piano for polyphony (each
   * held key is its own call, so multiple notes overlap freely). A short
   * attack + slight decay to a sustain level, then a release ramp on key-up,
   * gives a plucked/keyboard-like envelope instead of an abrupt on/off click.
   */
  playNote(params: { freq: number; type?: OscillatorType; gain?: number }) {
    const ctx = this.ensureContext();
    const masterGain = this.masterGain!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = params.type ?? "triangle";
    osc.frequency.value = params.freq;
    osc.connect(gain);
    gain.connect(masterGain);

    const peak = params.gain ?? 0.5;
    const attackS = 0.01;
    const decayS = 0.15;
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(peak, now + attackS);
    gain.gain.linearRampToValueAtTime(peak * 0.7, now + attackS + decayS);

    osc.start(now);
    this.trackSource(osc);

    let released = false;
    return {
      release: (releaseS = 0.15) => {
        if (released) return;
        released = true;
        const t = ctx.currentTime;
        gain.gain.cancelScheduledValues(t);
        gain.gain.setValueAtTime(gain.gain.value, t);
        gain.gain.linearRampToValueAtTime(0, t + releaseS);
        try {
          osc.stop(t + releaseS + 0.02);
        } catch {
          // Ignore if already scheduled to stop.
        }
      },
    };
  }
}

let sharedEngine: AudioEngine | null = null;

/** One engine per page load; safe to call outside a user gesture (creation is lazy). */
export function getEngine(): AudioEngine {
  if (!sharedEngine) sharedEngine = new AudioEngine();
  return sharedEngine;
}

export type ProgramRunHandle = {
  cancel: () => void;
};

// Sequentially plays every stage in a Program, reporting progress via callbacks.
// Cancelling ramps the current stage to silence and skips the rest.
export function runProgram(
  engine: AudioEngine,
  program: Program,
  callbacks: {
    onStageStart?: (index: number, stage: Stage) => void;
    onProgress?: (elapsedMs: number, totalMs: number) => void;
    onComplete?: (completedNaturally: boolean) => void;
  },
): ProgramRunHandle {
  let cancelled = false;
  let currentController: StageController | null = null;
  const totalMs = program.reduce((sum, s) => sum + s.duration, 0);

  (async () => {
    let elapsedBeforeStage = 0;
    const progressTimer = window.setInterval(() => {
      callbacks.onProgress?.(elapsedBeforeStage + tickElapsed(), totalMs);
    }, 100);
    let stageStartedAt = performance.now();

    function tickElapsed() {
      return Math.min(performance.now() - stageStartedAt, currentStageDuration);
    }

    let currentStageDuration = 0;

    for (let i = 0; i < program.length; i++) {
      if (cancelled) break;
      const stage = program[i];
      currentStageDuration = stage.duration;
      callbacks.onStageStart?.(i, stage);
      stageStartedAt = performance.now();
      currentController = engine.playStage(stage);
      await currentController.done;
      elapsedBeforeStage += stage.duration;
    }

    window.clearInterval(progressTimer);
    callbacks.onProgress?.(totalMs, totalMs);
    callbacks.onComplete?.(!cancelled);
  })();

  return {
    cancel: () => {
      if (cancelled) return;
      cancelled = true;
      currentController?.stop();
    },
  };
}
