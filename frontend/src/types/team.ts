import {TeamMember} from "@/types/teamMember.ts";

export interface Team {
    id: string;
    name: string;
    description?: string;
    clubId: string;
    gameId: string;
    admissionType: 'open' | 'closed' | 'invite_only';
    captainId: string;
    nrMembers: number;
    members: TeamMember[];
}