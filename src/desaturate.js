import make from "./make";

export default (color, percentage = 10) => {
  const { h, s, l, a } = color;
  const newSaturation = s - (s * (percentage / 100));
  return make.fromHsl(h, (newSaturation < 0) ? 0 : newSaturation, l, a);
}
