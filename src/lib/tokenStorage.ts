// lib/tokenStorage.ts
import Cookies from "js-cookie";

export function setTokens(accessToken: string, refreshToken: string): void {
  console.log("setting tokens....", accessToken, refreshToken);
  Cookies.set("accessToken", accessToken);
  Cookies.set("refreshToken", refreshToken);
}

export function getAccessToken(): string | undefined {
  // console.log("getting access token:", Cookies.get("accessToken"));
  return Cookies.get("accessToken");
}

export function getRefreshToken(): string | undefined {
  return Cookies.get("refreshToken");
}

export function removeTokens(): void {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
}
