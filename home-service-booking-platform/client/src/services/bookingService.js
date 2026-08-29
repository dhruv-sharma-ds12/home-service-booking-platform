import { apiRequest } from "./api";

// ==========================================
// CREATE BOOKING
// ==========================================

export const createBooking = async (bookingData) => {
  return await apiRequest("/bookings", {
    method: "POST",
    body: JSON.stringify(bookingData),
  });
};

// ==========================================
// GET MY BOOKINGS
// ==========================================

export const getMyBookings = async () => {
  return await apiRequest("/bookings/my");
};

// ==========================================
// CANCEL BOOKING
// ==========================================

export const cancelBooking = async (bookingId) => {
  return await apiRequest(`/bookings/${bookingId}/cancel`, {
    method: "PATCH",
  });
};

// ==========================================
// GET SINGLE BOOKING
// ==========================================

export const getBookingById = async (bookingId) => {
  return await apiRequest(`/bookings/${bookingId}`);
};

// ==========================================
// GET ALL BOOKINGS - ADMIN
// ==========================================

export const getAllBookings = async () => {
  return await apiRequest("/bookings");
};

// ==========================================
// UPDATE BOOKING STATUS - ADMIN
// ==========================================

export const updateBookingStatus = async (bookingId, status) => {
  return await apiRequest(`/bookings/${bookingId}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
};