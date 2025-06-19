import {Game} from "@/types/game.ts";
import api from "@/services/api.ts";

export const gameService = {
    async getGames() : Promise<Game[]> {
        const response = await api.get('/api/game');
        return response.data;
    },

    async getGame(gameId: string) : Promise<Game> {
        const response = await api.get(`/api/game/${gameId}`);
        return response.data;
    },

    async getGameName(gameId: string) : Promise<string> {
        const response = await api.get(`/api/game/${gameId}`);
        return response.data.name;
    }
}