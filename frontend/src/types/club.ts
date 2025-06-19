import {ClubMember} from "@/types/clubMember.ts";
import {Team} from "@/types/team.ts";

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
    owner: ClubMember;
    admins: ClubMember[];
    members: ClubMember[];
    teams: Team[];
}

export interface ClubRequest {
    name: string;
    description: string | null;
    clubType: string;
    maxMembers: number;
}