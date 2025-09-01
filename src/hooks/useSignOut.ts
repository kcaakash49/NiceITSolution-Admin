import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

export function useSignout() {
  const queryClient = useQueryClient();
  const logOut = useAuthStore(state => state.logout);
  
  return useMutation({
    mutationFn: async () => {
      try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/signout`, {}, { withCredentials: true });
      } catch {
        console.log("Signout API optional call failed");
      }
    },
    onMutate: () => {
      // Set flag immediately
      localStorage.setItem('isSigningOut', 'true');
      
      queryClient.clear();
      
      logOut();
    },
    onSettled: () => {
      // Force immediate redirect without waiting
      localStorage.removeItem('isSigningOut');
      window.location.href = "/login";
    }
  });
}