import ChatIcon from "@/assets/icons/tab-bar/chat.svg";
import HomeIcon from "@/assets/icons/tab-bar/home.svg";
import MapIcon from "@/assets/icons/tab-bar/map.svg";
import ProfileIcon from "@/assets/icons/tab-bar/profile.svg";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import type { ComponentType } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import type { SvgProps } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ACTIVE_ICON = "#EF302B";
const INACTIVE_ICON = "#000000";
const BOTTOM_OFFSET = 20;

type TabIcon = ComponentType<SvgProps>;

const TAB_ITEMS: {
  name: string;
  label: string;
  Icon: TabIcon;
  width: number;
  height: number;
}[] = [
  { name: "index", label: "Главный экран", Icon: HomeIcon, width: 26, height: 26 },
  { name: "map", label: "Карта", Icon: MapIcon, width: 26, height: 26 },
  { name: "chat", label: "Чат", Icon: ChatIcon, width: 24, height: 22 },
  { name: "profile", label: "Профиль", Icon: ProfileIcon, width: 23, height: 24 },
];

export function FloatingTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const currentName = state.routes[state.index]?.name;

  return (
    <View
      pointerEvents="box-none"
      style={[styles.outer, { paddingBottom: BOTTOM_OFFSET + insets.bottom }]}
    >
      <View style={styles.bar}>
        {TAB_ITEMS.map(({ name, label, Icon, width, height }) => {
          const focused = currentName === name;
          const route = state.routes.find((r) => r.name === name);
          if (!route) return null;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(name);
            }
          };

          const color = focused ? ACTIVE_ICON : INACTIVE_ICON;

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={label}
              onPress={onPress}
              style={({ pressed }) => [
                styles.tab,
                pressed && styles.tabPressed,
              ]}
            >
              <View style={styles.iconSlot}>
                <Icon width={width} height={height} color={color} />
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  tabPressed: {
    opacity: 0.7,
  },
  iconSlot: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});

/** Высота белой «капсулы» без нижнего отступа 20px (padding + иконка). */
export const FLOATING_TAB_BAR_HEIGHT = 12 * 2 + 28 + 4 * 2;
