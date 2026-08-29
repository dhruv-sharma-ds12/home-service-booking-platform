import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getReviewByBooking } from "../../services/reviewService";
import {
  getContactMessages,
  updateContactStatus,
  deleteContactMessage,
} from "../../services/contactService";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5001/api";

function AdminDashboard() {
  const navigate = useNavigate();

  // ==========================================
  // BOOKINGS
  // ==========================================

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingId, setUpdatingId] = useState(null);

  // ==========================================
  // SEARCH / FILTER STATES
  // ==========================================

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [dateFilter, setDateFilter] =
    useState("");

  // ==========================================
  // SELECTED BOOKING
  // ==========================================

  const [selectedBooking, setSelectedBooking] =
    useState(null);

  // ==========================================
  // REVIEW STATES
  // ==========================================

  const [selectedReview, setSelectedReview] =
    useState(null);

  const [reviewLoading, setReviewLoading] =
    useState(false);

  const [reviewError, setReviewError] =
    useState("");

  // ==========================================
  // CONTACT MESSAGES
  // ==========================================

  const [contacts, setContacts] = useState([]);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactError, setContactError] = useState("");
  const [updatingContactId, setUpdatingContactId] = useState(null);

  // ==========================================
  // GET TOKEN
  // ==========================================

  const getToken = () => {
    return localStorage.getItem("token");
  };

  // ==========================================
  // FETCH ALL BOOKINGS
  // ==========================================

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `${API_URL}/bookings`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",

            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response
          .json()
          .catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch bookings"
        );
      }

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
          "Failed to load bookings."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FETCH ALL CONTACT MESSAGES
  // ==========================================

  const fetchContacts = async () => {
    try {
      setContactLoading(true);
      setContactError("");

      const data = await getContactMessages();
      setContacts(Array.isArray(data) ? data : data?.contacts || []);
    } catch (error) {
      console.error("Fetch contact messages error:", error);
      setContactError(
        error.message || "Failed to load contact messages."
      );
    } finally {
      setContactLoading(false);
    }
  };

  // ==========================================
  // LOAD BOOKINGS + CONTACT MESSAGES
  // ==========================================

  useEffect(() => {
    fetchBookings();
    fetchContacts();
  }, []);

  // ==========================================
  // UPDATE CONTACT STATUS
  // ==========================================

  const handleContactStatusChange = async (contactId, status) => {
    try {
      setUpdatingContactId(contactId);
      setContactError("");

      const data = await updateContactStatus(contactId, status);
      const updatedContact = data?.contact;

      setContacts((previousContacts) =>
        previousContacts.map((contact) =>
          contact._id === contactId
            ? { ...contact, ...(updatedContact || { status }) }
            : contact
        )
      );
    } catch (error) {
      console.error("Update contact status error:", error);
      setContactError(
        error.message || "Failed to update contact status."
      );
    } finally {
      setUpdatingContactId(null);
    }
  };

  // ==========================================
  // DELETE CONTACT MESSAGE
  // ==========================================

  const handleDeleteContact = async (contactId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this contact message?"
    );

    if (!confirmed) return;

    try {
      setUpdatingContactId(contactId);
      setContactError("");

      await deleteContactMessage(contactId);

      setContacts((previousContacts) =>
        previousContacts.filter((contact) => contact._id !== contactId)
      );
    } catch (error) {
      console.error("Delete contact message error:", error);
      setContactError(
        error.message || "Failed to delete contact message."
      );
    } finally {
      setUpdatingContactId(null);
    }
  };

  // ==========================================
  // UPDATE BOOKING STATUS
  // ==========================================

  const updateBookingStatus = async (
    id,
    status
  ) => {
    // ==========================================
    // CONFIRM CANCEL
    // ==========================================

    if (status === "Cancelled") {
      const confirmed = window.confirm(
        "Are you sure you want to cancel this booking?\n\nThis action will mark the booking as Cancelled."
      );

      if (!confirmed) {
        return;
      }
    }

    // ==========================================
    // CONFIRM COMPLETE
    // ==========================================

    if (status === "Completed") {
      const confirmed = window.confirm(
        "Are you sure you want to mark this booking as Completed?"
      );

      if (!confirmed) {
        return;
      }
    }

    try {
      setUpdatingId(id);
      setError("");

      const token = getToken();

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `${API_URL}/bookings/${id}/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            status,
          }),
        }
      );

      const data =
        await response
          .json()
          .catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update booking status"
        );
      }

      // ==========================================
      // UPDATE BOOKING IN UI
      // ==========================================

      setBookings((previousBookings) =>
        previousBookings.map(
          (booking) =>
            booking._id === id
              ? {
                  ...booking,

                  status:
                    data.booking?.status ||
                    status,
                }
              : booking
        )
      );

      // ==========================================
      // UPDATE OPEN DETAILS MODAL
      // ==========================================

      setSelectedBooking((previous) => {
        if (
          !previous ||
          previous._id !== id
        ) {
          return previous;
        }

        return {
          ...previous,

          status:
            data.booking?.status ||
            status,
        };
      });
    } catch (error) {
      console.error(
        "Update booking status error:",
        error
      );

      setError(
        error.message ||
          "Failed to update booking status."
      );
    } finally {
      setUpdatingId(null);
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
  // FILTER BOOKINGS
  // ==========================================

  const filteredBookings = useMemo(() => {
    const search =
      searchTerm
        .trim()
        .toLowerCase();

    return bookings.filter((booking) => {
      // ========================================
      // SEARCH
      // ========================================

      const matchesSearch =
        !search ||
        booking.customerName
          ?.toLowerCase()
          .includes(search) ||
        booking.phone
          ?.toLowerCase()
          .includes(search) ||
        booking.service
          ?.toLowerCase()
          .includes(search) ||
        booking._id
          ?.toLowerCase()
          .includes(search);

      // ========================================
      // STATUS
      // ========================================

      const matchesStatus =
        statusFilter === "All" ||
        booking.status ===
          statusFilter;

      // ========================================
      // DATE
      // ========================================

      const matchesDate =
        !dateFilter ||
        booking.date ===
          dateFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [
    bookings,
    searchTerm,
    statusFilter,
    dateFilter,
  ]);

  // ==========================================
  // CLEAR FILTERS
  // ==========================================

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setDateFilter("");
  };

  const filtersActive =
    searchTerm ||
    statusFilter !== "All" ||
    dateFilter;

  // ==========================================
  // VIEW BOOKING DETAILS + REVIEW
  // ==========================================

  const viewBookingDetails = async (booking) => {
    setSelectedBooking(booking);

    // Reset previous review
    setSelectedReview(null);
    setReviewError("");
    setReviewLoading(true);

    try {
      const data =
        await getReviewByBooking(
          booking._id
        );

      setSelectedReview(
        data?.review || null
      );
    } catch (error) {
      console.error(
        "Fetch review error:",
        error
      );

      setReviewError(
        error.message ||
          "Unable to load review."
      );
    } finally {
      setReviewLoading(false);
    }
  };

  // ==========================================
  // CLOSE BOOKING DETAILS
  // ==========================================

  const closeBookingDetails = () => {
    setSelectedBooking(null);

    setSelectedReview(null);

    setReviewError("");

    setReviewLoading(false);
  };

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-7xl mx-auto">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="mb-8">

          <p className="text-orange-500 font-semibold tracking-wide">
            TRUEFIX ADMIN
          </p>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">

            <div>

              <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mt-1">
                Admin Dashboard
              </h1>

              <p className="text-gray-600 mt-2">
                Manage and monitor all customer service bookings.
              </p>

            </div>

            <button
              type="button"
              onClick={fetchBookings}
              disabled={loading}
              className="
                self-start
                lg:self-auto
                bg-blue-900
                text-white
                px-5
                py-3
                rounded-xl
                font-semibold
                hover:bg-blue-800
                transition-all
                duration-300
                cursor-pointer
                disabled:bg-gray-400
                disabled:cursor-not-allowed
              "
            >
              {loading
                ? "Refreshing..."
                : "↻ Refresh"}
            </button>

          </div>

        </div>

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
                className="
                  self-start
                  bg-red-100
                  hover:bg-red-200
                  text-red-700
                  px-4
                  py-2
                  rounded-lg
                  font-semibold
                  transition
                  cursor-pointer
                "
              >
                Retry
              </button>

            </div>

          </div>
        )}

        {/* =====================================
            STATISTICS
        ===================================== */}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">

          {/* TOTAL */}

          <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow duration-300">

            <p className="text-gray-500 text-sm">
              Total
            </p>

            <p className="text-3xl font-bold text-blue-900 mt-1">
              {totalBookings}
            </p>

          </div>

          {/* PENDING */}

          <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow duration-300">

            <p className="text-gray-500 text-sm">
              Pending
            </p>

            <p className="text-3xl font-bold text-yellow-500 mt-1">
              {pendingBookings}
            </p>

          </div>

          {/* CONFIRMED */}

          <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow duration-300">

            <p className="text-gray-500 text-sm">
              Confirmed
            </p>

            <p className="text-3xl font-bold text-green-600 mt-1">
              {confirmedBookings}
            </p>

          </div>

          {/* COMPLETED */}

          <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow duration-300">

            <p className="text-gray-500 text-sm">
              Completed
            </p>

            <p className="text-3xl font-bold text-blue-600 mt-1">
              {completedBookings}
            </p>

          </div>

          {/* CANCELLED */}

          <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow duration-300">

            <p className="text-gray-500 text-sm">
              Cancelled
            </p>

            <p className="text-3xl font-bold text-red-500 mt-1">
              {cancelledBookings}
            </p>

          </div>

        </div>

        {/* =====================================
            SEARCH + FILTERS
        ===================================== */}

        <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 mb-8">

          <div className="flex flex-col lg:flex-row lg:items-end gap-4">

            {/* SEARCH */}

            <div className="flex-1">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Bookings
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                  🔎
                </span>

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                  placeholder="Search customer, phone, service or booking ID..."
                  className="
                    w-full
                    pl-11
                    pr-4
                    py-3
                    border
                    border-gray-300
                    rounded-xl
                    outline-none
                    focus:border-orange-500
                    focus:ring-2
                    focus:ring-orange-100
                    transition
                  "
                />

              </div>

            </div>

            {/* STATUS FILTER */}

            <div className="w-full lg:w-52">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
                className="
                  w-full
                  px-4
                  py-3
                  border
                  border-gray-300
                  rounded-xl
                  outline-none
                  focus:border-orange-500
                  focus:ring-2
                  focus:ring-orange-100
                  cursor-pointer
                "
              >

                <option value="All">
                  All Statuses
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

            {/* DATE FILTER */}

            <div className="w-full lg:w-52">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Date
              </label>

              <input
                type="date"
                value={dateFilter}
                onChange={(event) =>
                  setDateFilter(
                    event.target.value
                  )
                }
                className="
                  w-full
                  px-4
                  py-3
                  border
                  border-gray-300
                  rounded-xl
                  outline-none
                  focus:border-orange-500
                  focus:ring-2
                  focus:ring-orange-100
                  cursor-pointer
                "
              />

            </div>

            {/* CLEAR */}

            {filtersActive && (
              <button
                type="button"
                onClick={clearFilters}
                className="
                  bg-gray-200
                  text-gray-700
                  px-5
                  py-3
                  rounded-xl
                  font-semibold
                  hover:bg-gray-300
                  transition
                  cursor-pointer
                "
              >
                Clear Filters
              </button>
            )}

          </div>

          {/* FILTER RESULT */}

          <div className="mt-4 pt-4 border-t border-gray-100">

            <p className="text-sm text-gray-500">

              Showing{" "}

              <span className="font-semibold text-gray-800">
                {filteredBookings.length}
              </span>

              {" "}of{" "}

              <span className="font-semibold text-gray-800">
                {bookings.length}
              </span>

              {" "}bookings

            </p>

          </div>

        </div>

        {/* =====================================
            BOOKINGS CONTAINER
        ===================================== */}

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          {/* HEADER */}

          <div className="p-6 border-b">

            <div>

              <h2 className="text-xl font-bold text-blue-900">
                All Bookings
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                View, search, filter and manage TrueFix bookings.
              </p>

            </div>

          </div>

          {/* =====================================
              LOADING
          ===================================== */}

          {loading ? (

            <div className="p-10 text-center">

              <div className="
                w-10
                h-10
                mx-auto
                border-4
                border-gray-200
                border-t-orange-500
                rounded-full
                animate-spin
              " />

              <p className="text-gray-500 mt-4">
                Loading bookings...
              </p>

            </div>

          ) : filteredBookings.length === 0 ? (

            /* =====================================
               NO RESULTS
            ===================================== */

            <div className="p-10 sm:p-14 text-center">

              <div className="text-5xl mb-4">
                🔍
              </div>

              <h3 className="text-xl font-semibold text-gray-800">
                No bookings found
              </h3>

              <p className="text-gray-500 mt-2">
                Try changing your search or filters.
              </p>

              {filtersActive && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="
                    mt-5
                    bg-orange-500
                    text-white
                    px-5
                    py-2.5
                    rounded-lg
                    font-semibold
                    hover:bg-orange-600
                    transition
                    cursor-pointer
                  "
                >
                  Clear Filters
                </button>
              )}

            </div>

          ) : (

            <>

              {/* =================================
                  DESKTOP TABLE
              ================================= */}

              <div className="hidden lg:block overflow-x-auto">

                <table className="w-full">

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

                    {filteredBookings.map(
                      (booking) => (

                        <tr
                          key={booking._id}
                          className="hover:bg-gray-50 transition"
                        >

                          {/* CUSTOMER */}

                          <td className="px-5 py-4">

                            <p className="font-semibold text-gray-800">
                              {booking.customerName ||
                                "—"}
                            </p>

                            <p className="text-sm text-gray-500">
                              {booking.phone ||
                                "—"}
                            </p>

                          </td>

                          {/* SERVICE */}

                          <td className="px-5 py-4">

                            <p className="font-semibold text-blue-900">
                              {booking.service ||
                                "—"}
                            </p>

                            <p className="text-sm text-gray-500 max-w-xs truncate">
                              {booking.address ||
                                "—"}
                            </p>

                          </td>

                          {/* DATE */}

                          <td className="px-5 py-4">

                            <p className="font-medium text-gray-800">
                              {booking.date ||
                                "—"}
                            </p>

                            <p className="text-sm text-gray-500">
                              {booking.time ||
                                "—"}
                            </p>

                          </td>

                          {/* PRICE */}

                          <td className="px-5 py-4">

                            <p className="font-bold text-orange-500">
                              ₹
                              {booking.price ??
                                0}
                            </p>

                          </td>

                          {/* STATUS */}

                          <td className="px-5 py-4">

                            <select
                              value={
                                booking.status
                              }
                              disabled={
                                updatingId ===
                                booking._id
                              }
                              onChange={(
                                event
                              ) =>
                                updateBookingStatus(
                                  booking._id,
                                  event.target
                                    .value
                                )
                              }
                              className={`
                                border
                                border-gray-300
                                rounded-lg
                                px-3
                                py-2
                                text-sm
                                font-medium
                                outline-none
                                cursor-pointer
                                ${getStatusStyle(
                                  booking.status
                                )}
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                              `}
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

                          {/* ACTIONS */}

                          <td className="px-5 py-4">

                            <button
                              type="button"
                              onClick={() =>
                                viewBookingDetails(
                                  booking
                                )
                              }
                              className="
                                bg-blue-100
                                text-blue-700
                                px-4
                                py-2
                                rounded-lg
                                font-semibold
                                hover:bg-blue-200
                                transition
                                cursor-pointer
                              "
                            >
                              View Details
                            </button>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

              {/* =================================
                  MOBILE / TABLET CARDS
              ================================= */}

              <div className="lg:hidden p-4 sm:p-6 space-y-5">

                {filteredBookings.map(
                  (booking) => (

                    <div
                      key={booking._id}
                      className="
                        border
                        border-gray-200
                        rounded-2xl
                        p-5
                        hover:shadow-md
                        transition
                      "
                    >

                      {/* CARD HEADER */}

                      <div className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-start
                        sm:justify-between
                        gap-3
                      ">

                        <div>

                          <p className="text-xs text-gray-500">
                            Booking ID
                          </p>

                          <p className="text-sm font-medium text-gray-700">
                            TF
                            {booking._id
                              ?.slice(-6)
                              .toUpperCase()}
                          </p>

                        </div>

                        <span
                          className={`
                            w-fit
                            inline-flex
                            items-center
                            gap-1.5
                            px-3
                            py-1.5
                            rounded-full
                            text-xs
                            font-semibold
                            ${getStatusStyle(
                              booking.status
                            )}
                          `}
                        >

                          {getStatusIcon(
                            booking.status
                          )}

                          {booking.status}

                        </span>

                      </div>

                      {/* SERVICE */}

                      <h3 className="text-xl font-bold text-blue-900 mt-4">
                        {booking.service}
                      </h3>

                      {/* CUSTOMER */}

                      <div className="mt-4 space-y-3">

                        <div>

                          <p className="text-xs text-gray-500 uppercase tracking-wide">
                            Customer
                          </p>

                          <p className="font-semibold text-gray-800 mt-1">
                            {booking.customerName ||
                              "—"}
                          </p>

                          <p className="text-sm text-gray-500">
                            {booking.phone ||
                              "—"}
                          </p>

                        </div>

                        {/* DATE */}

                        <div className="grid grid-cols-2 gap-4">

                          <div>

                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                              Date
                            </p>

                            <p className="font-medium text-gray-800 mt-1">
                              {booking.date ||
                                "—"}
                            </p>

                          </div>

                          <div>

                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                              Time
                            </p>

                            <p className="font-medium text-gray-800 mt-1">
                              {booking.time ||
                                "—"}
                            </p>

                          </div>

                        </div>

                        {/* PRICE */}

                        <div>

                          <p className="text-xs text-gray-500 uppercase tracking-wide">
                            Price
                          </p>

                          <p className="font-bold text-orange-500 text-lg mt-1">
                            ₹
                            {booking.price ??
                              0}
                          </p>

                        </div>

                        {/* ADDRESS */}

                        <div>

                          <p className="text-xs text-gray-500 uppercase tracking-wide">
                            Address
                          </p>

                          <p className="text-gray-700 mt-1 break-words">
                            {booking.address ||
                              "—"}
                          </p>

                        </div>

                      </div>

                      {/* STATUS */}

                      <div className="mt-5">

                        <label className="block text-xs text-gray-500 uppercase tracking-wide mb-2">
                          Update Status
                        </label>

                        <select
                          value={
                            booking.status
                          }
                          disabled={
                            updatingId ===
                            booking._id
                          }
                          onChange={(
                            event
                          ) =>
                            updateBookingStatus(
                              booking._id,
                              event.target
                                .value
                            )
                          }
                          className={`
                            w-full
                            border
                            border-gray-300
                            rounded-xl
                            px-4
                            py-3
                            font-medium
                            outline-none
                            cursor-pointer
                            ${getStatusStyle(
                              booking.status
                            )}
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                          `}
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

                      {/* VIEW */}

                      <button
                        type="button"
                        onClick={() =>
                          viewBookingDetails(
                            booking
                          )
                        }
                        className="
                          w-full
                          mt-4
                          bg-blue-900
                          text-white
                          px-4
                          py-3
                          rounded-xl
                          font-semibold
                          hover:bg-blue-800
                          transition
                          cursor-pointer
                        "
                      >
                        View Booking Details
                      </button>

                    </div>

                  )
                )}

              </div>

            </>

          )}

        </div>

      </div>

      {/* =======================================
          CONTACT MESSAGES
      ======================================= */}

      <div className="mt-8 bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-6 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-orange-500 font-semibold text-sm uppercase tracking-wide">
              Customer Enquiries
            </p>
            <h2 className="text-xl font-bold text-blue-900 mt-1">
              Contact Messages
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Messages submitted by customers through the Contact page.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchContacts}
            disabled={contactLoading}
            className="bg-blue-900 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {contactLoading ? "Refreshing..." : "↻ Refresh Messages"}
          </button>
        </div>

        {contactError && (
          <div className="m-5 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p>{contactError}</p>
              <button
                type="button"
                onClick={fetchContacts}
                className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg font-semibold"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {contactLoading ? (
          <div className="p-10 text-center">
            <div className="w-10 h-10 mx-auto border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin" />
            <p className="text-gray-500 mt-4">Loading contact messages...</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="p-10 sm:p-14 text-center">
            <div className="text-5xl mb-4">✉️</div>
            <h3 className="text-xl font-semibold text-gray-800">
              No contact messages
            </h3>
            <p className="text-gray-500 mt-2">
              Customer enquiries submitted from the Contact page will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {contacts.map((contact) => (
              <div key={contact._id} className="p-5 sm:p-6 hover:bg-gray-50 transition">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold text-blue-900">
                        {contact.subject || "No subject"}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          contact.status === "Resolved"
                            ? "bg-green-100 text-green-700"
                            : contact.status === "Read"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {contact.status || "New"}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Customer
                        </p>
                        <p className="font-semibold text-gray-800 mt-1">
                          {contact.name || "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Email
                        </p>
                        <p className="text-gray-700 mt-1 break-all">
                          {contact.email || "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          Phone
                        </p>
                        <p className="text-gray-700 mt-1">
                          {contact.phone || "—"}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                        Message
                      </p>
                      <p className="text-gray-800 leading-7 whitespace-pre-wrap break-words">
                        {contact.message || "—"}
                      </p>
                    </div>

                    {contact.createdAt && (
                      <p className="text-xs text-gray-500 mt-3">
                        Received on {new Date(contact.createdAt).toLocaleString()}
                      </p>
                    )}
                  </div>

                  <div className="w-full lg:w-48 shrink-0 space-y-3">
                    <div>
                      <label className="block text-xs text-gray-500 uppercase tracking-wide mb-2">
                        Update Status
                      </label>
                      <select
                        value={contact.status || "New"}
                        disabled={updatingContactId === contact._id}
                        onChange={(event) =>
                          handleContactStatusChange(
                            contact._id,
                            event.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm font-medium outline-none focus:border-orange-500"
                      >
                        <option value="New">New</option>
                        <option value="Read">Read</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      disabled={updatingContactId === contact._id}
                      onClick={() => handleDeleteContact(contact._id)}
                      className="w-full bg-red-100 text-red-700 px-4 py-2.5 rounded-xl font-semibold hover:bg-red-200 transition disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      {updatingContactId === contact._id
                        ? "Updating..."
                        : "Delete Message"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =======================================
          BOOKING DETAILS MODAL
      ======================================= */}

      {selectedBooking && (

        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/50
            flex
            items-center
            justify-center
            p-4
          "
          onClick={closeBookingDetails}
        >

          <div
            className="
              bg-white
              w-full
              max-w-2xl
              max-h-[90vh]
              overflow-y-auto
              rounded-2xl
              shadow-2xl
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* =================================
                MODAL HEADER
            ================================= */}

            <div className="
              flex
              items-start
              justify-between
              gap-4
              p-6
              border-b
            ">

              <div>

                <p className="text-sm text-orange-500 font-semibold">
                  BOOKING DETAILS
                </p>

                <h2 className="text-2xl font-bold text-blue-900 mt-1">
                  {selectedBooking.service}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Booking ID: TF
                  {selectedBooking._id
                    ?.slice(-6)
                    .toUpperCase()}
                </p>

              </div>

              <button
                type="button"
                onClick={
                  closeBookingDetails
                }
                className="
                  w-9
                  h-9
                  rounded-full
                  bg-gray-100
                  text-gray-600
                  hover:bg-gray-200
                  text-xl
                  cursor-pointer
                  flex
                  items-center
                  justify-center
                "
              >
                ×
              </button>

            </div>

            {/* =================================
                MODAL BODY
            ================================= */}

            <div className="p-6 space-y-6">

              {/* =================================
                  STATUS
              ================================= */}

              <div>

                <p className="text-sm text-gray-500 mb-2">
                  Current Status
                </p>

                <span
                  className={`
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-semibold
                    ${getStatusStyle(
                      selectedBooking.status
                    )}
                  `}
                >

                  {getStatusIcon(
                    selectedBooking.status
                  )}

                  {selectedBooking.status}

                </span>

              </div>

              {/* =================================
                  CUSTOMER
              ================================= */}

              <div className="bg-gray-50 rounded-xl p-5">

                <h3 className="font-bold text-blue-900 mb-4">
                  Customer Information
                </h3>

                <div className="grid sm:grid-cols-2 gap-5">

                  <div>

                    <p className="text-sm text-gray-500">
                      Name
                    </p>

                    <p className="font-semibold text-gray-800 mt-1">
                      {selectedBooking.customerName ||
                        "—"}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Phone
                    </p>

                    <p className="font-semibold text-gray-800 mt-1">
                      {selectedBooking.phone ||
                        "—"}
                    </p>

                  </div>

                </div>

              </div>

              {/* =================================
                  SERVICE
              ================================= */}

              <div className="bg-orange-50 rounded-xl p-5">

                <h3 className="font-bold text-blue-900 mb-4">
                  Service Information
                </h3>

                <div className="grid sm:grid-cols-2 gap-5">

                  <div>

                    <p className="text-sm text-gray-500">
                      Service
                    </p>

                    <p className="font-semibold text-gray-800 mt-1">
                      {selectedBooking.service ||
                        "—"}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Price
                    </p>

                    <p className="font-bold text-orange-500 text-lg mt-1">
                      ₹
                      {selectedBooking.price ??
                        0}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Date
                    </p>

                    <p className="font-semibold text-gray-800 mt-1">
                      {selectedBooking.date ||
                        "—"}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Time
                    </p>

                    <p className="font-semibold text-gray-800 mt-1">
                      {selectedBooking.time ||
                        "—"}
                    </p>

                  </div>

                </div>

              </div>

              {/* =================================
                  ADDRESS
              ================================= */}

              <div>

                <p className="text-sm text-gray-500">
                  Service Address
                </p>

                <p className="font-medium text-gray-800 mt-1 bg-gray-50 rounded-xl p-4">
                  {selectedBooking.address ||
                    "—"}
                </p>

              </div>

              {/* =================================
                  NOTES
              ================================= */}

              <div>

                <p className="text-sm text-gray-500">
                  Additional Instructions
                </p>

                <p className="font-medium text-gray-800 mt-1 bg-gray-50 rounded-xl p-4">
                  {selectedBooking.notes ||
                    "No additional instructions."}
                </p>

              </div>

              {/* =================================
                  CUSTOMER REVIEW
              ================================= */}

              <div className="border-t pt-6">

                <div className="flex items-center justify-between gap-3 mb-4">

                  <div>

                    <p className="text-sm text-gray-500">
                      Customer Review
                    </p>

                    <h3 className="text-xl font-bold text-blue-900 mt-1">
                      Service Feedback
                    </h3>

                  </div>

                  {selectedReview && (
                    <span className="bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full text-sm font-semibold">
                      {selectedReview.rating}/5
                    </span>
                  )}

                </div>

                {/* REVIEW LOADING */}

                {reviewLoading && (

                  <div className="bg-gray-50 rounded-xl p-5 text-center">

                    <div className="
                      w-7
                      h-7
                      mx-auto
                      border-4
                      border-gray-200
                      border-t-orange-500
                      rounded-full
                      animate-spin
                    " />

                    <p className="text-sm text-gray-500 mt-3">
                      Loading review...
                    </p>

                  </div>

                )}

                {/* REVIEW ERROR */}

                {!reviewLoading &&
                  reviewError && (

                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">

                      <p className="text-sm text-red-600">
                        {reviewError}
                      </p>

                    </div>

                  )}

                {/* REVIEW EXISTS */}

                {!reviewLoading &&
                  !reviewError &&
                  selectedReview && (

                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">

                      {/* RATING */}

                      <div className="flex items-center gap-1 mb-3">

                        {[1, 2, 3, 4, 5].map(
                          (star) => (

                            <span
                              key={star}
                              className={
                                star <=
                                selectedReview.rating
                                  ? "text-orange-500 text-xl"
                                  : "text-gray-300 text-xl"
                              }
                            >
                              ★
                            </span>

                          )
                        )}

                        <span className="ml-2 font-semibold text-gray-700">
                          {selectedReview.rating}/5
                        </span>

                      </div>

                      {/* COMMENT */}

                      <p className="text-gray-800 leading-relaxed">
                        "{selectedReview.comment}"
                      </p>

                      {/* REVIEWER */}

                      {selectedReview.user && (

                        <div className="mt-4 pt-4 border-t border-orange-200">

                          <p className="text-xs text-gray-500 uppercase tracking-wide">
                            Reviewed By
                          </p>

                          <p className="font-semibold text-gray-800 mt-1">
                            {selectedReview.user.name ||
                              "Customer"}
                          </p>

                          {selectedReview.user.email && (
                            <p className="text-sm text-gray-500">
                              {selectedReview.user.email}
                            </p>
                          )}

                        </div>

                      )}

                      {/* REVIEW DATE */}

                      {selectedReview.createdAt && (

                        <p className="text-xs text-gray-500 mt-4">

                          Reviewed on{" "}

                          {new Date(
                            selectedReview.createdAt
                          ).toLocaleString()}

                        </p>

                      )}

                    </div>

                  )}

                {/* NO REVIEW */}

                {!reviewLoading &&
                  !reviewError &&
                  !selectedReview && (

                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">

                      <div className="text-3xl mb-2">
                        ⭐
                      </div>

                      <p className="font-semibold text-gray-700">
                        No review submitted yet
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        The customer has not reviewed this service.
                      </p>

                    </div>

                  )}

              </div>

              {/* =================================
                  CREATED
              ================================= */}

              {selectedBooking.createdAt && (

                <div>

                  <p className="text-sm text-gray-500">
                    Booking Created
                  </p>

                  <p className="font-medium text-gray-800 mt-1">
                    {new Date(
                      selectedBooking.createdAt
                    ).toLocaleString()}
                  </p>

                </div>

              )}

              {/* =================================
                  STATUS UPDATE
              ================================= */}

              <div className="border-t pt-5">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Update Booking Status
                </label>

                <select
                  value={
                    selectedBooking.status
                  }
                  disabled={
                    updatingId ===
                    selectedBooking._id
                  }
                  onChange={(event) =>
                    updateBookingStatus(
                      selectedBooking._id,
                      event.target.value
                    )
                  }
                  className={`
                    w-full
                    border
                    border-gray-300
                    rounded-xl
                    px-4
                    py-3
                    font-medium
                    outline-none
                    cursor-pointer
                    ${getStatusStyle(
                      selectedBooking.status
                    )}
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  `}
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

            </div>

            {/* =================================
                MODAL FOOTER
            ================================= */}

            <div className="p-6 border-t flex justify-end">

              <button
                type="button"
                onClick={
                  closeBookingDetails
                }
                className="
                  bg-gray-200
                  text-gray-700
                  px-6
                  py-3
                  rounded-xl
                  font-semibold
                  hover:bg-gray-300
                  transition
                  cursor-pointer
                "
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </section>
  );
}

export default AdminDashboard;