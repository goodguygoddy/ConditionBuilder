/**
 * Checks if the provided value is a number.
 * @param value The value to test if it is a number.
 * @returns True if the value is a number, false otherwise.
 */
const isValidNumber = (value: string | number): boolean => {
  return value !== null && value !== undefined && !isNaN(Number(value));
};

export default isValidNumber;