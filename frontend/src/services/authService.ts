import api from './api';
import {User} from '@/types/user.ts';
import {LoginRequest, RegisterRequest, AuthResponse} from '@/types/auth.ts';

export const authService = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/api/auth/login', credentials);

        if (response.data) {
            localStorage.setItem('token', response.data.token);
        }

        return response.data;
    },

    register: async (userData: RegisterRequest): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/api/auth/register', userData);

        if(response.data) {
            localStorage.setItem('token', response.data.token);
        }

        return response.data;
    },

    logout: async (): Promise<void> => {
        try {
            await api.post('/auth/logout');
            localStorage.removeItem('token');
        } catch (error) {
            console.log('Failed to logout:', error);
            localStorage.removeItem('token');
            throw error;
        }
    },

    getCurrentUser: async (): Promise<User> => {
        try {
            const response = await api.get('/api/users/me');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch current user:', error);
            throw error;
        }
    },

    isAuthenticated: (): boolean => {
        const token = localStorage.getItem('token');
        return !!token;
    },

    updateUser: async (userId: string, updatedUser: Partial<User>): Promise<User> => {
        try {
            const response = await api.put<User>(`/api/users/${userId}`, updatedUser);
            return response.data;
        } catch (error) {
            console.error('Failed to update user:', error);
            throw error;
        }
    },

    getToken: (): string | null => {
        return localStorage.getItem('token');
    },

    refreshToken: async (): Promise<string> => {
        try {
            const response = await api.post('/api/auth/refresh');
            const newToken = response.data.token;
            localStorage.setItem('token', newToken);
            return newToken;
        } catch (error) {
            console.error('Failed to refresh token:', error);
            throw error;
        }
    }
};

export default authService;