const patterns = {
  hex: /^#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  rgb: /^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),?\s*(\d?\.?\d+)?\)$/,
  hsl: /^hsla?\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%,?\s*(\d?\.?\d+)?\)$/,
};

export default {
  ...patterns,
  asList: Object.keys(patterns).map((name) => ({ name, regex: patterns[name] })),
}
