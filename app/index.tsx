import { makeStyles, useTheme } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image as ExpoImage } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = useStyles();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.root}>
      {theme.dark && (
        <ExpoImage
          source={require("../src/assets/images/loginscreen.svg")}
          contentFit="cover"
          style={styles.backgroundImage}
        />
      )}

      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.titleWrap}>
            <Text style={styles.titleLine}>Добро пожаловать</Text>
            <Text style={styles.titleLine}>в НВК LIFE!</Text>
          </View>

          <View style={styles.formWrap}>
            <Text style={styles.label}>Логин (электронная почта)*</Text>
            <TextInput
              value={login}
              onChangeText={setLogin}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              placeholderTextColor={theme.colors.placeholder}
              selectionColor={theme.colors.inputText}
            />

            <Text style={[styles.label, styles.labelGap]}>Пароль *</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.passwordInput}
                placeholderTextColor={theme.colors.placeholder}
                selectionColor={theme.colors.inputText}
              />
              <Pressable
                onPress={() => setShowPassword((v) => !v)}
                hitSlop={10}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={theme.colors.icon}
                />
              </Pressable>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.loginButton,
                pressed && styles.loginButtonPressed,
              ]}
              onPress={() => router.push("/home")}
            >
              <Text style={styles.loginButtonText}>Войти</Text>
            </Pressable>

            <View style={styles.links}>
              <Pressable>
                <Text style={styles.link}>Войти как гость</Text>
              </Pressable>
              <Pressable>
                <Text style={[styles.link, styles.linkGap]}>
                  Восстановление пароля
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  root: {
    flex: 1,
    width: "100%",
    backgroundColor: t.colors.background,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  titleLine: {
    color: t.colors.textPrimary,
    fontSize: t.fonts.sizes.title,
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
    color: t.colors.textPrimary,
    fontSize: t.fonts.sizes.sm,
    marginBottom: 10,
  },
  labelGap: {
    marginTop: 18,
  },
  input: {
    width: "100%",
    height: 52,
    borderWidth: 2,
    borderColor: t.colors.border,
    borderRadius: t.borderRadius.md,
    paddingHorizontal: 16,
    color: t.colors.inputText,
    backgroundColor: t.colors.inputBackground,
  },
  passwordContainer: {
    width: "100%",
    height: 52,
    borderWidth: 2,
    borderColor: t.colors.border,
    borderRadius: t.borderRadius.md,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 10,
    backgroundColor: t.colors.inputBackground,
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    color: t.colors.inputText,
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
    borderRadius: t.borderRadius.lg,
    backgroundColor: t.colors.accent,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },
  loginButtonPressed: {
    backgroundColor: t.colors.accentPressed,
  },
  loginButtonText: {
    color: t.colors.textOnAccent,
    fontSize: t.fonts.sizes.md,
    fontWeight: "700",
  },
  links: {
    width: "100%",
    alignItems: "center",
    marginTop: 18,
  },
  link: {
    color: t.colors.link,
    fontSize: t.fonts.sizes.sm,
    fontWeight: "500",
  },
  linkGap: {
    marginTop: 10,
  },
}));
