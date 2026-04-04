import { AuthGuard } from "@/features/auth/AuthGuard";
import {
  FLOATING_TAB_BAR_HEIGHT,
  FloatingTabBar,
} from "@/widgets/navigation/FloatingTabBar";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_BOTTOM_GAP = 20;

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const contentBottomPad =
    FLOATING_TAB_BAR_HEIGHT + TAB_BOTTOM_GAP + insets.bottom;

  return (
    <AuthGuard>
      <Tabs
        tabBar={(props: BottomTabBarProps) => <FloatingTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          sceneStyle: { paddingBottom: contentBottomPad },
        }}
      >
        <Tabs.Screen name="index" options={{ title: "Главная" }} />
        <Tabs.Screen name="map" options={{ title: "Карта" }} />
        <Tabs.Screen name="chat" options={{ title: "Чат" }} />
        <Tabs.Screen
          name="events"
          options={{
            title: "События",
            href: null,
          }}
        />
        <Tabs.Screen name="profile" options={{ title: "Профиль" }} />
      </Tabs>
    </AuthGuard>
  );
}
