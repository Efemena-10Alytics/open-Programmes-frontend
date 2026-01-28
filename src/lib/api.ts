// lib/api.ts
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  removeTokens,
} from "./tokenStorage";
import { refreshToken } from "./auth";
import { config } from "../config";

const api: AxiosInstance = axios.create({
  //   baseURL: process.env.API_BASE_URL,
  baseURL: config.url.API_URL,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
      // console.log("bearer:", token);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshTokenString = getRefreshToken();
        if (!refreshTokenString) throw new Error("No refresh token available");

        const { accessToken, refreshToken: newRefreshToken } =
          await refreshToken(refreshTokenString);

        setTokens(accessToken, newRefreshToken);

        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        removeTokens();
        // Redirect to login page or handle the error
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// export const fetcher = (url: string) =>
//   api.get(url).then((res) => {
//     console.log(res);
//     return res.data.data;
//   });

// Fetcher for GET requests
export const fetcher = async <T = any>(url: string): Promise<T> => {
  const res = await api.get<{ data: T }>(url);
  console.log(res);
  return res.data.data;
};