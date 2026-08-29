import { apiRequest } from "./api";

// ==========================================
// CREATE REVIEW
// ==========================================

export const createReview = async (reviewData) => {
  return await apiRequest("/reviews", {
    method: "POST",
    body: JSON.stringify(reviewData),
  });
};

// ==========================================
// GET REVIEW FOR A BOOKING
// ==========================================

export const getReviewByBooking = async (bookingId) => {
  return await apiRequest(`/reviews/booking/${bookingId}`);
};

// ==========================================
// ADMIN - GET ALL REVIEWS
// ==========================================

export const getReviews = async () => {
  return await apiRequest("/reviews");
};