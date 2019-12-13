/**
 * Don't do this at home.
 * Use a decent library or framework like Axios or Angular HttpClient.
 */
export function createQueryString(queryParamMap) {
  return Array.from(queryParamMap.entries())
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
}
