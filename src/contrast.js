import parse from "./parse";

export default (color, dark = parse("#000"), light = parse("#FFF")) => {
  const darkColor = (typeof dark === "string") ? parse(dark) : dark;
  const lightColor = (typeof light === "string") ? parse(light) : light;
  const c = parse(color);
  return c.luma < 128 ? lightColor : darkColor;
}
