// Ambient types for non-standard/experimental Web APIs not (yet) in lib.dom.d.ts.

interface AudioSession {
  type:
    | "auto"
    | "playback"
    | "transient"
    | "transient-solo"
    | "ambient"
    | "play-and-record";
}

interface Navigator {
  /** Safari 16.4+ only. Feature-detect before use. */
  readonly audioSession?: AudioSession;
}
