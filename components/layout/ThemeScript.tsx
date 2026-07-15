import { THEME } from "@/constants/theme";

/**
 * Blocking inline script that applies the persisted theme before first paint
 * (A11Y-7: no flash of incorrect theme). Kept tiny and dependency-free; it runs
 * ahead of hydration and mirrors the logic in `ThemeProvider`.
 */
export function ThemeScript() {
  const script = `(function(){try{var k=${JSON.stringify(
    THEME.storageKey,
  )};var s=localStorage.getItem(k);var t=(s==="light"||s==="dark"||s==="system")?s:${JSON.stringify(
    THEME.default,
  )};var d=t==="dark"||(t==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle(${JSON.stringify(
    THEME.darkClass,
  )},d);}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
