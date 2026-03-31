import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Bar } from "react-native-progress";
import { LinearGradient } from "expo-linear-gradient";

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
  // Нормализуем процент (0-100) в значение (0-1) для Bar
  const normalizedPercent = percent / 100;

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(percent, {
      duration: animationDuration,
      easing: Easing.inOut(Easing.cubic),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent, animationDuration]);

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
        <Animated.View style={[{ height: "100%" }, animatedStyle]}>
          <LinearGradient
            colors={["#FF011B", "#FF0189", "#FF911E", "#FFEB00"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: "100%", height: "100%" }}
          />
        </Animated.View>
      </View>
    );
  }

  return (
    <Bar
      progress={normalizedPercent}
      width={null}
      height={height}
      color="#000000"
      unfilledColor="#F0F0F0"
      borderWidth={0}
      animated={true}
      animationConfig={{
        duration: animationDuration,
      }}
      style={{
        borderRadius: height / 2,
      }}
    />
  );
};
