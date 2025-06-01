import {TeamMember} from "@/types/teamMember.ts";

export interface Team {
    id: string;
    name: string;
    description: string;
    game: string;
    nrMembers: number;
    members: TeamMember[];
}