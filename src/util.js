export const getNoun = (value, words) => {
  const valueABS = Math.abs(value) % 100;
  const num = valueABS % 10;

  if (valueABS > 10 && valueABS < 20) return words[2];

  if (num > 1 && num < 5) return words[1];

  if (num === 1) return words[0];

  return words[2];
};