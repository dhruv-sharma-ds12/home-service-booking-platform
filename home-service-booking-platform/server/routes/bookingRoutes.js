const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createBooking,
  getBookings,
  getMyBookings,
  updateBookingStatus,
  cancelBooking,
} = require("../controllers/bookingController");

const router = express.Router();

// Create booking
router.post("/", authMiddleware, createBooking);

// Get all bookings
router.get("/", authMiddleware, getBookings);

// Get my bookings
router.get("/my", authMiddleware, getMyBookings);

// Update booking status - ADMIN ONLY
router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateBookingStatus
);

// Cancel booking
router.patch("/:id/cancel", authMiddleware, cancelBooking);

module.exports = router;