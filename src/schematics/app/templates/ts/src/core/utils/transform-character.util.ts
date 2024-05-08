export const snakeToCamel = (str: string) => {
  if (!str) return undefined;

  const converted = str.replace(/([-_]\w)/g, (group) => group[1].toUpperCase());
  return converted[0].toLowerCase() + converted.slice(1);
};

export const snakeToPascal = (str: string) => {
  if (!str) return undefined;

  const converted = str.replace(/([-_]\w)/g, (group) => group[1].toUpperCase());
  return converted.replace(/\b\w/g, (char) => char.toUpperCase());
};
