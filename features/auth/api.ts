import { clientApi } from '@/lib/api/clientApi';
import { RegisterResponse, RegistrationFormValues } from './types';

export const registerUser = async (body: RegistrationFormValues) => {
  const response = await clientApi.post<RegisterResponse>(
    '/auth/register',
    body
  );
  return response.data;
};
