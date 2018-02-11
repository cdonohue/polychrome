import parse from "./parse";
import relativeLuminance from "./relativeLuminance";
import { darken, lighten } from "./lightness";

const contrast = (color, dark = parse("#000"), light = parse("#FFF")) => {
  const baseColor = parse(color);
  const darkColor = typeof dark === "string" ? parse(dark) : dark;
  const lightColor = typeof light === "string" ? parse(light) : light;

  const contrastColor = baseColor.luma < 128 ? lightColor : darkColor;

  /**
   * Calculate relative luminance and find ratio
   * https://www.w3.org/TR/2016/NOTE-WCAG20-TECHS-20161007/G18
   */
  const rLums = [ relativeLuminance(baseColor), relativeLuminance(contrastColor)];

  const contrastRatio = (Math.max(...rLums) + 0.05) / (Math.min(...rLums) + 0.05);

  if (contrastRatio >= 4.5) {
    return contrastColor;
  }

  // TODO: Check to see either possible contrast color has a ratio of >= 4.5,
  // regardless of the baseColor luma value
  if (darkColor.l === 0 || lightColor.l === 100) {
    return contrastColor;
  }

  return contrast(baseColor, darken(darkColor, 1), lighten(lightColor,1));
};

export default contrast;
