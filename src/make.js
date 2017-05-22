import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from "./conversion";
import { darken, lighten, setLightness } from "./lightness";
import { fadeIn, fadeOut, setAlpha } from "./alpha";
import { desaturate, grayscale, saturate, setSaturation } from "./saturation";
import { complimentary, setHue, spin } from "./hue";
import contrast from "./contrast";

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
    luma: (299 * r + 587 * g + 114 * b) / 1000,
  }

  return {
    ...color,
    setHue(degrees) {
      return setHue(color, degrees);
    },
    spin(degrees) {
      return spin(color, degrees);
    },
    complimentary() {
      return complimentary(color);
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
    setSaturation(percentage) {
      return setSaturation(color, percentage);
    },
    saturate(percentage) {
      return saturate(color, percentage);
    },
    desaturate(percentage) {
      return desaturate(color, percentage);
    },
    grayscale() {
      return grayscale(color);
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
