"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { getEngine } from "@/lib/audio/engine";
import { SURROUND_CHANNELS } from "@/lib/audio/surroundChannels";

type SurroundController = ReturnType<ReturnType<typeof getEngine>["startSurroundChannelTest"]>;

const TONE_MS = 1200;
const SEQUENCE_GAP_MS = 300;

export function useSurroundTest() {
  const [checked, setChecked] = useState(false);
  const [maxChannels, setMaxChannels] = useState(2);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [sequencing, setSequencing] = useState(false);

  const controllerRef = useRef<SurroundController | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const sequenceCancelledRef = useRef(false);

  const check = useCallback(() => {
    const engine = getEngine();
    setMaxChannels(engine.getMaxChannelCount());
    setChecked(true);
  }, []);

  const stopChannel = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    controllerRef.current?.stop();
    controllerRef.current = null;
    setActiveIndex(null);
  }, []);

  const playChannel = useCallback(
    (index: number, totalChannels: number) => {
      stopChannel();
      const engine = getEngine();
      controllerRef.current = engine.startSurroundChannelTest({ channelIndex: index, totalChannels });
      setActiveIndex(index);
      timeoutRef.current = window.setTimeout(() => {
        controllerRef.current?.stop();
        controllerRef.current = null;
        setActiveIndex(null);
      }, TONE_MS);
    },
    [stopChannel],
  );

  const availableChannels = useMemo(() => SURROUND_CHANNELS.filter((c) => c.index < maxChannels), [maxChannels]);

  const playSequence = useCallback(async () => {
    sequenceCancelledRef.current = false;
    setSequencing(true);
    for (const channel of availableChannels) {
      if (sequenceCancelledRef.current) break;
      playChannel(channel.index, maxChannels);
      await new Promise((resolve) => window.setTimeout(resolve, TONE_MS + SEQUENCE_GAP_MS));
    }
    setSequencing(false);
  }, [availableChannels, maxChannels, playChannel]);

  const cancelSequence = useCallback(() => {
    sequenceCancelledRef.current = true;
    setSequencing(false);
    stopChannel();
  }, [stopChannel]);

  return {
    checked,
    maxChannels,
    activeIndex,
    sequencing,
    availableChannels,
    check,
    playChannel: (index: number) => playChannel(index, maxChannels),
    stopChannel,
    playSequence,
    cancelSequence,
  };
}
