"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ToolShell } from "@/components/tools/shell/ToolShell";

const MAX_CHARS = 2000;
const DEFAULT_TEXT = "Type or paste text here, then press play to hear it read aloud.";

type PlaybackStatus = "idle" | "speaking" | "paused" | "unsupported";

/** Text to Speech: Web Speech API playback, with an honest on-device vs. cloud tag per voice. */
export function TextToSpeech() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [status, setStatus] = useState<PlaybackStatus>("idle");

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus("unsupported");
      return;
    }
    function loadVoices() {
      const list = window.speechSynthesis.getVoices();
      if (list.length > 0) {
        setVoices(list);
        setVoiceURI((prev) => prev || list[0].voiceURI);
      }
    }
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  const selectedVoice = useMemo(() => voices.find((v) => v.voiceURI === voiceURI) ?? null, [voices, voiceURI]);

  const speak = useCallback(() => {
    if (!text.trim() || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    utterance.onstart = () => setStatus("speaking");
    utterance.onend = () => setStatus("idle");
    utterance.onerror = () => setStatus("idle");
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [text, selectedVoice, rate, pitch, volume]);

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
    setStatus("paused");
  }, []);

  const resume = useCallback(() => {
    window.speechSynthesis.resume();
    setStatus("speaking");
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setStatus("idle");
  }, []);

  if (status === "unsupported") {
    return (
      <ToolShell>
        <p className="text-text text-sm font-medium">Your browser doesn&apos;t support text-to-speech.</p>
        <p className="text-muted text-sm">Try a recent version of Chrome, Edge, Safari or Firefox.</p>
      </ToolShell>
    );
  }

  return (
    <ToolShell>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
        rows={5}
        maxLength={MAX_CHARS}
        aria-label="Text to read aloud"
        className="border-border bg-surface text-text focus:border-primary w-full max-w-xl rounded-xl border p-3 text-sm outline-none"
        placeholder="Type or paste text to read aloud…"
      />
      <p className="text-muted text-xs">
        {text.length}/{MAX_CHARS} characters
      </p>

      {voices.length > 0 && (
        <label className="text-muted flex w-full max-w-xl flex-col gap-1 text-sm">
          Voice
          <select
            value={voiceURI}
            onChange={(e) => setVoiceURI(e.target.value)}
            className="border-border bg-bg text-text rounded-md border px-2 py-1.5"
          >
            {voices.map((v) => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {v.name} ({v.lang}) · {v.localService ? "On-device" : "Cloud"}
              </option>
            ))}
          </select>
        </label>
      )}

      <div className="grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="text-muted flex flex-col gap-1 text-xs">
          Rate {rate.toFixed(1)}x
          <input
            type="range"
            min={0.5}
            max={2}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="accent-primary"
          />
        </label>
        <label className="text-muted flex flex-col gap-1 text-xs">
          Pitch {pitch.toFixed(1)}
          <input
            type="range"
            min={0}
            max={2}
            step={0.1}
            value={pitch}
            onChange={(e) => setPitch(Number(e.target.value))}
            className="accent-primary"
          />
        </label>
        <label className="text-muted flex flex-col gap-1 text-xs">
          Volume {Math.round(volume * 100)}%
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="accent-primary"
          />
        </label>
      </div>

      <div className="flex items-center gap-3" aria-live="polite">
        {status !== "speaking" && status !== "paused" && (
          <button
            type="button"
            onClick={speak}
            disabled={!text.trim()}
            className="bg-primary hover:bg-primary-strong rounded-full px-6 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Play
          </button>
        )}
        {status === "speaking" && (
          <button
            type="button"
            onClick={pause}
            className="border-border text-text rounded-full border px-5 py-2.5 text-sm font-medium"
          >
            Pause
          </button>
        )}
        {status === "paused" && (
          <button
            type="button"
            onClick={resume}
            className="bg-primary hover:bg-primary-strong rounded-full px-5 py-2.5 text-sm font-semibold text-white"
          >
            Resume
          </button>
        )}
        {(status === "speaking" || status === "paused") && (
          <button type="button" onClick={stop} className="text-muted hover:text-text text-sm">
            Stop
          </button>
        )}
      </div>

      {selectedVoice && (
        <p className="text-muted max-w-sm text-center text-xs">
          {selectedVoice.localService
            ? "This voice processes text entirely on your device."
            : "This voice may send text to your browser's cloud text-to-speech service to generate audio."}
        </p>
      )}
    </ToolShell>
  );
}
