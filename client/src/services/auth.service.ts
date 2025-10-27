import axios from "axios";

import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from "../types/auth.type";

class AuthService {
  public login = async (data: LoginDto) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/auth/login`,
        data
      );

      console.log(response.data);

      return response.data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  public register = async (data: RegisterDto) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/auth/register`,
        data
      );

      console.log(response.data);

      return response.data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  public requestPasswordReset = async (data: ForgotPasswordDto) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/auth/forgot-password`,
        data
      );

      console.log(response.data);

      return response.data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  public resetPassword = async (data: ResetPasswordDto) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/auth/reset-password`,
        data
      );

      console.log(response.data);

      return response.data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
}

export default AuthService;
