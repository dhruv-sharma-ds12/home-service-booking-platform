import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logos/truefix-logo.jpg";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  // Desktop navigation styling
  const desktopLinkStyle = ({ isActive }) =>
    `font-medium transition ${
      isActive
        ? "text-orange-500"
        : "text-blue-900 hover:text-orange-600"
    }`;

  // Mobile navigation styling
  const mobileLinkStyle = ({ isActive }) =>
    `px-3 py-2 rounded-lg font-medium transition ${
      isActive
        ? "bg-orange-50 text-orange-500"
        : "text-blue-900 hover:bg-gray-50"
    }`;

  return (
    <nav className="bg-white shadow-md relative z-50">

      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =========================
            TOP NAVBAR
        ========================= */}

        <div className="flex items-center justify-between min-h-20">

          {/* =========================
              LOGO
          ========================= */}

          <NavLink
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2 shrink-0"
          >

            <img
              src={logo}
              alt="TrueFix Logo"
              className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
            />

            <span className="text-2xl sm:text-3xl lg:text-5xl font-bold">
              <span className="text-blue-900">
                True
              </span>

              <span className="text-orange-500">
                Fix
              </span>
            </span>

          </NavLink>


          {/* =========================
              DESKTOP NAVIGATION
          ========================= */}

          <div className="hidden md:flex items-center gap-5 lg:gap-7">

            {/* Home */}

            <NavLink
              to="/"
              className={desktopLinkStyle}
            >
              Home
            </NavLink>


            {/* About */}

            <NavLink
              to="/about"
              className={desktopLinkStyle}
            >
              About
            </NavLink>

            {/* Contact */}

            <NavLink
              to="/contact"
              className={desktopLinkStyle}
            >
              Contact
            </NavLink>

            {/* Services */}

            <NavLink
              to="/services"
              className={desktopLinkStyle}
            >
              Services
            </NavLink>


            {/* =========================
                CUSTOMER NAVIGATION
            ========================= */}

            {isAuthenticated &&
              user?.role === "customer" && (
                <>

                  <NavLink
                    to="/my-bookings"
                    className={desktopLinkStyle}
                  >
                    My Bookings
                  </NavLink>

                  <NavLink
                    to="/profile"
                    className={desktopLinkStyle}
                  >
                    Profile
                  </NavLink>

                </>
              )}


            {/* =========================
                ADMIN NAVIGATION
            ========================= */}

            {isAuthenticated &&
              user?.role === "admin" && (

                <NavLink
                  to="/admin"
                  className={desktopLinkStyle}
                >
                  Admin Dashboard
                </NavLink>

              )}


            {/* =========================
                LOGGED OUT
            ========================= */}

            {!isAuthenticated && (
              <>

                <NavLink
                  to="/login"
                  className={desktopLinkStyle}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="bg-orange-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-orange-600 shadow hover:shadow-lg transition-transform hover:scale-105"
                >
                  Register
                </NavLink>

              </>
            )}


            {/* =========================
                LOGGED IN
            ========================= */}

            {isAuthenticated && (

              <button
                onClick={handleLogout}
                className="bg-orange-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition"
              >
                Logout
              </button>

            )}

          </div>


          {/* =========================
              MOBILE MENU BUTTON
          ========================= */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-blue-900 text-2xl p-2"
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
          >

            {menuOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}

          </button>

        </div>


        {/* =========================
            MOBILE NAVIGATION
        ========================= */}

        {menuOpen && (

          <div className="md:hidden border-t border-gray-200 py-4">

            <div className="flex flex-col gap-3">

              {/* Home */}

              <NavLink
                to="/"
                onClick={closeMenu}
                className={mobileLinkStyle}
              >
                Home
              </NavLink>


              {/* About */}

              <NavLink
                to="/about"
                onClick={closeMenu}
                className={mobileLinkStyle}
              >
                About
              </NavLink>

              {/* Contact */}
              
              <NavLink
                to="/contact"
                onClick={closeMenu}
                className={mobileLinkStyle}
              >
                Contact
              </NavLink>
              
              {/* Services */}

              <NavLink
                to="/services"
                onClick={closeMenu}
                className={mobileLinkStyle}
              >
                Services
              </NavLink>


              {/* =========================
                  CUSTOMER MOBILE NAVIGATION
              ========================= */}

              {isAuthenticated &&
                user?.role === "customer" && (
                  <>

                    <NavLink
                      to="/my-bookings"
                      onClick={closeMenu}
                      className={mobileLinkStyle}
                    >
                      My Bookings
                    </NavLink>

                    <NavLink
                      to="/profile"
                      onClick={closeMenu}
                      className={mobileLinkStyle}
                    >
                      Profile
                    </NavLink>

                  </>
                )}


              {/* =========================
                  ADMIN MOBILE NAVIGATION
              ========================= */}

              {isAuthenticated &&
                user?.role === "admin" && (

                <NavLink
                  to="/admin"
                  onClick={closeMenu}
                  className={mobileLinkStyle}
                >
                  Admin Dashboard
                </NavLink>

              )}


              {/* =========================
                  LOGGED OUT MOBILE
              ========================= */}

              {!isAuthenticated && (
                <>

                  <NavLink
                    to="/login"
                    onClick={closeMenu}
                    className={mobileLinkStyle}
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/register"
                    onClick={closeMenu}
                    className="bg-orange-500 text-white px-5 py-2.5 rounded-lg font-medium text-center hover:bg-orange-600 transition"
                  >
                    Register
                  </NavLink>

                </>
              )}


              {/* =========================
                  LOGGED IN MOBILE
              ========================= */}

              {isAuthenticated && (

                <button
                  onClick={handleLogout}
                  className="bg-orange-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition"
                >
                  Logout
                </button>

              )}

            </div>

          </div>

        )}

      </div>

    </nav>
  );
}

export default Navbar;