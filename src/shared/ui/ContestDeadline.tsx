import { View, Text, Pressable, Animated } from "react-native";
import { makeStyles } from "@/lib/theme";
import { useState, useRef, useEffect } from "react";

interface ContestDeadlineProps {
  leftText?: string;
  rightText?: string;
}

export const ContestDeadline = ({
  leftText = "Конкурсный срок",
  rightText = "Все время",
}: ContestDeadlineProps) => {
  const styles = useStyles();
  const [isLeftSelected, setIsLeftSelected] = useState(true);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: isLeftSelected ? 0 : 156,
      useNativeDriver: true,
      friction: 8,
      tension: 50,
    }).start();
  }, [isLeftSelected, slideAnim]);

  return (
    <View style={[styles.container, { flexDirection: "row" }]}>
      <Animated.View
        style={[
          styles.slider,
          {
            transform: [
              {
                translateX: slideAnim,
              },
            ],
          },
        ]}
      />
      <Pressable style={styles.button} onPress={() => setIsLeftSelected(true)}>
        <Text
          style={[
            styles.text,
            isLeftSelected ? styles.selectedText : styles.defaultText,
          ]}
        >
          {leftText}
        </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => setIsLeftSelected(false)}>
        <Text
          style={[
            styles.text,
            !isLeftSelected ? styles.selectedText : styles.defaultText,
          ]}
        >
          {rightText}
        </Text>
      </Pressable>
    </View>
  );
};

const useStyles = makeStyles((t) => ({
  container: {
    width: "100%",
    maxWidth: 320,
    height: 38,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    alignSelf: "center",
    padding: 4,
  },
  slider: {
    position: "absolute",
    top: 4,
    left: 4,
    width: 156,
    height: 30,
    backgroundColor: "#FF0189",
    borderRadius: 16,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
  },
  selectedText: {
    color: "#FFFFFF",
    fontFamily: t.fonts.family.semibold,
    fontWeight: "600",
  },
  defaultText: {
    color: "#000000",
    fontFamily: t.fonts.family.regular,
    fontWeight: "400",
  },
}));
