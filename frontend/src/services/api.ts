import axios, {AxiosInstance} from 'axios';

const API_URL = import.meta.env.API_URL

const api: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export default api;