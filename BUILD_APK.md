# Быстрый старт: Сборка APK

## Первый раз? Выполните эти шаги:

### 1. Установите необходимые инструменты

```bash
# Установите EAS CLI глобально (один раз)
npm install -g eas-cli

# Установите зависимости проекта
npm install
```

### 2. Войдите в EAS аккаунт

```bash
eas login
```

**Требуется аккаунт на https://eas.expo.dev**

- Если нет аккаунта, создайте его (бесплатно)
- Используйте те же учетные данные

### 3. Проверьте требования для локальной сборки

**На вашей машине должно быть установлено:**

- ✅ Java Development Kit (JDK) 11+
- ✅ Android SDK (API Level 33+)
- ✅ Node.js 18+

> Если что-то не установлено, см. раздел "Решение проблем" в README.md

## Собрать APK

### Самый простой способ (рекомендуется):

```bash
npm run build:apk
```

Это равносильно:

```bash
eas build --platform android --profile development --local
```

### Если нужна чистая сборка (очистить кэш):

```bash
npm run build:apk:clean
```

### Если нужен "preview" профиль:

```bash
npm run build:apk:preview
```

## Результат

После успешной сборки (может занять 5-15 минут) вы получите путь к APK.

Примерно так:

```
✔ Successfully built app for development
  📲 APK location: ./dist/app-development.apk
```

## Установка на устройство/эмулятор

```bash
# Установите готовый APK
adb install ./dist/app-development.apk

# Запустите приложение
adb shell am start -n com.nvkfront/com.nvkfront.MainActivity
```

## Проблемы?

Если что-то не сработало:

1. Проверьте, что JDK и Android SDK установлены
2. Попробуйте `npm run build:apk:clean` (очистка кэша)
3. Прочитайте "Troubleshooting" в README.md
4. Проверьте логи: `eas build --platform android --profile development --local --verbose-logs`

## Другие полезные команды

```bash
# Очистить нативный проект Android
npm run prebuild:android

# Проверить статус конфигурации
eas build:configure

# Просмотреть логи приложения
adb logcat | grep nvkfront
```

**Помощь:** Подробнее см. в [README.md](README.md)
