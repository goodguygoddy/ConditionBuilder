/**
 * Checks if the provided string is a valid regular expression.
 * @param pattern The string to test as a regular expression.
 * @returns True if the string is a valid regex, false otherwise.
 */
const isValidRegex = (pattern: string): boolean => {
    try {
        new RegExp(pattern);
        return true;
    } catch (e) {
        return false;
    }
};

export default isValidRegex;