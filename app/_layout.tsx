import { useTheme } from "@/lib/theme";
import { checkAuth } from "@/shared/lib/checkAuth";
import { router, SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ThemeProvider } from "./providers";
import { useFonts } from "expo-font";
import { I18nextProvider } from "react-i18next";
import i18n from "@/shared/lib/i18n";

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
  const [loaded] = useFonts({
    "Montserrat-Regular": require("../src/assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("../src/assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("../src/assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("../src/assets/fonts/Montserrat-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <InnerLayout />
      </ThemeProvider>
    </I18nextProvider>
    
  );
}
