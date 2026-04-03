import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ROUTES } from "@/shared/lib/routes";

export default function HomeScreen() {
  const router = useRouter();

  const handleGoToLeaderboard = () => {
    router.push(ROUTES.leaderboard);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Главная страница</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleGoToLeaderboard}
        activeOpacity={0.7}
      >
        <Ionicons
          name="trophy-outline"
          size={24}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Открыть Лидерборд</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    elevation: 3, // для Android
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
