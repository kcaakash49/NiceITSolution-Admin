import { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Add Service", path: "/add-service" },
  { name: "Add FTTH Product", path: "/add-ftth-product" },
  { name: "Display Products", path: "/products" },
  // add more links as needed
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

//   const [sidebarOpen, setSidebarOpen] = useState(false);

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
      {/* Sidebar */}
      <nav className="w-64 bg-gray-100 dark:bg-gray-800 p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <ul className="flex flex-col space-y-3">
          {navItems.map(({ name, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                  } transition`
                }
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle Dark Mode"
          className="mt-auto px-4 py-2 rounded border border-gray-400 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 transition text-center"
        >
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-semibold">Welcome to Admin Dashboard</h1>
        </header>

        <main className="flex-grow p-6 max-w-7xl mx-auto overflow-auto flex flex-col">
          <Outlet />
        </main>

        <footer className="p-4 text-center border-t border-gray-200 dark:border-gray-700 text-sm">
          &copy; {new Date().getFullYear()} My Company
        </footer>
      </div>
    </div>
  );
}
