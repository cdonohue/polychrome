/**
 * https://en.m.wikipedia.org/wiki/Relative_luminance
 */
export default color => {
  const [R, G, B] = [color.r, color.g, color.b].map(channel => {
    const sRGB = channel / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};
