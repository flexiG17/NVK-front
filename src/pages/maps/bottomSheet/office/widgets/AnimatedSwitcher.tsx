import React, { useRef, useEffect } from 'react';
import { Animated, View } from 'react-native';


interface AnimatedSwitcherProps {
  active: 'description' | 'photos';
  description: React.ReactNode;
  photos: React.ReactNode;
}
export const AnimatedSwitcher: React.FC<AnimatedSwitcherProps> = ({
  active,
  description,
  photos,
}) => {
  const descriptionOpacity = useRef(new Animated.Value(1)).current;
  const photosOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (active === 'description') {
      Animated.parallel([
        Animated.timing(descriptionOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(photosOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(descriptionOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(photosOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [active, descriptionOpacity, photosOpacity]);

  return (
    <View style={{ width: '100%' }}>
      <Animated.View
        style={{
          width: '100%',
          opacity: descriptionOpacity,
        }}
      >
        {description}
      </Animated.View>

      <Animated.View
        style={{
          width: '100%',
          opacity: photosOpacity,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {photos}
      </Animated.View>
    </View>
  );
};

AnimatedSwitcher.displayName = 'AnimatedSwitcher';  