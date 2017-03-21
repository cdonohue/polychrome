import make from "./make";

export default (color, percentage = 50) => {
  const { h, s, l, a } = color;
  const newAlpha = a + (a * (percentage / 100));
  return make.fromHsl(h, s, l, (newAlpha > 1) ? 1 : newAlpha);
}
