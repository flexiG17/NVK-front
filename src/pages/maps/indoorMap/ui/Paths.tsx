import React, { useEffect } from 'react';
import { G, Path } from 'react-native-svg';

import { Animated } from 'react-native';
import { graphData } from '../model/graphData';

type Props = {
  path?: { x: number; y: number; id: string }[];
};

const AnimatedPath = Animated.createAnimatedComponent(Path);

function calcPathLength(points: { x: number; y: number }[]) {
  let len = 0;

  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    len += Math.sqrt(dx * dx + dy * dy);
  }

  return len;
}

const Paths: React.FC<Props> = ({ path }) => {
  const animated = React.useRef(new Animated.Value(0)).current;

  const d = React.useMemo(() => {
    if (!path?.length) return '';

    return path.reduce((acc, p, i) => {
      if (i === 0) return `M${p.x} ${p.y}`;
      return `${acc} L${p.x} ${p.y}`;
    }, '');
  }, [path]);

  const length = React.useMemo(() => {
    if (!path?.length) return 0;
    return calcPathLength(path);
  }, [path]);

  const animatedRef = React.useRef(animated);

  useEffect(() => {
    if (!length) return;

    animatedRef.current.setValue(length);

    Animated.timing(animatedRef.current, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [length]);

  return (
    <G>
      {graphData.edges.map((edge) => {
        const from = graphData.vertices.find((v) => v.id === edge.from);
        const to = graphData.vertices.find((v) => v.id === edge.to);

        if (!from || !to) return null;

        return (
          <Path
            key={edge.id}
            d={`M${from.cx} ${from.cy} L${to.cx} ${to.cy}`}
            stroke="#999"
            strokeWidth={2}
            opacity={0}
          />
        );
      })}

      {d ? (
        <AnimatedPath
          d={d}
          stroke="#4285f4"
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={length}
          strokeDashoffset={animated}
        />
      ) : null}
    </G>
  );
};

export default Paths;
