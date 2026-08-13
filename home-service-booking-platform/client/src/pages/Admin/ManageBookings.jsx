import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login as admin.");
      }

      const response = await fetch(`${API_URL}/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch bookings."
        );
      }

      setBookings(Array.isArray(data) ? data : data.bookings || []);
    } catch (error) {
      console.error("Fetch bookings error:", error);
      setError(error.message || "Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update status."
        );
      }

      setBookings((previous) =>
        previous.map((booking) =>
          booking._id === id
            ? { ...booking, status }
            : booking
        )
      );
    } catch (error) {
      console.error("Update status error:", error);
      alert(error.message || "Failed to update status.");
    }
  };

  const cancelBooking = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/bookings/${id}/cancel`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to cancel booking."
        );
      }

      setBookings((previous) =>
        previous.map((booking) =>
          booking._id === id
            ? { ...booking, status: "Cancelled" }
            : booking
        )
      );
    } catch (error) {
      console.error("Cancel booking error:", error);
      alert(error.message || "Failed to cancel booking.");
    }
  };

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

  return (
    <section>
      {/* Header */}
      <div className="mb-8">
        <p className="text-orange-500 font-semibold">
          TRUEFIX ADMIN
        </p>

        <h1 className="text-3xl font-bold text-blue-950 mt-1">
          Manage Bookings
        </h1>

        <p className="text-gray-500 mt-2">
          View and manage all customer service bookings.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
          {error}
        </div>
      )}

      {/* Refresh */}
      <div className="flex justify-end mb-5">
        <button
          onClick={fetchBookings}
          className="bg-blue-950 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-900 transition"
        >
          Refresh
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-10 h-10 mx-auto border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin" />

            <p className="text-gray-500 mt-4">
              Loading bookings...
            </p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-5xl mb-4">📅</div>

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
                    className="hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-800">
                        {booking.customerName}
                      </p>

                      <p className="text-sm text-gray-500">
                        {booking.phone}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-semibold text-blue-950">
                        {booking.service}
                      </p>

                      <p className="text-sm text-gray-500 max-w-xs">
                        {booking.address}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-800">
                        {booking.date}
                      </p>

                      <p className="text-sm text-gray-500">
                        {booking.time}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-bold text-orange-500">
                        ₹{booking.price}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <select
                        value={booking.status}
                        onChange={(event) =>
                          updateStatus(
                            booking._id,
                            event.target.value
                          )
                        }
                        className={`px-3 py-2 rounded-lg text-sm font-semibold border-0 ${getStatusClass(
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

                    <td className="px-5 py-4">
                      {booking.status !== "Cancelled" &&
                        booking.status !== "Completed" && (
                          <button
                            onClick={() =>
                              cancelBooking(booking._id)
                            }
                            className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold hover:bg-red-200"
                          >
                            Cancel
                          </button>
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