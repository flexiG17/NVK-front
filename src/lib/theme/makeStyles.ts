import type { Theme } from "@/shared/config/theme";
import { useMemo } from "react";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { useTheme } from "./useTheme";

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export function makeStyles<T extends NamedStyles<T>>(
  factory: (theme: Theme) => T,
) {
  return function useStyles() {
    const { theme } = useTheme();
    return useMemo(() => StyleSheet.create(factory(theme)), [theme]);
  };
}
