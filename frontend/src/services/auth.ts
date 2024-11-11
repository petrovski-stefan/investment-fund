import { AuthResponse, LoginData, RegisterData } from '../types/auth';

import axiosInstance from './axios-instance';

const LOGIN_URL = '/auth/login';
const REGISTER_URL = '/auth/register';

export const loginUser = async (loginData: LoginData) => {
  const { data } = await axiosInstance.post<AuthResponse>(LOGIN_URL, loginData);

  return data;
};

export const registerUser = async (registerData: RegisterData) => {
  const { data } = await axiosInstance.post<AuthResponse>(REGISTER_URL, registerData);

  return data;
};
