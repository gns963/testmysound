"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ToolShell } from "@/components/tools/shell/ToolShell";
import { ModeTabs } from "@/components/tools/shell/ModeTabs";
import {
  NOISE_STANDARDS,
  EVERYDAY_SOUND_EXAMPLES,
  getNoiseStandard,
  computeAllowedHours,
  formatDuration,
  type NoiseStandardId,
} from "@/lib/safeVolume";

/** Safe Volume Calculator: NIOSH/OSHA/WHO exchange-rate math, not a medical device. */
export function SafeVolumeCalculator() {
  const [standardId, setStandardId] = useState<NoiseStandardId>("niosh");
  const [db, setDb] = useState(85);

  const standard = getNoiseStandard(standardId);
  const allowedHours = useMemo(() => computeAllowedHours(standard, db), [standard, db]);

  return (
    <ToolShell
      modes={
        <ModeTabs
          modes={NOISE_STANDARDS.map((s) => ({ id: s.id, label: s.label }))}
          active={standardId}
          onChange={(id) => setStandardId(id as NoiseStandardId)}
        />
      }
    >
      <div className="border-warn bg-warn-bg w-full rounded-xl border-l-4 p-3 text-xs text-text">
        <strong>Not medical advice.</strong> This calculator applies published occupational and public-health
        exposure guidance to a single number you enter — it can&apos;t account for your individual hearing, existing
        hearing loss, or exposure outside this session. See a doctor or audiologist for concerns about your hearing.
      </div>

      <div className="flex w-full flex-col items-center gap-2">
        <p className="text-text text-4xl font-extrabold tabular-nums">{db} dB</p>
        <input
          type="range"
          min={60}
          max={120}
          step={1}
          value={db}
          onChange={(e) => setDb(Number(e.target.value))}
          className="accent-primary w-full max-w-sm"
          aria-label="Sound level in decibels"
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {EVERYDAY_SOUND_EXAMPLES.map((example) => (
          <button
            key={example.label}
            type="button"
            onClick={() => setDb(example.db)}
            className="border-border text-muted hover:border-primary hover:text-primary rounded-full border px-2.5 py-1 text-xs font-medium"
          >
            {example.label} ({example.rangeLabel})
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-1 text-center" aria-live="polite">
        <p className="text-muted text-sm">
          Under <strong>{standard.label}</strong> guidance, the recommended maximum exposure at {db} dB is:
        </p>
        <p className="text-primary text-3xl font-extrabold">{formatDuration(allowedHours)}</p>
        <p className="text-muted text-xs">
          {standard.label} reference: {standard.referenceDb} dB {standard.periodLabel}, {standard.exchangeRateDb} dB
          exchange rate
        </p>
      </div>

      <p className="text-muted max-w-sm text-center text-xs">
        Not sure what level you&apos;re actually exposed to?{" "}
        <Link href="/db-meter" className="text-primary hover:underline">
          Check with the Sound Level Meter
        </Link>{" "}
        (an approximate, uncalibrated mic reading) and enter that number above.
      </p>
    </ToolShell>
  );
}
