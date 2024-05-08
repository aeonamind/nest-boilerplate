import { roundByDecimal } from './number.util';

export const calculateResponseTime = (startAt: bigint, endAt: bigint) => {
  return roundByDecimal(Number(endAt - startAt) / 1e6, 2);
};
