import api from './api';
import {LoginRequest} from '../types/models/login';
import {User} from '../types/models/user';

interface AuthResponse {
    token: string;
    id: number;
    email: string;
    username: string;
    role: string;
}


export const authService = {
    login: async (credentials: LoginRequest): Promise<User> => {
        const response = await api.post<AuthResponse>('/auth/login', credentials);

        localStorage.setItem('accessToken', response.data.token);
        return {
            createdAt: "",
            id: response.data.id,
            email: response.data.email,
            username: response.data.username,
            role: response.data.role
        };
    },

    register: async (userData: User): Promise<User> => {
        const response = await api.post<AuthResponse>('/auth/register', userData);

        localStorage.setItem('accessToken', response.data.token);

        return {
            createdAt: "",
            id: response.data.id,
            email: response.data.email,
            username: response.data.username,
            role: response.data.role
        };
    },

    logout: async (): Promise<void> => {
        localStorage.removeItem('accessToken');
    },

    getCurrentUser: async (): Promise<User> => {
        const response = await api.get<User>('/auth/me');
        return response.data;
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('accessToken');
    },

    getToken: (): string | null => {
        return localStorage.getItem('accessToken');
    }
};