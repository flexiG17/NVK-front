import { checkAuth } from '@/shared/checkAuth';
import { router, Stack } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  //если пользователь уже авторизован, то перенаправляем его на экран с табами
  useEffect(() => {
    const verifyAuth = async () => {
      const result = await checkAuth(); 
      if (result) {
        router.replace('/(tabs)');
      }
    };
    verifyAuth();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)/login" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="leaderboard" options={{ headerShown: true, title: 'Лидерборд' }} />
    </Stack>
  );
}