import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true, // send cookies automatically
});

// On 401 error, logout user immediately
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      // Optionally redirect to login page here, or handle in React
      // e.g. window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
