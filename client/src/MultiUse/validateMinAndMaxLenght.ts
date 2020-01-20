export const validateMinAndMaxLenght = (
  string: string,
  minLenght: number,
  maxLenght: number = 50
) => {
  const stringLength = string.trim().length;

  if (stringLength < minLenght || stringLength > maxLenght) {
    return false;
  }
  return true;
};
