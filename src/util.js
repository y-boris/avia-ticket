export const getNoun = (n) => {
  n %= 100;
  if (n >= 5 && n <= 20) {
    return "пересадок";
  }
  n %= 10;
  if (n === 1) {
    return "пересадка";
  }
  if (n >= 2 && n <= 4) {
    return "пересадки";
  }
  if (n === 0) {
    return "без пересадок";
  }
  return "пересадок";
};