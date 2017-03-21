import make from "./make";
import parse from "./parse";

export default (color, percentage = 10) => {
  const c = parse(color);
  const { h, s, l, a } = c;
  const newSaturation = s + (s * (percentage / 100));
  return make.fromHsl(h, (newSaturation > 1) ? 1 : newSaturation, l, a);
}
