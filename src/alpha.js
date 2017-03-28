import make from "./make";

const getAbsoluteModifier = (alpha, percentage) => {
  const ratio = percentage / 100;
  return alpha ? alpha * ratio : ratio;
}

export const setAlpha = (color, percentage = null) => {
  if (percentage === null) return color;
  const { h, s, l } = color;
  const a = (percentage > 100) ? 1 : ((percentage < 0) ? 0 : percentage / 100);
  return make.fromHsl(h, s, l, a);
}

export const fadeIn = (color, percentage = 50) => {
  const { a } = color;
  return setAlpha(color, (a + getAbsoluteModifier(a, percentage)) * 100);
}

export const fadeOut = (color, percentage = 50) => {
  const { a } = color;
  return setAlpha(color, (a - getAbsoluteModifier(a, percentage)) * 100);
}
