import type { ToolContent } from "@/content/tools/types";
import waterEject from "@/content/tools/water-eject";
import deepSpeakerCleaner from "@/content/tools/deep-speaker-cleaner";
import earpieceSpeakerCleaner from "@/content/tools/earpiece-speaker-cleaner";
import speakerDustRemover from "@/content/tools/speaker-dust-remover";
import leftRightSpeakerTest from "@/content/tools/left-right-speaker-test";
import speakerTest from "@/content/tools/speaker-test";
import micTest from "@/content/tools/mic-test";
import toneGenerator from "@/content/tools/tone-generator";
import bassTest from "@/content/tools/bass-test";
import headphoneTest from "@/content/tools/headphone-test";
import dbMeter from "@/content/tools/db-meter";
import hearingTest from "@/content/tools/hearing-test";
import noiseGenerator from "@/content/tools/noise-generator";
import frequencySweep from "@/content/tools/frequency-sweep";
import webcamTest from "@/content/tools/webcam-test";
import keyboardTester from "@/content/tools/keyboard-tester";
import deadPixelTest from "@/content/tools/dead-pixel-test";
import touchScreenTest from "@/content/tools/touch-screen-test";
import tuner from "@/content/tools/tuner";
import metronome from "@/content/tools/metronome";
import bpmCounter from "@/content/tools/bpm-counter";
import cpsTest from "@/content/tools/cps-test";
import typingSpeedTest from "@/content/tools/typing-speed-test";
import sleepFocusSounds from "@/content/tools/sleep-focus-sounds";
import safeVolumeCalculator from "@/content/tools/safe-volume-calculator";
import textToSpeech from "@/content/tools/text-to-speech";
import audioRecorder from "@/content/tools/audio-recorder";
import vibrationTest from "@/content/tools/vibration-test";
import speakerPolarityTest from "@/content/tools/speaker-polarity-test";
import surroundSoundTest from "@/content/tools/surround-sound-test";
import watchWaterEject from "@/content/tools/watch-water-eject";
import virtualPiano from "@/content/tools/virtual-piano";
import cameraMicTest from "@/content/tools/camera-mic-test";

// Registry (blueprint §4.5), aggregated from content/tools/*.ts. This is what
// ToolContentBody, RelatedTools and the tool pages' metadata all read from.
export const tools: ToolContent[] = [
  waterEject,
  deepSpeakerCleaner,
  earpieceSpeakerCleaner,
  speakerDustRemover,
  leftRightSpeakerTest,
  speakerTest,
  micTest,
  toneGenerator,
  bassTest,
  headphoneTest,
  dbMeter,
  hearingTest,
  noiseGenerator,
  frequencySweep,
  webcamTest,
  keyboardTester,
  deadPixelTest,
  touchScreenTest,
  tuner,
  metronome,
  bpmCounter,
  cpsTest,
  typingSpeedTest,
  sleepFocusSounds,
  safeVolumeCalculator,
  textToSpeech,
  audioRecorder,
  vibrationTest,
  speakerPolarityTest,
  surroundSoundTest,
  watchWaterEject,
  virtualPiano,
  cameraMicTest,
];

const toolsBySlug = new Map(tools.map((tool) => [tool.slug, tool]));

export function getTool(slug: string): ToolContent | undefined {
  return toolsBySlug.get(slug);
}
