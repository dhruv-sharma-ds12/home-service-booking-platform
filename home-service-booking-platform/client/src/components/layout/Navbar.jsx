import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaSearch,
  FaArrowRight,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import { getActiveServices } from "../../services/serviceService";

import logo from "../../assets/logos/truefix-logo.jpg";

// ==========================================
// LOCAL FALLBACK IMAGES
// ==========================================

import homeCleaning from "../../assets/images/home-cleaning.jpg";
import acRepair from "../../assets/images/ac-repair.jpg";
import plumbing from "../../assets/images/plumbing.jpg";
import electrical from "../../assets/images/electrical.jpg";
import carpentry from "../../assets/images/carpentry.jpg";
import pestControl from "../../assets/images/pest-control.jpg";
import painting from "../../assets/images/painting.jpg";
import salonSpa from "../../assets/images/salon-spa.jpg";
import laundry from "../../assets/images/laundry.jpg";
import gardening from "../../assets/images/gardening.jpg";
import smartHome from "../../assets/images/smart-home-services.jpg";
import packersMovers from "../../assets/images/packers-movers.jpg";

// ==========================================
// IMAGE MAP
// ==========================================

const serviceImages = {
  "Home Cleaning": homeCleaning,

  "AC & Appliance Repair": acRepair,
  "AC Repair": acRepair,

  Plumbing: plumbing,

  Electrical: electrical,
  "Electrical Work": electrical,

  Carpentry: carpentry,

  "Pest Control": pestControl,

  Painting: painting,

  "Salon & Spa at Home": salonSpa,
  "Salon & Spa": salonSpa,

  "Laundry & Ironing": laundry,

  Gardening: gardening,

  "Smart Home Services": smartHome,
  "Smart Home Installation": smartHome,

  "Packers & Movers": packersMovers,
};

// ==========================================
// NAVBAR
// ==========================================

function Navbar() {
  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    logout,
    loadingAuth,
  } = useAuth();

  // ========================================
  // MENU
  // ========================================

  const [menuOpen, setMenuOpen] = useState(false);

  // ========================================
  // SEARCH
  // ========================================

  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const [services, setServices] = useState([]);

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // ========================================
  // LOGOUT MODAL
  // ========================================

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  // ========================================
  // FETCH SERVICES
  // ========================================

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getActiveServices();

        const serviceList = Array.isArray(data)
          ? data
          : data?.services || [];

        const normalizedServices =
          serviceList.map((service) => ({
            ...service,

            searchId: service._id,

            image:
              service.image ||
              serviceImages[service.name] ||
              "",
          }));

        setServices(normalizedServices);

      } catch (error) {
        console.error(
          "Navbar service search error:",
          error
        );

        setServices([]);
      }
    };

    fetchServices();
  }, []);

  // ========================================
  // CLOSE MENU
  // ========================================

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // ========================================
  // LOGOUT - OPEN MODAL
  // ========================================

  const handleLogout = () => {
    if (loadingAuth) {
      return;
    }

    setShowLogoutModal(true);
  };

  // ========================================
  // LOGOUT - CANCEL
  // ========================================

  const handleCancelLogout = () => {
    if (loadingAuth) {
      return;
    }

    setShowLogoutModal(false);
  };

  // ========================================
  // LOGOUT - CONFIRM
  // ========================================

  const handleConfirmLogout = async () => {
    if (loadingAuth) {
      return;
    }

    try {
      /*
       * No artificial timeout.
       *
       * This waits for the REAL logout()
       * operation from AuthContext.
       */
      await logout();

      setShowLogoutModal(false);

      closeMenu();

      // ==========================================
      // REDIRECT TO LOGIN AFTER LOGOUT
      // ==========================================

      navigate("/login", {
        replace: true,
      });

    } catch (error) {
      console.error(
        "Navbar logout error:",
        error
      );

      setShowLogoutModal(false);
    }
  };

  // ========================================
  // SEARCH RESULTS
  // ========================================

  const filteredServices =
    searchTerm.trim().length > 0
      ? services.filter((service) => {
          const query = searchTerm
            .trim()
            .toLowerCase();

          const name =
            service.name?.toLowerCase() || "";

          const description =
            service.description?.toLowerCase() || "";

          return (
            name.includes(query) ||
            description.includes(query)
          );
        })
      : [];

  // ========================================
  // OPEN SERVICE
  // ========================================

  const openService = (service) => {
    if (!service || !service.searchId) {
      return;
    }

    navigate(
      `/services/${service.searchId}`
    );

    setSearchTerm("");
    setSelectedIndex(-1);
    setSearchFocused(false);

    closeMenu();

    inputRef.current?.blur();
  };

  // ========================================
  // SEARCH SUBMIT
  // ========================================

  const handleSearch = (e) => {
    e.preventDefault();

    if (filteredServices.length === 0) {
      return;
    }

    if (
      selectedIndex >= 0 &&
      selectedIndex < filteredServices.length
    ) {
      openService(
        filteredServices[selectedIndex]
      );

      return;
    }

    openService(filteredServices[0]);
  };

  // ========================================
  // KEYBOARD SEARCH
  // ========================================

  const handleSearchKeyDown = (e) => {
    if (!searchTerm.trim()) {
      return;
    }

    if (filteredServices.length === 0) {
      if (e.key === "Escape") {
        setSearchFocused(false);
      }

      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();

      setSearchFocused(true);

      setSelectedIndex((current) => {
        if (
          current >=
          filteredServices.length - 1
        ) {
          return 0;
        }

        return current + 1;
      });

      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      setSearchFocused(true);

      setSelectedIndex((current) => {
        if (current <= 0) {
          return filteredServices.length - 1;
        }

        return current - 1;
      });

      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();

      if (selectedIndex >= 0) {
        openService(
          filteredServices[selectedIndex]
        );
      } else {
        openService(filteredServices[0]);
      }

      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();

      setSearchFocused(false);
      setSelectedIndex(-1);
    }
  };

  // ========================================
  // SERVICE CLICK
  // ========================================

  const handleServiceClick = (service) => {
    openService(service);
  };

  // ========================================
  // SEARCH CHANGE
  // ========================================

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSearchTerm(value);
    setSearchFocused(true);

    setSelectedIndex(-1);
  };

  // ========================================
  // CLEAR SEARCH
  // ========================================

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedIndex(-1);
    setSearchFocused(false);

    inputRef.current?.focus();
  };

  // ========================================
  // OUTSIDE CLICK
  // ========================================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setSearchFocused(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  // ========================================
  // DESKTOP LINK STYLE
  // ========================================

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

  // ========================================
  // MOBILE LINK STYLE
  // ========================================

  const mobileLinkStyle = ({ isActive }) =>
    `px-4 py-2.5 rounded-lg font-medium transition ${
      isActive
        ? "bg-orange-50 text-orange-500"
        : "text-blue-950 hover:bg-gray-50 hover:text-orange-500"
    }`;

  // ========================================
  // SEARCH RESULTS COMPONENT
  // ========================================

  const SearchResults = ({
    mobile = false,
  }) => {
    if (
      !searchFocused ||
      searchTerm.trim() === ""
    ) {
      return null;
    }

    return (
      <div
        className={
          mobile
            ? "mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden"
            : "absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden z-[200]"
        }
      >

        {filteredServices.length > 0 ? (
          <>
            <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">

              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Services
              </span>

              <span className="text-xs text-gray-400">
                {filteredServices.length} result
                {filteredServices.length !== 1
                  ? "s"
                  : ""}
              </span>

            </div>

            <div className="py-1 max-h-[380px] overflow-y-auto">

              {filteredServices.map(
                (service, index) => {

                  const isSelected =
                    index === selectedIndex;

                  return (
                    <button
                      key={service.searchId}
                      type="button"
                      onMouseDown={(e) =>
                        e.preventDefault()
                      }
                      onMouseEnter={() =>
                        setSelectedIndex(index)
                      }
                      onClick={() =>
                        handleServiceClick(
                          service
                        )
                      }
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${
                        isSelected
                          ? "bg-orange-50"
                          : "hover:bg-gray-50"
                      }`}
                    >

                      <div className="relative shrink-0">

                        {service.image ? (
                          <img
                            src={service.image}
                            alt={service.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                            <FaSearch className="text-orange-500" />
                          </div>
                        )}

                        {isSelected && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-[9px]">
                              ✓
                            </span>
                          </div>
                        )}

                      </div>

                      <div className="flex-1 min-w-0">

                        <p className="font-semibold text-blue-950 text-sm truncate">
                          {service.name}
                        </p>

                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                          {service.description ||
                            "Professional home service"}
                        </p>

                      </div>

                      <div className="text-right shrink-0">

                        <p className="text-orange-500 font-bold text-sm">
                          ₹{service.price}
                        </p>

                        {isSelected && (
                          <p className="text-[10px] text-gray-400 mt-1">
                            Enter ↵
                          </p>
                        )}

                      </div>

                      <FaArrowRight
                        className={`text-xs transition ${
                          isSelected
                            ? "text-orange-500 translate-x-0"
                            : "text-gray-300 -translate-x-1"
                        }`}
                      />

                    </button>
                  );
                }
              )}

            </div>

            <div className="hidden sm:flex items-center gap-3 px-4 py-2.5 bg-gray-50 border-t border-gray-100 text-[11px] text-gray-400">

              <span>
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded">
                  ↑
                </kbd>{" "}
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded">
                  ↓
                </kbd>{" "}
                Navigate
              </span>

              <span>
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded">
                  Enter
                </kbd>{" "}
                Open
              </span>

              <span>
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded">
                  Esc
                </kbd>{" "}
                Close
              </span>

            </div>
          </>
        ) : (
          <div className="px-5 py-7 text-center">

            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
              <FaSearch className="text-gray-400 text-lg" />
            </div>

            <p className="text-gray-700 font-semibold text-sm">
              No services found
            </p>

            <p className="text-gray-400 text-xs mt-1">
              Try cleaning, plumbing, AC,
              electrical, etc.
            </p>

          </div>
        )}

      </div>
    );
  };

  // ========================================
  // RETURN
  // ========================================

  return (
    <>
      <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between min-h-[76px] gap-5">

            {/* LOGO */}

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

            {/* DESKTOP SEARCH */}

            <div className="hidden lg:flex flex-1 justify-center px-4">

              <div
                ref={searchRef}
                className="relative w-full max-w-[460px]"
              >

                <form onSubmit={handleSearch}>

                  <div
                    className={`flex items-center bg-gray-100 border rounded-full px-4 py-2.5 transition-all duration-200 ${
                      searchFocused
                        ? "border-orange-400 ring-4 ring-orange-100 bg-white shadow-md"
                        : "border-gray-200 hover:border-orange-300 hover:shadow-sm"
                    }`}
                  >

                    <FaSearch
                      className={`mr-3 transition-colors shrink-0 ${
                        searchFocused
                          ? "text-orange-500"
                          : "text-gray-400"
                      }`}
                    />

                    <input
                      ref={inputRef}
                      type="text"
                      value={searchTerm}
                      onChange={
                        handleSearchChange
                      }
                      onFocus={() =>
                        setSearchFocused(true)
                      }
                      onKeyDown={
                        handleSearchKeyDown
                      }
                      placeholder="Search any TrueFix service..."
                      autoComplete="off"
                      className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                    />

                    {searchTerm && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="ml-2 w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition"
                        aria-label="Clear search"
                      >
                        <FaTimes />
                      </button>
                    )}

                  </div>

                </form>

                <SearchResults />

              </div>

            </div>

            {/* DESKTOP NAVIGATION */}

            <div className="hidden md:flex items-center shrink-0">

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
                    <>
                      <NavLink
                        to="/admin"
                        className={desktopLinkStyle}
                      >
                        Admin Dashboard
                      </NavLink>

                      <button
                        type="button"
                        onClick={handleLogout}
                        disabled={loadingAuth}
                        className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      >

                        <span>
                          {loadingAuth
                            ? "Logging out..."
                            : "Logout"}
                        </span>

                        <span>
                          →
                        </span>

                      </button>
                    </>
                  )}

                </div>
              )}

            </div>

            {/* MOBILE MENU BUTTON */}

            <button
              type="button"
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

          {/* MOBILE MENU */}

          {menuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4">

              {/* MOBILE SEARCH */}

              <div
                ref={searchRef}
                className="relative mb-4"
              >

                <form onSubmit={handleSearch}>

                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100">

                    <FaSearch className="text-gray-400 mr-3 shrink-0" />

                    <input
                      ref={inputRef}
                      type="text"
                      value={searchTerm}
                      onChange={
                        handleSearchChange
                      }
                      onFocus={() =>
                        setSearchFocused(true)
                      }
                      onKeyDown={
                        handleSearchKeyDown
                      }
                      placeholder="Search services..."
                      autoComplete="off"
                      className="w-full bg-transparent outline-none text-sm"
                    />

                    {searchTerm && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                      >
                        <FaTimes />
                      </button>
                    )}

                  </div>

                </form>

                <SearchResults mobile />

              </div>

              {/* MOBILE NAVIGATION */}

              <div className="flex flex-col gap-2">

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
                    {/* CUSTOMER */}

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

                    {/* ADMIN */}

                    {user?.role === "admin" && (
                      <>
                        <NavLink
                          to="/admin"
                          onClick={closeMenu}
                          className={mobileLinkStyle}
                        >
                          Admin Dashboard
                        </NavLink>

                        <button
                          type="button"
                          onClick={handleLogout}
                          disabled={loadingAuth}
                          className="flex items-center justify-between bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-lg font-semibold transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        >

                          <span>
                            {loadingAuth
                              ? "Logging out..."
                              : "Logout"}
                          </span>

                          <span>
                            →
                          </span>

                        </button>
                      </>
                    )}

                  </>
                )}

              </div>

            </div>
          )}

        </div>
      </nav>

      {/* LOGOUT CONFIRMATION MODAL */}

      {showLogoutModal && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center px-4">

          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6">

            <div className="w-14 h-14 mx-auto rounded-full bg-orange-100 flex items-center justify-center text-2xl">
              🚪
            </div>

            <h2 className="text-xl font-bold text-gray-900 text-center mt-5">
              Logout from TrueFix?
            </h2>

            <p className="text-gray-500 text-center mt-3">
              Are you sure you want to logout from
              your TrueFix account?
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-7">

              <button
                type="button"
                onClick={handleCancelLogout}
                disabled={loadingAuth}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmLogout}
                disabled={loadingAuth}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loadingAuth
                  ? "Logging out..."
                  : "Confirm Logout"}
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default Navbar;