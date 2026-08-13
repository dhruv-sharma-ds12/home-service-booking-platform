import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import AdminLayout from "../components/layout/AdminLayout";

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

import AdminDashboard from "../pages/Admin/AdminDashboard";
import ManageBookings from "../pages/Admin/ManageBookings";
import ManageServices from "../pages/Admin/ManageServices";
import ManageUsers from "../pages/Admin/ManageUsers";

function AppRoutes() {
  return (
    <Routes>

      {/* =========================
          CUSTOMER WEBSITE
      ========================= */}

      <Route element={<Layout />}>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/services" element={<Services />} />

        <Route
          path="/services/:id"
          element={<ServiceDetails />}
        />

        <Route
          path="/book-service"
          element={<BookService />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
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


      {/* =========================
          ADMIN PANEL
      ========================= */}

      <Route element={<AdminLayout />}>

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

    </Routes>
  );
}

export default AppRoutes;