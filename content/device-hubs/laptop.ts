import type { DeviceHubContent } from "@/content/device-hubs/types";

const content: DeviceHubContent = {
  slug: "laptop",
  path: "/speaker-cleaner/laptop",
  name: "Laptop",
  kind: "device-type",
  metaTitle: "Laptop Speaker Cleaner — Remove Dust & Light Moisture",
  metaDescription:
    "Free speaker cleaner for laptops. Help clear dust and light moisture from your laptop speakers in about 60 seconds, no app needed.",
  intro:
    "Laptop speakers are larger and generally better protected than phone speakers, so this tool is most useful for dust — crumbs, lint, and general grime that builds up in the grille over time — rather than serious water exposure. If your laptop has had a real liquid spill, powering it off and drying it matters far more than running a speaker cleaner.",
  speakerLayoutNote:
    "Laptop speaker grilles are usually along the top edge near the hinge, the bottom near the front, or beside the keyboard, depending on the model. They're typically larger and more recessed than phone speaker grilles.",
  tips: [
    {
      title: "Spilled something? Power off first",
      body: "For an actual liquid spill on a laptop, turn it off (don't just sleep it) and let it dry before worrying about speaker sound — this tool doesn't replace that step.",
    },
    {
      title: "Dust Remover for crumbs and lint",
      body: "For the common case — muffled sound from everyday dust buildup — the Dust Remover mode is usually a better first try than the water-focused mode.",
    },
    {
      title: "Physical cleaning still helps",
      body: "A soft brush or a light vacuum with a brush attachment along the grille can complement the sound-based approach for stubborn dust.",
    },
  ],
  commonIssues: [
    "Muffled or scratchy sound from dust and lint buildup over time.",
    "Reduced volume after keyboard crumbs settle near the speaker grille.",
    "Distortion at high volume from an aging or damaged speaker, unrelated to dust.",
    "One side quieter than the other in a stereo laptop speaker setup.",
  ],
  whenToSeeService:
    "If a real liquid spill was involved, or sound doesn't improve after cleaning and drying, have the laptop looked at by the manufacturer or a repair shop — internal liquid damage on a laptop is a different, more serious problem than a phone getting briefly wet.",
  faqs: [
    {
      q: "Can I use this if I actually spilled liquid on my laptop?",
      a: "Power the laptop off first and let it dry fully — that matters far more than this tool. Once you're confident it's dry and safe to use, this tool can help with any remaining muffled sound from dust or light residue.",
    },
    {
      q: "Does this work on Windows laptops too, or just Mac?",
      a: "It works on any laptop with working speakers and a modern browser — Windows, macOS, Linux, or Chromebook.",
    },
    {
      q: "My laptop doesn't vibrate — why don't I see a Vibrate option?",
      a: "The Vibrate mode uses a mobile-only browser API most laptops don't support, so it's automatically hidden rather than shown as a broken option.",
    },
  ],
  toolAllowedModes: ["water", "dust"],
};

export default content;
