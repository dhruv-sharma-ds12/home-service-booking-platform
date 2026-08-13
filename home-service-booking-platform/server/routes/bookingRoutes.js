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

// ========================================
// CUSTOMER - CREATE BOOKING
// ========================================

router.post(
  "/",
  authMiddleware,
  createBooking
);

// ========================================
// ADMIN - GET ALL BOOKINGS
// ========================================

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getBookings
);

// ========================================
// CUSTOMER - GET THEIR BOOKINGS
// ========================================

router.get(
  "/my",
  authMiddleware,
  getMyBookings
);

// ========================================
// ADMIN - UPDATE BOOKING STATUS
// ========================================

router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateBookingStatus
);

// ========================================
// CUSTOMER OR ADMIN - CANCEL BOOKING
// ========================================

router.patch(
  "/:id/cancel",
  authMiddleware,
  cancelBooking
);

module.exports = router;