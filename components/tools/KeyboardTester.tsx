"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ToolShell } from "@/components/tools/shell/ToolShell";

type KeyDef = { label: string; code: string; w?: number };

// Rows are matched against KeyboardEvent.code (physical position), not the
// printed letter — see the "How it works" copy on the page for why that
// matters on non-US layouts.
const ROWS: KeyDef[][] = [
  [
    { label: "Esc", code: "Escape" },
    { label: "F1", code: "F1" },
    { label: "F2", code: "F2" },
    { label: "F3", code: "F3" },
    { label: "F4", code: "F4" },
    { label: "F5", code: "F5" },
    { label: "F6", code: "F6" },
    { label: "F7", code: "F7" },
    { label: "F8", code: "F8" },
    { label: "F9", code: "F9" },
    { label: "F10", code: "F10" },
    { label: "F11", code: "F11" },
    { label: "F12", code: "F12" },
  ],
  [
    { label: "`", code: "Backquote" },
    { label: "1", code: "Digit1" },
    { label: "2", code: "Digit2" },
    { label: "3", code: "Digit3" },
    { label: "4", code: "Digit4" },
    { label: "5", code: "Digit5" },
    { label: "6", code: "Digit6" },
    { label: "7", code: "Digit7" },
    { label: "8", code: "Digit8" },
    { label: "9", code: "Digit9" },
    { label: "0", code: "Digit0" },
    { label: "-", code: "Minus" },
    { label: "=", code: "Equal" },
    { label: "⌫", code: "Backspace", w: 2 },
  ],
  [
    { label: "Tab", code: "Tab", w: 1.5 },
    { label: "Q", code: "KeyQ" },
    { label: "W", code: "KeyW" },
    { label: "E", code: "KeyE" },
    { label: "R", code: "KeyR" },
    { label: "T", code: "KeyT" },
    { label: "Y", code: "KeyY" },
    { label: "U", code: "KeyU" },
    { label: "I", code: "KeyI" },
    { label: "O", code: "KeyO" },
    { label: "P", code: "KeyP" },
    { label: "[", code: "BracketLeft" },
    { label: "]", code: "BracketRight" },
    { label: "\\", code: "Backslash", w: 1.25 },
  ],
  [
    { label: "Caps", code: "CapsLock", w: 1.75 },
    { label: "A", code: "KeyA" },
    { label: "S", code: "KeyS" },
    { label: "D", code: "KeyD" },
    { label: "F", code: "KeyF" },
    { label: "G", code: "KeyG" },
    { label: "H", code: "KeyH" },
    { label: "J", code: "KeyJ" },
    { label: "K", code: "KeyK" },
    { label: "L", code: "KeyL" },
    { label: ";", code: "Semicolon" },
    { label: "'", code: "Quote" },
    { label: "Enter", code: "Enter", w: 2.25 },
  ],
  [
    { label: "Shift", code: "ShiftLeft", w: 2.25 },
    { label: "Z", code: "KeyZ" },
    { label: "X", code: "KeyX" },
    { label: "C", code: "KeyC" },
    { label: "V", code: "KeyV" },
    { label: "B", code: "KeyB" },
    { label: "N", code: "KeyN" },
    { label: "M", code: "KeyM" },
    { label: ",", code: "Comma" },
    { label: ".", code: "Period" },
    { label: "/", code: "Slash" },
    { label: "Shift", code: "ShiftRight", w: 2.75 },
  ],
  [
    { label: "Ctrl", code: "ControlLeft", w: 1.25 },
    { label: "Win", code: "MetaLeft", w: 1.25 },
    { label: "Alt", code: "AltLeft", w: 1.25 },
    { label: "Space", code: "Space", w: 6 },
    { label: "Alt", code: "AltRight", w: 1.25 },
    { label: "Win", code: "MetaRight", w: 1.25 },
    { label: "Ctrl", code: "ControlRight", w: 1.25 },
  ],
];

const ARROW_KEYS: Record<"up" | "left" | "down" | "right", KeyDef> = {
  up: { label: "↑", code: "ArrowUp" },
  left: { label: "←", code: "ArrowLeft" },
  down: { label: "↓", code: "ArrowDown" },
  right: { label: "→", code: "ArrowRight" },
};

const TOTAL_KEYS =
  ROWS.reduce((sum, row) => sum + row.length, 0) + Object.keys(ARROW_KEYS).length;

function KeyCell({
  keyDef,
  pressed,
  confirmed,
}: {
  keyDef: KeyDef;
  pressed: boolean;
  confirmed: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      style={{ flex: `${keyDef.w ?? 1} 1 0%` }}
      className={`flex h-9 min-w-[26px] items-center justify-center rounded-md border text-[11px] font-medium transition-colors sm:h-10 sm:text-xs ${
        confirmed
          ? "border-accent bg-accent/15 text-accent"
          : "border-border bg-surface text-muted"
      } ${pressed ? "border-primary ring-2 ring-primary/50" : ""}`}
    >
      {keyDef.label}
    </div>
  );
}

/** Keyboard Tester: highlights each physical key on-screen as it's pressed. No permission needed. */
export function KeyboardTester() {
  const [pressed, setPressed] = useState<Set<string>>(new Set());
  const [confirmed, setConfirmed] = useState<Set<string>>(new Set());
  const [lastKey, setLastKey] = useState<{ key: string; code: string } | null>(null);
  const [modifiers, setModifiers] = useState({ shift: false, ctrl: false, alt: false, meta: false });

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      setPressed((prev) => new Set(prev).add(e.code));
      setConfirmed((prev) => (prev.has(e.code) ? prev : new Set(prev).add(e.code)));
      setLastKey({ key: e.key, code: e.code });
      setModifiers({ shift: e.shiftKey, ctrl: e.ctrlKey, alt: e.altKey, meta: e.metaKey });
    }
    function handleKeyUp(e: KeyboardEvent) {
      setPressed((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
      setModifiers({ shift: e.shiftKey, ctrl: e.ctrlKey, alt: e.altKey, meta: e.metaKey });
    }
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const reset = useCallback(() => {
    setPressed(new Set());
    setConfirmed(new Set());
    setLastKey(null);
  }, []);

  const modifierChips = useMemo(
    () => [
      { label: "Shift", active: modifiers.shift },
      { label: "Ctrl", active: modifiers.ctrl },
      { label: "Alt", active: modifiers.alt },
      { label: "Win/Cmd", active: modifiers.meta },
    ],
    [modifiers],
  );

  return (
    <ToolShell>
      <p className="text-muted max-w-sm text-center text-xs">
        Press any key — nothing you type is recorded, stored, or sent anywhere.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2" aria-hidden="true">
        {modifierChips.map((chip) => (
          <span
            key={chip.label}
            className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
              chip.active ? "border-primary bg-primary/10 text-primary" : "border-border text-muted"
            }`}
          >
            {chip.label}
          </span>
        ))}
      </div>

      <div className="flex flex-col items-center gap-1 text-center" aria-live="polite">
        <p className="text-text text-sm font-medium">
          {lastKey ? `Last key: ${lastKey.key || lastKey.code} (${lastKey.code})` : "No key pressed yet"}
        </p>
        <p className="text-muted text-xs">
          {confirmed.size} of {TOTAL_KEYS} keys tested this session
        </p>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="mx-auto flex min-w-[620px] flex-col gap-1 p-1">
          {ROWS.map((row, i) => (
            <div key={i} className="flex gap-1">
              {row.map((keyDef) => (
                <KeyCell
                  key={keyDef.code}
                  keyDef={keyDef}
                  pressed={pressed.has(keyDef.code)}
                  confirmed={confirmed.has(keyDef.code)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid w-[120px] grid-cols-3 gap-1" aria-hidden="true">
        <span />
        <KeyCell
          keyDef={ARROW_KEYS.up}
          pressed={pressed.has(ARROW_KEYS.up.code)}
          confirmed={confirmed.has(ARROW_KEYS.up.code)}
        />
        <span />
        <KeyCell
          keyDef={ARROW_KEYS.left}
          pressed={pressed.has(ARROW_KEYS.left.code)}
          confirmed={confirmed.has(ARROW_KEYS.left.code)}
        />
        <KeyCell
          keyDef={ARROW_KEYS.down}
          pressed={pressed.has(ARROW_KEYS.down.code)}
          confirmed={confirmed.has(ARROW_KEYS.down.code)}
        />
        <KeyCell
          keyDef={ARROW_KEYS.right}
          pressed={pressed.has(ARROW_KEYS.right.code)}
          confirmed={confirmed.has(ARROW_KEYS.right.code)}
        />
      </div>

      <button
        type="button"
        onClick={reset}
        className="border-border text-text hover:border-primary hover:text-primary rounded-full border px-4 py-1.5 text-sm font-medium"
      >
        Reset
      </button>
    </ToolShell>
  );
}
