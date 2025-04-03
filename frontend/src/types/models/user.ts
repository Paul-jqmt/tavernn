export interface User {
    id: number;
    username: string;
    email: string;
    role: 'ADMIN' | 'PLAYER' | 'MANAGER';
    createdAt: string;
}