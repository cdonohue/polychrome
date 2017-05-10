import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from "./conversion";
import { darken, lighten, setLightness } from "./lightness";
import { fadeIn, fadeOut, setAlpha } from "./alpha";
import contrast from "./contrast";
import saturate from "./saturate";
import desaturate from "./desaturate";
import luma from "./luma";

const makeColor = (properties) => {
  const { rHex, gHex, bHex, r, g, b, h, s, l, a = 1 } = properties;
  const color = {
    ...properties,

    hex() {
      return `#${rHex}${gHex}${bHex}`;
    },
    rgb() {
      return (a < 1)
        ? `rgba(${r},${g},${b},${a})`
        : `rgb(${r},${g},${b})`
      ;
    },
    hsl() {
      return (a < 1)
        ? `hsla(${h},${s}%,${l}%,${a})`
        : `hsl(${h},${s}%,${l}%)`
      ;
    },
    luma: luma(r, g, b),
  }

  return {
    ...color,
    isDark() {
      return color.luma < 128;
    },
    isLight() {
      return color.luma >= 128;
    },
    setLightness(percentage) {
      return setLightness(color, percentage);
    },
    darken(percentage) {
      return darken(color, percentage);
    },
    lighten(percentage) {
      return lighten(color, percentage);
    },
    setAlpha(percentage) {
      return setAlpha(color, percentage);
    },
    fadeIn(percentage) {
      return fadeIn(color, percentage);
    },
    fadeOut(percentage) {
      return fadeOut(color, percentage);
    },
    contrast(dark, light) {
      return contrast(color, dark, light);
    },
    saturate(percentage) {
      return saturate(color, percentage);
    },
    desaturate(percentage) {
      return desaturate(color, percentage);
    }
  };
};

export default {
  fromHex(rHex, gHex, bHex) {
    const [r, g, b] = hexToRgb(rHex, gHex, bHex);
    const [h, s, l, a] = rgbToHsl(r, g, b);

    return makeColor({
      rHex, gHex, bHex,
      r, g, b,
      h, s, l, a,
    });
  },
  fromRgb(r, g, b, a = 1) {
    const [rHex, gHex, bHex] = rgbToHex(r, g, b);
    const [h, s, l] = rgbToHsl(r, g, b);

    return makeColor({
      rHex, gHex, bHex,
      r, g, b,
      h, s, l, a,
    });
  },
  fromHsl(h, s, l, a = 1) {
    const [r, g, b] = hslToRgb(h, s, l);
    const [rHex, gHex, bHex] = rgbToHex(r, g, b);

    return makeColor({
      rHex, gHex, bHex,
      r, g, b,
      h, s, l, a,
    });
  }
}
