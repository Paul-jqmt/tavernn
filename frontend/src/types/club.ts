export type Club = {
    id: string;
    name: string;
    description: string;
    logo: string;
    nrTeams: number;
    nrPlayers: number;
    maxPlayers: number;
    type: 'open' | 'close' | 'invite_only';
};