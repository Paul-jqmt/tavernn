export interface Club {
    id: string;
    name: string;
    description: string | null;
    creation_date: string;
    logo: string | undefined;
    clubType: 'open' | 'closed' | 'invite_only';
    nrMembers: number;
    nrTeams: number;
    maxMembers: number;
}