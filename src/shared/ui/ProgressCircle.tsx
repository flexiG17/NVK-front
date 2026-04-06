import { useTheme } from "@/lib/theme";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

interface ProgressCircleProps {
  size?: number;
  strokeWidth?: number;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  size = 60,
  strokeWidth = 6,
}) => {
  const { theme } = useTheme();
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * 0.5;

  return (
    <View style={styles.container}>
      <Animated.View style={[{ width: size, height: size }, animatedStyle]}>
        <Svg width={size} height={size}>
          <Defs>
            <LinearGradient id="spinner-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              {theme.gradients.spinner.map((step, index) => (
                <Stop
                  key={index}
                  offset={step.offset}
                  stopColor={step.color}
                  stopOpacity={step.opacity}
                />
              ))}
            </LinearGradient>
          </Defs>

          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#spinner-grad)"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
