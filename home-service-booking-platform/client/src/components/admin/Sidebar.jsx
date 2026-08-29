import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
  const links = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: "📊",
    },
    {
      name: "Manage Bookings",
      path: "/admin/bookings",
      icon: "📅",
    },
    {
      name: "Manage Services",
      path: "/admin/services",
      icon: "🛠️",
    },
    {
      name: "Manage Users",
      path: "/admin/users",
      icon: "👥",
    },
  ];

  return (
    <>
      {/* ==========================================
          MOBILE BACKDROP
      ========================================== */}

      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* ==========================================
          SIDEBAR
      ========================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-64
          min-h-screen
          bg-blue-950
          text-white
          flex flex-col
          transform transition-transform duration-300 ease-in-out

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:static
          lg:z-auto
          lg:translate-x-0
          lg:shrink-0
        `}
      >
        {/* ==========================================
            LOGO
        ========================================== */}

        <div className="px-6 py-6 border-b border-blue-800">
          <div className="flex items-start justify-between gap-4">

            <div>
              <h1 className="text-2xl font-bold">
                <span className="text-white">
                  True
                </span>

                <span className="text-orange-500">
                  Fix
                </span>
              </h1>

              <p className="text-blue-300 text-sm mt-1">
                Admin Panel
              </p>
            </div>

            {/* MOBILE CLOSE BUTTON */}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close admin menu"
              className="lg:hidden text-blue-200 hover:text-white text-2xl leading-none"
            >
              ×
            </button>

          </div>
        </div>

        {/* ==========================================
            NAVIGATION
        ========================================== */}

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">

          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/admin"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-blue-100 hover:bg-blue-900 hover:text-white"
                }`
              }
            >
              <span className="text-lg">
                {link.icon}
              </span>

              <span>
                {link.name}
              </span>
            </NavLink>
          ))}

        </nav>

        {/* ==========================================
            BOTTOM
        ========================================== */}

        <div className="px-4 py-5 border-t border-blue-800">

          <NavLink
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-900 transition"
          >
            <span>🏠</span>

            <span>
              Back to Website
            </span>
          </NavLink>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;