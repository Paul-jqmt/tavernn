import { useUser } from "@/contexts/UserContext";
import { Navigate } from "react-router-dom";
import {JSX} from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { user, loading } = useUser();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/auth" replace />;
    return children;
}