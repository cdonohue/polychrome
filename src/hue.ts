import make from "./make";

export const setHue = (color, hueValue) => {
  if (hueValue === null) return color;
  const { s, l, a } = color;
  return make.fromHsl(hueValue, s, l, a);
}

export const spin = (color, degrees = 0) => {
  const { h } = color;
  const newHue = h + degrees;

  return setHue(color, (newHue + 360) % 360);
}

export const complimentary = (color) => spin(color, 180);
