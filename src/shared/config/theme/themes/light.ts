import {
  cardColorsLight,
  commonColorsLight,
  inputColorsLight,
  navigationColorsLight,
  pillColorsLight,
} from "../colors";
import { fonts } from "../fonts";
import { borderRadius } from "../radius";
import type { Theme } from "../types";

export const lightTheme: Theme = {
  dark: false,
  colors: {
    ...commonColorsLight,
    ...inputColorsLight,
    ...cardColorsLight,
    ...navigationColorsLight,
    ...pillColorsLight,
  },
  fonts,
  borderRadius,
};
