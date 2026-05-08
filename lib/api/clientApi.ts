import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const clientApi = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

clientApi.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isAuthRoute =
      originalRequest.url?.includes('/auth/refresh') ||
      originalRequest.url?.includes('auth/getMe') ||
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/register') ||
      originalRequest.url?.includes('/auth/logout');

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute
    ) {
      originalRequest._retry = true;

      await clientApi.post('/auth/refresh');

      return clientApi(originalRequest);
    }

    return Promise.reject(error);
  }
);
