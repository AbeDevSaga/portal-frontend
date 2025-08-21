
export const sanitizeInput = (input: string) => {
    const sanitizedText = input.replace(/[^\p{L}\p{N}\s@.,'"-/]/gu, "");

    return sanitizedText;
};

export const sanitizeNumber = (input: string) => {
    const num = parseFloat(input);
    return isNaN(num) ? null : num;
};

export const sanitizeUserName = (input: string) => {
    const sanitizedText = input.replace(/[^\p{L}\p{N}\s@_]/gu, "");

    return sanitizedText;
};
