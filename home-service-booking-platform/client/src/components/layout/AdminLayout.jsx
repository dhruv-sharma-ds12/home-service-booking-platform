import { Outlet } from "react-router-dom";
import Sidebar from "../admin/Sidebar";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 min-w-0">

        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                TrueFix Administration
              </p>

              <h2 className="text-xl font-bold text-blue-950">
                Admin Panel
              </h2>
            </div>

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
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

        {/* Page */}
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>

      </main>

    </div>
  );
}

export default AdminLayout;