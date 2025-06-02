import {Team} from "@/types/team.ts";
import api from "@/services/api.ts";
import {TeamMember} from "@/types/teamMember.ts";
import {CreateTeamValues} from "@/schemas/createTeamSchema.ts";

export const teamService = {
    async getTeams(): Promise<Team[]> {
        const response = await api.get("/api/team");
        return response.data;
    },

    async getTeam(teamId: string): Promise<Team> {
        const response = await api.get(`/api/team/${teamId}`);
        return response.data;
    },

    async getTeamMembers(teamId: string): Promise<TeamMember[]> {
        const response = await api.get(`/api/team/${teamId}/members`);
        return response.data;
    },

    async getTeamCaptains(teamId: string): Promise<TeamMember[]> {
        const response = await api.get(`/api/team/${teamId}/captain`);
        return response.data;
    },

    async createTeam(teamData: CreateTeamValues, clubId: string): Promise<Team> {
        const teamRequest = {
            name: teamData.teamName,
            description: teamData.description,
            clubId: clubId,
            gameId: teamData.gameId,
            admissionType: teamData.admissionType,
            captainId: teamData.captainId,
        };

        const response = await api.post("/api/team", teamRequest);
        return response.data;
    },

    async joinTeam(teamId: string): Promise<TeamMember> {
        const repsonse = await api.post(`/api/team/${teamId}/join`);
        return repsonse.data;
    },

    async leaveTeam(teamId: string): Promise<void> {
        await api.post(`/api/team/${teamId}/leave`);
    }
}