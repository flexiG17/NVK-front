import { useTranslation } from 'react-i18next';

export const useLocalization = () => {
  const { t, i18n } = useTranslation();
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' }
  ] as const;

  const changeLanguage = (lng: 'en' | 'ru') => {
    i18n.changeLanguage(lng);
  };

  // TODO: интегрировать с AsyncStorage или expo-localization
  const getUserLocale = async () => {
    return 'ru'; // мок
  };

  return {
    t,
    i18n,
    languages,
    currentLanguage: i18n.language as 'en' | 'ru',
    changeLanguage,
    getUserLocale,
  };
};
