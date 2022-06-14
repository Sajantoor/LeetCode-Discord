
/**
 * Used to style messages for the user
 * @param content The content of the message
 * @returns The message styled appropriately
 */
export function message(content: string): string {
    return content;
}


/**
 * Used to style error messages for the user
 * @param error The content of the message
 * @returns The message styled appropriately for an error message
 */
export function errorMessage(error: string): string {
    console.error(error);
    return `"**ERROR**: ${error}`;
}


/**
 * Used to style success messages for the user
 * @param content The content of the message
 * @returns The message styled appropriately for a success message
 */
export function successMessage(content: string): string {
    return `"**SUCCESS**: ${content}`;
}
