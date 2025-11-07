// src/layout/DashboardLayout.jsx
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  // ✅ Global search state
  const [search, setSearch] = useState("");

  return (
    <div className="h-screen flex bg-gray-100">

      {/* ✅ Top Bar (mobile + desktop) */}
      <div className="fixed top-0 left-0 right-0 lg:left-64 z-20 bg-white shadow p-4 flex items-center gap-4">
        {/* Mobile menu icon */}
        <button
          className="lg:hidden text-2xl"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>

        {/* ✅ Global Search Input */}
        <input
          id="global-search"
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
      </div>

      {/* Overlay (Mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static z-30 h-full w-64 bg-white shadow-md
          p-6 flex flex-col gap-6 transform
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <h1 className="text-2xl font-bold text-indigo-600 hidden lg:block">
          BlogApp
        </h1>

        {/* ✅ Sidebar Navigation */}
        <nav className="flex flex-col gap-3 mt-10 lg:mt-0">

          <NavLink
            to="/"
            className="text-gray-700 hover:text-indigo-600"
            onClick={() => setOpen(false)}
          >
            🏠 Home
          </NavLink>

          <NavLink
            to="/create"
            className="text-gray-700 hover:text-indigo-600"
            onClick={() => setOpen(false)}
          >
            ✍️ New Post
          </NavLink>

          {/* ✅ Search Button FOCUSES the top search bar (not a new page!) */}
          <button
            className="text-left text-gray-700 hover:text-indigo-600"
            onClick={() => {
              setOpen(false);
              window.location.pathname = "/";
              setTimeout(() => {
                document.getElementById("global-search")?.focus();
              }, 100);
            }}
          >
            🔍 Search
          </button>
        </nav>

        {/* User area */}
        <div className="mt-auto flex flex-col gap-2">
          <p className="text-sm text-gray-500">Logged in as:</p>
          <p className="font-semibold">{user?.username}</p>

          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="mt-3 p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ✅ Main Content (search passed to children) */}
      <main className="flex-1 p-8 overflow-y-auto pt-20 lg:pt-8">
        <Outlet context={{ search }} />
      </main>

    </div>
  );
}
