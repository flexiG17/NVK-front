import { GradientStop } from "../types";

export const spinnerGradient: GradientStop[] = [
  { offset: "0%", color: "#FF011B", opacity: "1" },
  { offset: "29%", color: "#FF0189", opacity: "0.7" },
  { offset: "54%", color: "#FF911E", opacity: "0.4" },
  { offset: "78%", color: "#FFEB00", opacity: "0.2" },
  { offset: "100%", color: "#FFBE0F", opacity: "0" },
];

export const rankingColumnsGradient = [
  "#FF011B",
  "#FF0189",
  "#FF911E",
  "#FFEB00",
] as const;
export const rankingColumnsLocations = [0, 0.39, 0.8, 1] as const;

export const progressBarGradient = [
  "#FFEB00",
  "#FF911E",
  "#FF0189",
  "#FF011B",
] as const;
