export interface AuthResponse {
    token: string;
    id: string;
    email: string;
    username: string;
    registrationDate: string;
    discord?: string;
    profilePicture?: string;
    openAtInvite: boolean;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    username: string;
    discord?: string;
}