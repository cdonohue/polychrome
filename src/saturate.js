import make from "./make";

export default (color, percentage = 10) => {
  const { h, s, l, a } = color;
  const modifier = s ? s * (percentage / 100) : percentage;
  const newSaturation = s + modifier;
  return make.fromHsl(h, (newSaturation > 100) ? 100 : newSaturation, l, a);
}
