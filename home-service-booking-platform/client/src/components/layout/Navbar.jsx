import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
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

  /* =========================
     DESKTOP NAVIGATION STYLE
  ========================= */

  const desktopLinkStyle = ({ isActive }) =>
    `group relative font-medium py-2 transition-colors duration-200 ${
      isActive
        ? "text-orange-500"
        : "text-blue-950 hover:text-orange-500"
    }

    after:absolute
    after:left-0
    after:-bottom-1
    after:h-[2px]
    after:bg-orange-500
    after:rounded-full
    after:transition-all
    after:duration-300

    ${
      isActive
        ? "after:w-full"
        : "after:w-0 hover:after:w-full"
    }`;

  /* =========================
     MOBILE NAVIGATION STYLE
  ========================= */

  const mobileLinkStyle = ({ isActive }) =>
    `px-4 py-2.5 rounded-lg font-medium transition ${
      isActive
        ? "bg-orange-50 text-orange-500"
        : "text-blue-950 hover:bg-gray-50 hover:text-orange-500"
    }`;

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">

      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =========================
            MAIN NAVBAR
        ========================= */}

        <div className="flex items-center justify-between min-h-[76px]">

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
              className="h-12 sm:h-12 w-auto object-contain"
            />

            <span className="text-2xl sm:text-6xl font-bold tracking-tight">

              <span className="text-blue-950">
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

          <div className="hidden md:flex items-center">

            {/* =========================
                MAIN PAGES
            ========================= */}

            <div className="flex items-center gap-6 lg:gap-8">

              <NavLink
                to="/"
                className={desktopLinkStyle}
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className={desktopLinkStyle}
              >
                About
              </NavLink>

              <NavLink
                to="/contact"
                className={desktopLinkStyle}
              >
                Contact
              </NavLink>

              <NavLink
                to="/services"
                className={desktopLinkStyle}
              >
                Services
              </NavLink>

            </div>


            {/* =========================
                SEPARATOR
            ========================= */}

            <div className="flex items-center mx-7 lg:mx-9">

              <div className="w-px h-7 bg-gray-200"></div>

            </div>


            {/* =========================
                LOGGED OUT
            ========================= */}

            {!isAuthenticated && (

              <div className="flex items-center gap-3">

                <NavLink
                  to="/login"
                  className="text-blue-950 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 hover:text-orange-500 transition-all duration-200"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="bg-orange-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:bg-orange-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  Register
                </NavLink>

              </div>

            )}


            {/* =========================
                LOGGED IN
            ========================= */}

            {isAuthenticated && (

              <div className="flex items-center gap-3">

                {/* Customer Navigation */}

                {user?.role === "customer" && (
                  <>

                    <NavLink
                      to="/my-bookings"
                      className={desktopLinkStyle}
                    >
                      My Bookings
                    </NavLink>

                    <NavLink
                      to="/profile"
                      className="group relative flex items-center gap-2 text-blue-950 font-medium px-3 py-2 transition-colors duration-200 hover:text-orange-500"
                    >

                      <FaUserCircle />

                      Profile

                      {/* Profile underline */}

                      <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-orange-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>

                    </NavLink>

                  </>
                )}


                {/* Admin Navigation */}

                {user?.role === "admin" && (

                  <NavLink
                    to="/admin"
                    className={desktopLinkStyle}
                  >
                    Admin Dashboard
                  </NavLink>

                )}


                {/* Logout Separator */}

                <div className="h-8 w-px bg-gray-200 mx-2"></div>


                {/* Logout */}

                <button
                  onClick={handleLogout}
                  className="border border-orange-500 text-orange-500 font-semibold px-5 py-2.5 rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-200"
                >
                  Logout
                </button>

              </div>

            )}

          </div>


          {/* =========================
              MOBILE MENU BUTTON
          ========================= */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-blue-950 text-2xl p-2 rounded-lg hover:bg-gray-100 transition"
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
            MOBILE MENU
        ========================= */}

        {menuOpen && (

          <div className="md:hidden border-t border-gray-100 py-4">

            <div className="flex flex-col gap-2">

              {/* Main Pages */}

              <NavLink
                to="/"
                onClick={closeMenu}
                className={mobileLinkStyle}
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                onClick={closeMenu}
                className={mobileLinkStyle}
              >
                About
              </NavLink>

              <NavLink
                to="/contact"
                onClick={closeMenu}
                className={mobileLinkStyle}
              >
                Contact
              </NavLink>

              <NavLink
                to="/services"
                onClick={closeMenu}
                className={mobileLinkStyle}
              >
                Services
              </NavLink>


              {/* =========================
                  MOBILE SEPARATOR
              ========================= */}

              <div className="border-t border-gray-100 my-2"></div>


              {/* =========================
                  MOBILE LOGGED OUT
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
                    className="bg-orange-500 text-white font-semibold px-4 py-2.5 rounded-lg text-center hover:bg-orange-600 transition"
                  >
                    Register
                  </NavLink>

                </>
              )}


              {/* =========================
                  MOBILE LOGGED IN
              ========================= */}

              {isAuthenticated && (
                <>

                  {/* Customer */}

                  {user?.role === "customer" && (
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


                  {/* Admin */}

                  {user?.role === "admin" && (

                    <NavLink
                      to="/admin"
                      onClick={closeMenu}
                      className={mobileLinkStyle}
                    >
                      Admin Dashboard
                    </NavLink>

                  )}


                  {/* Logout */}

                  <button
                    onClick={handleLogout}
                    className="bg-orange-500 text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-orange-600 transition"
                  >
                    Logout
                  </button>

                </>
              )}

            </div>

          </div>

        )}

      </div>

    </nav>
  );
}

export default Navbar;