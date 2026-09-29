import type { DeviceHubContent } from "@/content/device-hubs/types";

const content: DeviceHubContent = {
  slug: "macbook",
  path: "/speaker-cleaner/macbook",
  name: "MacBook",
  kind: "brand",
  metaTitle: "MacBook Speaker Cleaner — Remove Dust & Light Moisture",
  metaDescription:
    "Free speaker cleaner for MacBook Air and MacBook Pro. Help clear dust and light moisture from your speakers in about 60 seconds, no app needed.",
  intro:
    "MacBook speakers sit under the keyboard grille (older models) or along the top edge near the hinge (newer Air and Pro models). This tool is most useful for everyday dust and light residue rather than serious liquid exposure — if you've had a real spill on your MacBook, powering it off and drying it matters far more than running a speaker cleaner.",
  speakerLayoutNote:
    "Newer MacBook Air and Pro models place stereo speakers along the top edge, either side of the keyboard. Older models routed sound through slots in the keyboard deck itself. Check Apple's support site for your specific model if you're unsure.",
  tips: [
    {
      title: "Spilled something? Power off first",
      body: "For an actual liquid spill, shut the MacBook down immediately (don't just close the lid) and let it dry — this tool doesn't replace that step.",
    },
    {
      title: "Dust Remover for everyday grime",
      body: "For typical muffled sound from dust or lint, the Dust Remover mode is usually the better first try.",
    },
    {
      title: "Keep the keyboard deck clean",
      body: "On models where speakers route through the keyboard, keeping the deck free of crumbs helps prevent muffling from happening again.",
    },
  ],
  commonIssues: [
    "Muffled or scratchy sound from everyday dust and lint buildup.",
    "Reduced volume after crumbs or debris settle near the speaker grille.",
    "Distortion at high volume unrelated to dust — can indicate an aging speaker.",
    "Uneven stereo balance between the left and right speakers.",
  ],
  whenToSeeService:
    "If a real liquid spill was involved, or sound doesn't improve after cleaning and thorough drying, contact Apple Support or an authorized service provider — internal liquid damage is a more serious issue than this tool addresses.",
  faqs: [
    {
      q: "Can I use this if I spilled liquid on my MacBook?",
      a: "Shut it down immediately and let it dry fully first — that matters far more than this tool. Once you're confident it's safe to use again, this tool can help with any residual muffled sound from dust.",
    },
    {
      q: "Does this work in Safari on macOS?",
      a: "Yes — it works in Safari, Chrome, or any modern browser on macOS.",
    },
    {
      q: "Is this affiliated with Apple?",
      a: "No — this is an independent tool, not affiliated with, sponsored by, or endorsed by Apple.",
    },
  ],
  toolAllowedModes: ["water", "dust"],
};

export default content;
