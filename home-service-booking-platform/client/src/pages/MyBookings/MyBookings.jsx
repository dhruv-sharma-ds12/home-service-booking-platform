import { Link } from "react-router-dom";

function MyBookings() {
  // Temporary data.
  // This will later come from MongoDB through the backend API.
  const bookings = [
    {
      id: "TF001",
      service: "Home Cleaning",
      date: "15 August 2026",
      time: "10:00 AM",
      address: "Karnal, Haryana",
      price: 799,
      status: "Confirmed"
    },
    {
      id: "TF002",
      service: "AC Repair",
      date: "18 August 2026",
      time: "2:00 PM",
      address: "Karnal, Haryana",
      price: 499,
      status: "Pending"
    },
    {
      id: "TF003",
      service: "Plumbing",
      date: "10 August 2026",
      time: "11:30 AM",
      address: "Karnal, Haryana",
      price: 399,
      status: "Completed"
    },
    {
      id: "TF004",
      service: "Electrical Work",
      date: "5 August 2026",
      time: "4:00 PM",
      address: "Karnal, Haryana",
      price: 299,
      status: "Cancelled"
    }
  ];

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

  return (
    <section className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">

          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900">
            My Bookings
          </h1>

          <p className="text-gray-600 mt-2">
            View and manage your TrueFix service bookings
          </p>

        </div>

        {/* Booking Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

          <div className="bg-white rounded-xl shadow p-5 text-center">
            <p className="text-2xl font-bold text-blue-900">
              {bookings.length}
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Total
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5 text-center">
            <p className="text-2xl font-bold text-yellow-500">
              {
                bookings.filter(
                  (booking) => booking.status === "Pending"
                ).length
              }
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Pending
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5 text-center">
            <p className="text-2xl font-bold text-green-600">
              {
                bookings.filter(
                  (booking) => booking.status === "Confirmed"
                ).length
              }
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Confirmed
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {
                bookings.filter(
                  (booking) => booking.status === "Completed"
                ).length
              }
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Completed
            </p>
          </div>

        </div>

        {/* Bookings */}
        {bookings.length === 0 ? (

          /* Empty State */
          <div className="bg-white rounded-xl shadow-md p-10 text-center">

            <div className="text-5xl mb-4">
              📅
            </div>

            <h2 className="text-2xl font-semibold text-gray-800">
              No Bookings Yet
            </h2>

            <p className="text-gray-500 mt-2 mb-6">
              You haven't booked any home services yet.
            </p>

            <Link
              to="/services"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Book a Service
            </Link>

          </div>

        ) : (

          <div className="space-y-6">

            {bookings.map((booking) => (

              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-md p-5 sm:p-6"
              >

                {/* Booking Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                  <div>

                    <p className="text-sm text-gray-500">
                      Booking ID: {booking.id}
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

                {/* Details */}
                <div className="border-t border-gray-200 mt-5 pt-5">

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                    <div>
                      <p className="text-sm text-gray-500">
                        Service Date
                      </p>

                      <p className="font-medium text-gray-800 mt-1">
                        {booking.date}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Service Time
                      </p>

                      <p className="font-medium text-gray-800 mt-1">
                        {booking.time}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Address
                      </p>

                      <p className="font-medium text-gray-800 mt-1">
                        {booking.address}
                      </p>
                    </div>

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

                {/* Status Progress */}
                <div className="border-t border-gray-200 mt-5 pt-5">

                  <p className="text-sm font-semibold text-gray-700 mb-4">
                    Booking Status
                  </p>

                  <div className="flex items-center">

                    {/* Pending */}
                    <div className="flex flex-col items-center">

                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          ["Pending", "Confirmed", "Completed"].includes(
                            booking.status
                          )
                            ? "bg-orange-500"
                            : "bg-gray-300"
                        }`}
                      >
                        1
                      </div>

                      <span className="text-xs text-gray-500 mt-2">
                        Pending
                      </span>

                    </div>

                    <div className="flex-1 h-1 bg-gray-200 mx-2"></div>

                    {/* Confirmed */}
                    <div className="flex flex-col items-center">

                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          ["Confirmed", "Completed"].includes(
                            booking.status
                          )
                            ? "bg-orange-500"
                            : "bg-gray-300"
                        }`}
                      >
                        2
                      </div>

                      <span className="text-xs text-gray-500 mt-2">
                        Confirmed
                      </span>

                    </div>

                    <div className="flex-1 h-1 bg-gray-200 mx-2"></div>

                    {/* Completed */}
                    <div className="flex flex-col items-center">

                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          booking.status === "Completed"
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      >
                        3
                      </div>

                      <span className="text-xs text-gray-500 mt-2">
                        Completed
                      </span>

                    </div>

                  </div>

                </div>

                {/* Actions */}
                <div className="border-t border-gray-200 mt-5 pt-5 flex flex-col sm:flex-row gap-3">

                  <Link
                    to="/services"
                    className="text-center bg-blue-900 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
                  >
                    Book Another Service
                  </Link>

                  <Link
                    to="/profile"
                    className="text-center bg-gray-200 text-gray-700 px-5 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
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