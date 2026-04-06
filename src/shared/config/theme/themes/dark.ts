import {
  cardColorsDark,
  commonColorsDark,
  inputColorsDark,
  navigationColorsDark,
  pillColorsDark,
  spinnerGradient,
} from "../colors";
import { fonts } from "../fonts";
import { borderRadius } from "../radius";
import type { Theme } from "../types";

export const darkTheme: Theme = {
  dark: true,
  colors: {
    ...commonColorsDark,
    ...inputColorsDark,
    ...cardColorsDark,
    ...navigationColorsDark,
    ...pillColorsDark,
  },
  fonts,
  borderRadius,
  gradients: {
    spinner: spinnerGradient,
  },
};
