export interface Team {
    id: string;
    name: string;
    description?: string;
    clubId: string;
    gameId: string;
    admissionType: 'open' | 'closed' | 'invite_only';
    captainId: string;
    nrMembers: number;
}

export interface TeamRequest {
    name: string;
    description: string | undefined;
    gameId: string;
    admissionType: string;
    captainId: string | undefined;
}