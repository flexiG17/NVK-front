import React from 'react';
import { G, Circle } from 'react-native-svg';
import { NavigationContextType } from '../model/types';
import { graphData } from '../model/graphData';

interface PositionsProps {
  positionRadius: number;
  onPress: (id: string) => void;
  visible: boolean;
  navigation?: NavigationContextType['navigation'];
}

const Positions: React.FC<PositionsProps> = ({ positionRadius, onPress, visible, navigation }) => {
  const startVertex = graphData.vertices.find((v) => v.id === navigation?.start);

  const isActive = (id: string) => navigation?.start === id;

  return (
    <G>
      {startVertex && (
        <Circle
          cx={startVertex.cx}
          cy={startVertex.cy}
          r={positionRadius + 7}
          fill="#4285f4"
          opacity={0.2}
        />
      )}

      {graphData.vertices.map((vertex) => {
        const hidden = vertex.objectName || !visible;

        return (
          <Circle
            key={vertex.id}
            cx={vertex.cx}
            cy={vertex.cy}
            r={positionRadius}
            fill={isActive(vertex.id) ? '#4285f4' : hidden ? 'transparent' : '#999'}
            opacity={hidden ? 0 : 1}
            onPress={() => !vertex.objectName && onPress(vertex.id)}
          />
        );
      })}
    </G>
  );
};

export default Positions;
