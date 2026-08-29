const Review = require("../models/Review");
const Booking = require("../models/Booking");

// ==========================================
// CREATE REVIEW
// CUSTOMER ONLY
// ==========================================

const createReview = async (req, res) => {
  try {
    const {
      bookingId,
      rating,
      comment,
    } = req.body;

    // ==========================================
    // REQUIRED FIELDS
    // ==========================================

    if (!bookingId || rating === undefined || !comment) {
      return res.status(400).json({
        message:
          "Booking, rating and review comment are required.",
      });
    }

    // ==========================================
    // VALIDATE RATING
    // ==========================================

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        message:
          "Rating must be a whole number between 1 and 5.",
      });
    }

    // ==========================================
    // VALIDATE COMMENT
    // ==========================================

    const cleanedComment = comment.trim();

    if (!cleanedComment) {
      return res.status(400).json({
        message: "Review comment cannot be empty.",
      });
    }

    if (cleanedComment.length > 500) {
      return res.status(400).json({
        message:
          "Review cannot be longer than 500 characters.",
      });
    }

    // ==========================================
    // FIND BOOKING
    // ==========================================

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    // ==========================================
    // CHECK BOOKING OWNERSHIP
    // ==========================================

    if (!booking.user) {
      return res.status(400).json({
        message:
          "This booking is not linked to a user.",
      });
    }

    if (
      booking.user.toString() !==
      req.user.userId.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not authorized to review this booking.",
      });
    }

    // ==========================================
    // ONLY COMPLETED BOOKINGS CAN BE REVIEWED
    // ==========================================

    if (booking.status !== "Completed") {
      return res.status(400).json({
        message:
          "You can only review completed services.",
      });
    }

    // ==========================================
    // CHECK FOR EXISTING REVIEW
    // ==========================================

    const existingReview = await Review.findOne({
      booking: bookingId,
    });

    if (existingReview) {
      return res.status(400).json({
        message:
          "You have already reviewed this service.",
      });
    }

    // ==========================================
    // CREATE REVIEW
    // ==========================================

    const review = await Review.create({
      booking: booking._id,
      user: req.user.userId,
      service: booking.service,
      rating: numericRating,
      comment: cleanedComment,
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(201).json({
      message: "Review submitted successfully.",
      review,
    });
  } catch (error) {
    console.error(
      "Create review error:",
      error
    );

    return res.status(500).json({
      message: "Failed to submit review.",
      error: error.message,
    });
  }
};

// ==========================================
// GET REVIEW FOR A BOOKING
// ==========================================

const getReviewByBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // ==========================================
    // FIND BOOKING
    // ==========================================

    const booking = await Booking.findById(
      bookingId
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    // ==========================================
    // CHECK OWNERSHIP
    // ==========================================

    if (!booking.user) {
      return res.status(400).json({
        message:
          "This booking is not linked to a user.",
      });
    }

    if (
      req.user.role !== "admin" &&
      booking.user.toString() !==
        req.user.userId.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not authorized to view this review.",
      });
    }

    // ==========================================
    // FIND REVIEW
    // ==========================================

    const review = await Review.findOne({
      booking: bookingId,
    }).populate(
      "user",
      "name email"
    );

    // No review yet
    if (!review) {
      return res.status(200).json({
        review: null,
      });
    }

    return res.status(200).json({
      review,
    });
  } catch (error) {
    console.error(
      "Get review by booking error:",
      error
    );

    return res.status(500).json({
      message: "Failed to fetch review.",
      error: error.message,
    });
  }
};

// ==========================================
// GET ALL REVIEWS
// ADMIN
// ==========================================

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate(
        "user",
        "name email"
      )
      .populate(
        "booking",
        "service price date time status"
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      reviews,
    });
  } catch (error) {
    console.error(
      "Get reviews error:",
      error
    );

    return res.status(500).json({
      message: "Failed to fetch reviews.",
      error: error.message,
    });
  }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  createReview,
  getReviewByBooking,
  getReviews,
};