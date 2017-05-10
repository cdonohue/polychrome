import make from "./make";
import { getPercentageModifier } from "./utils";

export const setSaturation = (color, percentage = null) => {
  if (percentage === null) return color;
  const { h, l, a } = color;
  const s = (percentage > 100) ? 100 : ((percentage < 0) ? 0 : percentage);
  return make.fromHsl(h, s, l, a);
}

export const saturate = (color, percentage = 10) => {
  const { s } = color;
  return setSaturation(color, s + getPercentageModifier(s, percentage));
}

export const desaturate = (color, percentage = 10) => {
  const { s } = color;
  return setSaturation(color, s - getPercentageModifier(s, percentage));
}