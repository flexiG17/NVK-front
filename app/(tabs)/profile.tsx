import { ROUTES } from "@/shared/lib/routes";
import { clearAuthSession } from "@/shared/lib/authSession";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await clearAuthSession();
    router.replace(ROUTES.auth.login);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarPlaceholder} />
      <Text style={styles.userName}>Иван Иванов</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Выйти из аккаунта</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E1E1E1",
    marginBottom: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 40,
  },
  logoutButton: {
    padding: 12,
  },
  logoutText: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "500",
  },
});
