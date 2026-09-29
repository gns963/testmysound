"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ToolShell } from "@/components/tools/shell/ToolShell";

type TrackedPointer = { x: number; y: number; color: string; type: string; pressure: number };
type PointerListItem = { id: number; type: string; pressure: number; color: string };

const PALETTE = [
  "#0EA5E9",
  "#F59E0B",
  "#10B981",
  "#E11D48",
  "#8B5CF6",
  "#F472B6",
  "#22D3EE",
  "#FACC15",
  "#34D399",
  "#FB7185",
];

/** Touch Screen Test: draws every active pointer on a canvas, tracks max simultaneous touches. */
export function TouchScreenTest() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointersRef = useRef<Map<number, TrackedPointer>>(new Map());

  const [pointerCount, setPointerCount] = useState(0);
  const [maxSeen, setMaxSeen] = useState(0);
  const [pointerList, setPointerList] = useState<PointerListItem[]>([]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    pointersRef.current.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 28, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}55`;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = p.color;
      ctx.stroke();
    });
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext("2d");
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }, [draw]);

  useEffect(() => {
    resize();
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => observer.disconnect();
  }, [resize]);

  const syncState = useCallback(() => {
    const size = pointersRef.current.size;
    setPointerCount(size);
    setMaxSeen((prev) => Math.max(prev, size));
    setPointerList(
      Array.from(pointersRef.current.entries()).map(([id, p]) => ({
        id,
        type: p.type,
        pressure: p.pressure,
        color: p.color,
      })),
    );
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      e.currentTarget.setPointerCapture?.(e.pointerId);
      const rect = e.currentTarget.getBoundingClientRect();
      const color = PALETTE[pointersRef.current.size % PALETTE.length];
      pointersRef.current.set(e.pointerId, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        color,
        type: e.pointerType,
        pressure: e.pressure,
      });
      syncState();
      draw();
    },
    [syncState, draw],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      const existing = pointersRef.current.get(e.pointerId);
      if (!existing) return;
      const rect = e.currentTarget.getBoundingClientRect();
      pointersRef.current.set(e.pointerId, {
        ...existing,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        pressure: e.pressure,
      });
      draw();
    },
    [draw],
  );

  const handlePointerEnd = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      pointersRef.current.delete(e.pointerId);
      syncState();
      draw();
    },
    [syncState, draw],
  );

  const clear = useCallback(() => {
    pointersRef.current.clear();
    setMaxSeen(0);
    syncState();
    draw();
  }, [syncState, draw]);

  return (
    <ToolShell>
      <p className="text-muted max-w-sm text-center text-xs">
        Touch anywhere below with one or more fingers — nothing is recorded, everything stays on screen.
      </p>

      <div ref={containerRef} className="relative h-64 w-full overflow-hidden rounded-lg border border-border bg-bg sm:h-80">
        <canvas
          ref={canvasRef}
          className="touch-none absolute inset-0 h-full w-full"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onPointerLeave={handlePointerEnd}
        />
        {pointerCount === 0 && (
          <p className="text-muted pointer-events-none absolute inset-0 flex items-center justify-center text-sm">
            Touch here
          </p>
        )}
      </div>

      <div className="flex flex-col items-center gap-1 text-center" aria-live="polite">
        <p className="text-text text-sm font-medium">
          {pointerCount} touch point{pointerCount === 1 ? "" : "s"} active
        </p>
        <p className="text-muted text-xs">Max seen this session: {maxSeen}</p>
      </div>

      {pointerList.length > 0 && (
        <ul className="flex flex-wrap items-center justify-center gap-2" aria-hidden="true">
          {pointerList.map((p) => (
            <li
              key={p.id}
              className="rounded-full border px-2.5 py-1 text-xs font-medium"
              style={{ borderColor: p.color, color: p.color }}
            >
              {p.type} · {Math.round(p.pressure * 100)}%
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={clear}
        className="border-border text-text hover:border-primary hover:text-primary rounded-full border px-4 py-1.5 text-sm font-medium"
      >
        Clear
      </button>

      <div className="border-border bg-warn-bg w-full max-w-sm rounded-xl border p-3 text-center">
        <p className="text-text text-xs font-semibold">Checking for ghost touches?</p>
        <p className="text-muted mt-1 text-xs">
          Set the device down without touching it and watch for 30-60 seconds — any dot that appears on its own is a
          ghost touch.
        </p>
      </div>
    </ToolShell>
  );
}
