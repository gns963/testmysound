// Answer-first block (blueprint §12 tactic 1): a 40-60 word direct answer,
// self-contained enough to be quoted alone by an AI engine.
export function AnswerBox({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div className="border-border bg-surface shadow-card flex w-full gap-4 rounded-2xl border p-5 sm:p-6">
      <span className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className="h-5 w-5"
        >
          <circle
            cx="10"
            cy="10"
            r="7.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M10 9v4.5M10 6.7v.1"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <div>
        <p className="text-text text-sm font-bold">{question}</p>
        <p className="text-muted mt-1.5 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
