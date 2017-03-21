import make from "./make";
import parse from "./parse";

export default (color, percentage = 50) => {
  const c = parse(color);
  const { h, s, l, a } = c;
  const newAlpha = a - (a * (percentage / 100));
  return make.fromHsl(h, s, l, (newAlpha < 0) ? 0 : newAlpha);
}
