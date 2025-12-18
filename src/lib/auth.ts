// lib/auth.ts
import axios from "axios";
import UserModel from "../models/User";
import { config } from "../config";

interface LoginResponse {
  refresh_token: string;
  data: UserModel;
}

interface SignupResponse {
  data: UserModel;
}

interface ForgetPasswordResponse {
  message: string;
  statue: number;
}

interface ResetPasswordResponse {
  message: string;
}

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// export async function login(
//   email: string,
//   password: string
// ): Promise<LoginResponse> {
//   const response = await axios.post<LoginResponse>("/api/auth/signin", {
//     email,
//     password,
//   });
//   console.log("login", response);
//   console.log(response.data);
//   return response.data;
// }

const baseURL = config.url.API_URL;

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  console.log(email, password);
  const response = await axios.post<LoginResponse>(
    `${baseURL}/api/auth/signin`,
    {
      email,
      password,
    }
  );
  return response.data;
}

export async function signup(
  name: string,
  email: string,
  phone_number: string,
  password: string
): Promise<SignupResponse> {
  const response = await axios.post<SignupResponse>(
    `${baseURL}/api/auth/register`,
    {
      name,
      email,
      phone_number,
      password,
    }
  );
  return response.data;
}

export async function forgetPassword(
  email: string
): Promise<{ data: ForgetPasswordResponse | null; status: number }> {
  console.log(email);
  try {
    const response = await axios.post<ForgetPasswordResponse>(
      `${baseURL}/api/auth/forgot-password`,
      { email }
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { data: null, status: error.response.status };
    }
    // For network errors or other issues
    return { data: null, status: 500 };
  }
}

export async function resetPassword(
  code: string,
  password: string,
  password_confirmation: string
): Promise<{ data: ResetPasswordResponse | null; status: number }> {
  try {
    const response = await axios.post<ResetPasswordResponse>(
      `${baseURL}/api/auth/reset-password`,
      {
        code,
        password,
        password_confirmation,
      }
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { data: null, status: error.response.status };
    }
    // For network errors or other issues
    return { data: null, status: 500 };
  }
}

export async function refreshToken(
  refreshToken: string
): Promise<RefreshTokenResponse> {
  const response = await axios.post<RefreshTokenResponse>(
    `${baseURL}/api/auth/refresh-access-token`,
    {
      refreshToken,
    }
  );
  return response.data;
}
