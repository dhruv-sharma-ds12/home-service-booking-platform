import { NavLink } from "react-router-dom";
import {
  FaEnvelope,
  FaPhone,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";

function Footer() {
  const linkStyle =
    "text-gray-400 hover:text-orange-500 hover:translate-x-1 transition-all duration-300 inline-block";

  return (
    <footer className="bg-gray-950 text-white mt-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* =========================
            FOOTER CONTENT
        ========================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">

          {/* =========================
              TRUEFIX
          ========================= */}

          <div>

            <NavLink
              to="/"
              className="inline-block group"
            >
              <span className="text-4xl sm:text-6xl font-bold tracking-tight">

                <span className="text-blue-950 transition">
                  True
                </span>

                <span className="text-orange-500 transition">
                  Fix
                </span>

              </span>
            </NavLink>

            <p className="mt-4 text-gray-400 leading-relaxed max-w-sm">
              Reliable home services, trusted professionals, and
              hassle-free booking — all at your doorstep.
            </p>

            <p className="mt-5 text-orange-500 font-semibold">
              Fixing Homes. Earning Trust.
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Your home, our responsibility.
            </p>

          </div>


          {/* =========================
              QUICK LINKS
          ========================= */}

          <div>

            <h3 className="font-semibold text-lg mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <NavLink to="/" className={linkStyle}>
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/about" className={linkStyle}>
                  About Us
                </NavLink>
              </li>

              <li>
                <NavLink to="/services" className={linkStyle}>
                  Services
                </NavLink>
              </li>

              <li>
                <NavLink to="/contact" className={linkStyle}>
                  Contact Us
                </NavLink>
              </li>

              <li>
                <NavLink to="/login" className={linkStyle}>
                  Login
                </NavLink>
              </li>

            </ul>

          </div>


          {/* =========================
              POPULAR SERVICES
          ========================= */}

          <div>

            <h3 className="font-semibold text-lg mb-5">
              Popular Services
            </h3>

            <ul className="space-y-3">

              <li>
                <NavLink to="/services" className={linkStyle}>
                  Home Cleaning
                </NavLink>
              </li>

              <li>
                <NavLink to="/services" className={linkStyle}>
                  AC & Appliance Repair
                </NavLink>
              </li>

              <li>
                <NavLink to="/services" className={linkStyle}>
                  Plumbing
                </NavLink>
              </li>

              <li>
                <NavLink to="/services" className={linkStyle}>
                  Electrical Work
                </NavLink>
              </li>

              <li>
                <NavLink to="/services" className={linkStyle}>
                  Pest Control
                </NavLink>
              </li>

            </ul>

          </div>


          {/* =========================
              CONTACT & SUPPORT
          ========================= */}

          <div>

            <h3 className="font-semibold text-lg mb-5">
              Contact & Support
            </h3>

            <div className="space-y-4">

              {/* Email */}

              <div className="flex gap-3 items-start">

                <FaEnvelope className="text-orange-500 mt-1 shrink-0" />

                <div>

                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <a
                    href="mailto:support@truefix.com"
                    className="text-gray-400 hover:text-orange-500 transition break-all"
                  >
                    support@truefix.com
                  </a>

                </div>

              </div>


              {/* Phone */}

              <div className="flex gap-3 items-start">

                <FaPhone className="text-orange-500 mt-1 shrink-0" />

                <div>

                  <p className="text-sm text-gray-500">
                    Phone
                  </p>

                  <a
                    href="tel:+918307355247"
                    className="text-gray-400 hover:text-orange-500 transition"
                  >
                    +91 8307355247
                  </a>

                </div>

              </div>


              {/* Support Hours */}

              <div className="flex gap-3 items-start">

                <FaClock className="text-orange-500 mt-1 shrink-0" />

                <div>

                  <p className="text-sm text-gray-500">
                    Support Hours
                  </p>

                  <p className="text-gray-400">
                    Mon - Sun: 8:00 AM - 9:00 PM
                  </p>

                </div>

              </div>


              {/* Contact Support */}

              <NavLink
                to="/contact"
                className="inline-flex items-center gap-2 mt-2 text-orange-500 font-medium hover:text-orange-400 transition-all duration-300 group"
              >
                Contact Support

                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />

              </NavLink>

            </div>

          </div>

        </div>


        {/* =========================
            BOTTOM SECTION
        ========================= */}

        <div className="border-t border-gray-800 mt-12 pt-6">

          <div className="flex flex-col md:flex-row items-center justify-between gap-3">

            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2026 TrueFix. All Rights Reserved.
            </p>

            <p className="text-gray-500 text-sm text-center">
              Trusted services. Skilled professionals. Happier homes.
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;