import { apiRequest } from "./api";

// Get logged-in user's bookings
export const getMyBookings = async () => {
  return await apiRequest("/bookings/my", {
    method: "GET",
  });
};

// Create a new booking
export const createBooking = async (bookingData) => {
  return await apiRequest("/bookings", {
    method: "POST",
    body: JSON.stringify(bookingData),
  });
};

// Cancel a booking
export const cancelBooking = async (bookingId) => {
  return await apiRequest(`/bookings/${bookingId}/cancel`, {
    method: "PATCH",
  });
};

// Admin: update booking status
export const updateBookingStatus = async (
  bookingId,
  status
) => {
  return await apiRequest(`/bookings/${bookingId}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
};