import { useTheme } from "@/lib/theme";
import { checkAuth } from "@/shared/lib/checkAuth";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ThemeProvider } from "./providers";

function InnerLayout() {
  const { theme } = useTheme();

  useEffect(() => {
    const verifyAuth = async () => {
      const result = await checkAuth();
      if (result) {
        router.replace("/(tabs)");
      }
    };
    verifyAuth();
  }, []);

  return (
    <>
      <StatusBar style={theme.colors.statusBar} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="leaderboard"
          options={{ headerShown: true, title: "Лидерборд" }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <InnerLayout />
    </ThemeProvider>
  );
}
