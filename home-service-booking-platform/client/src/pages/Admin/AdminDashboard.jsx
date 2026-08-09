import { useMemo, useState } from "react";

function AdminDashboard() {
  // Temporary users.
  // Later these will come from MongoDB.
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Dhruv Sharma",
      email: "dhruv@example.com",
      phone: "8307357247",
      role: "Customer"
    },
    {
      id: 2,
      name: "Namanpreet Singh",
      email: "namanpreet@example.com",
      phone: "9876543210",
      role: "Customer"
    },
    {
      id: 3,
      name: "Aman Verma",
      email: "aman@example.com",
      phone: "9123456789",
      role: "Customer"
    }
  ]);

  // Temporary bookings.
  // Later these will come from MongoDB.
  const [bookings, setBookings] = useState([
    {
      id: "TF001",
      customer: "Dhruv Sharma",
      service: "Home Cleaning",
      date: "15 August 2026",
      time: "10:00 AM",
      price: 499,
      status: "Pending"
    },
    {
      id: "TF002",
      customer: "Namanpreet Singh",
      service: "AC & Appliance Repair",
      date: "18 August 2026",
      time: "2:00 PM",
      price: 399,
      status: "Confirmed"
    },
    {
      id: "TF003",
      customer: "Aman Verma",
      service: "Plumbing",
      date: "20 August 2026",
      time: "11:00 AM",
      price: 299,
      status: "Completed"
    },
    {
      id: "TF004",
      customer: "Priya Singh",
      service: "Electrical Work",
      date: "22 August 2026",
      time: "4:00 PM",
      price: 349,
      status: "Cancelled"
    },
    {
      id: "TF005",
      customer: "Neha Sharma",
      service: "Carpentry",
      date: "25 August 2026",
      time: "12:00 PM",
      price: 599,
      status: "Pending"
    }
  ]);

  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // -----------------------------
  // Booking Statistics
  // -----------------------------

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

  const totalRevenue = bookings
    .filter((booking) => booking.status !== "Cancelled")
    .reduce((total, booking) => total + booking.price, 0);

  // -----------------------------
  // Update Booking Status
  // -----------------------------

  const updateStatus = (id, newStatus) => {
    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking.id === id
          ? {
              ...booking,
              status: newStatus
            }
          : booking
      )
    );
  };

  // -----------------------------
  // Delete User
  // -----------------------------

  const deleteUser = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this user?"
    );

    if (!confirmed) {
      return;
    }

    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== id)
    );
  };

  // -----------------------------
  // Filter Bookings
  // -----------------------------

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch =
        booking.customer
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        booking.service
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        booking.id
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchTerm, statusFilter]);

  // -----------------------------
  // Status Styling
  // -----------------------------

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Confirmed":
        return "bg-blue-100 text-blue-700";

      case "Completed":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // -----------------------------
  // Dashboard
  // -----------------------------

  const DashboardOverview = () => {
    return (
      <>
        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm">
              Total Users
            </p>

            <h2 className="text-3xl font-bold text-blue-900 mt-2">
              {users.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm">
              Total Bookings
            </p>

            <h2 className="text-3xl font-bold text-blue-900 mt-2">
              {totalBookings}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm">
              Pending Bookings
            </p>

            <h2 className="text-3xl font-bold text-yellow-600 mt-2">
              {pendingBookings}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm">
              Completed Bookings
            </p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {completedBookings}
            </h2>
          </div>

        </div>

        {/* Second Statistics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm">
              Confirmed
            </p>

            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              {confirmedBookings}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm">
              Cancelled
            </p>

            <h2 className="text-3xl font-bold text-red-600 mt-2">
              {cancelledBookings}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm">
              Service Revenue
            </p>

            <h2 className="text-3xl font-bold text-orange-500 mt-2">
              ₹{totalRevenue}
            </h2>
          </div>

        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-md mt-8">

          <div className="p-6 border-b">
            <h2 className="text-2xl font-semibold text-blue-900">
              Recent Bookings
            </h2>

            <p className="text-gray-500 mt-1">
              Latest customer service bookings
            </p>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px]">

              <thead className="bg-gray-100">

                <tr>
                  <th className="text-left p-4">
                    Booking ID
                  </th>

                  <th className="text-left p-4">
                    Customer
                  </th>

                  <th className="text-left p-4">
                    Service
                  </th>

                  <th className="text-left p-4">
                    Price
                  </th>

                  <th className="text-left p-4">
                    Status
                  </th>
                </tr>

              </thead>

              <tbody>

                {bookings.slice(0, 5).map((booking) => (

                  <tr
                    key={booking.id}
                    className="border-t"
                  >

                    <td className="p-4 font-medium">
                      {booking.id}
                    </td>

                    <td className="p-4">
                      {booking.customer}
                    </td>

                    <td className="p-4">
                      {booking.service}
                    </td>

                    <td className="p-4 font-semibold">
                      ₹{booking.price}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
      </>
    );
  };

  // -----------------------------
  // Manage Bookings
  // -----------------------------

  const ManageBookings = () => {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-2xl font-semibold text-blue-900">
            Manage Bookings
          </h2>

          <p className="text-gray-500 mt-1">
            View and update customer bookings
          </p>

        </div>

        {/* Search + Filter */}
        <div className="p-5 flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Search customer, service or booking ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none"
          >
            <option value="All">
              All Status
            </option>

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

        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left p-4">
                  Booking ID
                </th>

                <th className="text-left p-4">
                  Customer
                </th>

                <th className="text-left p-4">
                  Service
                </th>

                <th className="text-left p-4">
                  Date
                </th>

                <th className="text-left p-4">
                  Time
                </th>

                <th className="text-left p-4">
                  Price
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredBookings.length > 0 ? (

                filteredBookings.map((booking) => (

                  <tr
                    key={booking.id}
                    className="border-t"
                  >

                    <td className="p-4 font-medium">
                      {booking.id}
                    </td>

                    <td className="p-4">
                      {booking.customer}
                    </td>

                    <td className="p-4">
                      {booking.service}
                    </td>

                    <td className="p-4">
                      {booking.date}
                    </td>

                    <td className="p-4">
                      {booking.time}
                    </td>

                    <td className="p-4 font-semibold">
                      ₹{booking.price}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>

                    </td>

                    <td className="p-4">

                      <select
                        value={booking.status}
                        onChange={(e) =>
                          updateStatus(
                            booking.id,
                            e.target.value
                          )
                        }
                        className="border border-gray-300 rounded-lg px-3 py-2"
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

                  </tr>

                ))

              ) : (

                <tr>
                  <td
                    colSpan="8"
                    className="text-center p-10 text-gray-500"
                  >
                    No bookings found.
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 space-y-4">

          {filteredBookings.length > 0 ? (

            filteredBookings.map((booking) => (

              <div
                key={booking.id}
                className="border rounded-xl p-4"
              >

                <div className="flex justify-between gap-3">

                  <div>
                    <p className="text-xs text-gray-500">
                      {booking.id}
                    </p>

                    <h3 className="font-semibold text-blue-900 text-lg">
                      {booking.service}
                    </h3>
                  </div>

                  <span
                    className={`h-fit px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>

                </div>

                <div className="mt-4 space-y-1 text-gray-600 text-sm">

                  <p>
                    <strong>Customer:</strong>{" "}
                    {booking.customer}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {booking.date}
                  </p>

                  <p>
                    <strong>Time:</strong>{" "}
                    {booking.time}
                  </p>

                  <p>
                    <strong>Price:</strong>{" "}
                    ₹{booking.price}
                  </p>

                </div>

                <select
                  value={booking.status}
                  onChange={(e) =>
                    updateStatus(
                      booking.id,
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-4"
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

              </div>

            ))

          ) : (

            <p className="text-center text-gray-500 py-8">
              No bookings found.
            </p>

          )}

        </div>

      </div>
    );
  };

  // -----------------------------
  // Manage Users
  // -----------------------------

  const ManageUsers = () => {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-2xl font-semibold text-blue-900">
            Manage Users
          </h2>

          <p className="text-gray-500 mt-1">
            View registered TrueFix customers
          </p>

        </div>

        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left p-4">
                  Name
                </th>

                <th className="text-left p-4">
                  Email
                </th>

                <th className="text-left p-4">
                  Phone
                </th>

                <th className="text-left p-4">
                  Role
                </th>

                <th className="text-left p-4">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {users.map((user) => (

                <tr
                  key={user.id}
                  className="border-t"
                >

                  <td className="p-4 font-medium">
                    {user.name}
                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4">
                    {user.phone}
                  </td>

                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Remove
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Mobile */}
        <div className="md:hidden p-4 space-y-4">

          {users.map((user) => (

            <div
              key={user.id}
              className="border rounded-xl p-4"
            >

              <h3 className="font-semibold text-blue-900 text-lg">
                {user.name}
              </h3>

              <p className="text-gray-600 mt-2 break-all">
                {user.email}
              </p>

              <p className="text-gray-600">
                {user.phone}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Role: {user.role}
              </p>

              <button
                onClick={() => deleteUser(user.id)}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition mt-4"
              >
                Remove User
              </button>

            </div>

          ))}

        </div>

      </div>
    );
  };

  return (
    <section className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900">
            Admin Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Manage TrueFix users, bookings and services.
          </p>

        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-md p-2 mb-8 flex flex-col sm:flex-row gap-2">

          <button
            onClick={() => setActiveSection("dashboard")}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition ${
              activeSection === "dashboard"
                ? "bg-blue-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setActiveSection("bookings")}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition ${
              activeSection === "bookings"
                ? "bg-blue-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Manage Bookings
          </button>

          <button
            onClick={() => setActiveSection("users")}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition ${
              activeSection === "users"
                ? "bg-blue-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Manage Users
          </button>

        </div>

        {/* Content */}
        {activeSection === "dashboard" && (
          <DashboardOverview />
        )}

        {activeSection === "bookings" && (
          <ManageBookings />
        )}

        {activeSection === "users" && (
          <ManageUsers />
        )}

      </div>

    </section>
  );
}

export default AdminDashboard;