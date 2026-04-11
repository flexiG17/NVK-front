import {
  View,
  Text,
  Pressable,
  Animated,
  useWindowDimensions,
} from "react-native";
import { makeStyles } from "@/lib/theme";
import { useState, useRef, useEffect } from "react";
import { useLocalization } from "@/shared/lib/i18n";

interface LeaderboardTabsProps {
  leftText?: string;
  rightText?: string;
}

const HORIZONTAL_PADDING = 20;

export const LeaderboardTabs = ({
  leftText,
  rightText,
}: LeaderboardTabsProps) => {
  const { t } = useLocalization();
  const { width: screenWidth } = useWindowDimensions();
  const defaultLeftText = leftText || t("leaderboard.contestDeadline");
  const defaultRightText = rightText || t("leaderboard.allTime");
  const styles = useStyles();
  const [isLeftSelected, setIsLeftSelected] = useState(true);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const containerWidth = screenWidth - HORIZONTAL_PADDING * 2;
  const slideDistance = (containerWidth - 8) / 2; // контейнер с padding: 4 с обеих сторон

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: isLeftSelected ? 0 : slideDistance,
      useNativeDriver: true,
      friction: 8,
      tension: 50,
    }).start();
  }, [isLeftSelected, slideAnim, slideDistance]);

  return (
    <View style={[styles.container, { flexDirection: "row" }]}>
      <Animated.View
        style={[
          styles.slider,
          {
            width: slideDistance,
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
          {defaultLeftText}
        </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => setIsLeftSelected(false)}>
        <Text
          style={[
            styles.text,
            !isLeftSelected ? styles.selectedText : styles.defaultText,
          ]}
        >
          {defaultRightText}
        </Text>
      </Pressable>
    </View>
  );
};

const useStyles = makeStyles((t) => ({
  container: {
    width: "100%",
    height: 38,
    borderRadius: t.borderRadius.xl,
    overflow: "hidden",
    backgroundColor: t.colors.surface,
    padding: 4,
  },
  slider: {
    position: "absolute",
    top: 4,
    left: 4,
    height: 30,
    backgroundColor: t.colors.pink,
    borderRadius: t.borderRadius.xl,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: t.borderRadius.xl,
  },
  text: {
    fontSize: t.fonts.sizes.sm,
    textAlign: "center",
  },
  selectedText: {
    color: t.colors.textOnAccent,
    fontFamily: t.fonts.family.semibold,
    fontWeight: "600",
  },
  defaultText: {
    color: t.colors.textPrimary,
    fontFamily: t.fonts.family.regular,
    fontWeight: "400",
  },
}));
