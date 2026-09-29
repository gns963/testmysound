"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { tools } from "@/data/tools";
import { deviceHubs } from "@/data/deviceHubs";
import { TOOL_ICON_BY_SLUG } from "@/lib/toolIcons";
import { DEVICE_ICON_BY_SLUG } from "@/lib/deviceIcons";
import { Modal } from "@/components/ui/Modal";

type SearchResult = { name: string; description: string; icon: string; href: string; kind: "Tool" | "Device" };

// Searches the site's real tool + device registries only — no blog exists yet,
// so it isn't included rather than returning fake results.
const ALL_RESULTS: SearchResult[] = [
  ...tools.map((tool) => ({
    name: tool.shortName,
    description: tool.metaDescription,
    icon: TOOL_ICON_BY_SLUG[tool.slug] ?? "🎚️",
    href: tool.path,
    kind: "Tool" as const,
  })),
  ...deviceHubs.map((hub) => ({
    name: `${hub.name} Speaker Cleaner`,
    description: hub.metaDescription,
    icon: DEVICE_ICON_BY_SLUG[hub.slug] ?? "📶",
    href: hub.path,
    kind: "Device" as const,
  })),
];

// Controlled by the parent (Header) so both the header's search trigger and
// MobileNav's search bar can open the same palette instance.
export function SearchPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_RESULTS.slice(0, 8);
    return ALL_RESULTS.filter(
      (r) => r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q),
    ).slice(0, 8);
  }, [query]);

  // Reset query/activeIndex whenever the palette opens — a one-time sync to
  // an external trigger (the modal opening), not state derived from props.
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    function handleShortcut(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    }
    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  function go(href: string) {
    onOpenChange(false);
    router.push(href);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      go(results[activeIndex].href);
    }
  }

  return (
    <Modal open={open} onClose={() => onOpenChange(false)} align="top">
      <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
        <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-4 w-4 shrink-0 text-muted">
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
          <path d="m14 14-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search tools and devices…"
          className="w-full bg-transparent text-sm text-text outline-none placeholder:text-muted"
        />
        <kbd className="shrink-0 rounded border border-border px-1.5 py-0.5 text-[10px] font-semibold text-muted">
          Esc
        </kbd>
      </div>

      <div className="max-h-80 overflow-y-auto p-2">
        {results.length === 0 ? (
          <p className="p-4 text-center text-sm text-muted">No results for &quot;{query}&quot;.</p>
        ) : (
          results.map((result, index) => (
            <button
              key={result.href}
              type="button"
              onClick={() => go(result.href)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                index === activeIndex ? "bg-primary/8" : ""
              }`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm">
                {result.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-text">{result.name}</span>
                <span className="block truncate text-xs text-muted">{result.description}</span>
              </span>
              <span className="shrink-0 rounded-full bg-bg px-2 py-0.5 text-[10px] font-semibold text-muted">
                {result.kind}
              </span>
            </button>
          ))
        )}
      </div>
    </Modal>
  );
}
