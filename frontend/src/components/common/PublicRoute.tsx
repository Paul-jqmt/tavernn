import { ReactNode } from "react";
import {useUser} from "@/contexts/UserContext.tsx";
import {Navigate} from "react-router-dom";

export default function PublicRoute({ children }: { children: ReactNode }) {
    const { user } = useUser();

    if (user) {
        return <Navigate to="/home" replace />;
    }

    return <>{children}</>;
}
