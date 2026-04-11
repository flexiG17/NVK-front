import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ru from "./locales/ru.json";

const resources = {
  en: { translation: en },
  ru: { translation: ru },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru", // TODO: взять из настроек пользователя или системы
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React уже экранирует
  },
});

export default i18n;
export { useLocalization } from "./useLocalization";
