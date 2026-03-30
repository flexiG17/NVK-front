export const ROUTES = {
  auth: {
    login: "/(auth)/login" as const,
  },
  tabs: {
    root: "/(tabs)" as const,
    home: "/(tabs)/" as const,
    map: "/(tabs)/map" as const,
    chat: "/(tabs)/chat" as const,
    events: "/(tabs)/events" as const,
    profile: "/(tabs)/profile" as const,
  },
  leaderboard: "/leaderboard" as const,
  progressTest: "/progress-test" as const,
  // Для маршрутов с параметрами
  dynamic: {
    event: (id: string) => `/(tabs)/events/${id}` as const,
  },
} as const;

export type AppRoutes = typeof ROUTES;
