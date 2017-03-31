import make from "./make";
import { getPercentageModifier } from "./utils";

export const setLightness = (color, percentage = null) => {
  if (percentage === null) return color;
  const { h, s, a } = color;
  const l = (percentage > 100) ? 100 : ((percentage < 0) ? 0 : percentage);
  return make.fromHsl(h, s, l, a);
}

export const lighten = (color, percentage = 10) => {
  const { l } = color;
  return setLightness(color, l + getPercentageModifier(l, percentage));
}

export const darken = (color, percentage = 10) => {
  const { l } = color;
  return setLightness(color, l - getPercentageModifier(l, percentage));
}
