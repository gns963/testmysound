import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "surround-sound-test",
  path: "/surround-sound-test",
  name: "Surround Sound Test",
  shortName: "Surround Sound Test",
  engine: "surround",
  priority: "P2",
  primaryKeyword: "surround sound test",
  secondaryKeywords: ["5.1 speaker test", "7.1 speaker test", "test surround speakers online"],
  metaTitle: "Surround Sound Test — 5.1 / 7.1 Channel Check",
  metaDescription:
    "Free surround sound test — checks how many channels your browser actually reports, then plays a tone to each 5.1/7.1 speaker position you have.",
  answer:
    "A surround sound test plays a tone to one speaker channel at a time — front left, center, subwoofer, rear left/right, and more on 7.1. Most browsers and typical setups only expose 2 (stereo) channels to a webpage, even with real surround speakers connected, so this tool checks what's actually available before testing anything, honestly.",
  howToSteps: [
    'Tap "Check my setup" to see how many output channels your browser currently reports for your active audio device.',
    "Read the result honestly: most setups, even real 5.1/7.1 systems, will show only 2 channels available to a webpage — this is a common browser/OS limitation, not a fault with your speakers.",
    "If 6 or more channels are reported, tap each speaker position — Front Left, Center, Subwoofer, Rear Left, and so on — to send a tone to just that one.",
    "Walk around your room or listen carefully to confirm the tone comes from the speaker position you expect.",
    'Use "Test all in sequence" to cycle through every available channel automatically, one at a time, with a short pause between each.',
    "If a channel plays from the wrong physical speaker, that's a channel-mapping issue in your OS or receiver settings, not something this page can fix directly.",
    "If only 2 channels are ever reported, see the troubleshooting table and device tips below for how to get your OS actually routing more channels to your browser.",
  ],
  howItWorks: [
    "This tool first asks your browser how many discrete output channels the Web Audio API's destination reports as available — a real number your own browser provides, not something this tool assumes or guesses. On the vast majority of laptops, desktops, and even many home theater setups, that number comes back as 2, meaning the browser, and often the OS audio path underneath it, simply isn't set up to send more than stereo to whatever's currently playing.",
    "When more than 2 channels are reported, this tool builds a discrete multichannel audio graph and sends a tone to exactly one channel index at a time, following the common Front Left / Front Right / Center / Subwoofer / Rear Left / Rear Right ordering used by many multichannel systems, with Side Left/Right added for 7.1. Whether channel index 4 actually comes out of your physical rear-left speaker depends on your OS, audio driver, and receiver all agreeing on that same mapping — which isn't universally guaranteed, even when the channel count itself checks out.",
    "This test intentionally sends its multichannel signal straight to your audio output rather than through this site's usual shared safety-limiter bus, because that shared bus is only designed for 2 channels and would otherwise silently flatten a true surround signal back down to stereo. A separate, equivalent volume cap is applied directly in this test instead.",
  ],
  tips: [
    {
      title: "iPhone",
      body: "Phones and tablets essentially never expose more than 2 channels to a browser, since they don't have a native surround output path — this test is realistically for a desktop or laptop connected to real surround hardware.",
    },
    {
      title: "Android",
      body: "Same as iPhone — this isn't a meaningful test on a phone or tablet's own speakers or a typical Bluetooth connection, which are stereo at best.",
    },
    {
      title: "Windows",
      body: "In Windows Sound settings, open your speaker's properties and confirm it's configured for 5.1 or 7.1, not stereo, and that the connection is HDMI, optical, or a genuine multichannel analog output — a lot of onboard laptop audio and many USB/Bluetooth paths simply can't carry more than 2 channels no matter what's set.",
    },
    {
      title: "Mac",
      body: "macOS's Audio MIDI Setup app lets you check and configure the channel format for a connected audio device — many built-in Mac outputs are stereo-only by hardware design, so this matters most when using an external multichannel interface or HDMI to an AV receiver.",
    },
  ],
  troubleshooting: [
    {
      problem: "It only ever reports 2 channels, even though I have a real 5.1 system",
      cause: "The most common cause by far — your OS's default audio output path to the browser is stereo, regardless of what's physically connected downstream.",
      fix: "Check your OS sound settings for the connected device's channel configuration (Windows Sound properties, macOS Audio MIDI Setup), and make sure you're using HDMI, optical, or a genuine multichannel connection, not a basic stereo analog or Bluetooth link.",
    },
    {
      problem: "6+ channels are reported, but sound comes from the wrong speaker",
      cause: "A channel-mapping mismatch between how this tool orders channels and how your OS, driver, or receiver assigns them.",
      fix: "This is a system-level mapping issue outside this tool's control — check your receiver or sound settings for a channel test or remapping option.",
    },
    {
      problem: "I only hear sound from 2 speakers no matter which channel I tap",
      cause: "The destination may have silently stayed in stereo despite reporting a higher channel count, which some browser/driver combinations do.",
      fix: "Try a different browser, and double check your OS's own multichannel test tool, since many have one built in, for comparison.",
    },
    {
      problem: "The subwoofer/LFE channel doesn't produce anything I can feel",
      cause: "The test tone's frequency may not be low enough to strongly excite a subwoofer, or the subwoofer's own crossover settings may filter it out.",
      fix: "This tool isn't tuned specifically for subwoofer testing — try the Bass Test tool at a very low frequency instead for that specific check.",
    },
  ],
  safetyNote:
    "This test can only report and use what your browser and operating system actually expose — it can't detect or fix incorrect wiring, receiver settings, or OS audio configuration, and a channel reporting as available doesn't guarantee it's mapped to the speaker you expect. Treat this as a quick, honest check of what your browser can access, not a full audio calibration.",
  faqs: [
    {
      q: "Why does this show only 2 channels even though I paid for a 5.1 system?",
      a: "Almost always because the OS's default audio path to your browser is stereo, not because your speakers or receiver are broken. This is extremely common and usually fixable in your operating system's sound settings, by choosing an HDMI, optical, or true multichannel output rather than a basic stereo connection.",
    },
    {
      q: "Can any browser reliably test real 7.1 sound?",
      a: "Support varies, and even when a browser reports 8 channels, correct real-world channel-to-speaker mapping still depends on your OS, driver, and receiver. This tool is honest about that limitation rather than promising a guaranteed result.",
    },
    {
      q: "Does this work with Bluetooth surround speakers or soundbars?",
      a: "Most Bluetooth audio connections only carry stereo, regardless of how many physical speakers a soundbar has internally — soundbars often create a virtual surround effect from a stereo, or even mono, signal rather than receiving discrete channels.",
    },
    {
      q: "What's the difference between 5.1 and 7.1 here?",
      a: "5.1 uses 6 channels: front left/right, center, subwoofer, rear left/right. 7.1 adds two side channels for 8 total. This tool checks and unlocks whichever tier your reported channel count actually supports.",
    },
    {
      q: "Why use a browser tool instead of my receiver's own built-in speaker test?",
      a: "Your receiver's own test is usually more reliable, since it doesn't depend on what a browser can access — this tool exists for a quick check without leaving the browser, with the same honesty about its own limits either way.",
    },
    {
      q: "Does channel order matter if I only care that all speakers work?",
      a: "Not much — if every enabled channel produces sound from some speaker, your wiring is probably functional even if this specific tool's channel-to-speaker labels don't match your exact layout.",
    },
    {
      q: "Is there a way to force my browser to use more than 2 channels?",
      a: "Not from this page — that's controlled by your operating system's audio settings and the connection type to your speakers, not by anything a website can override.",
    },
  ],
  related: ["speaker-polarity-test", "left-right-speaker-test", "bass-test", "speaker-test"],
};

export default content;
