import { NavLink } from "react-router-dom";

function Sidebar() {
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
    <aside className="w-64 min-h-screen bg-blue-950 text-white flex flex-col">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-blue-800">
        <h1 className="text-2xl font-bold">
          <span className="text-white">True</span>
          <span className="text-orange-500">Fix</span>
        </h1>

        <p className="text-blue-300 text-sm mt-1">
          Admin Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">

        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/admin"}
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

      {/* Bottom */}
      <div className="px-4 py-5 border-t border-blue-800">

        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-900 transition"
        >
          <span>🏠</span>
          <span>Back to Website</span>
        </NavLink>

      </div>

    </aside>
  );
}

export default Sidebar;