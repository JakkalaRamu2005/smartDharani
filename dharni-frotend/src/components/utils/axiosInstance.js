import axios from 'axios'
import Cookies from 'js-cookie';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:9291/api',
    withCredentials: true,
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling expired tokens
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      Cookies.remove('token');
      Cookies.remove('userId');
      Cookies.remove('username');
      
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;