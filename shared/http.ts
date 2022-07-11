import {api_url} from '@env';
import auth from './stores/auth';
import type {AxiosError} from 'axios';
import axios from 'axios';

export const http = axios.create({baseURL: api_url});

http.interceptors.request.use(request => {
  const {token} = auth.getState().data!;
  (request.headers as any).Authorization = `Bearer ${token}`;
  return request;
});

http.interceptors.response.use(
  response => response.data,
  error => {
    // const originalRequest = error.config;
    // const { status } = error.response ?? {}

    const err = (error as AxiosError).response?.data ?? (error as Error);

    return Promise.reject(err);
  },
);