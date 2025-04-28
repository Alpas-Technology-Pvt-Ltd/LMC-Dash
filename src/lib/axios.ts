import { generateSignatureV2 } from '@/utils/utilitiesFn';
import axios from 'axios';

import Cookies from 'js-cookie';

const BASE_URL = 'https://alert.alpalika.com';

function deleteCookie(name, path = '/') {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
}

const api = axios.create({
  baseURL: `${BASE_URL}`,
});

api.interceptors.request.use((config) => {
    const accessToken =
      typeof Window !== 'undefined' ? Cookies.get('accessToken') : null;
    if (accessToken) {
      const { timestampV2, signatureV2 } = generateSignatureV2();
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers['X-API-KEY'] = process.env.NEXT_PUBLIC_X_API_KEY;
      config.headers['X-API-TIMESTAMP'] = timestampV2;
      config.headers['X-API-SIGNATURE'] = signatureV2;
    }
    return config;
  },
  (error) => Promise.reject(error), 
);

api.interceptors.response.use(
  (response) => response, // success mah yoh wala CB run huncha
  async (error) => {
    // error mah yoh wala CB run huncha
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get('refreshToken');
      const originalErrorResponse = error.response?.data;

      // Request new access token
      try {
        const response = await axios.post(
          'https://alert.alpalika.com/api/v1/refresh/',
          {
            refresh: refreshToken,
          },
        );

        //-----------------------------------------------------------------------------------------------------------------------------------------//
        // Yoh point mai check gar , if response is good (refresh token has not expired and it has sent a new acccess token) || response is bad ((refresh token has expired )
        const { access, refresh } = response.data;

        console.log(access, refresh, 'New access and refresh token before');

        // Not working as expected
        // Cookies.set('accessToken', access);
        // Cookies.set('refreshToken', refresh);

        deleteCookie('accessToken');
        deleteCookie('refreshToken');

        // Replacement for above code
        Cookies.set('accessToken', access, {
          path: '/',
        });
        Cookies.set('refreshToken', refresh, {
          path: '/',
        });

        console.log(access, refresh, 'New access and refresh token after');

        // Update the original request with new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear tokens and redirect to login
        deleteCookie('accessToken');
        deleteCookie('refreshToken');

        console.log('refresh token error', refreshError);
        return Promise.reject({
          refreshTokenError: refreshError,
          originalErrorResponse,
        });
      }
    }
    return Promise.reject(error);
  },
);

export default api;
