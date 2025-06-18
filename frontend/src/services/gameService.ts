import {Game} from "@/types/game.ts";
import api from "@/services/api.ts";

export const gameService = {
    async getGames() : Promise<Game[]> {
        const response = await api.get('/api/games');
        return response.data;
    },

    async getGame(gameId: string) : Promise<Game> {
        const response = await api.get(`/api/games/${gameId}`);
        return response.data;
    },

    async getGameName(gameId: string) : Promise<string> {
        const response = await api.get(`/api/games/${gameId}`);
        return response.data.name;
    }
}