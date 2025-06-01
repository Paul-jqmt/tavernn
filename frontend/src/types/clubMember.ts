import { User } from "@/types/user.ts";

export interface ClubMember extends User {
    isOwner: boolean;
    isAdmin: boolean;
}
