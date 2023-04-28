const BASE_URL = "https://phantom.app/ul/v1/";

export const buildUrl = (path: string, params: URLSearchParams) =>
  `${BASE_URL}${path}?${params.toString()}`;

export const redirectUrl = (path: string) =>
  `wizfront://com.test.com/${path}`;