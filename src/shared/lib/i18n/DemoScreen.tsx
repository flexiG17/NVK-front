import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useLocalization } from './useLocalization';

const DemoScreen: React.FC = () => {
  const { t, changeLanguage, currentLanguage, languages } = useLocalization();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Заголовок */}
        <View style={styles.header}>
          <Text style={styles.title}>{t('title')}</Text>
          <Text style={styles.welcome}>{t('welcome')}</Text>
          <Text style={styles.description}>{t('description')}</Text>
        </View>

        {/* Переключатель языков */}
        <View style={styles.languageSection}>
          <Text style={styles.sectionTitle}>Язык / Language</Text>
          <View style={styles.languageSwitcher}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.langButton,
                  currentLanguage === lang.code && styles.activeLangButton,
                ]}
                onPress={() => changeLanguage(lang.code)}
              >
                <Text
                  style={[
                    styles.langButtonText,
                    currentLanguage === lang.code && styles.activeLangButtonText,
                  ]}
                >
                  {lang.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Интерполяция */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Интерполяция / Interpolation</Text>
          <Text style={styles.text}>
            {t('user.greeting', { name: 'Пользователь' })}
          </Text>
          <Text style={styles.text}>
            {t('user.items', { count: 5 })}
          </Text>
        </View>

        {/* Функции */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Функции / Features</Text>
          <View style={styles.featureList}>
            <Text style={styles.feature}>{t('features.feature1')}</Text>
            <Text style={styles.feature}>{t('features.feature2')}</Text>
            <Text style={styles.feature}>{t('features.feature3')}</Text>
          </View>
        </View>

        {/* Кнопки */}
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>
              {t('button.save')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>
              {t('button.cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  welcome: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    color: '#34495e',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7f8c8d',
    lineHeight: 22,
  },
  languageSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#2c3e50',
  },
  languageSwitcher: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  langButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#dee2e6',
    minWidth: 100,
    alignItems: 'center',
  },
  activeLangButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  langButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
  },
  activeLangButtonText: {
    color: '#fff',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
    color: '#2c3e50',
  },
  featureList: {
    gap: 8,
  },
  feature: {
    fontSize: 16,
    color: '#495057',
    paddingLeft: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
    paddingVertical: 4,
  },
  buttonSection: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#28a745',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default DemoScreen;
