// SegmentedControl.tsx
import { makeStyles } from '@/lib/theme';
import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';

interface SegmentedControlProps {
  options: string[];
  selected: 'description' | 'photos';
  onChange: (index: number) => void;
}
const screenWidth = Dimensions.get('window').width;
  const controlWidth = screenWidth * 0.6;

export const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, selected, onChange }) => {
  const styles = useStyles();

  const animation = useRef(
    new Animated.Value(selected === 'description' ? 0 : 1)
  ).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: selected === 'description' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  });

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, controlWidth / 2],
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.active,
            {
              width: controlWidth / 2,
              transform: [{ translateX }],
            },
          ]}
        />

        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => onChange(index)}
            activeOpacity={0.8}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
SegmentedControl.displayName = 'SegmentedControl';

const useStyles = makeStyles((t) => ({
  wrapper: {
    alignItems: 'center',
    marginVertical: 12,
  },

  container: {
    width: controlWidth,
    flexDirection: 'row',
    backgroundColor: t.colors.background,
    borderRadius: 20,
    overflow: 'hidden',
  },

  active: {
    position: 'absolute',
    top: 2,
    bottom: 2,
    left: 2,
    // backgroundColor: '#FFFFFF',
    backgroundColor: t.colors.surface,
    borderRadius: 12,
  },

  option: {
    flex: 1,
    paddingVertical: 10, 
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionText: {
    fontSize: t.fonts.sizes.md, 
    fontFamily: t.fonts.family.semibold, 
    color: t.colors.textPrimary,
  },
}));