import api from './api';
import {LoginRequest} from '../types/models/login';
import {User} from '../types/models/user';


export const authService = {

    login: async (credentials: LoginRequest): Promise<User> => {

        const response = await api.post<User>('/auth/login', credentials, {
            withCredentials: true
        });
        return response.data;
    },

    logout: async (): Promise<void> => {
        await api.post('/auth/logout', {}, {
            withCredentials: true
        });
    },

    getCurrentUser: async (): Promise<User> => {
        const response = await api.get<User>('/auth/me', {
            withCredentials: true
        });
        return response.data;
    }
};
