import { clientApi } from '@/lib/api/clientApi';
import {
  LoginFormValues,
  LoginResponse,
  RegisterResponse,
  RegistrationFormValues,
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
