import { palette } from "./palette";

export const commonColorsDark = {
  background: palette.navy,
  surface: palette.dark800,
  overlay: "rgba(20, 40, 120, 0.35)",
  surfaceTransparent: "rgba(255,255,255,0.12)",
  textPrimary: palette.white,
  textSecondary: "rgba(255,255,255,0.7)",
  textOnAccent: palette.white,
  textOnSurface: palette.white,
  accent: "#5C5DB8",
  accentPressed: "#7A7BD0",
  accentSecondary: palette.navyDark,
  icon: palette.white,
  iconOnSurface: palette.white,
  link: "rgba(255,255,255,0.9)",
  statusBar: "light" as const,
};

export const commonColorsLight = {
  background: palette.light50,
  surface: palette.white,
  overlay: "rgba(240, 242, 248, 0.3)",
  surfaceTransparent: "rgba(59, 59, 136, 0.08)",
  textPrimary: palette.dark900,
  textSecondary: "rgba(0,0,0,0.6)",
  textOnAccent: palette.white,
  textOnSurface: palette.dark900,
  accent: "#3B3B88",
  accentPressed: "#5C5DB8",
  accentSecondary: palette.navyDark,
  icon: palette.dark700,
  iconOnSurface: palette.dark700,
  link: "#3B3B88",
  statusBar: "dark" as const,
};
