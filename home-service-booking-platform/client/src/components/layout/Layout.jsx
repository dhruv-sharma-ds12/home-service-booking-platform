import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "../common/ScrollToTop";

function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ScrollToTop />

      <Navbar />

      <main className="w-full min-w-0 flex-1">
        <div
          key={location.pathname}
          className="page-transition"
        >
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Layout;