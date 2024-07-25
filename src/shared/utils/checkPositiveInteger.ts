export const positiveIntegerStringToNumber = (value: string | null | undefined): number | null => {
  if (!value) return null;
  const number = Number(value);
  if (Number.isInteger(number) && number > 0 && number.toString() === value) {
    return number;
  }
  return null;
};
