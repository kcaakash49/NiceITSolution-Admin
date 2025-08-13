import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";


import { loginAdmin } from "../api/auth";
import { useAuthStore } from "../store/useAuthStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser  = useAuthStore((state) => state.setUser);
 
  useEffect(() => {
    if (typeof window === "undefined") return;
  
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: loginAdmin,
    onSuccess: (data) => {
      queryClient.setQueryData(["current-user"], data);
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      setUser(data?.user);
      navigate("/", { replace: true});
    },
    onError: () => {
      alert("Invalid credentials");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-400 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 dark:border dark:border-gray-700 rounded-xl shadow-lg max-w-md w-full p-8 space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-gray-100">
          Admin Login
        </h2>

        <div className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="border  border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition dark:bg-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition dark:bg-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
