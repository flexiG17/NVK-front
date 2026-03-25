import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image as ExpoImage } from "expo-image";
import {
  KeyboardAvoidingView,
  Pressable,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.root}>
      <ExpoImage
        source={require("../src/assets/images/loginscreen.svg")}
        contentFit="cover"
        style={styles.backgroundImage}
      />
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.titleWrap}>
            <Text style={styles.titleLine1}>Добро пожаловать</Text>
            <Text style={styles.titleLine2}>в НВК LIFE!</Text>
          </View>

          <View style={styles.formWrap}>
            <Text style={styles.label}>Логин (электронная почта)*</Text>
            <TextInput
              value={login}
              onChangeText={setLogin}
              placeholder=""
              placeholderTextColor="rgba(255,255,255,0.7)"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              selectionColor="#fff"
            />

            <Text style={[styles.label, { marginTop: 18 }]}>Пароль *</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder=""
                placeholderTextColor="rgba(255,255,255,0.7)"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.passwordInput}
                selectionColor="#fff"
              />
              <Pressable
                onPress={() => setShowPassword((v) => !v)}
                hitSlop={10}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#fff"
                />
              </Pressable>
            </View>

            <Pressable
              style={styles.loginButton}
              onPress={() => router.push("/home")}
            >
              <Text style={styles.loginButtonText}>Войти</Text>
            </Pressable>

            <View style={styles.links}>
              <Text style={styles.link}>Войти как гость</Text>
              <Text style={[styles.link, { marginTop: 10 }]}>
                Восстановление пароля
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  screen: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 24,
  },
  titleWrap: {
    alignItems: "center",
    marginBottom: 42,
  },
  titleLine1: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
  },
  titleLine2: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 6,
  },
  formWrap: {
    width: "100%",
    alignItems: "center",
  },
  label: {
    width: "100%",
    color: "#fff",
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 52,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.95)",
    borderRadius: 12,
    paddingHorizontal: 16,
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.08)",
  },
  passwordContainer: {
    width: "100%",
    height: 52,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.95)",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 10,
    backgroundColor: "rgba(0,0,0,0.08)",
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    color: "#fff",
    paddingVertical: 0,
  },
  eyeButton: {
    width: 44,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    width: "100%",
    height: 52,
    borderRadius: 14,
    backgroundColor: "#3A3B82",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  links: {
    width: "100%",
    alignItems: "center",
    marginTop: 18,
  },
  link: {
    color: "rgba(255,255,255,0.95)",
    fontSize: 14,
    fontWeight: "500",
  },
});