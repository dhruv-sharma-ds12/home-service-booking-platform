import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:5001/api";

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/bookings`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch bookings"
        );
      }

      setBookings(data);
    } catch (error) {
      console.error("Fetch bookings error:", error);
      setError(error.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateBookingStatus = async (id, status) => {
    try {
      const response = await fetch(
        `${API_URL}/bookings/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update booking"
        );
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id
            ? { ...booking, status }
            : booking
        )
      );
    } catch (error) {
      console.error("Update booking error:", error);
      alert(error.message || "Failed to update booking");
    }
  };

  const deleteBooking = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/bookings/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to cancel booking"
        );
      }

      setBookings((prev) =>
        prev.filter((booking) => booking._id !== id)
      );
    } catch (error) {
      console.error("Cancel booking error:", error);
      alert(error.message || "Failed to cancel booking");
    }
  };

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const completedBookings = bookings.filter(
    (booking) => booking.status === "Completed"
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "Cancelled"
  ).length;

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-orange-500 font-semibold">
            TRUEFIX ADMIN
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mt-1">
            Admin Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Manage customer service bookings.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
            {error}
          </div>
        )}

        {/* STATISTICS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500 text-sm">
              Total
            </p>
            <p className="text-3xl font-bold text-blue-900 mt-1">
              {totalBookings}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500 text-sm">
              Pending
            </p>
            <p className="text-3xl font-bold text-yellow-500 mt-1">
              {pendingBookings}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500 text-sm">
              Confirmed
            </p>
            <p className="text-3xl font-bold text-green-600 mt-1">
              {confirmedBookings}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500 text-sm">
              Completed
            </p>
            <p className="text-3xl font-bold text-blue-600 mt-1">
              {completedBookings}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500 text-sm">
              Cancelled
            </p>
            <p className="text-3xl font-bold text-red-500 mt-1">
              {cancelledBookings}
            </p>
          </div>

        </div>

        {/* BOOKINGS */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>
                <h2 className="text-xl font-bold text-blue-900">
                  All Bookings
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  View and manage all TrueFix bookings.
                </p>
              </div>

              <button
                onClick={fetchBookings}
                className="bg-blue-900 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-800"
              >
                Refresh
              </button>

            </div>
          </div>

          {loading ? (

            <div className="p-10 text-center">
              <div className="w-10 h-10 mx-auto border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>

              <p className="text-gray-500 mt-4">
                Loading bookings...
              </p>
            </div>

          ) : bookings.length === 0 ? (

            <div className="p-10 text-center">
              <div className="text-5xl mb-4">
                📅
              </div>

              <h3 className="text-xl font-semibold text-gray-800">
                No bookings found
              </h3>

              <p className="text-gray-500 mt-2">
                Customer bookings will appear here.
              </p>
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1000px]">

                <thead className="bg-gray-50">
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
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y">

                  {bookings.map((booking) => (

                    <tr key={booking._id}>

                      <td className="px-5 py-4">

                        <p className="font-semibold text-gray-800">
                          {booking.customerName}
                        </p>

                        <p className="text-sm text-gray-500">
                          {booking.phone}
                        </p>

                      </td>

                      <td className="px-5 py-4">

                        <p className="font-semibold text-blue-900">
                          {booking.service}
                        </p>

                        <p className="text-sm text-gray-500">
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
                          onChange={(e) =>
                            updateBookingStatus(
                              booking._id,
                              e.target.value
                            )
                          }
                          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
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

                        <button
                          onClick={() =>
                            deleteBooking(booking._id)
                          }
                          className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold hover:bg-red-200"
                        >
                          Cancel
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>
    </section>
  );
}

export default AdminDashboard;