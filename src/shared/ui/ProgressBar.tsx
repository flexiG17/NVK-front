import React, { useEffect, useLayoutEffect, useRef } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { progressBarGradient } from "@/shared/config/theme/colors";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

/**
 * Свойства компонента ProgressBar
 * @interface ProgressBarProps
 */
export interface ProgressBarProps {
  /**
   * Процент заполненности прогресс-бара (0-100)
   * @type {number}
   * @example 50 // Заполнит бар на 50%
   */
  percent: number;

  /**
   * Тип визуальной стилизации прогресс-бара
   * - `'default'`: сплошная черная заливка (#000000)
   * - `'gradient'`: четырехцветный градиент (красный → розовый → оранжевый → жёлтый)
   * @type {'default' | 'gradient'}
   * @default 'default'
   * @example type="gradient"
   */
  type?: "default" | "gradient";

  /**
   * Высота (толщина) прогресс-бара в пикселях
   * Используется для закругления углов: `borderRadius = height / 2`
   * @type {number}
   * @default 8
   * @example height={12} // Более толстый бар
   */
  height?: number;

  /**
   * Длительность плавной анимации переходов в миллисекундах
   * Используется кубическая функция easing для мягкого изменения
   * @type {number}
   * @default 800
   * @example animationDuration={1500} // Более медленная анимация
   */
  animationDuration?: number;
}

/**
 * Высокопроизводительный компонент прогресс-бара с плавной GPU-ускоренной анимацией
 *
 * @component
 * Поддерживает два режима визуализации:
 * - **Default**: сплошная чёрная заливка (использует react-native-progress)
 * - **Gradient**: четырехцветный градиент с Reanimated анимацией
 *
 * Анимация использует кубическую функцию easing для естественного переходного эффекта.
 * Компонент занимает 100% ширину родительского контейнера.
 *
 * @param {ProgressBarProps} props - Параметры компонента
 * @param {number} props.percent - Процент заполненности (0-100)
 * @param {'default' | 'gradient'} [props.type='default'] - Тип стилизации
 * @param {number} [props.height=8] - Высота в пикселях
 * @param {number} [props.animationDuration=800] - Длительность анимации в мс
 *
 * @returns {React.ReactElement} Отрендеренный прогресс-бар
 *
 * @example
 * // Интерактивный прогресс-бар с кнопками
 * const [percent, setPercent] = useState(0);
 * return (
 *   <>
 *     <ProgressBar percent={percent} type="default" height={10} />
 *     <Button onPress={() => setPercent(p => Math.min(p + 10, 100))} title="+10%" />
 *   </>
 * );
 *
 * @example
 * // Автоматическая анимация с градиентом
 * const [progress, setProgress] = useState(0);
 * useEffect(() => {
 *   const interval = setInterval(() => {
 *     setProgress(p => p >= 100 ? 0 : p + 1);
 *   }, 50);
 *   return () => clearInterval(interval);
 * }, []);
 * return (
 *   <ProgressBar
 *     percent={progress}
 *     type="gradient"
 *     height={12}
 *     animationDuration={1500}
 *   />
 * );
 *
 * @remarks
 * - Использует react-native-reanimated для GPU-ускоренной анимации на типе 'gradient'
 * - Использует react-native-progress Bar для типа 'default'
 * - Фоновый цвет: #F0F0F0 (светло-серый)
 * - Градиент для типа 'gradient': #FF011B → #FF0189 → #FF911E → #FFEB00
 * - Углы закруглены: `borderRadius = height / 2`
 *
 * @since 1.0.0
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  percent,
  type = "default",
  height = 8,
  animationDuration = 800,
}) => {
  const progress = useSharedValue(0);
  const hasRunInitialMountAnimationRef = useRef(false);

  const clampedPercent = Math.min(100, Math.max(0, percent));

  // До первого paint (важно для web): иначе первый кадр уже с целевой шириной
  useLayoutEffect(() => {
    progress.value = 0;
  }, [progress]);

  useEffect(() => {
    const animate = () => {
      progress.value = withTiming(clampedPercent, {
        duration: animationDuration,
        easing: Easing.inOut(Easing.cubic),
      });
    };

    if (!hasRunInitialMountAnimationRef.current) {
      hasRunInitialMountAnimationRef.current = true;
      const frames = { outer: 0 as number, inner: 0 as number };
      // Двойной rAF: один кадр с 0% успевает попасть на экран (runAfterInteractions на web часто слишком ранний)
      frames.outer = requestAnimationFrame(() => {
        frames.inner = requestAnimationFrame(() => {
          animate();
        });
      });
      return () => {
        cancelAnimationFrame(frames.outer);
        cancelAnimationFrame(frames.inner);
      };
    }

    animate();
  }, [clampedPercent, animationDuration, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
    };
  });

  if (type === "gradient") {
    return (
      <View
        style={{
          width: "100%",
          height,
          backgroundColor: "#F0F0F0",
          borderRadius: height / 2,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={[
            {
              height: "100%",
              borderRadius: height / 2,
              overflow: "hidden",
            },
            animatedStyle,
          ]}
        >
          <LinearGradient
            colors={progressBarGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: height / 2,
            }}
          />
        </Animated.View>
      </View>
    );
  }

  return (
    <View
      style={{
        width: "100%",
        height,
        backgroundColor: "#F0F0F0",
        borderRadius: height / 2,
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={[
          {
            height: "100%",
            backgroundColor: "#000000",
            borderRadius: height / 2,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};
