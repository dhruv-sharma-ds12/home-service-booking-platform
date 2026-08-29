import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  FaBars,
  FaTimes,
} from "react-icons/fa";

import Sidebar from "../admin/Sidebar";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen((previous) => !previous);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* ==========================================
          SIDEBAR
      ========================================== */}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <main className="flex-1 min-w-0">

        {/* ==========================================
            TOP HEADER
        ========================================== */}

        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">

          <div className="flex items-center justify-between gap-4">

            {/* LEFT SIDE */}

            <div className="flex items-center gap-3">

              {/* MOBILE MENU BUTTON */}

              <button
                type="button"
                onClick={toggleSidebar}
                aria-label={
                  sidebarOpen
                    ? "Close admin menu"
                    : "Open admin menu"
                }
                aria-expanded={sidebarOpen}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 text-blue-950 hover:bg-blue-100 transition"
              >
                {sidebarOpen ? (
                  <FaTimes />
                ) : (
                  <FaBars />
                )}
              </button>

              {/* HEADER TEXT */}

              <div>
                <p className="text-sm text-gray-500">
                  TrueFix Administration
                </p>

                <h2 className="text-lg sm:text-xl font-bold text-blue-950">
                  Admin Panel
                </h2>
              </div>

            </div>

            {/* ==========================================
                ADMIN USER
            ========================================== */}

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                <span className="text-orange-600 font-bold">
                  A
                </span>
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">
                  Administrator
                </p>

                <p className="text-xs text-gray-500">
                  Admin
                </p>
              </div>

            </div>

          </div>

        </header>

        {/* ==========================================
            PAGE CONTENT
        ========================================== */}

        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>

      </main>

    </div>
  );
}

export default AdminLayout;