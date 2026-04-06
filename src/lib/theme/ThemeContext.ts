import type { Theme, ThemeMode } from "@/shared/config/theme";
import { lightTheme } from "@/shared/config/theme";
import { createContext } from "react";

export interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  mode: "system",
  setMode: () => {},
  toggleTheme: () => {},
});
