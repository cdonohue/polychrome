import make from "./make";

export default (color, percentage = 50) => {
  const { h, s, l, a } = color;
  const modifier = a ? a * (percentage / 100) : percentage / 100;
  const newAlpha = a + modifier;
  return make.fromHsl(h, s, l, (newAlpha > 1) ? 1 : newAlpha);
}
