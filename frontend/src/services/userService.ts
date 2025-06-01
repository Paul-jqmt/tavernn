import { UserGame, GameLevel } from '@/types/userGame.ts'
import api from "@/services/api.ts";
import {User} from "@/types/user.ts";
import {Club} from "@/types/club.ts";
import {Team} from "@/types/team.ts";

export const userService = {
    async getCurrentUserData(): Promise<User> {
        const response = await api.get("/api/users/me");
        return response.data;
    },

    async getUserProfile(userId: string): Promise<User> {
        const response = await api.get(`/api/users/${userId}`);
        return response.data;
    },

    async getUserGames(userId: string | undefined): Promise<UserGame[]> {
        const response = await api.get(`/api/users/${userId}/games`);
        return response.data;
    },

    async addUserGame(userId: string | undefined, gameId: string, level: GameLevel): Promise<UserGame> {
        const response = await api.post(`/api/users/${userId}/games`, {
            gameId,
            gameLevel: level
        });

        return response.data;
    },

    async updateGameLevel(userId: string | undefined, gameId: string, level: GameLevel): Promise<UserGame> {
        const response = await api.put(`/api/users/${userId}/games/${gameId}`, {
            gameLevel: level
        });

        return response.data;
    },

    async getUserClub(userId: string | undefined): Promise<Club[]> {
        const response = await api.get(`/api/users/${userId}/club`);
        return response.data;
    },

    async getUserTeams(userId: string | undefined): Promise<Team[]> {
        const response = await api.get(`/api/users/${userId}/teams`);
        return response.data;
    },

    async deleteUserGame(userId: string | undefined, gameId: string): Promise<void> {
        await api.delete(`/api/users/${userId}/games/${gameId}`);
    }
}