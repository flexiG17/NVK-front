import {
  FLOATING_TAB_BAR_HEIGHT,
  FloatingTabBar,
} from "@/widgets/navigation/FloatingTabBar";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LeaderboardScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: FLOATING_TAB_BAR_HEIGHT + 20 + insets.bottom },
      ]}
    >
      <Text style={styles.text}>Топ пользователей</Text>
      <FloatingTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
  },
});