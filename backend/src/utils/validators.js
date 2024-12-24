/**
 * validates email format using a robust regex pattern
 * @param {string} email - email to validate
 * @returns {boolean} true if email is valid
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
};

export function isValidUUID(str) {
    // basic v4 UUID check (case-insensitive)
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
}
