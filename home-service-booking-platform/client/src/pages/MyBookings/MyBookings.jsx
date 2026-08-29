import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  getMyBookings,
  cancelBooking as cancelBookingApi,
} from "../../services/bookingService";

import {
  createReview,
  getReviewByBooking,
} from "../../services/reviewService";

function MyBookings() {
  // ==========================================
  // BOOKINGS STATE
  // ==========================================

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cancellingId, setCancellingId] = useState(null);

  // ==========================================
  // REVIEW STATE
  // ==========================================

  const [reviews, setReviews] = useState({});
  const [reviewLoading, setReviewLoading] = useState({});
  const [reviewSubmitting, setReviewSubmitting] = useState(null);

  const [reviewForm, setReviewForm] = useState({
    bookingId: null,
    rating: 5,
    comment: "",
  });

  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewError, setReviewError] = useState("");

  // ==========================================
  // FETCH BOOKINGS
  // ==========================================

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyBookings();

      const bookingList = Array.isArray(data)
        ? data
        : data?.bookings || [];

      setBookings(bookingList);
    } catch (error) {
      console.error(
        "Fetch bookings error:",
        error
      );

      setError(
        error.message ||
          "Unable to load bookings."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD BOOKINGS
  // ==========================================

  useEffect(() => {
    fetchBookings();
  }, []);

  // ==========================================
  // CHECK REVIEW FOR COMPLETED BOOKING
  // ==========================================

  const checkReview = async (bookingId) => {
    try {
      setReviewLoading((previous) => ({
        ...previous,
        [bookingId]: true,
      }));

      const data =
        await getReviewByBooking(bookingId);

      setReviews((previous) => ({
        ...previous,
        [bookingId]: data?.review || null,
      }));
    } catch (error) {
      console.error(
        "Check review error:",
        error
      );
    } finally {
      setReviewLoading((previous) => ({
        ...previous,
        [bookingId]: false,
      }));
    }
  };

  // ==========================================
  // CHECK REVIEWS AFTER BOOKINGS LOAD
  // ==========================================

  useEffect(() => {
    if (!bookings.length) {
      return;
    }

    const completedBookings =
      bookings.filter(
        (booking) =>
          booking.status === "Completed"
      );

    completedBookings.forEach((booking) => {
      checkReview(booking._id);
    });
  }, [bookings]);

  // ==========================================
  // OPEN REVIEW FORM
  // ==========================================

  const openReviewForm = (bookingId) => {
    setReviewForm({
      bookingId,
      rating: 5,
      comment: "",
    });

    setReviewMessage("");
    setReviewError("");
  };

  // ==========================================
  // CLOSE REVIEW FORM
  // ==========================================

  const closeReviewForm = () => {
    setReviewForm({
      bookingId: null,
      rating: 5,
      comment: "",
    });

    setReviewMessage("");
    setReviewError("");
  };

  // ==========================================
  // REVIEW INPUT
  // ==========================================

  const handleReviewCommentChange = (e) => {
    setReviewForm((previous) => ({
      ...previous,
      comment: e.target.value,
    }));

    setReviewMessage("");
    setReviewError("");
  };

  // ==========================================
  // REVIEW RATING
  // ==========================================

  const handleRatingChange = (rating) => {
    setReviewForm((previous) => ({
      ...previous,
      rating,
    }));

    setReviewMessage("");
    setReviewError("");
  };

  // ==========================================
  // SUBMIT REVIEW
  // ==========================================

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    setReviewMessage("");
    setReviewError("");

    const {
      bookingId,
      rating,
      comment,
    } = reviewForm;

    if (!bookingId) {
      setReviewError(
        "Invalid booking selected."
      );
      return;
    }

    if (!rating) {
      setReviewError(
        "Please select a rating."
      );
      return;
    }

    if (!comment.trim()) {
      setReviewError(
        "Please write a review comment."
      );
      return;
    }

    if (comment.trim().length > 500) {
      setReviewError(
        "Review cannot be longer than 500 characters."
      );
      return;
    }

    try {
      setReviewSubmitting(bookingId);

      const data = await createReview({
        bookingId,
        rating,
        comment: comment.trim(),
      });

      if (!data?.review) {
        throw new Error(
          "Review was not returned by the server."
        );
      }

      // Save review in local state
      setReviews((previous) => ({
        ...previous,
        [bookingId]: data.review,
      }));

      setReviewMessage(
        data.message ||
          "Review submitted successfully."
      );

      // Clear form
      setReviewForm({
        bookingId: null,
        rating: 5,
        comment: "",
      });

    } catch (error) {
      console.error(
        "Submit review error:",
        error
      );

      setReviewError(
        error.message ||
          "Unable to submit review."
      );
    } finally {
      setReviewSubmitting(null);
    }
  };

  // ==========================================
  // CANCEL BOOKING
  // ==========================================

  const cancelBooking = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancellingId(id);
      setError("");

      const data =
        await cancelBookingApi(id);

      const updatedBooking =
        data?.booking;

      setBookings(
        (previousBookings) =>
          previousBookings.map(
            (booking) =>
              booking._id === id
                ? {
                    ...booking,
                    status:
                      updatedBooking?.status ||
                      "Cancelled",
                  }
                : booking
          )
      );
    } catch (error) {
      console.error(
        "Cancel booking error:",
        error
      );

      setError(
        error.message ||
          "Unable to cancel booking."
      );
    } finally {
      setCancellingId(null);
    }
  };

  // ==========================================
  // STATUS STYLE
  // ==========================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";

      case "Completed":
        return "bg-blue-100 text-blue-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      case "Pending":
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  // ==========================================
  // STATUS ICON
  // ==========================================

  const getStatusIcon = (status) => {
    switch (status) {
      case "Confirmed":
        return "✓";

      case "Completed":
        return "✓";

      case "Cancelled":
        return "✕";

      case "Pending":
      default:
        return "⏳";
    }
  };

  // ==========================================
  // STATISTICS
  // ==========================================

  const totalBookings =
    bookings.length;

  const pendingBookings =
    bookings.filter(
      (booking) =>
        booking.status === "Pending"
    ).length;

  const confirmedBookings =
    bookings.filter(
      (booking) =>
        booking.status === "Confirmed"
    ).length;

  const completedBookings =
    bookings.filter(
      (booking) =>
        booking.status === "Completed"
    ).length;

  const cancelledBookings =
    bookings.filter(
      (booking) =>
        booking.status === "Cancelled"
    ).length;

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">

          <div className="w-12 h-12 mx-auto border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin" />

          <h1 className="text-2xl font-bold text-blue-900 mt-5">
            Loading bookings...
          </h1>

          <p className="text-gray-500 mt-2">
            Please wait while we load your bookings.
          </p>

        </div>
      </section>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4">

      <div className="max-w-5xl mx-auto">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="text-center mb-10">

          <p className="text-orange-500 font-semibold tracking-wide uppercase text-sm">
            TrueFix
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mt-2">
            My Bookings
          </h1>

          <p className="text-gray-600 mt-2">
            View and manage your TrueFix service bookings.
          </p>

        </div>

        {/* =====================================
            SUCCESS REVIEW MESSAGE
        ===================================== */}

        {reviewMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6">

            <div className="flex items-start gap-3">

              <span className="text-lg">
                ✓
              </span>

              <p className="font-medium">
                {reviewMessage}
              </p>

            </div>

          </div>
        )}

        {/* =====================================
            ERROR
        ===================================== */}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <p>
                {error}
              </p>

              <button
                type="button"
                onClick={fetchBookings}
                className="self-start sm:self-auto bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg font-semibold transition cursor-pointer"
              >
                Retry
              </button>

            </div>

          </div>
        )}

        {/* =====================================
            REVIEW ERROR
        ===================================== */}

        {reviewError && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">

            <div className="flex items-start gap-3">

              <span className="text-lg">
                !
              </span>

              <p className="font-medium">
                {reviewError}
              </p>

            </div>

          </div>
        )}

        {/* =====================================
            SUMMARY
        ===================================== */}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">

          <div className="bg-white rounded-xl shadow-sm p-5 text-center hover:shadow-md transition-shadow duration-300">
            <p className="text-2xl font-bold text-blue-900">
              {totalBookings}
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Total
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 text-center hover:shadow-md transition-shadow duration-300">
            <p className="text-2xl font-bold text-yellow-500">
              {pendingBookings}
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Pending
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 text-center hover:shadow-md transition-shadow duration-300">
            <p className="text-2xl font-bold text-green-600">
              {confirmedBookings}
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Confirmed
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 text-center hover:shadow-md transition-shadow duration-300">
            <p className="text-2xl font-bold text-blue-600">
              {completedBookings}
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Completed
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 text-center hover:shadow-md transition-shadow duration-300">
            <p className="text-2xl font-bold text-red-600">
              {cancelledBookings}
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Cancelled
            </p>
          </div>

        </div>

        {/* =====================================
            EMPTY STATE
        ===================================== */}

        {bookings.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-md p-10 sm:p-12 text-center">

            <div className="text-6xl mb-5">
              📅
            </div>

            <h2 className="text-2xl font-semibold text-gray-800">
              No Bookings Yet
            </h2>

            <p className="text-gray-500 mt-2 mb-7 max-w-md mx-auto">
              You haven't booked any home services yet.
              Browse our services and book a professional today.
            </p>

            <Link
              to="/services"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold shadow-sm hover:bg-orange-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              Book a Service
            </Link>

          </div>

        ) : (

          /* =====================================
             BOOKINGS LIST
          ===================================== */

          <div className="space-y-6">

            {bookings.map((booking) => {

              const existingReview =
                reviews[booking._id];

              const isCheckingReview =
                reviewLoading[booking._id];

              const isSubmittingReview =
                reviewSubmitting ===
                booking._id;

              const isReviewOpen =
                reviewForm.bookingId ===
                booking._id;

              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-2xl shadow-md p-5 sm:p-6 hover:shadow-lg transition-shadow duration-300"
                >

                  {/* =================================
                      TOP SECTION
                  ================================= */}

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <div>

                      <p className="text-sm text-gray-500">
                        Booking ID:{" "}
                        <span className="font-medium">
                          TF
                          {booking._id
                            ?.slice(-6)
                            .toUpperCase()}
                        </span>
                      </p>

                      <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mt-1">
                        {booking.service}
                      </h2>

                    </div>

                    <span
                      className={`w-fit inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(
                        booking.status
                      )}`}
                    >

                      <span>
                        {getStatusIcon(
                          booking.status
                        )}
                      </span>

                      {booking.status}

                    </span>

                  </div>

                  {/* =================================
                      DETAILS
                  ================================= */}

                  <div className="border-t border-gray-200 mt-5 pt-5">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                      <div>
                        <p className="text-sm text-gray-500">
                          Service Date
                        </p>

                        <p className="font-medium text-gray-800 mt-1">
                          {booking.date || "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Service Time
                        </p>

                        <p className="font-medium text-gray-800 mt-1">
                          {booking.time || "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Address
                        </p>

                        <p className="font-medium text-gray-800 mt-1 break-words">
                          {booking.address || "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Price
                        </p>

                        <p className="font-bold text-orange-500 text-lg mt-1">
                          ₹{booking.price ?? 0}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* =================================
                      CUSTOMER DETAILS
                  ================================= */}

                  <div className="mt-5 bg-gray-50 rounded-xl p-4">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Booking Person
                        </p>

                        <p className="font-medium text-gray-800 mt-1">
                          {booking.customerName || "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Phone
                        </p>

                        <p className="font-medium text-gray-800 mt-1">
                          {booking.phone || "—"}
                        </p>
                      </div>

                    </div>

                    {booking.notes && (
                      <div className="mt-4">

                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Additional Instructions
                        </p>

                        <p className="text-gray-700 mt-1">
                          {booking.notes}
                        </p>

                      </div>
                    )}

                  </div>

                  {/* =================================
                      REVIEW SECTION
                  ================================= */}

                  {booking.status === "Completed" && (

                    <div className="mt-5 border border-blue-100 bg-blue-50/50 rounded-xl p-5">

                      {/* CHECKING REVIEW */}

                      {isCheckingReview ? (

                        <div className="flex items-center gap-3 text-gray-600">

                          <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-900 rounded-full animate-spin" />

                          <span>
                            Checking review...
                          </span>

                        </div>

                      ) : existingReview ? (

                        /* =================================
                           REVIEW ALREADY SUBMITTED
                        ================================= */

                        <div>

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                            <div>

                              <p className="text-sm font-semibold text-green-700">
                                ✓ You reviewed this service
                              </p>

                              <div className="flex items-center gap-1 mt-2">

                                {[1, 2, 3, 4, 5].map(
                                  (star) => (
                                    <span
                                      key={star}
                                      className={
                                        star <=
                                        existingReview.rating
                                          ? "text-yellow-400 text-xl"
                                          : "text-gray-300 text-xl"
                                      }
                                    >
                                      ★
                                    </span>
                                  )
                                )}

                              </div>

                            </div>

                          </div>

                          <p className="text-gray-700 mt-3">
                            "{existingReview.comment}"
                          </p>

                        </div>

                      ) : isReviewOpen ? (

                        /* =================================
                           REVIEW FORM
                        ================================= */

                        <form
                          onSubmit={
                            handleSubmitReview
                          }
                        >

                          <div className="flex items-center justify-between gap-3 mb-5">

                            <div>

                              <h3 className="text-lg font-bold text-blue-900">
                                Rate Your Service
                              </h3>

                              <p className="text-sm text-gray-500 mt-1">
                                Tell us about your TrueFix experience.
                              </p>

                            </div>

                            <button
                              type="button"
                              onClick={
                                closeReviewForm
                              }
                              className="text-gray-500 hover:text-red-500 text-xl cursor-pointer"
                            >
                              ✕
                            </button>

                          </div>

                          {/* STAR RATING */}

                          <div className="mb-5">

                            <p className="text-sm font-semibold text-gray-700 mb-2">
                              Your Rating
                            </p>

                            <div className="flex items-center gap-2">

                              {[1, 2, 3, 4, 5].map(
                                (star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() =>
                                      handleRatingChange(
                                        star
                                      )
                                    }
                                    className={`text-3xl transition-transform duration-150 hover:scale-110 cursor-pointer ${
                                      star <=
                                      reviewForm.rating
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                    aria-label={`${star} star`}
                                  >
                                    ★
                                  </button>
                                )
                              )}

                              <span className="ml-2 text-sm font-semibold text-gray-600">
                                {reviewForm.rating}/5
                              </span>

                            </div>

                          </div>

                          {/* COMMENT */}

                          <div className="mb-5">

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Your Review
                            </label>

                            <textarea
                              value={
                                reviewForm.comment
                              }
                              onChange={
                                handleReviewCommentChange
                              }
                              rows={4}
                              maxLength={500}
                              placeholder="Tell us about the service you received..."
                              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-200"
                            />

                            <div className="text-right text-xs text-gray-400 mt-1">
                              {
                                reviewForm.comment
                                  .length
                              }/500
                            </div>

                          </div>

                          {/* FORM BUTTONS */}

                          <div className="flex flex-col sm:flex-row gap-3">

                            <button
                              type="submit"
                              disabled={
                                isSubmittingReview
                              }
                              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                              {isSubmittingReview
                                ? "Submitting..."
                                : "Submit Review"}
                            </button>

                            <button
                              type="button"
                              onClick={
                                closeReviewForm
                              }
                              disabled={
                                isSubmittingReview
                              }
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
                            >
                              Cancel
                            </button>

                          </div>

                        </form>

                      ) : (

                        /* =================================
                           RATE BUTTON
                        ================================= */

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                          <div>

                            <h3 className="font-bold text-blue-900">
                              How was your service?
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                              Your feedback helps us improve TrueFix.
                            </p>

                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              openReviewForm(
                                booking._id
                              )
                            }
                            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                          >
                            ⭐ Rate & Review
                          </button>

                        </div>

                      )}

                    </div>

                  )}

                  {/* =================================
                      ACTIONS
                  ================================= */}

                  <div className="border-t border-gray-200 mt-5 pt-5 flex flex-col sm:flex-row gap-3">

                    <Link
                      to="/services"
                      className="text-center bg-blue-900 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-800 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                    >
                      Book Another Service
                    </Link>

                    {booking.status ===
                      "Pending" && (
                      <button
                        type="button"
                        onClick={() =>
                          cancelBooking(
                            booking._id
                          )
                        }
                        disabled={
                          cancellingId ===
                          booking._id
                        }
                        className="bg-red-500 text-white px-5 py-3 rounded-xl font-semibold hover:bg-red-600 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer disabled:bg-gray-400 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                      >
                        {cancellingId ===
                        booking._id
                          ? "Cancelling..."
                          : "Cancel Booking"}
                      </button>
                    )}

                    <Link
                      to="/profile"
                      className="text-center bg-gray-200 text-gray-700 px-5 py-3 rounded-xl font-semibold hover:bg-gray-300 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                    >
                      My Profile
                    </Link>

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </div>

    </section>
  );
}

export default MyBookings;