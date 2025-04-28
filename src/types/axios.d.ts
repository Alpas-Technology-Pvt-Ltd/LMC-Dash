// types/axios.d.ts
import { AxiosRequestConfig } from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    token?: string; // Add custom token property
  }
}