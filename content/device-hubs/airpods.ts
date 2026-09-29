import type { DeviceHubContent } from "@/content/device-hubs/types";

const content: DeviceHubContent = {
  slug: "airpods",
  path: "/speaker-cleaner/airpods",
  name: "AirPods / Earbuds",
  kind: "device-type",
  metaTitle: "AirPods & Earbuds Speaker Cleaner — Remove Water & Dust",
  metaDescription:
    "Free speaker cleaner for AirPods and other earbuds. Eject water or sweat from the driver in about 60 seconds, no app needed.",
  intro:
    "This tool can help with water or sweat in AirPods and other earbuds, but only if the earbuds are actually connected and selected as your device's audio output — the tone has to play through them, not your phone or laptop's own speaker, to do anything useful.",
  speakerLayoutNote:
    "Earbud drivers sit directly behind the mesh you see in the ear tip or nozzle. They're much smaller than phone speakers, so even a small amount of moisture can noticeably muffle sound.",
  tips: [
    {
      title: "Connect them first",
      body: "Pair your earbuds via Bluetooth and confirm your phone or computer's audio output is set to them before tapping Start — check your device's Bluetooth or sound settings.",
    },
    {
      title: "Sweat counts as moisture too",
      body: "Muffled sound after a workout is often sweat rather than a fault — the same water-focused mode can help here.",
    },
    {
      title: "Let them dry before charging",
      body: "If your earbuds or case got wet, let them air-dry before placing them back in the charging case.",
    },
  ],
  commonIssues: [
    "Muffled sound after a workout or exposure to rain.",
    "One earbud quieter than the other.",
    "Crackling or distortion pointing to driver damage rather than moisture.",
    "Reduced volume from wax or debris buildup on the mesh.",
  ],
  whenToSeeService:
    "If sound doesn't improve after a couple of cleaning attempts and thorough drying, or one earbud has stopped working entirely, check the manufacturer's warranty or support options — earbud drivers are generally not user-repairable.",
  faqs: [
    {
      q: "Why didn't the tool seem to do anything?",
      a: "The most common reason is that your earbuds weren't actually selected as the audio output — check your device's Bluetooth/sound settings and confirm audio is routing to them, not your phone or laptop speaker.",
    },
    {
      q: "Does this work for wired earbuds too?",
      a: "Yes — as long as they're plugged in and selected as the active audio output, the same tone-based approach applies.",
    },
    {
      q: "Can this damage my earbuds?",
      a: "The tool plays audio within a safe, capped volume range — the same as any other sound through your earbuds. Stop immediately if anything sounds distorted or uncomfortably loud.",
    },
  ],
  // Vibrate mode shakes the source phone/laptop, not the earbud itself — not
  // meaningful for cleaning an earbud driver, so it's excluded here.
  toolAllowedModes: ["water", "dust"],
};

export default content;
