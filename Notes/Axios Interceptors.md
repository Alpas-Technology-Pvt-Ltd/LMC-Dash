`````Javascript

import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'https://alert.alpalika.com',
});

// Add request interceptor to add token to all requests
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response, // Case 1: If response is successful, just return it
  async (error) => {      // Case 2: If there's an error, this function handles it

    const originalRequest = error.config; // error.config contains the original failed request details (URL, headers, etc.)


    // If error is 401(Unauthorized) and we haven't tried refreshing yet
    if (error.response.status === 401 && !originalRequest._retry) {
        // mark the retry flag as true, since this time we are trying to refresh the access token.
      originalRequest._retry = true;

      try {
        // Call refresh token endpoint
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('/auth/refresh', { refreshToken });

        // Store new access token
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh token is expired, logout user
        // clear all the tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // Redirect to login page
        window.location.href = '/login';
      }
    }

    // If error wasn't a 401 or refresh failed, reject with original error
    return Promise.reject(error);
  }
);````
`````
