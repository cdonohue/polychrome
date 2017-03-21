import make from "./make";
import parse from "./parse";

export default (color, percentage = 10) => {
  const c = parse(color);
  const { h, s, l, a } = c;
  const newLightness = l - (l * (percentage / 100));
  return make.fromHsl(h, s, (newLightness < 0) ? 0 : newLightness, a);
}
