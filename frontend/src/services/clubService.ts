import {Club, ClubRequest} from "@/types/club.ts";
import api from "@/services/api.ts";
import {ClubMember} from "@/types/clubMember.ts";
import {Team} from "@/types/team.ts";

export const clubService = {
    async getClubs(): Promise<Club[]> {
        const response = await api.get("/api/club");
        return response.data;
    },

    async getClub(clubId: string): Promise<Club> {
        const response = await api.get(`/api/club/${clubId}`);
        return response.data;
    },

    async getClubMembers(clubId: string): Promise<ClubMember[]> {
        const response = await api.get(`/api/club/${clubId}/members`);
        return response.data;
    },

    async getClubTeams(clubId: string): Promise<Team[]> {
        const response = await api.get(`/api/club/${clubId}/teams`);
        return response.data;
    },

    async getClubOwner(clubId: string): Promise<ClubMember> {
        const response = await api.get(`/api/club/${clubId}/owner`);
        return response.data;
    },

    async getClubAdmins(clubId: string): Promise<ClubMember[]> {
        const response = await api.get(`/api/club/${clubId}/admins`);
        return response.data;
    },

    async createClub(requestData: ClubRequest): Promise<Club> {
        const response = await api.post('/api/club', requestData);
        return response.data;
    },

    async deleteClub(clubId: string | undefined): Promise<void> {
        await api.delete(`/api/club/${clubId}`);
    },

    async joinClub(clubId: string | undefined): Promise<void> {
        await api.post(`/api/club/${clubId}/join`);
    },

    async leaveClub(clubId: string | undefined): Promise<void> {
        await api.post(`/api/club/${clubId}/leave`);
    },
}