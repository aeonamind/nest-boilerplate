export const parseJsonSafe = (value: string, returnNullOnError = false) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return returnNullOnError ? null : value;
  }
};
