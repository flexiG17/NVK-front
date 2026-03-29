import { makeStyles, useTheme } from "@/lib/theme";
import type { ThemeMode } from "@/shared/config/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

const options: { key: ThemeMode; label: string; icon: string }[] = [
  { key: "light", label: "Светлая", icon: "sunny-outline" },
  { key: "dark", label: "Тёмная", icon: "moon-outline" },
  { key: "system", label: "Системная", icon: "phone-portrait-outline" },
];

export function ThemeSwitcher() {
  const { mode, setMode, theme } = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {options.map((o) => {
        const active = mode === o.key;
        return (
          <Pressable
            key={o.key}
            style={[styles.row, active && styles.rowActive]}
            onPress={() => setMode(o.key)}
          >
            <Ionicons
              name={o.icon as any}
              size={22}
              color={active ? theme.colors.accent : theme.colors.textSecondary}
            />
            <Text style={[styles.text, active && styles.textActive]}>
              {o.label}
            </Text>
            {active && (
              <Ionicons
                name="checkmark"
                size={22}
                color={theme.colors.accent}
              />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  container: {
    gap: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: t.borderRadius.md,
    backgroundColor: t.colors.surface,
    gap: 12,
  },
  rowActive: {
    borderWidth: 2,
    borderColor: t.colors.accent,
  },
  text: {
    flex: 1,
    color: t.colors.textSecondary,
    fontSize: t.fonts.sizes.md,
  },
  textActive: {
    color: t.colors.textPrimary,
    fontWeight: "600",
  },
}));
