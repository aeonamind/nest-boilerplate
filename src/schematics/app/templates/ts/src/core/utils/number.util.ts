export const roundByDecimal = (num: number, decimalAmount = 2) =>
  Math.round((num + Number.EPSILON) * 10 ** decimalAmount) /
  10 ** decimalAmount;
