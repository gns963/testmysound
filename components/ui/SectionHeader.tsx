// Small-label + heading + description pattern used across homepage sections
// (Stripe/Linear-style section intros).
export function SectionHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="text-center">
      <p className="text-primary text-xs font-bold tracking-[0.15em] uppercase">
        {label}
      </p>
      <h2 className="text-h2 text-text mt-2 font-bold tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-body text-muted mt-2">{description}</p>
      )}
    </div>
  );
}
