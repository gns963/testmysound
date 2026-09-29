export type ChecklistItem = {
  icon: string;
  label: string;
};

// 3-item hint row shown before/around Start (blueprint §7.2: "🔊 Volume max ·
// 🔕 Silent off · ⬇️ Speaker facing down"). Informational, not interactive checkboxes.
export function ChecklistPreflight({ items }: { items: ChecklistItem[] }) {
  return (
    <ul className="text-muted flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-sm">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-1.5">
          <span aria-hidden="true">{item.icon}</span>
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
