export function StepList({ title, steps }: { title: string; steps: string[] }) {
  return (
    <section className="w-full">
      <h2 className="text-h3 text-text font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {steps.map((step, index) => (
          <div
            key={step}
            className="border-border bg-surface shadow-card hover:shadow-card-hover flex gap-4 rounded-2xl border p-4 transition-shadow"
          >
            <span
              aria-hidden="true"
              className="shrink-0 bg-clip-text text-2xl font-extrabold text-transparent tabular-nums"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--primary), var(--primary-strong))",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-muted pt-0.5 text-sm leading-relaxed">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
