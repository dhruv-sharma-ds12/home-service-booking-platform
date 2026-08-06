import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import ProtectedRoute from "../components/common/ProtectedRoute";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Services from "../pages/Services/Services";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import Bookings from "../pages/Bookings/Bookings";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import MyBookings from "../pages/MyBookings/MyBookings";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Layout */}
        <Route element={<Layout />}>

          {/* =========================
              PUBLIC ROUTES
          ========================= */}

          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/services" element={<Services />} />

          <Route
            path="/services/:id"
            element={<ServiceDetails />}
          />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />


          {/* =========================
              CUSTOMER ROUTES
          ========================= */}

          <Route
            path="/profile"
            element={
              <ProtectedRoute role="customer">
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/bookings"
            element={
              <ProtectedRoute role="customer">
                <Bookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute role="customer">
                <MyBookings />
              </ProtectedRoute>
            }
          />


          {/* =========================
              ADMIN ROUTE
          ========================= */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;