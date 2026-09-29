// Shared by blog section headings and their table-of-contents anchors so the
// two always agree on the same #id.
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
