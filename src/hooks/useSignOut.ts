import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

export function useSignout() {
  const queryClient = useQueryClient();
  const logOut = useAuthStore(state => state.logout);
  
  return useMutation({
    mutationFn: async () => {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/signout`, {}, { withCredentials: true });
    },
    onSuccess: () => {
      // Optional: clear React Query cache
      queryClient.clear();
      logOut();
      // Redirect to login
      window.location.href = "/login";
    },

    onError: () => {
        console.log("CouldNot logout")
    }
  });
}
