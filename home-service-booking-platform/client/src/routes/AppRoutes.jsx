import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import AdminLayout from "../components/layout/AdminLayout";

import ProtectedRoute from "../components/common/ProtectedRoute";
import GuestRoute from "../components/common/GuestRoute";

// ==========================================
// CUSTOMER PAGES
// ==========================================

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Services from "../pages/Services/Services";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import BookService from "../pages/BookService/BookService";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import MyBookings from "../pages/MyBookings/MyBookings";

// ==========================================
// ADMIN PAGES
// ==========================================

import AdminDashboard from "../pages/Admin/AdminDashboard";
import ManageBookings from "../pages/Admin/ManageBookings";
import ManageServices from "../pages/Admin/ManageServices";
import ManageUsers from "../pages/Admin/ManageUsers";

// ==========================================
// APP ROUTES
// ==========================================

function AppRoutes() {
  return (
    <Routes>

      {/* ==================================================
          CUSTOMER WEBSITE
      ================================================== */}

      <Route element={<Layout />}>

        {/* ==================================================
            PUBLIC CUSTOMER PAGES
        ================================================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/services/:id"
          element={<ServiceDetails />}
        />


        {/* ==================================================
            GUEST ONLY PAGES
            Logged-in users cannot access these.
        ================================================== */}

        <Route element={<GuestRoute />}>

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

        </Route>


        {/* ==================================================
            CUSTOMER PROTECTED ROUTES
        ================================================== */}

        <Route
          element={
            <ProtectedRoute allowedRoles={["customer"]} />
          }
        >

          <Route
            path="/book-service"
            element={<BookService />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/my-bookings"
            element={<MyBookings />}
          />

        </Route>

      </Route>


      {/* ==================================================
          ADMIN PANEL
      ================================================== */}

      <Route element={<AdminLayout />}>

        <Route
          element={
            <ProtectedRoute allowedRoles={["admin"]} />
          }
        >

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/bookings"
            element={<ManageBookings />}
          />

          <Route
            path="/admin/services"
            element={<ManageServices />}
          />

          <Route
            path="/admin/users"
            element={<ManageUsers />}
          />

        </Route>

      </Route>


      {/* ==================================================
          OPTIONAL FALLBACK
      ================================================== */}

      <Route
        path="*"
        element={<Home />}
      />

    </Routes>
  );
}

export default AppRoutes;