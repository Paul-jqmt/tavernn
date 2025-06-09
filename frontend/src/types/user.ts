import {Club} from "@/types/club.ts";
import {Team} from "@/types/team.ts";

export interface User {
    id: string;
    email: string;
    username: string;
    registrationDate: string;
    discord: string;
    profilePicture: string;
    openAtInvite: boolean;
    club: Club | null;
    teams: Team[];
}