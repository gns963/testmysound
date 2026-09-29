import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "speaker-dust-remover",
  path: "/speaker-dust-remover",
  name: "Speaker Dust Remover",
  shortName: "Dust Remover",
  primaryKeyword: "speaker dust remover",
  secondaryKeywords: [
    "clean dust from phone speaker",
    "pocket lint phone speaker",
  ],
  metaTitle: "Speaker Dust Remover — Clear Dust From Your Phone Speaker",
  metaDescription:
    "Free dust remover tool that uses a sound sweep to shake dust out of your phone speaker grille. No app needed.",
  answer:
    "The Speaker Dust Remover plays a repeating 200-1000Hz frequency sweep through your speaker to vibrate trapped dust, pocket lint, or grit loose from the grille. It's aimed at dry debris rather than water — for a wet speaker, use the Water Eject tool instead.",
  howToSteps: [
    "Turn media volume to max and make sure Silent mode is off.",
    "Hold the phone with the speaker grille facing down over a trash can or sink, so loosened dust falls away from the phone.",
    "Tap Start — the tool sweeps repeatedly through a frequency range for about 60 seconds.",
    "Afterward, gently brush the grille with a soft, dry, clean toothbrush or the included checklist's recommended tools.",
    "If dust is still visible, repeat once more — avoid canned air directly into the grille at close range, as high pressure can push debris further in.",
  ],
  howItWorks: [
    "A repeating sweep across a range of frequencies (rather than one fixed tone) vibrates the speaker diaphragm at many different rates in quick succession. Different sizes and weights of debris respond better to different vibration frequencies, so sweeping through a range gives a broader chance of dislodging whatever's actually stuck.",
    "This works well for light, dry material like pocket lint or fine dust sitting on the grille. It won't do much for debris wedged deep inside the housing, and it's not designed for water — the pulsed low-frequency tone in the Water Eject tool suits that better.",
  ],
  tips: [
    {
      title: "Best held facing down",
      body: "Gravity helps once debris is loosened — hold the grille facing downward so dust actually falls out rather than settling back in.",
    },
    {
      title: "Follow up with a soft brush",
      body: "A soft-bristled brush (a clean, dry toothbrush works) after the sweep clears out anything that loosened but didn't fully fall free.",
    },
    {
      title: "Avoid compressed air at close range",
      body: "High-pressure air blasted directly into a small grille opening can push debris deeper rather than out — use short bursts from a distance if you use it at all.",
    },
  ],
  troubleshooting: [
    {
      problem: "Visible lint or debris won't shift after several runs",
      cause: "Debris may be lodged too firmly for vibration alone to dislodge.",
      fix: "Try a soft dry brush at a shallow angle along the grille, working gently — never insert anything rigid or sharp.",
    },
    {
      problem: "Sound got worse, not better, after cleaning",
      cause:
        "Could be debris pushed deeper by aggressive brushing or compressed air.",
      fix: "Stop trying to physically clean it further and let a repair shop take a look if the sweep tool doesn't help either.",
    },
    {
      problem: "Speaker crackles at high volume even when it looks clean",
      cause: "Visible cleanliness doesn't rule out a damaged diaphragm.",
      fix: "This points to a hardware issue rather than dust — a repair check is the next step.",
    },
  ],
  safetyNote:
    "This tool is for dry debris. If your speaker is wet, use the Water Eject tool instead — running a dust sweep won't help water, and vice versa. As always, stop if you hear distortion getting worse.",
  faqs: [
    {
      q: "How is this different from the Water Eject tool?",
      a: "Dust Remover sweeps through a frequency range aimed at dislodging dry debris like lint; Water Eject uses a pulsed low tone aimed at moving water. Use whichever matches what's actually in your speaker.",
    },
    {
      q: "Is it safe to use canned/compressed air too?",
      a: "Short bursts from a short distance are generally fine, but avoid pressing the nozzle directly against the grille — that can force debris deeper instead of out.",
    },
    {
      q: "Can this remove sand?",
      a: "It can help with fine, loose sand sitting near the grille surface, the same way it helps with lint — heavier or deeply packed sand may need gentle brushing too.",
    },
    {
      q: "How often should I run this?",
      a: "Only when you actually notice muffled sound or visible debris — there's no benefit to running it preventively on a clean speaker.",
    },
  ],
  related: [
    "water-eject",
    "deep-speaker-cleaner",
    "speaker-test",
    "left-right-speaker-test",
  ],
};

export default content;
