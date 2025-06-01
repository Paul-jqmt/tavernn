import axios, {AxiosError, AxiosInstance, InternalAxiosRequestConfig} from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// REQUEST INTERCEPTOR TO ADD THE TOKEN TO THE HEADERS
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('accessToken');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);


// RESPONSE INTERCEPTOR TO REFRESH THE TOKEN'
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            window.location.href = '/auth';
        }
        return Promise.reject(error);
    }
);
export default api;