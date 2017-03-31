export const getAlphaModifier = (alpha, percentage) => {
  const ratio = percentage / 100;
  return alpha ? alpha * ratio : ratio;
}

export const getPercentageModifier = (value, percentage) => {
  return value ? value * (percentage / 100) : percentage;
}
