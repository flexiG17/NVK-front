import { useTranslation } from "react-i18next";

/**
 * Хук для управления локализацией приложения
 *
 * Предоставляет интерфейс для работы с переводами, переключения языков
 * и получения текущей локали пользователя.
 *
 * @returns {Object} Объект с функциями и данными локализации
 * @returns {Function} t - Функция для получения переведённого текста по ключу
 * @returns {Object} i18n - Экземпляр i18next для низкоуровневого доступа
 * @returns {Array<{code: string, name: string}>} languages - Доступные языки
 * @returns {'en' | 'ru'} currentLanguage - Текущий язык приложения
 * @returns {Function} changeLanguage - Функция для изменения языка
 * @returns {Function} getUserLocale - Асинхронная функция для получения локали пользователя (в разработке)
 *
 * @example
 * const { t, currentLanguage, changeLanguage } = useLocalization();
 * // Получить перевод
 * const title = t('common.title');
 * // Изменить язык
 * changeLanguage('en');
 */
export const useLocalization = () => {
  const { t, i18n } = useTranslation();

  const languages = [
    { code: "en", name: "English" },
    { code: "ru", name: "Русский" },
  ] as const;

  const changeLanguage = (lng: "en" | "ru") => {
    i18n.changeLanguage(lng);
  };

  // TODO: интегрировать с AsyncStorage или expo-localization
  const getUserLocale = async () => {
    return "ru"; // мок
  };

  return {
    t,
    i18n,
    languages,
    currentLanguage: i18n.language as "en" | "ru",
    changeLanguage,
    getUserLocale,
  };
};
