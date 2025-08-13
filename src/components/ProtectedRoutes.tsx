// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { verifyCookie } from "../api/auth";
import { useEffect, useRef } from "react";
import { useAuthStore, type User } from "../store/useAuthStore";
import { isEqual } from "lodash";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const setUser = useAuthStore(state => state.setUser);
    const userInfo = useAuthStore(state => state.user);
    const { data: user, isLoading, isSuccess, isError, dataUpdatedAt } = useQuery({
        queryKey: ["current-user"],
        queryFn: verifyCookie,
        retry: false,
        staleTime: 4 * 30 * 1000,
        refetchInterval: 5 * 60 * 1000,
        refetchOnMount: data => !data,

    });
    const prevUserRef = useRef<User>(userInfo);
    useEffect(() => {
        if (isSuccess && user) {
            if (!isEqual(prevUserRef.current, user.user)) {
                setUser(user.user);
                prevUserRef.current = user.user;
              }
        }
    }, [isSuccess, user, setUser, dataUpdatedAt])

    if (isLoading) return <div>Loading...</div>;

    if (isError || !user) {

        return <Navigate to="/login" replace />;
    }

    return children; // Render child routes if authenticated
}
