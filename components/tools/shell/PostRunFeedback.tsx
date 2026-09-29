import type { ReactNode } from "react";

// "Did it help?" Yes/No + "Run again" shown after a program-based tool
// finishes (blueprint §7.2/§8). Shared by every timed tool so the interaction
// stays consistent.
export function PostRunFeedback({
  feedbackGiven,
  onFeedback,
  onRunAgain,
  extraLink,
}: {
  feedbackGiven: boolean;
  onFeedback: (helped: boolean) => void;
  onRunAgain: () => void;
  extraLink?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      {!feedbackGiven ? (
        <>
          <p className="text-text text-sm font-medium">Did it help?</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onFeedback(true)}
              className="border-border text-text hover:border-primary hover:text-primary rounded-full border px-4 py-1.5 text-sm font-medium"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => onFeedback(false)}
              className="border-border text-text hover:border-primary hover:text-primary rounded-full border px-4 py-1.5 text-sm font-medium"
            >
              No
            </button>
          </div>
        </>
      ) : (
        <p className="text-muted text-sm">Thanks for the feedback.</p>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
        <button
          type="button"
          onClick={onRunAgain}
          className="bg-primary hover:bg-primary-strong rounded-full px-4 py-1.5 font-medium text-white"
        >
          Run again
        </button>
        {extraLink}
      </div>
    </div>
  );
}
