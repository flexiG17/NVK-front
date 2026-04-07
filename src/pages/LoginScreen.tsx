import { makeStyles, useTheme } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image as ExpoImage } from "expo-image";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginFormData } from "@/features/auth/loginSchema";
import { useLocalization } from "@/shared/lib/i18n/useLocalization";
import { PrimaryButton } from "@/shared/ui/PrimaryButton";

export default function LoginScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = useStyles();
  const { t } = useLocalization();
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, formState: { isValid } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: { login: "", password: "" },
  });

  const onSubmit = (data: LoginFormData) => {
    const payload = {
      username: data.login,
      password: data.password,
    };
    console.log("Отправка на бэк:", payload);
    router.push("/(tabs)");
  };
  const onPressRegister = () => {
    return null
  }
  
  const onPressGuest = () => {
    return null
  }
  const onPressPasswordChange = () => {
    return null
  }

  return (
    <View style={styles.root}>
      <ExpoImage
        source={require("../assets/images/loginscreen.png")}
        contentFit="cover"
        style={StyleSheet.absoluteFillObject}
      />

        <View style={styles.topBlock}>
          <BlurView intensity={40} style={styles.campusWrapper}>
            <ExpoImage
              source={require("../assets/images/campus.png")}
              contentFit="cover"
              style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.campusTextWrap}>
              <Text style={styles.titleLine}>{t('welcomeNVK')}</Text>
            </View>
          </BlurView>
        </View>

      <View style={styles.spacer} />
      <KeyboardAvoidingView
        style={styles.formBlock}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.content} >
          <View style={styles.formWrap}>
            <Text style={styles.label}>{t('login')}</Text>
            <Controller
              control={control}
              name="login"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={[
                      styles.input,
                      error && { borderColor: "red" } // обводка красным при ошибке
                    ]}
                    placeholderTextColor={theme.colors.placeholder}
                    selectionColor={theme.colors.inputText}
                  />
                  {/* {error && <Text style={{ color: "red", marginTop: 4 }}>{error.message}</Text>} */}
                </>
              )}
            />

            <Text style={[styles.label, styles.labelGap]}>{t('password')}</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <>
                  <View style={[
                    styles.passwordContainer,
                    error && { borderColor: "red" } // обводка красным при ошибке
                  ]}>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
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
                        // color={theme.colors.icon}
                        color={"#FFFFFF"}
                      />
                    </Pressable>
                  </View>
                  {/* {error && <Text style={{ color: "red", marginTop: 4 }}>{error.message}</Text>} */}
                </>
              )}
            />

            <PrimaryButton 
              title={t('signIn')} 
              onPress={handleSubmit(onSubmit)} 
              disabled={!isValid}
            />

            <Pressable
              style={({ pressed }) => [
                styles.registerButton,
                pressed && styles.registerButtonPressed,
              ]}
              onPress={onPressRegister}
            >
              <Text style={styles.registerButtonText}>{t('registration')}</Text>
            </Pressable>

            <View style={styles.links}>
              <Pressable onPress={onPressGuest}>
                <Text style={styles.link}>{t('guest')}</Text>
              </Pressable>
              <Pressable onPress={onPressPasswordChange}>
                <Text style={[styles.link, styles.linkGap]}>{t('resetPassword')}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.bottomSpacer} />
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  root: { 
    flex: 1, 
    backgroundColor: t.colors.background 
  },
  topBlock: { 
    height: "25%", 
    zIndex: 1 
  },
  spacer: { 
    height: "5%" 
  },
  formBlock: { 
    height: "50%", 
    zIndex: 2 
  },
  bottomSpacer: {
    height: "20%" 
  },
  content: { 
    flexGrow: 1, 
    justifyContent: "flex-start", 
    paddingHorizontal: 24 
  },
  campusWrapper: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    overflow: "hidden" 
  },
  campusTextWrap: { 
    position: "absolute", 
    bottom: "10%", 
    alignItems: "center", 
    width: "100%" 
  },
  titleLine: { 
    // color: t.colors.textPrimary, 
    color: "#FFFFFF", // убрал смену темы, при светлой теме черный текст на картинке плохо читается
    fontSize: t.fonts.sizes.greeting, 
    fontFamily: t.fonts.family.semibold, 
    textAlign: "center", 
    marginTop: 6 
  },
  formWrap: { 
    width: "100%", 
    alignItems: "center" 
  },
  label: { 
    width: "100%", 
    // color: t.colors.textPrimary, 
    color: "#FFFFFF", // убрал смену темы, при светлой теме черный текст на розовом не очень контрастен
    fontSize: t.fonts.sizes.sm, 
    fontFamily: t.fonts.family.regular, 
    marginBottom: 10 
  },
  labelGap: { 
    marginTop: 18 
  },
  input: { 
    width: "100%",
    height: 40, 
    borderWidth: 1, 
    // borderColor: t.colors.border, 
    borderColor: "#FFFFFF",
    borderRadius: t.borderRadius.md, 
    paddingHorizontal: 16, 
    color: t.colors.inputText, 
    // backgroundColor: t.colors.inputBackground, 
    backgroundColor: "#FF0189",
    fontFamily: t.fonts.family.regular, 
    fontSize: t.fonts.sizes.md 
  },
  passwordContainer: { 
    width: "100%", 
    height: 40, 
    borderWidth: 1, 
    // borderColor: t.colors.border, 
    borderColor: "#FFFFFF",
    borderRadius: t.borderRadius.md, 
    flexDirection: "row", 
    alignItems: "center", 
    paddingLeft: 16, 
    paddingRight: 10, 
    // backgroundColor: t.colors.inputBackground 
    backgroundColor: "#FF0189",
  },
  passwordInput: { 
    flex: 1, 
    height: "100%", 
    color: t.colors.inputText, 
    paddingVertical: 0, 
    fontFamily: t.fonts.family.regular, 
    fontSize: t.fonts.sizes.md 
  },
  eyeButton: { 
    width: 44, 
    height: "100%", 
    alignItems: "center", 
    justifyContent: "center" 
  },
  loginButton: { 
    width: "100%", 
    height: 52, 
    borderRadius: t.borderRadius.lg, 
    backgroundColor: t.colors.accent, 
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: 22 
  },
  loginButtonPressed: { 
    backgroundColor: t.colors.accentPressed 
  },
  loginButtonText: { 
    color: t.colors.textOnAccent, 
    fontSize: t.fonts.sizes.md, 
    fontFamily: t.fonts.family.semibold 
  },
  registerButtonText: { 
    color: t.colors.textOnAccent, 
    fontSize: t.fonts.sizes.md, 
    fontFamily: t.fonts.family.regular
  },
  registerButton: { 
    width: "100%", 
    height: 52, 
    borderRadius: t.borderRadius.lg, 
    backgroundColor: "transparent", 
    borderWidth: 1, 
    borderColor: "#FFFFFF", 
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: 12 
  },
  registerButtonPressed: { 
    opacity: 0.7 
  },
  links: { 
    width: "100%",
    alignItems: "center", 
    marginTop: 18 
    },
  link: { 
    // color: t.colors.link, 
    color: "#FFFFFF", // убрал смену темы, при светлой теме темно-синий текст на темной части градиента плохо читается
    fontSize: t.fonts.sizes.sm, 
    fontFamily: t.fonts.family.regular 
  },
  linkGap: { 
    marginTop: 10 
  },
}));