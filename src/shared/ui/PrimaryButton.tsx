import { makeStyles } from "@/lib/theme";
import React from "react";
import { Pressable, Text } from "react-native";

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
  const styles = useStyles()
  return (
    <Pressable
      style={({ pressed }) => [
        styles.loginButton,
        pressed && styles.loginButtonPressed,
        disabled && { opacity: 0.5 },
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={styles.loginButtonText}>{title}</Text>
    </Pressable>
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