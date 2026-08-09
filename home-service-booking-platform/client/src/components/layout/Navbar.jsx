import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import services from "../../data/services";
import logo from "../../assets/logos/truefix-logo.jpg";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

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

  // =========================
  // SEARCH
  // =========================

  const filteredServices =
    searchTerm.trim().length > 0
      ? services.filter((service) =>
          service.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      : [];

  const handleSearch = (e) => {
    e.preventDefault();

    if (filteredServices.length > 0) {
      navigate(`/services/${filteredServices[0].id}`);

      setSearchTerm("");
      setSearchFocused(false);
      closeMenu();
    }
  };

  const handleServiceClick = (serviceId) => {
    navigate(`/services/${serviceId}`);

    setSearchTerm("");
    setSearchFocused(false);
    closeMenu();
  };

  /*
   * =========================
   * DESKTOP NAVIGATION STYLE
   * =========================
   */

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

  /*
   * =========================
   * MOBILE NAVIGATION STYLE
   * =========================
   */

  const mobileLinkStyle = ({ isActive }) =>
    `px-4 py-2.5 rounded-lg font-medium transition ${
      isActive
        ? "bg-orange-50 text-orange-500"
        : "text-blue-950 hover:bg-gray-50 hover:text-orange-500"
    }`;

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* =========================
            MAIN NAVBAR
        ========================= */}

        <div className="flex items-center justify-between min-h-[76px] gap-5">

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
              className="h-12 w-auto object-contain"
            />

            <span className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight whitespace-nowrap">
              <span className="text-blue-950">
                True
              </span>

              <span className="text-orange-500">
                Fix
              </span>
            </span>
          </NavLink>

          {/* =========================
              DESKTOP SEARCH BAR
          ========================= */}

          <div className="hidden lg:flex flex-1 justify-center px-4">

            <div className="relative w-full max-w-[420px]">

              <form onSubmit={handleSearch}>

                <div
                  className={`flex items-center bg-gray-950 border rounded-full px-4 py-2.5 transition-all duration-200 ${
                    searchFocused
                      ? "border-orange-400 ring-4 ring-orange-100 bg-white shadow-md"
                      : "border-gray-200 hover:border-orange-300 hover:shadow-sm"
                  }`}
                >

                  <FaSearch
                    className={`mr-3 transition-colors ${
                      searchFocused
                        ? "text-orange-500"
                        : "text-gray-400"
                    }`}
                  />

                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                    onFocus={() =>
                      setSearchFocused(true)
                    }
                    placeholder="Search services..."
                    className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                  />

                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm("");
                        setSearchFocused(false);
                      }}
                      className="text-gray-400 hover:text-gray-600 text-sm"
                    >
                      <FaTimes />
                    </button>
                  )}

                </div>

              </form>

              {/* =========================
                  SEARCH RESULTS
              ========================= */}

              {searchFocused &&
                searchTerm.trim() !== "" && (

                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-[100]">

                    {filteredServices.length > 0 ? (

                      <div className="py-2">

                        {filteredServices.map((service) => (

                          <button
                            key={service.id}
                            type="button"
                            onMouseDown={(e) =>
                              e.preventDefault()
                            }
                            onClick={() =>
                              handleServiceClick(
                                service.id
                              )
                            }
                            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-orange-50 transition"
                          >

                            <img
                              src={service.image}
                              alt={service.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />

                            <div className="flex-1 min-w-0">

                              <p className="font-semibold text-blue-950 text-sm">
                                {service.name}
                              </p>

                              <p className="text-xs text-gray-500 mt-1">
                                Professional home service
                              </p>

                            </div>

                            <span className="text-orange-500 font-semibold text-sm">
                              ₹{service.price}
                            </span>

                          </button>

                        ))}

                      </div>

                    ) : (

                      <div className="px-5 py-5 text-center">

                        <FaSearch className="mx-auto text-gray-300 text-xl mb-2" />

                        <p className="text-gray-600 font-medium text-sm">
                          No services found
                        </p>

                        <p className="text-gray-400 text-xs mt-1">
                          Try "cleaning", "plumbing", "AC", etc.
                        </p>

                      </div>

                    )}

                  </div>
                )}

            </div>

          </div>

          {/* =========================
              DESKTOP NAVIGATION
          ========================= */}

          <div className="hidden md:flex items-center shrink-0">

            {/* MAIN PAGES */}

            <div className="flex items-center gap-5 lg:gap-7">

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

            {/* SEPARATOR */}

            <div className="flex items-center mx-5 lg:mx-7">

              <div className="w-px h-7 bg-gray-200" />

            </div>

            {/* LOGGED OUT */}

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

            {/* LOGGED IN */}

            {isAuthenticated && (

              <div className="flex items-center gap-3">

                {/* CUSTOMER */}

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

                      <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-orange-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                    </NavLink>
                  </>
                )}

                {/* ADMIN */}

                {user?.role === "admin" && (

                  <NavLink
                    to="/admin"
                    className={desktopLinkStyle}
                  >
                    Admin Dashboard
                  </NavLink>

                )}

                {/* SEPARATOR */}

                <div className="h-8 w-px bg-gray-200 mx-2" />

                {/* LOGOUT */}

                <button
                  onClick={handleLogout}
                  className="border border-orange-500 text-orange-500 font-semibold px-5 py-2.5 rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-200"
                >
                  Logout
                </button>

              </div>

            )}

          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
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

            {/* MOBILE SEARCH */}

            <div className="relative mb-4">

              <form onSubmit={handleSearch}>

                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100">

                  <FaSearch className="text-gray-400 mr-3" />

                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                    onFocus={() =>
                      setSearchFocused(true)
                    }
                    placeholder="Search services..."
                    className="w-full bg-transparent outline-none text-sm"
                  />

                </div>

              </form>

              {/* MOBILE RESULTS */}

              {searchFocused &&
                searchTerm.trim() !== "" && (

                  <div className="mt-2 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">

                    {filteredServices.length > 0 ? (

                      filteredServices.map(
                        (service) => (

                          <button
                            key={service.id}
                            onClick={() =>
                              handleServiceClick(
                                service.id
                              )
                            }
                            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-orange-50"
                          >

                            <img
                              src={service.image}
                              alt={service.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />

                            <div className="flex-1">

                              <p className="font-semibold text-blue-950 text-sm">
                                {service.name}
                              </p>

                              <p className="text-xs text-orange-500">
                                ₹{service.price}
                              </p>

                            </div>

                          </button>

                        )
                      )

                    ) : (

                      <p className="text-center text-gray-500 text-sm py-4">
                        No services found.
                      </p>

                    )}

                  </div>

                )}

            </div>

            <div className="flex flex-col gap-2">

              {/* MAIN PAGES */}

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

              <div className="border-t border-gray-100 my-2" />

              {/* LOGGED OUT */}

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

              {/* LOGGED IN */}

              {isAuthenticated && (
                <>

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

                  {user?.role === "admin" && (
                    <NavLink
                      to="/admin"
                      onClick={closeMenu}
                      className={mobileLinkStyle}
                    >
                      Admin Dashboard
                    </NavLink>
                  )}

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