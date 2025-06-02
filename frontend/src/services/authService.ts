import api from './api';
import {User} from '@/types/user.ts';
import {LoginRequest, RegisterRequest, AuthResponse} from '@/types/auth.ts';

export const authService = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        try {
            const response = await api.post<AuthResponse>('/api/auth/login', credentials);

            if (response.data) {
                localStorage.setItem('accessToken', response.data.token);
                return response.data;
            }

            throw new Error('Login failed: No token received');
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    },

    register: async (userData: RegisterRequest): Promise<AuthResponse> => {
        try {
            const response = await api.post<AuthResponse>('/api/auth/register', userData);

            if(response.data) {
                localStorage.setItem('accessToken', response.data.token);
                return response.data;
            }

            throw new Error('Registration failed: No token received');
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    },

    logout: async (): Promise<void> => {
        try {
            await api.post('/auth/logout');
            localStorage.removeItem('accessToken');
        } catch (error) {
            console.log('Failed to logout:', error);
            localStorage.removeItem('accessToken');
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
        const token = localStorage.getItem('accessToken');
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
        return localStorage.getItem('accessToken');
    },

    refreshToken: async (): Promise<string> => {
        try {
            const response = await api.post('/api/auth/refresh');
            const newToken = response.data.token;
            localStorage.setItem('accessToken', newToken);
            return newToken;
        } catch (error) {
            console.error('Failed to refresh token:', error);
            throw error;
        }
    }
};

export default authService;