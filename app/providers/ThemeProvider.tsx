import { ThemeContext } from "@/lib/theme";
import type { ThemeMode } from "@/shared/config/theme";
import { darkTheme, lightTheme } from "@/shared/config/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

const STORAGE_KEY = "@app_theme_mode";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((v) => {
      if (v === "light" || v === "dark" || v === "system") setModeState(v);
      setReady(true);
    });
  }, []);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    AsyncStorage.setItem(STORAGE_KEY, m);
  }, []);

  const toggleTheme = useCallback(() => {
    setMode(mode === "dark" ? "light" : "dark");
  }, [mode, setMode]);

  const isDark = mode === "system" ? systemScheme === "dark" : mode === "dark";
  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  const value = useMemo(
    () => ({ theme, mode, setMode, toggleTheme }),
    [theme, mode, setMode, toggleTheme],
  );

  if (!ready) return null;

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
