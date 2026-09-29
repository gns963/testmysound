import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "safe-volume-calculator",
  path: "/safe-volume-calculator",
  name: "Safe Volume Calculator",
  shortName: "Safe Volume Calculator",
  engine: "safeVolume",
  priority: "P1",
  primaryKeyword: "safe volume calculator",
  secondaryKeywords: ["safe listening time calculator", "noise exposure calculator", "how long can i listen at this volume"],
  metaTitle: "Safe Volume Calculator — NIOSH, OSHA & WHO Guidance",
  metaDescription:
    "Free safe listening time calculator using published NIOSH, OSHA and WHO noise-exposure guidance. Not medical advice — see the sources cited.",
  answer:
    "A safe volume calculator estimates how long you can be exposed to a sound level before it's considered a hearing-health risk, using published exchange-rate guidance from NIOSH, OSHA or WHO. Pick a standard and a decibel level to see its recommended maximum exposure time — general public-health guidance, not a personalized medical assessment.",
  howToSteps: [
    "Choose a guidance standard — NIOSH, OSHA, or WHO's personal-listening guidance — from the tabs above.",
    "Drag the slider to the sound level you want to check, in decibels (dB).",
    "Or tap one of the everyday-sound examples, like a rock concert or lawnmower, to jump straight to that range's typical level.",
    "Read the recommended maximum exposure time shown below the slider for your selected standard.",
    "If you don't know the actual sound level around you, check the Sound Level Meter tool first, then come back and enter that reading here.",
    "Compare how the same dB level plays out under different standards by switching tabs — NIOSH, OSHA and WHO use different reference points and exchange rates.",
    "Treat the result as general guidance, not a personal safety guarantee — see the disclaimer above the calculator.",
  ],
  howItWorks: [
    "Hearing-health organizations describe safe noise exposure using a \"reference\" sound level and duration, plus an \"exchange rate\" — how much less time is considered safe for each step up in loudness. NIOSH sets its reference at 85 dB for 8 hours, with a 3 dB exchange rate, meaning the allowed time is cut in half for every 3 dB increase. OSHA uses 90 dB for 8 hours with a 5 dB exchange rate. WHO's guidance for personal listening devices uses 80 dB for 40 hours a week, following the same 3 dB halving pattern as its own published reference points.",
    'This calculator applies that exact math to whatever level you select: it takes the difference between your chosen dB and the standard\'s reference dB, divides by the exchange rate to get a number of "halvings," and divides the reference duration by 2 raised to that number. The result is the same kind of number these organizations publish in their own guidance tables, just computed for any input level rather than a few fixed example points.',
    "These three standards don't agree with each other, and that's expected, not a bug — NIOSH, OSHA and WHO are different organizations with different mandates (occupational safety regulation vs. recommended limits vs. personal-device guidance) and picked their own reference points accordingly. Showing all three, clearly labeled, is more honest than picking one and presenting it as the single correct answer.",
  ],
  tips: [
    {
      title: "iPhone",
      body: "iPhone's Health app can log headphone audio levels over time using the phone's own sensors — check Settings → Sound & Haptics → Headphone Safety for a reading specific to what you're actually hearing, more precise than any general calculator.",
    },
    {
      title: "Android",
      body: "Some Android phones show a volume warning automatically past a certain level — that built-in warning is calibrated to your specific device and headphones, and is worth paying attention to alongside this general calculator.",
    },
    {
      title: "Windows",
      body: "Windows doesn't track personal listening exposure the way phone OSes increasingly do — for headphone use at a computer, comparing your own volume against the levels here is the more practical option.",
    },
    {
      title: "Mac",
      body: "The same applies on Mac — there's no built-in exposure tracking for desktop headphone listening, so comparing your volume setting to the reference levels here is the practical approach.",
    },
  ],
  troubleshooting: [
    {
      problem: "I don't know the actual dB level of what I'm listening to",
      cause: "Most people don't have a calibrated sound level meter handy.",
      fix: "Use the Sound Level Meter tool for a rough, uncalibrated estimate from your device's microphone, or use the everyday-sound example chips as a reference point.",
    },
    {
      problem: "The three standards give very different answers for the same dB",
      cause: "NIOSH, OSHA and WHO use different reference levels and exchange rates, by design, for different contexts (workplace regulation vs. personal listening).",
      fix: "This is expected — read the note on why the standards differ, and consider using the most conservative (safest) estimate if you're unsure which applies to you.",
    },
    {
      problem: "The result says \"more than 24 hours\" — does that mean it's totally safe?",
      cause: "At lower dB levels, the reference standards don't consider daily exposure a meaningful risk, so the calculation produces a very large number.",
      fix: "Read this as \"not flagged as a daily exposure concern by this standard,\" not as a guarantee of zero risk under all conditions.",
    },
    {
      problem: "My headphones show a different maximum volume warning than this tool",
      cause: "Device-level volume warnings are usually calibrated to that specific device and headphone combination, which this general calculator can't know.",
      fix: "Trust your device's own calibrated warning over this tool's general dB-based estimate when the two differ.",
    },
  ],
  safetyNote:
    "This tool is for general education only and is not medical advice, a diagnostic tool, or a substitute for professional audiological care — it applies published formulas to a number you provide, and can't measure your actual real-world exposure, individual susceptibility, or existing hearing health. If you have concerns about your hearing, or notice ringing, pain, or sudden hearing changes, see a doctor or audiologist rather than relying on this or any calculator.",
  faqs: [
    {
      q: "Is this calculator a substitute for a hearing test?",
      a: "No — it only applies exposure-time guidance to a decibel number you provide. A hearing test measures your actual hearing and needs to be done by a professional, not a calculator.",
    },
    {
      q: "Why do NIOSH, OSHA and WHO give different numbers?",
      a: "They're different organizations with different purposes — OSHA sets a legally enforceable workplace limit, NIOSH publishes a more conservative recommended limit, and WHO's guidance here is specifically about personal listening devices, not occupational noise. All three are legitimate, just answering slightly different questions.",
    },
    {
      q: "What does \"exchange rate\" mean?",
      a: "It's how much shorter the recommended safe exposure time gets for each step up in loudness. A 3 dB exchange rate (NIOSH, WHO) halves the safe time every 3 dB; a 5 dB exchange rate (OSHA) halves it every 5 dB.",
    },
    {
      q: "Can I trust my phone's volume percentage as a dB level?",
      a: "Not directly — the same volume percentage produces very different actual dB levels depending on your headphones or speakers. A dB reading, from a sound level meter or a device's built-in headphone safety feature, is more meaningful than a volume percentage alone.",
    },
    {
      q: "Does this account for how loud my specific headphones get at max volume?",
      a: "No — you need to supply the dB level yourself, from a meter reading or your device's own headphone safety feature. This calculator only does the exposure-time math once you have that number.",
    },
    {
      q: "Is short, occasional loud exposure as risky as sustained exposure?",
      a: "These standards are built around averaged, repeated daily or weekly exposure, not a single brief event — a short one-time loud sound isn't calculated the same way, though extremely loud impulses like an explosion carry their own separate risks these formulas don't cover.",
    },
    {
      q: "Where do the numbers in this calculator actually come from?",
      a: "Directly from NIOSH's and OSHA's published occupational noise exposure guidance and WHO's safe listening guidance for personal audio devices — see the Sources section on this page for the exact pages.",
    },
    {
      q: "Should I stop listening to music if this shows a short safe time?",
      a: "That's a personal decision based on general public-health guidance, not an individual medical instruction — consider lowering your volume, taking breaks, and talking to a doctor if you're concerned, rather than treating any single number as a strict rule.",
    },
  ],
  related: ["db-meter", "hearing-test", "noise-generator", "sleep-focus-sounds"],
  relatedBlogPosts: ["how-loud-is-too-loud-decibel-levels-explained"],
  sources: [
    { label: "NIOSH — Understand Noise Exposure (CDC)", href: "https://www.cdc.gov/niosh/noise/prevent/understand.html" },
    { label: "OSHA — Occupational Noise Exposure Overview", href: "https://www.osha.gov/noise" },
    {
      label: "WHO — Deafness and Hearing Loss: Safe Listening (Q&A)",
      href: "https://www.who.int/news-room/questions-and-answers/item/deafness-and-hearing-loss-safe-listening",
    },
    { label: "CDC — Listen Up! Protect Your Hearing (everyday sound levels)", href: "https://www.cdc.gov/nceh/hearing_loss/infographic/" },
  ],
};

export default content;
