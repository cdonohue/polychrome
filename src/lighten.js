import make from "./make";

export default (color, percentage = 10) => {
  const { h, s, l, a } = color;
  const newLightness = l + (l * (percentage / 100));
  return make.fromHsl(h, s, (newLightness > 100) ? 100 : newLightness, a);
}
