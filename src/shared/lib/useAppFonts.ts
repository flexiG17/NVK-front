import { useFonts } from "expo-font";

export const useAppFonts = () => {
  return useFonts({
    Montserrat_400: require("@/src/assets/fonts/Montserrat-Regular.ttf"),
    Montserrat_500: require("@/src/assets/fonts/Montserrat-Medium.ttf"),
    Montserrat_600: require("@/src/assets/fonts/Montserrat-SemiBold.ttf"),
    Montserrat_700: require("@/src/assets/fonts/Montserrat-Bold.ttf"),
  });
};