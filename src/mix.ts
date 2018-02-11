import make from "./make";
import parse from "./parse";

export const mix = (color, secondColor) => {
  const mixingColor = (typeof secondColor === "string") ? parse(secondColor) : secondColor;
  const { r, g, b, a } = color;
  return make.fromRgb(...Object.keys({ r, g, b, a })
    .map(channel => (color[channel] + mixingColor[channel]) / 2)
  );
}

export const tint = (color) => mix(color, "#FFF");

export const shade = (color) => mix(color, "#000");
