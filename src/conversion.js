export const hexToRgb = (red, green, blue) => {
  return [red, green, blue].map(value => parseInt(value, 16));
};

export const rgbToHex = (red, green, blue) => {
  return [red, green, blue].map(value => `0${parseInt(value, 10).toString(16)}`.toUpperCase().slice(-2));
};

export const rgbToHsl = (red, green, blue, alpha = 1) => {
  const [r, g, b] = [red, green, blue].map(value => value / 255);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  const delta = max - min;

  const l = (max + min) / 2;

  if (max === min) {
    return [0, 0, Math.round(l * 100), alpha];
  }

  const s = l < 0.5 ? delta / (max + min) : delta / (2.0 - max - min);

  const [rDelta, gDelta, bDelta] = [r, g, b]
    .map(channel => (((max - channel) / 6) + (delta / 2)) / delta)
  ;

  let h = 0;
  switch (max) {
    case r: h = bDelta - gDelta; break;
    case g: h = (1 / 3) + rDelta - bDelta; break;
    case b: h = (2 / 3) + gDelta - rDelta; break;
  }

  if (h < 0) h += 1;
  if (h > 1) h -= 1;

  return [ h * 360, s * 100, l * 100, alpha ].map(value => Math.round(value));
};

export const hslToRgb = (hue, saturation, lightness, alpha = 1) => {
  const [ h, s, l ] = [hue / 360, saturation / 100, lightness / 100];

  if (s == 0) {
   return [l, l, l].map(v => Math.round(v * 255)).concat(alpha);
  }

  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if ((t * 6) < 1) return p + (q - p) * 6 * t;
    if ((t * 2) < 1) return q;
    if ((t * 3) < 2) return p + (q - p) * ((2/3) - t) * 6;
    return p;
  }

  const q = l < 0.5 ? l * (1 + s) : (l + s) - (l * s);
  const p = 2 * l - q;

  const r = hue2rgb(p, q, h + 1/3);
  const g = hue2rgb(p, q, h);
  const b = hue2rgb(p, q, h - 1/3);

  return [r, g, b].map(v => Math.round(v * 255)).concat(alpha);
};
