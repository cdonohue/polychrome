import make from "./make";

export const setHue = (color, hueValue) => {
  if (hueValue === null) return color;
  const { s, l, a } = color;
  return make.fromHsl(hueValue, s, l, a);
}

export const spin = (color, degrees = 0) => {
  const { h } = color;
  const newHue = h + degrees;

  if (newHue < 0) {
    return setHue(color, 360 - Math.abs(newHue));
  }

  if (newHue > 360) {
    return setHue(color, newHue - 360);
  }

  return setHue(color, newHue);
}

export const complimentary = (color) => spin(color, 180);
