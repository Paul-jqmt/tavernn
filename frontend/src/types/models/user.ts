export interface User {
    id: number;
    username: string;
    email: string;
    role: string; //@todo changer ce string par un enum des rôles et modifier l'implémentation en conséquences
    createdAt: string;
}