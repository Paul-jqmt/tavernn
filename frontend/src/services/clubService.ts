import {Club} from "@/types/club.ts";
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

    //TODO: IMPLEMENT CLUB DELETION

    //TODO: IMPLEMENT CLUB UPDATE

    //TODO: IMPLEMENT CLUB JOIN

    //TODO: IMPLEMENT CLUB LEAVE
}