import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  getMyBookings,
  cancelBooking as cancelBookingApi,
} from "../../services/bookingService";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH MY BOOKINGS
  // =========================

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyBookings();

      /*
        Backend may return:

        {
          bookings: [...]
        }

        or directly:

        [...]
      */

      setBookings(data.bookings || data);
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

  // =========================
  // LOAD BOOKINGS
  // =========================

  useEffect(() => {
    fetchBookings();
  }, []);

  // =========================
  // CANCEL BOOKING
  // =========================

  const cancelBooking = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await cancelBookingApi(id);

      // Update UI immediately
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === id
            ? {
                ...booking,
                status: "Cancelled",
              }
            : booking
        )
      );
    } catch (error) {
      console.error(
        "Cancel booking error:",
        error
      );

      alert(
        error.message ||
          "Unable to cancel booking."
      );
    }
  };

  // =========================
  // STATUS STYLE
  // =========================

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

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-4xl mb-4">
            ⏳
          </div>

          <h1 className="text-2xl font-bold text-blue-900">
            Loading bookings...
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">

        {/* =========================
            HEADER
        ========================= */}

        <div className="text-center mb-10">

          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900">
            My Bookings
          </h1>

          <p className="text-gray-600 mt-2">
            View and manage your TrueFix
            service bookings
          </p>

        </div>

        {/* =========================
            ERROR
        ========================= */}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
            {error}
          </div>
        )}

        {/* =========================
            SUMMARY
        ========================= */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

          {/* TOTAL */}

          <div className="bg-white rounded-xl shadow p-5 text-center">

            <p className="text-2xl font-bold text-blue-900">
              {bookings.length}
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Total
            </p>

          </div>

          {/* PENDING */}

          <div className="bg-white rounded-xl shadow p-5 text-center">

            <p className="text-2xl font-bold text-yellow-500">
              {
                bookings.filter(
                  (booking) =>
                    booking.status ===
                    "Pending"
                ).length
              }
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Pending
            </p>

          </div>

          {/* CONFIRMED */}

          <div className="bg-white rounded-xl shadow p-5 text-center">

            <p className="text-2xl font-bold text-green-600">
              {
                bookings.filter(
                  (booking) =>
                    booking.status ===
                    "Confirmed"
                ).length
              }
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Confirmed
            </p>

          </div>

          {/* CANCELLED */}

          <div className="bg-white rounded-xl shadow p-5 text-center">

            <p className="text-2xl font-bold text-red-600">
              {
                bookings.filter(
                  (booking) =>
                    booking.status ===
                    "Cancelled"
                ).length
              }
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Cancelled
            </p>

          </div>

        </div>

        {/* =========================
            EMPTY STATE
        ========================= */}

        {bookings.length === 0 ? (

          <div className="bg-white rounded-xl shadow-md p-10 text-center">

            <div className="text-5xl mb-4">
              📅
            </div>

            <h2 className="text-2xl font-semibold text-gray-800">
              No Bookings Yet
            </h2>

            <p className="text-gray-500 mt-2 mb-6">
              You haven't booked any home
              services yet.
            </p>

            <Link
              to="/services"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600"
            >
              Book a Service
            </Link>

          </div>

        ) : (

          <div className="space-y-6">

            {bookings.map((booking) => (

              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-md p-5 sm:p-6"
              >

                {/* =========================
                    TOP
                ========================= */}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                  <div>

                    <p className="text-sm text-gray-500">
                      Booking ID:{" "}
                      TF
                      {booking._id
                        ?.slice(-6)
                        .toUpperCase()}
                    </p>

                    <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mt-1">
                      {booking.service}
                    </h2>

                  </div>

                  <span
                    className={`w-fit px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>

                </div>

                {/* =========================
                    DETAILS
                ========================= */}

                <div className="border-t border-gray-200 mt-5 pt-5">

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                    {/* DATE */}

                    <div>

                      <p className="text-sm text-gray-500">
                        Service Date
                      </p>

                      <p className="font-medium text-gray-800 mt-1">
                        {booking.date}
                      </p>

                    </div>

                    {/* TIME */}

                    <div>

                      <p className="text-sm text-gray-500">
                        Service Time
                      </p>

                      <p className="font-medium text-gray-800 mt-1">
                        {booking.time}
                      </p>

                    </div>

                    {/* ADDRESS */}

                    <div>

                      <p className="text-sm text-gray-500">
                        Address
                      </p>

                      <p className="font-medium text-gray-800 mt-1">
                        {booking.address}
                      </p>

                    </div>

                    {/* PRICE */}

                    <div>

                      <p className="text-sm text-gray-500">
                        Price
                      </p>

                      <p className="font-bold text-orange-500 text-lg mt-1">
                        ₹{booking.price}
                      </p>

                    </div>

                  </div>

                </div>

                {/* =========================
                    ACTIONS
                ========================= */}

                <div className="border-t border-gray-200 mt-5 pt-5 flex flex-col sm:flex-row gap-3">

                  {/* BOOK ANOTHER */}

                  <Link
                    to="/services"
                    className="text-center bg-blue-900 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-800"
                  >
                    Book Another Service
                  </Link>

                  {/* CANCEL */}

                  {booking.status !==
                    "Cancelled" &&
                    booking.status !==
                      "Completed" && (

                      <button
                        onClick={() =>
                          cancelBooking(
                            booking._id
                          )
                        }
                        className="bg-red-500 text-white px-5 py-3 rounded-lg font-semibold hover:bg-red-600"
                      >
                        Cancel Booking
                      </button>

                    )}

                  {/* PROFILE */}

                  <Link
                    to="/profile"
                    className="text-center bg-gray-200 text-gray-700 px-5 py-3 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    My Profile
                  </Link>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </section>
  );
}

export default MyBookings;