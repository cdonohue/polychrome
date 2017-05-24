/** 
 * Based on the Y value in https://en.m.wikipedia.org/wiki/YIQ
 * Used to calculate perceived brightness in accessibility W3C spec
 * https://www.w3.org/TR/AERT#color-contrast
 */
export default (r, g, b) => (299 * r + 587 * g + 114 * b) / 1000;