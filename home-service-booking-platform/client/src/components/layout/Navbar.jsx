import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logos/truefix-logo.jpg";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Navbar */}
        <div className="flex items-center justify-between min-h-20">

          {/* Logo + TrueFix */}
          <NavLink
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2"
          >
            <img
              src={logo}
              alt="TrueFix Logo"
              className="h-10 sm:h-12 lg:h-14 w-auto
              align-left"
            />

            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-blue-900">True</span>
              <span className="text-orange-500">Fix</span>
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7">

            <NavLink
              to="/"
              className="text-blue-900 font-medium hover:text-orange-600 transition"
            >
              Home
            </NavLink>

            <NavLink
              to="/services"
              className="text-blue-900 font-medium hover:text-orange-600 transition"
            >
              Services
            </NavLink>

            <NavLink
              to="/bookings"
              className="text-blue-900 font-medium hover:text-orange-600 transition"
            >
              Bookings
            </NavLink>

            <NavLink
              to="/login"
              className="text-blue-900 font-medium hover:text-orange-600 transition"
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="bg-orange-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-600 transition"
            >
              Register
            </NavLink>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-blue-900 text-2xl p-2"
            aria-label="Open navigation menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">

            <div className="flex flex-col gap-4">

              <NavLink
                to="/"
                onClick={closeMenu}
                className="text-blue-900 font-medium hover:text-orange-600"
              >
                Home
              </NavLink>

              <NavLink
                to="/services"
                onClick={closeMenu}
                className="text-blue-900 font-medium hover:text-orange-600"
              >
                Services
              </NavLink>

              <NavLink
                to="/bookings"
                onClick={closeMenu}
                className="text-blue-900 font-medium hover:text-orange-600"
              >
                Bookings
              </NavLink>

              <NavLink
                to="/login"
                onClick={closeMenu}
                className="text-blue-900 font-medium hover:text-orange-600"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                onClick={closeMenu}
                className="bg-orange-500 text-white px-5 py-2 rounded-lg font-medium text-center hover:bg-orange-600"
              >
                Register
              </NavLink>

            </div>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;