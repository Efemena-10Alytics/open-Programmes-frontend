import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export function setTokens(accessToken: string, refreshToken: string): void {
  console.log("setting tokens....", accessToken, refreshToken);
  
  // Set cookies with options (optional)
  setCookie("accessToken", accessToken, {
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });
  
  setCookie("refreshToken", refreshToken, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export function getAccessToken(): string | undefined {
  const token = getCookie("accessToken");
  return token as string | undefined;
}

export function getRefreshToken(): string | undefined {
  const token = getCookie("refreshToken");
  return token as string | undefined;
}

export function removeTokens(): void {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
}