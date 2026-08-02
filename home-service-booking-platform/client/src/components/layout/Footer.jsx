import { NavLink } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* TrueFix */}
          <div>
            <NavLink to="/" className="inline-block">
              <span className="text-4xl sm:text-5xl font-bold">
                <span className="text-blue-900">True</span>
                <span className="text-orange-500">Fix</span>
              </span>
            </NavLink>

            <p className="mt-3 text-gray-400 max-w-sm">
              Trusted Home Services at Your Doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2">
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
                  to="/services"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  Services
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/bookings"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  Bookings
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-3">
              Contact
            </h3>

            <p className="text-gray-400 break-words">
              support@truefix.com
            </p>

            <p className="text-gray-400 mt-2">
              +91 8307355247
            </p>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <p className="text-center text-gray-500 text-sm">
            © 2026 TrueFix. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;