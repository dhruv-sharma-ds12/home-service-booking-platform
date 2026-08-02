import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import Bookings from "../pages/Bookings/Bookings";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>

          <Route path="/" element={<Home />} />

          <Route path="/services" element={<Services />} />

          <Route path="/services/:id" element={<ServiceDetails />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/bookings" element={<Bookings />} />

          <Route path="/admin" element={<AdminDashboard />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;