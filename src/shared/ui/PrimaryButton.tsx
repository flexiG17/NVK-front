import { makeStyles } from "@/lib/theme";
import React, { useRef } from "react";
import { Pressable, Text, Animated } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export const PrimaryButton: React.FC<Props> = ({
  title,
  onPress,
  disabled = false,
}) => {
  const styles = useStyles();
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 6,
    }).start();
  };

  return (
    <Animated.View
      style={{
        width: "100%",
        transform: [{ scale }],
      }}
    >
      <Pressable
        style={({ pressed }) => [
          styles.loginButton,
          pressed && styles.loginButtonPressed,
          disabled && { opacity: 0.5 },
        ]}
        disabled={disabled}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text style={styles.loginButtonText}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

const useStyles = makeStyles((t) => ({
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
    backgroundColor: t.colors.accentPressed 
  },
  loginButtonText: { 
    color: t.colors.textOnAccent, 
    fontSize: t.fonts.sizes.md, 
    fontFamily: t.fonts.family.semibold 
  },
}));