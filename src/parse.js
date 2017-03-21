import patterns from "./patterns";
import make from "./make";

const parsers = {
  hex(hexString) {
    let hex = hexString.replace("#", "");
    if (hex.length < 6) {
      hex = hex.split("").map(char => char.concat(char)).join("");
    }

    return [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)];
  },
  rgb(rgbString) {
    const [ r, g, b, a = 1 ] = rgbString.match(patterns.rgb).slice(1);
    return [parseInt(r), parseInt(g), parseInt(b), parseFloat(a)];
  },
  hsl(hslString) {
    const [ h, s, l, a = 1 ] = hslString.match(patterns.hsl).slice(1);
    return [parseInt(h), parseInt(s), parseInt(l), parseFloat(a)];
  },
}

export default (color) => {
  if (!color) return make.fromRgb(0,0,0);

  if (typeof color !== "string") return color;

  const matchingPatterns = patterns.asList
    .filter(pattern => color.match(pattern.regex))
  ;

  if (!matchingPatterns.length) {
    throw new Error(`No matching color patterns found for ${color}`);
  }
  return matchingPatterns
    .reduce((matches, { name }) => {
      return make[`from${name.charAt(0).toUpperCase()}${name.slice(1)}`](...parsers[name](color));
    }, {})
  ;
};
