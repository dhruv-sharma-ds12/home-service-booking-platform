import { NavLink } from "react-router-dom";
import logo from "../../assets/logos/truefix-logo.jpg";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">

      {/* Logo + TrueFix Name */}
      <NavLink to="/" className="flex items-center gap-2">
        <img
          src={logo}
          alt="TrueFix Logo"
          className="h-14 w-auto"
        />

        <span className="text-6xl font-bold">
          <span className="text-blue-900">True</span>
          <span className="text-orange-500">Fix</span>
        </span>
      </NavLink>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">

        <NavLink
          to="/"
          className="text-blue-900 font-medium hover:text-orange-600"
        >
          Home
        </NavLink>

        <NavLink
          to="/services"
          className="text-blue-900 font-medium hover:text-orange-600"
        >
          Services
        </NavLink>

        <NavLink
          to="/bookings"
          className="text-blue-900 font-medium hover:text-orange-600"
        >
          Bookings
        </NavLink>

        <NavLink
          to="/login"
          className="text-blue-900 font-medium hover:text-orange-600"
        >
          Login
        </NavLink>

        <NavLink
          to="/register"
          className="bg-orange-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-600"
        >
          Register
        </NavLink>

      </div>

    </nav>
  );
}

export default Navbar;