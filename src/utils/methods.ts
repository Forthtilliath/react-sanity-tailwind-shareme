/**
 * It returns a promise that resolves after a given number of milliseconds
 * @param d - The number of milliseconds to wait.
 */
export const sleep = (d: number) => new Promise((r) => setTimeout(r, d));

/**
 * Remove the http:// or https:// from the beginning of a URL.
 * @param url - The URL to remove the protocol from.
 */
export const removeHttp = (url: string) => url.replace(/^https?:\/\//, '');

/**
 * Get the current time in seconds.
 */
export const getSeconds = () => Math.floor(Date.now() / 1000);
