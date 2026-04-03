// import { checkAuth } from "@/shared/lib/checkAuth";
import { Stack } from "expo-router";
import { useEffect } from "react";

// Suppress known warnings that are from react-native-web internals
if (typeof console !== "undefined") {
  const originalWarn = console.warn;
  console.warn = function (...args) {
    if (
      typeof args[0] === "string" &&
      args[0].includes("props.pointerEvents is deprecated")
    ) {
      return; // Suppress this warning
    }
    originalWarn.apply(console, args);
  };
}

export default function RootLayout() {
  //если пользователь уже авторизован, то перенаправляем его на экран с табами
  // useEffect(() => {
  //   const verifyAuth = async () => {
  //     const result = await checkAuth();
  //     if (result) {
  //       router.replace("/(tabs)");
  //     }
  //   };
  //   verifyAuth();
  // }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)/login" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="leaderboard"
        options={{ headerShown: true, title: "Лидерборд" }}
      />
    </Stack>
  );
}
