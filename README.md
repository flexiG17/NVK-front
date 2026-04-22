# NVK Front

Мобильное приложение для NVK. Разработано с использованием React Native (Expo) и архитектурной методологии Feature-Sliced Design (FSD).

## Требования

1. Node.js >= 18
2. npm / yarn / pnpm

### Для сборки APK локально дополнительно требуется:

- **Java Development Kit (JDK):** версия 11 или выше
- **Android SDK:** API Level 33+ (для `eas build --local`)
- **Gradle:** устанавливается автоматически с проектом

## Установка и запуск

1. Установка зависимостей

   ```bash
   npm install
   ```

2. Запуск сервера разработки

   ```bash
   npx expo start
   ```

   Нажмите a для запуска эмулятора Android.
   Нажмите i для запуска симулятора iOS (только macOS).
   Или отсканируйте QR-код через приложение Expo Go на телефоне.

## Сборка APK

### Предварительная подготовка

Перед сборкой APK убедитесь, что у вас установлены:

```bash
# Установка EAS CLI глобально (один раз)
npm install -g eas-cli

# Установка зависимостей проекта
npm install
```

### Способ 1: Локальная сборка через EAS (рекомендуется для разработки)

Для локальной сборки без облачного билда:

1. **Установка и настройка:**

   ```bash
   # Если еще не установлен
   npm install -g eas-cli
   ```

2. **Вход в EAS аккаунт (один раз):**

   ```bash
   eas login
   ```

   Используйте ваш аккаунт Expo (eas.expo.dev)

3. **Сборка APK локально:**

   ```bash
   # Сборка профиля разработки (рекомендуется)
   npm run build:apk

   # Или напрямую через eas-cli
   eas build --platform android --profile development --local

   # Альтернативные варианты:
   npm run build:apk:preview      # Preview профиль
   npm run build:apk:clean        # С очисткой кэша
   ```

4. **Где найти готовый APK:**

   После успешной сборки APK будет находиться в:
   - **Предложенный путь:** Будет выведен в консоли после завершения сборки
   - **Стандартное расположение:** `dist/` или похожая папка в корне проекта

   Файл APK можно установить на устройство:

   ```bash
   adb install <путь_к_apk_файлу>.apk
   ```

### Способ 2: Сборка через esy (альтернатива без облака)

Если вы предпочитаете работать напрямую с Gradle без EAS:

```bash
# Подготовка нативного проекта Android
npx expo prebuild --platform android --clean

# Сборка APK через Gradle
cd android
./gradlew assembleDebug

# APK будет в:
# android/app/build/outputs/apk/debug/app-debug.apk
```

### Опции сборки через EAS

```bash
# Сборка с очисткой кэша
eas build --platform android --profile development --local --clear-cache

# Сборка с указанием выходной директории
eas build --platform android --profile development --local --output ./dist/app.apk

# Сборка с логами
eas build --platform android --profile development --local --verbose-logs
```

### Тестирование готового APK

После успешной сборки установите APK на устройство или эмулятор:

```bash
# Установка на подключенное устройство/эмулятор
adb install <путь_к_apk_файлу>.apk

# Запуск приложения
adb shell am start -n com.nvkfront/com.nvkfront.MainActivity

# Просмотр логов
adb logcat | grep nvkfront
```

### Troubleshooting (Решение проблем)

**Ошибка: "Gradle не найден"**

```bash
# Переустановите нативный проект
npx expo prebuild --platform android --clean
```

**Ошибка: "Java не найден"**

- Установите JDK 11+ и добавьте `JAVA_HOME` в переменные окружения

**Ошибка: "Android SDK не найден"**

- Установите Android SDK через Android Studio или командой:
  ```bash
  sdkmanager "platforms;android-33" "build-tools;34.0.0"
  ```

## Архитектура проекта (FSD)

```
app/ # Инициализация приложения. Глобальные стили, провайдеры, конфиги.
src/
├── assets/ # Системные изображения
├── processes/ # Сложные бизнес-процессы, затрагивающие несколько страниц.
├── pages/ # Композиция страниц. Сборка виджетов в полноценные экраны (импорт в роутер Expo).
├── widgets/ # Крупные самостоятельные блоки страниц. Состоят из фич и сущностей.
├── features/ # Обрабатываемые пользовательские сценарии.
├── entities/ # Бизнес-сущности.
└── shared/   # Переиспользуемый код, строго не привязанный к бизнес-логике
   ├── ui/   # Базовый UI Kit (кнопки, инпуты, типографика)
   ├── api/  # Базовая настройка API клиента (инстансы axios/fetch)
   └── lib/  # Вспомогательные хелперы, утилиты и хуки
```
