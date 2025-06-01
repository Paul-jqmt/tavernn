import { User } from "@/types/user.ts";

export interface TeamMember extends User {
    isCaptain: boolean;
}