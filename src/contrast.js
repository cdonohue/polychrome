import parse from "./parse";
import relativeLuminance from "./relativeLuminance";

const contrast = (color, dark = parse("#000"), light = parse("#FFF")) => {
  const baseColor = parse(color);
  const darkColor = typeof dark === "string" ? parse(dark) : dark;
  const lightColor = typeof light === "string" ? parse(light) : light;

  const contrastColor = baseColor.isDark() ? lightColor : darkColor;

  const rLums = [ relativeLuminance(baseColor), relativeLuminance(contrastColor)];

  const contrastRatio = (Math.max(...rLums) + 0.05) / (Math.min(...rLums) + 0.05);

  if (contrastRatio >= 4.5) {
    return contrastColor;
  }

  return contrast(baseColor, darkColor.darken(1), lightColor.lighten(1));
};

export default contrast;
