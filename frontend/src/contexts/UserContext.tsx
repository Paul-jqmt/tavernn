import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/user.ts';
import authService from "@/services/authService.ts";
import {userService} from "@/services/userService.ts";

type UserContextType = {
    user: User | null;
    loading: boolean;
    error: Error | null;
    refreshUser: () => Promise<void>;
    clearUser: () => void;
};

const UserContext = createContext<UserContextType | undefined> (undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [ user, setUser ] = useState<User | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<Error | null>(null);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            if (authService.isAuthenticated()) {
                const currentUser = await authService.getCurrentUser();

                try {
                    const userClub = await userService.getUserClub(currentUser.id);
                    const userTeams = await userService.getUserTeams(currentUser.id);

                    console.log(userClub);
                    console.log(userTeams);

                    currentUser.club = userClub[0] || null;
                    currentUser.teams = userTeams || [];
                } catch (error) {
                    currentUser.club = null;
                    currentUser.teams = [];
                }
                setUser(currentUser);
            }
        } catch (error) {
            setError(error instanceof Error ? error : new Error('Failed to load user'));
        } finally {
            setLoading(false);
        }
    };

    const refreshUser = async () => {
        setLoading(true);
        await loadUser();
    };

     const clearUser = () => {
         setUser(null);
         setError(null);
     };

    return (
        <UserContext.Provider value={{ user, loading, error, refreshUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
