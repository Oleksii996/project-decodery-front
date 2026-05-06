import { clientApi } from '@/lib/api/clientApi';
import {
  LoginFormValues,
  LoginResponse,
  RegisterResponse,
  RegistrationFormValues,
  User,
} from './types';

export const registerUser = async (body: RegistrationFormValues) => {
  const response = await clientApi.post<RegisterResponse>(
    '/auth/register',
    body
  );
  return response.data;
};

export const loginUser = async (body: LoginFormValues) => {
  const response = await clientApi.post<LoginResponse>('/auth/login', body);
  return response.data;
};

export const logoutUser = async () => {
  const response = await clientApi.post('/auth/logout');
  return response.data;
};

export const getMe = async () => {
  const response = await clientApi.get<User>('/auth/me');
  return response.data;
};

export const refreshToken = async () => {
  const response = await clientApi.post<LoginResponse>('/auth/refresh');
  return response.data;
};
