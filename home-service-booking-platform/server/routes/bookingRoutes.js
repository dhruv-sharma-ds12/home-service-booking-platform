const express = require("express");

const {
  createBooking,
  getBookings,
  updateBookingStatus,
  deleteBooking,
} = require("../controllers/bookingController");

const router = express.Router();

// Create booking
router.post("/", createBooking);

// Get all bookings
router.get("/", getBookings);

// Update booking status
router.put("/:id/status", updateBookingStatus);

// Cancel/delete booking
router.delete("/:id", deleteBooking);

module.exports = router;