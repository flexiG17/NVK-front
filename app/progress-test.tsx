import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ProgressBar } from "@/shared/ui";

export default function ProgressTestScreen() {
  const [percent, setPercent] = useState(0);
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const [durationPercent, setDurationPercent] = useState(0);

  // Анимация при монтировании компонента
  useEffect(() => {
    setPercent(50);
  }, []);

  useEffect(() => {
    // Плавная анимация: обновляем процент каждые 15ms на 0.1% (тысячные доли)
    // Полный цикл от 0 до 100 за ~15 секунд, затем сброс
    const interval = setInterval(() => {
      setAnimatedPercent((prev) => (prev >= 100 ? 0 : prev + 0.1));
    }, 15);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Отдельная анимация для демонстрации разных длительностей
    // Плавное обновление на 0.1% каждые 15ms для полного цикла за ~15 секунд
    // Даёт достаточно времени для просмотра разных длительностей анимаций
    const interval = setInterval(() => {
      setDurationPercent((prev) => (prev >= 100 ? 0 : prev + 0.1));
    }, 15);
    return () => clearInterval(interval);
  }, []);

  const handleIncrement = () => {
    setPercent((prev) => Math.min(prev + 10, 100));
  };

  const handleDecrement = () => {
    setPercent((prev) => Math.max(prev - 10, 0));
  };

  const handleReset = () => {
    setPercent(0);
  };

  const handleRandomValue = () => {
    setPercent(Math.floor(Math.random() * 101));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Тестовая страница ProgressBar</Text>

      {/* Интерактивный прогресс-бар */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Интерактивный (Default)</Text>
        <Text style={styles.percentText}>{percent}%</Text>
        <View style={styles.progressContainer}>
          <ProgressBar percent={percent} type="default" height={10} />
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={handleDecrement}>
            <Text style={styles.buttonText}>−10%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleIncrement}>
            <Text style={styles.buttonText}>+10%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleRandomValue}>
            <Text style={styles.buttonText}>Random</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Автоматическая анимация - Gradient */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Автоматическая анимация (Gradient)
        </Text>
        <Text style={styles.percentText}>{Math.round(animatedPercent)}%</Text>
        <View style={styles.progressContainer}>
          <ProgressBar percent={animatedPercent} type="gradient" height={12} />
        </View>
      </View>
      {/* Тип Gradient */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Type: Gradient</Text>

        <View style={styles.exampleGroup}>
          <Text style={styles.exampleLabel}>25%</Text>
          <View style={styles.progressContainer}>
            <ProgressBar percent={25} type="gradient" />
          </View>
        </View>

        <View style={styles.exampleGroup}>
          <Text style={styles.exampleLabel}>50%</Text>
          <View style={styles.progressContainer}>
            <ProgressBar percent={50} type="gradient" />
          </View>
        </View>

        <View style={styles.exampleGroup}>
          <Text style={styles.exampleLabel}>75%</Text>
          <View style={styles.progressContainer}>
            <ProgressBar percent={75} type="gradient" />
          </View>
        </View>

        <View style={styles.exampleGroup}>
          <Text style={styles.exampleLabel}>100%</Text>
          <View style={styles.progressContainer}>
            <ProgressBar percent={100} type="gradient" />
          </View>
        </View>
      </View>

      {/* Примеры разных высот */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Разные высоты</Text>

        <View style={styles.exampleGroup}>
          <Text style={styles.exampleLabel}>Height: 4px</Text>
          <View style={styles.progressContainer}>
            <ProgressBar percent={40} type="default" height={4} />
          </View>
        </View>

        <View style={styles.exampleGroup}>
          <Text style={styles.exampleLabel}>Height: 8px (Default)</Text>
          <View style={styles.progressContainer}>
            <ProgressBar percent={60} type="default" height={8} />
          </View>
        </View>

        <View style={styles.exampleGroup}>
          <Text style={styles.exampleLabel}>Height: 16px</Text>
          <View style={styles.progressContainer}>
            <ProgressBar percent={80} type="default" height={16} />
          </View>
        </View>

        <View style={styles.exampleGroup}>
          <Text style={styles.exampleLabel}>Height: 24px</Text>
          <View style={styles.progressContainer}>
            <ProgressBar percent={50} type="default" height={24} />
          </View>
        </View>
      </View>

      {/* Тип Default */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Type: Default (черный)</Text>

        <View style={styles.exampleGroup}>
          <Text style={styles.exampleLabel}>25%</Text>
          <View style={styles.progressContainer}>
            <ProgressBar percent={25} type="default" />
          </View>
        </View>

        <View style={styles.exampleGroup}>
          <Text style={styles.exampleLabel}>50%</Text>
          <View style={styles.progressContainer}>
            <ProgressBar percent={50} type="default" />
          </View>
        </View>

        <View style={styles.exampleGroup}>
          <Text style={styles.exampleLabel}>75%</Text>
          <View style={styles.progressContainer}>
            <ProgressBar percent={75} type="default" />
          </View>
        </View>

        <View style={styles.exampleGroup}>
          <Text style={styles.exampleLabel}>100%</Text>
          <View style={styles.progressContainer}>
            <ProgressBar percent={100} type="default" />
          </View>
        </View>
      </View>

      {/* Разные длительности анимации */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Разные длительности анимации</Text>

        <View style={styles.exampleGroup}>
          <Text style={styles.exampleLabel}>500ms</Text>
          <View style={styles.progressContainer}>
            <ProgressBar
              percent={durationPercent}
              type="gradient"
              animationDuration={500}
            />
          </View>
        </View>

        <View style={styles.exampleGroup}>
          <Text style={styles.exampleLabel}>800ms (Default)</Text>
          <View style={styles.progressContainer}>
            <ProgressBar
              percent={durationPercent}
              type="gradient"
              animationDuration={800}
            />
          </View>
        </View>

        <View style={styles.exampleGroup}>
          <Text style={styles.exampleLabel}>2500ms</Text>
          <View style={styles.progressContainer}>
            <ProgressBar
              percent={durationPercent}
              type="gradient"
              animationDuration={2500}
            />
          </View>
        </View>
      </View>

      <View style={styles.footer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
  },
  section: {
    marginBottom: 32,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#555",
  },
  percentText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#666",
  },
  progressContainer: {
    marginVertical: 12,
    paddingHorizontal: 0,
  },
  exampleGroup: {
    marginBottom: 16,
  },
  exampleLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 6,
    fontWeight: "500",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  footer: {
    height: 40,
  },
});
