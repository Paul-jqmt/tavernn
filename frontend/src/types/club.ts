import {Team} from "@/types/team.ts";
import {ClubMember} from "@/types/clubMember.ts";

export interface Club {
    id: string;
    name: string;
    description: string | null;
    creationDate: string;
    logo: string | undefined;
    clubType: 'open' | 'closed' | 'invite_only';
    nrMembers: number;
    nrTeams: number;
    maxMembers: number;
    teams: Team[];
    members: ClubMember[];
}