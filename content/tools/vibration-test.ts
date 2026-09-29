import type { ToolContent } from "@/content/tools/types";

const content: ToolContent = {
  slug: "vibration-test",
  path: "/vibration-test",
  name: "Vibration Test",
  shortName: "Vibration Test",
  engine: "vibration",
  priority: "P2",
  primaryKeyword: "vibration test",
  secondaryKeywords: ["phone vibration test", "test vibration motor", "vibrate test online"],
  metaTitle: "Vibration Test — Check Your Phone's Vibration Motor",
  metaDescription:
    "Free vibration test — try short, long, double and pattern vibrations to check your phone's vibration motor. Works on Android; not supported on iPhone.",
  answer:
    "A vibration test triggers your phone's vibration motor with different patterns — short, long, double, and more — so you can confirm it's working. This uses the standard Vibration API, which works on Android browsers like Chrome and Firefox but isn't supported on iPhone, since iOS doesn't expose vibration control to websites.",
  howToSteps: [
    "Open this page on the phone whose vibration motor you want to test — this only works on the device itself, not remotely.",
    'Tap any pattern button, like "Short pulse" or "Heartbeat," and hold the phone in your hand to feel it clearly.',
    "Try a few different patterns to check the motor responds consistently, not just once.",
    "If a pattern seems to cut off early or not trigger at all, tap it again — a busy browser tab can occasionally miss the very first request.",
    'Tap "Stop" to cancel a pattern immediately if you started a long one by mistake.',
    "Check that your phone's vibration setting is turned on, since some devices block vibration when it's explicitly disabled.",
    "If nothing happens at all on Android, see the troubleshooting table below before assuming the motor itself is broken.",
  ],
  howItWorks: [
    "This tool calls the browser's built-in Vibration API directly — a single line of code that hands your phone's operating system a pattern of vibrate and pause durations, in milliseconds. The browser and OS handle actually driving the vibration motor; this page just supplies the timing pattern.",
    'Patterns are just a list of numbers alternating vibrate-time and pause-time. A "double pulse" is really just [150, 100, 150] — vibrate 150ms, pause 100ms, vibrate 150ms again. More complex patterns, like the heartbeat or SOS-style pattern here, are built the same way, just with more steps.',
    "Support for this API varies by platform. Most Android browsers support it. iPhone and iPad Safari do not — Apple has never exposed vibration control to web pages on iOS, so this test correctly shows as unsupported there rather than pretending to work.",
  ],
  tips: [
    {
      title: "iPhone",
      body: "This won't work at all on iPhone or iPad — iOS Safari doesn't support the Vibration API for websites, and no setting or workaround changes that. This is an iOS platform limitation, not a bug in this tool.",
    },
    {
      title: "Android",
      body: "Most Android phones support this directly in Chrome and Firefox — if a pattern doesn't trigger, check that vibration isn't disabled somewhere in your phone's accessibility or sound settings.",
    },
    {
      title: "Windows",
      body: "Vibration doesn't apply to a Windows laptop or desktop, since there's no vibration motor to test — this tool is meant for phones and some tablets.",
    },
    {
      title: "Mac",
      body: "The same applies to a Mac — there's no vibration hardware to test on a laptop or desktop.",
    },
  ],
  troubleshooting: [
    {
      problem: "Nothing happens when I tap a pattern, on an Android phone",
      cause: "Some browsers require the tap to be a direct, immediate user action — an automated or delayed trigger can be silently blocked.",
      fix: "Tap the button directly rather than through any other interaction, and try a different pattern to confirm.",
    },
    {
      problem: "The vibration feels weaker than I expected",
      cause: "Vibration motor strength varies a lot by phone model, and some devices apply their own intensity scaling that a website can't control.",
      fix: "This is a hardware and OS characteristic, not something this tool's patterns can override.",
    },
    {
      problem: "A pattern stops earlier than its total length",
      cause: "Locking the screen, switching apps, or the tab losing focus can interrupt an in-progress vibration on some browsers.",
      fix: "Keep the tab active and the screen on while testing a longer pattern.",
    },
    {
      problem: "It worked once, then stopped responding",
      cause: "Rapidly tapping multiple patterns back-to-back can occasionally confuse the timing on some devices.",
      fix: 'Tap "Stop" first, wait a second, then try the next pattern.',
    },
  ],
  safetyNote:
    "This tool only triggers your device's built-in vibration motor for a short pattern at a time — it can't damage the motor or your phone, and nothing is recorded or sent anywhere. It has no effect at all on devices without a vibration motor or without support for the Vibration API, most notably iPhone and iPad.",
  faqs: [
    {
      q: "Why doesn't this work on my iPhone?",
      a: "iOS Safari doesn't support the Vibration API for websites at all — this is an Apple platform decision, not a bug or missing feature in this tool. There's no workaround on iOS.",
    },
    {
      q: "Can this test tell me if my vibration motor is damaged?",
      a: "It can help you notice if vibration is weak, inconsistent, or completely absent compared to what you'd expect, but it can't run a technical diagnostic on the motor itself the way a repair shop's equipment could.",
    },
    {
      q: "Does this work on tablets?",
      a: "It works on any Android tablet with a vibration motor and a supporting browser, the same as a phone. Tablets without a vibration motor, or iPads, won't respond.",
    },
    {
      q: "Why do vibration patterns feel different on different phones?",
      a: "Motor hardware, its mounting inside the phone, and how the OS scales intensity all vary by device — the same pattern can feel noticeably different on two different phones.",
    },
    {
      q: "Is there a maximum vibration duration?",
      a: "The patterns on this page are all a few seconds at most; browsers can also impose their own maximum duration on very long vibration requests, which this tool doesn't need to approach.",
    },
    {
      q: "Can websites vibrate my phone without me tapping anything?",
      a: "No — browsers require vibration to be triggered by a direct user action, like a tap, specifically to prevent websites from vibrating your phone on their own.",
    },
    {
      q: "Does silent mode or Do Not Disturb block this?",
      a: "Generally no, since JS-triggered vibration isn't tied to notification sound settings the same way a call or message alert is — but some phones do have their own dedicated vibration toggle that can override this.",
    },
  ],
  related: ["keyboard-tester", "touch-screen-test", "cps-test", "dead-pixel-test"],
};

export default content;
