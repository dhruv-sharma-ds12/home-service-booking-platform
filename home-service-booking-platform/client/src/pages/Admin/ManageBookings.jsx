import { useEffect, useState } from "react";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import Alert from "../../components/common/Alert";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // FETCH BOOKINGS
  // ==========================================

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login as admin.");
      }

      const response = await fetch(`${API_URL}/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch bookings."
        );
      }

      setBookings(
        Array.isArray(data)
          ? data
          : data.bookings || []
      );
    } catch (error) {
      console.error("Fetch bookings error:", error);

      setError(
        error.message || "Failed to load bookings."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ==========================================
  // UPDATE BOOKING STATUS
  // ==========================================

  const updateStatus = async (id, status) => {
    try {
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login as admin.");
      }

      const response = await fetch(
        `${API_URL}/bookings/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update booking status."
        );
      }

      setBookings((previous) =>
        previous.map((booking) =>
          booking._id === id
            ? {
                ...booking,
                ...data.booking,
                status,
              }
            : booking
        )
      );

      setSuccess(
        data.message ||
          "Booking status updated successfully."
      );
    } catch (error) {
      console.error("Update status error:", error);

      setError(
        error.message ||
          "Failed to update booking status."
      );
    }
  };

  // ==========================================
  // CANCEL BOOKING
  // ==========================================

  const cancelBooking = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Your session has expired. Please login again."
        );
      }

      const response = await fetch(
        `${API_URL}/bookings/${id}/cancel`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json().catch(() => ({}));

      console.log("Cancel booking response:", {
        status: response.status,
        data,
      });

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Cancellation failed (${response.status})`
        );
      }

      // Update booking with backend response
      setBookings((previous) =>
        previous.map((booking) =>
          booking._id === id
            ? {
                ...booking,
                ...data.booking,
                status: "Cancelled",
              }
            : booking
        )
      );

      // THIS WAS MISSING IN YOUR OLD CODE
      setSuccess(
        data.message ||
          "Booking cancelled successfully."
      );
    } catch (error) {
      console.error("Cancel booking error:", error);

      setError(
        error.message ||
          "Failed to cancel booking. Please try again."
      );
    }
  };

  // ==========================================
  // STATUS STYLE
  // ==========================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";

      case "Completed":
        return "bg-blue-100 text-blue-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <section>
      {/* HEADER */}

      <div className="mb-8">
        <p className="text-orange-500 font-semibold">
          TRUEFIX ADMIN
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold text-blue-950 mt-1">
          Manage Bookings
        </h1>

        <p className="text-gray-500 mt-2">
          View and manage all customer service bookings.
        </p>
      </div>

      {/* ERROR */}

      {error && (
        <div className="mb-6">
          <ErrorMessage
            message={error}
            onRetry={fetchBookings}
          />
        </div>
      )}

      {/* SUCCESS */}

      {success && (
        <div className="mb-6">
          <Alert
            type="success"
            message={success}
            onClose={() => setSuccess("")}
          />
        </div>
      )}

      {/* REFRESH */}

      <div className="flex justify-end mb-5">
        <button
          type="button"
          onClick={fetchBookings}
          disabled={loading}
          className={`px-5 py-2.5 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-950 text-white hover:bg-blue-900"
          }`}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* CONTENT */}

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {loading ? (
          <Loader text="Loading bookings..." />
        ) : bookings.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-5xl mb-4">
              📅
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              No bookings found
            </h2>

            <p className="text-gray-500 mt-2">
              Customer bookings will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                    Customer
                  </th>

                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                    Service
                  </th>

                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                    Date / Time
                  </th>

                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                    Price
                  </th>

                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-gray-50 transition"
                  >
                    {/* CUSTOMER */}

                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-800">
                        {booking.customerName ||
                          booking.user?.name ||
                          "Unknown"}
                      </p>

                      <p className="text-sm text-gray-500">
                        {booking.phone ||
                          booking.user?.phone ||
                          "No phone"}
                      </p>

                      {booking.user?.email && (
                        <p className="text-xs text-gray-400 mt-1">
                          {booking.user.email}
                        </p>
                      )}
                    </td>

                    {/* SERVICE */}

                    <td className="px-5 py-4">
                      <p className="font-semibold text-blue-950">
                        {booking.service ||
                          "Unknown Service"}
                      </p>

                      <p className="text-sm text-gray-500 max-w-xs">
                        {booking.address ||
                          "No address"}
                      </p>
                    </td>

                    {/* DATE / TIME */}

                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-800">
                        {booking.date || "N/A"}
                      </p>

                      <p className="text-sm text-gray-500">
                        {booking.time || "N/A"}
                      </p>
                    </td>

                    {/* PRICE */}

                    <td className="px-5 py-4">
                      <p className="font-bold text-orange-500">
                        ₹{booking.price ?? 0}
                      </p>
                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">
                      <select
                        value={
                          booking.status || "Pending"
                        }
                        onChange={(event) =>
                          updateStatus(
                            booking._id,
                            event.target.value
                          )
                        }
                        className={`px-3 py-2 rounded-lg text-sm font-semibold border-0 outline-none ${getStatusClass(
                          booking.status
                        )}`}
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Confirmed">
                          Confirmed
                        </option>

                        <option value="Completed">
                          Completed
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>
                      </select>
                    </td>

                    {/* ACTION */}

                    <td className="px-5 py-4">
                      {booking.status !==
                        "Cancelled" &&
                        booking.status !==
                          "Completed" && (
                          <button
                            type="button"
                            onClick={() =>
                              cancelBooking(
                                booking._id
                              )
                            }
                            className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold hover:bg-red-200 transition"
                          >
                            Cancel
                          </button>
                        )}

                      {(booking.status ===
                        "Cancelled" ||
                        booking.status ===
                          "Completed") && (
                        <span className="text-gray-400 text-sm">
                          No action
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default ManageBookings;