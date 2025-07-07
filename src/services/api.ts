import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.status === 401) {
      const isLogged = localStorage.hasItem('isLogged') && localStorage.getItem('isLogged');
      localStorage.setItem('isLogged', 'false');

      if (isLogged) {
        router.push({ name: 'login' });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
