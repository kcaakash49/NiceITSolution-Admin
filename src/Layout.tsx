import { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useSignout } from "./hooks/useSignOut";
// import type { UseMutationResult } from "@tanstack/react-query";

// const navItems = [
//   { name: "Dashboard", path: "/dashboard" },
//   { name: "Add Service", path: "/add-service" },
//   { name: "Add FTTH Product", path: "/add-ftth-product" },
//   { name: "Display Products", path: "/products" },
// ];

// Navigation structure with sections
const navSections = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Services",
    children: [
      { name: "Add Service", path: "/add-service" },
      { name: "List Services", path: "/list-service"},
      { name: "List Plans", path: "/list-plans"},
    ],
  },
  {
    name: "Products",
    children: [
      { name: "Add FTTH Product", path: "/add-product" },
      { name: "Display Products", path: "/products" },
    ],
  },
];


export default function Layout() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") return true;
      if (saved === "light") return false;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const signOutMutation = useSignout();


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}

      <nav
        className={`fixed inset-y-0 md:static top-0 left-0 w-64 bg-gray-100 dark:bg-gray-800 p-6 flex flex-col z-40
    transform transition-transform duration-300 ease-in-out
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
      >
        <h2 className="text-xl md:2xl font-bold mb-5 md:mb-8">Admin Panel</h2>

        {/* Navigation Links */}
        {/* <ul className="flex flex-col space-y-3">
          {navItems.map(({ name, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded ${isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                  } transition`
                }
                onClick={() => setSidebarOpen(false)}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul> */}
        <ul className="flex flex-col space-y-3">
          {navSections.map((section) =>
            section.children ? (
              <li key={section.name}>
                <div className="font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  {section.name}
                </div>
                <ul className="ml-2 space-y-2">
                  {section.children.map(({ name, path }) => (
                    <li key={path}>
                      <NavLink
                        to={path}
                        className={({ isActive }) =>
                          `block px-4 py-2 rounded ${isActive
                            ? "bg-blue-600 text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                          } transition`
                        }
                        onClick={() => setSidebarOpen(false)}
                      >
                        {name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={section.path}>
                <NavLink
                  to={section.path!}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded ${isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                    } transition`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  {section.name}
                </NavLink>
              </li>
            )
          )}
        </ul>


        {/* Bottom Section */}
        <div className="mt-auto flex flex-col space-y-3">
          <button
            onClick={() => signOutMutation.mutate()}
            disabled={signOutMutation.isPending}
            className="px-4 py-2 rounded border border-gray-400 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            Log Out
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Dark Mode"
            className="px-4 py-2 rounded border border-gray-400 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 transition text-center"
          >
            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>
      </nav>


      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header — only for small screens */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="h-6 w-6 text-gray-700 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {sidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div
            className="text-xl font-extrabold tracking-wide 
                bg-gradient-to-r from-blue-500 to-purple-600 
                dark:from-blue-400 dark:to-purple-500 
                text-transparent bg-clip-text select-none"
          >
            NICE IT SOLUTION
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow overflow-auto flex flex-col">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="p-4 text-center border-t border-gray-200 dark:border-gray-700 text-sm">
          &copy; {new Date().getFullYear()} Nice IT Solution Pvt. Ltd.
        </footer>
      </div>
    </div>
  );
}
