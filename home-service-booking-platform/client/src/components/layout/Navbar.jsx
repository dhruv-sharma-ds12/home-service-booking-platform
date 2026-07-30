import { NavLink } from "react-router-dom";

function Navbar() {
  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600 transition";

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <h1 className="text-3xl font-bold text-blue-600">
          TrueFix
        </h1>

        <div className="flex gap-8">
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/services" className={navLinkStyle}>
            Services
          </NavLink>

          <NavLink to="/bookings" className={navLinkStyle}>
            Bookings
          </NavLink>

          <NavLink to="/login" className={navLinkStyle}>
            Login
          </NavLink>

          <NavLink to="/register" className={navLinkStyle}>
            Register
          </NavLink>
        </div>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
          Book Service
        </button>
      </nav>
    </header>
  );
}

export default Navbar;