// Shared visual for the brand mark rendered as a static image (favicon,
// apple touch icon) via next/og's ImageResponse — kept in one place so the
// generated icons and the inline LogoMark.tsx SVG stay visually identical.
// Static image generation can't read CSS custom properties, so the gradient
// colors are the light-theme --primary/--primary-strong values, hardcoded.
export function brandIconElement(size: number) {
  const radius = size * 0.28;
  const barWidth = size * 0.11;
  const gap = size * 0.055;

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius,
        background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", gap, height: "50%" }}>
        <div style={{ width: barWidth, height: "55%", background: "#FFFFFF", borderRadius: barWidth / 2, opacity: 0.95 }} />
        <div style={{ width: barWidth, height: "100%", background: "#FFFFFF", borderRadius: barWidth / 2 }} />
        <div style={{ width: barWidth, height: "72%", background: "#FFFFFF", borderRadius: barWidth / 2, opacity: 0.95 }} />
      </div>
    </div>
  );
}
