import React, { useState } from 'react';
import { G, Path } from 'react-native-svg';
import { FLOOR_MARKUP } from '../model/floorMarkup';
interface ObjectsProps {
  onPress: (id: string) => void;
  disabled?: boolean;
}

const Objects: React.FC<ObjectsProps> = ({ onPress, disabled }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handlePress = (id: string) => {
    if (!disabled) {
      onPress(id);
    }
  };

  const getFill = (id: string) => {
    if (activeId === id) {
      return 'rgba(0,0,0,0.3)';
    }
    return 'rgba(0,0,0,0)';
  };

  return (
    <G>
      {FLOOR_MARKUP.map(({ name, d }) => (
        <Path
          key={name}
          d={d}
          fill={getFill(name)}
          stroke="black"
          strokeWidth={1}
          onPressIn={() => setActiveId(name)}
          onPressOut={() => setActiveId(null)}
          onPress={() => handlePress(name)}
        />
      ))}
    </G>
  );
};

export default Objects;
