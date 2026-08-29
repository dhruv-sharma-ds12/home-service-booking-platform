const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createReview,
  getReviewByBooking,
  getReviews,
} = require("../controllers/reviewController");

const router = express.Router();

// ==========================================
// CUSTOMER - CREATE REVIEW
// ==========================================

router.post(
  "/",
  authMiddleware,
  createReview
);

// ==========================================
// CUSTOMER - GET REVIEW FOR THEIR BOOKING
// ADMIN - GET REVIEW FOR ANY BOOKING
// ==========================================

router.get(
  "/booking/:bookingId",
  authMiddleware,
  getReviewByBooking
);

// ==========================================
// ADMIN - GET ALL REVIEWS
// ==========================================

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getReviews
);

module.exports = router;