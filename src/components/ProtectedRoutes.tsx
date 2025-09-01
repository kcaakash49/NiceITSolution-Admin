// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { verifyCookie } from "../api/auth";
import { useEffect, useRef } from "react";
import { useAuthStore, type User } from "../store/useAuthStore";
import { isEqual } from "lodash";
import LoadingSpinner from "./LoadingSpinner";
import { useSignout } from "../hooks/useSignOut";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const setUser = useAuthStore(state => state.setUser);
    const userInfo = useAuthStore(state => state.user);
    const signOutMutation = useSignout();
    const { data: user, isLoading, isSuccess, isError, dataUpdatedAt } = useQuery({
        queryKey: ["current-user"],
        queryFn: verifyCookie,
        retry: false,
        staleTime: 4 * 60 * 1000,
        refetchInterval: 5 * 60 * 1000,
        refetchOnMount: data => !data,

    });

    const prevUserRef = useRef<User>(userInfo);

    useEffect(() => {
        if (isSuccess && user) {
            if (!isEqual(prevUserRef.current, user.user)) {
                // To escape react's scheduling so, userinfo gets stored in sessionstorage without refresh
                requestAnimationFrame(() => {
                    setUser(user.user);
                    prevUserRef.current = user.user;
                });
            }
        }
    }, [isSuccess, user, setUser, dataUpdatedAt])

    useEffect(() => {
        if (isError){
            signOutMutation.mutate();
        }
    }, [isError, signOutMutation]);


    if (isLoading || isError) return <div className="flex min-h-screen items-center justify-center dark:bg-gray-900"><LoadingSpinner /></div>;

    if (!user) {

        return <Navigate to="/login" replace />;
    }

    return children; 
}
