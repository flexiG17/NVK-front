import React, { forwardRef, useImperativeHandle } from 'react';

import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export type PanZoomHandle = {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
};

interface Props {
  children: React.ReactNode;
}

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;

const PanZoom = forwardRef<PanZoomHandle, Props>(({ children }, ref) => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const savedX = useSharedValue(0);
  const savedY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = savedX.value + e.translationX;
      translateY.value = savedY.value + e.translationY;
    })
    .onEnd(() => {
      savedX.value = translateX.value;
      savedY.value = translateY.value;
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      const newScale = savedScale.value * e.scale;

      scale.value = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const gesture = Gesture.Simultaneous(panGesture, pinchGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  useImperativeHandle(ref, () => ({
    zoomIn: () => {
      const newScale = Math.min(scale.value * 1.2, MAX_SCALE);

      scale.value = withTiming(newScale);
      savedScale.value = newScale;
    },

    zoomOut: () => {
      const newScale = Math.max(scale.value * 0.8, MIN_SCALE);

      scale.value = withTiming(newScale);
      savedScale.value = newScale;
    },

    reset: () => {
      scale.value = withTiming(1);
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);

      savedScale.value = 1;
      savedX.value = 0;
      savedY.value = 0;
    },
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={styles.container}>
        <Animated.View style={animatedStyle}>{children}</Animated.View>
      </Animated.View>
    </GestureDetector>
  );
});

PanZoom.displayName = 'PanZoom';

export default PanZoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
});
