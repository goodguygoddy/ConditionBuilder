/**
 * Checks if the provided string is a valid URL.
 * @param url The string to test as a URL.
 * @returns True if the string is a valid URL, false otherwise.
 */
export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};