export type ThemeMode = "light" | "dark" | "system";

export interface ThemeColors {
  background: string;
  surface: string;
  overlay: string;
  surfaceTransparent: string;
  card: string;
  cardDark: string;
  textPrimary: string;
  textSecondary: string;
  textOnAccent: string;
  textOnSurface: string;
  border: string;
  inputBackground: string;
  inputText: string;
  placeholder: string;
  accent: string;
  accentPressed: string;
  accentSecondary: string;
  icon: string;
  iconOnSurface: string;
  link: string;
  pillBackground: string;
  pillBorder: string;
  bottomBar: string;
  tabIcon: string;
  eventCardBg: string;
  thumbPlaceholder: string;
  statusBar: "light" | "dark";
}

export interface GradientStop {
  offset: string;
  color: string;
  opacity: string;
}

export interface Theme {
  dark: boolean;
  colors: ThemeColors;
  gradients: {
    spinner: GradientStop[];
  };
  fonts: {
    sizes: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      title: number;
      greeting: number;
    };
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
}
