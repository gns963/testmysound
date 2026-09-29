// Inline, blocking script (injected via <script dangerouslySetInnerHTML> in layout.tsx)
// so the correct theme applies before first paint — avoids a light/dark flash.
// Kept as a plain function stringified to source, not JSX, so it can run pre-hydration.
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    }
  } catch (e) {}
})();
`;
