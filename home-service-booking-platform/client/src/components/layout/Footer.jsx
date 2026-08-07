import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* TrueFix / About */}
          <div>
            <NavLink to="/" className="inline-block">
              <span className="text-5xl font-bold">
                <span className="text-blue-900">True</span>
                <span className="text-orange-500">Fix</span>
              </span>
            </NavLink>

            <p className="mt-4 text-gray-400 leading-relaxed max-w-sm">
              Reliable home services, trusted professionals, and
              hassle-free booking — all at your doorstep.
            </p>

            <p className="mt-4 text-orange-500 font-semibold">
              "Fixing Homes, Earning Trust. TrueFix."
            </p>
          </div>


          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <NavLink
                  to="/"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/about"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  About Us
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/services"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  Services
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  Contact Us
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/login"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  Login
                </NavLink>
              </li>

            </ul>
          </div>


          {/* Popular Services */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Popular Services
            </h3>

            <ul className="space-y-3">

              <li>
                <NavLink
                  to="/services"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  Home Cleaning
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/services"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  AC & Appliance Repair
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/services"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  Plumbing
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/services"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  Electrical Work
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/services"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  Pest Control
                </NavLink>
              </li>

            </ul>
          </div>


          {/* Contact & Support */}
          <div>
            <h3 className="font-semibold text-lg mb-5">
              Contact & Support
            </h3>

            <div className="space-y-4">

              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <a
                  href="mailto:support@truefix.com"
                  className="text-gray-400 hover:text-orange-500 transition break-words"
                >
                  support@truefix.com
                </a>
              </div>

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

              <div>
                <p className="text-sm text-gray-500">
                  Support Hours
                </p>

                <p className="text-gray-400">
                  Mon - Sun: 8:00 AM - 9:00 PM
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Need Help?
                </p>

                <NavLink
                  to="/contact"
                  className="inline-block mt-1 text-orange-500 font-medium hover:text-orange-400 transition"
                >
                  Contact Support →
                </NavLink>
              </div>

            </div>
          </div>

        </div>


        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-10 pt-6">

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