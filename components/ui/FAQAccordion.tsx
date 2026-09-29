export type AccordionItem = { q: string; a: string };

// Design-system FAQ/disclosure accordion — plain <details>/<summary> (zero
// JS, fully accessible) with a plus-to-minus icon transition. FaqSection
// wraps this with the matching FAQPage JSON-LD for tool/device pages.
export function FAQAccordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="space-y-2.5">
      {items.map((item) => (
        <details
          key={item.q}
          className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-card open:shadow-card-hover"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 text-sm font-semibold text-text marker:content-none sm:p-5">
            {item.q}
            <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="absolute h-0.5 w-3 rounded-full bg-current" />
              <span className="absolute h-3 w-0.5 rounded-full bg-current transition-transform duration-300 group-open:scale-y-0" />
            </span>
          </summary>
          <p className="px-4 pb-4 text-sm leading-relaxed text-muted sm:px-5 sm:pb-5">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
