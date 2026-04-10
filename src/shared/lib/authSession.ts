import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_SESSION_KEY = "@nvk/auth_session";

export async function isAuthSessionActive(): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(AUTH_SESSION_KEY)) === "1";
  } catch {
    return false;
  }
}

export async function setAuthSessionActive(): Promise<void> {
  await AsyncStorage.setItem(AUTH_SESSION_KEY, "1");
}

export async function clearAuthSession(): Promise<void> {
  await AsyncStorage.removeItem(AUTH_SESSION_KEY);
}
