import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <Navbar />

      <main className="w-full min-w-0">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;