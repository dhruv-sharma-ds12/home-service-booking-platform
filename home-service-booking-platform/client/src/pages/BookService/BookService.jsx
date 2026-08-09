import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function BookService() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth();

  const service = location.state?.service;

  const [formData, setFormData] = useState({
    customerName: user?.name || "",
    phone: "",
    address: "",
    date: "",
    time: "",
    instructions: "",
  });

  const [errors, setErrors] = useState({});
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  /* =========================
     SCROLL TO TOP
     WHEN CONFIRMATION APPEARS
  ========================= */

  useEffect(() => {
    if (bookingConfirmed) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
  }, [bookingConfirmed]);

  /* =========================
     SERVICE NOT FOUND
  ========================= */

  if (!service) {
    return (
      <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-md p-8 text-center max-w-md w-full">

          <h1 className="text-2xl font-bold text-blue-900 mb-3">
            Service Not Found
          </h1>

          <p className="text-gray-600 mb-6">
            Please select a service before booking.
          </p>

          <button
            onClick={() => navigate("/services")}
            className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
          >
            Browse Services
          </button>

        </div>
      </section>
    );
  }

  /* =========================
     LOGIN REQUIRED
  ========================= */

  if (!isAuthenticated) {
    return (
      <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

        <div className="bg-white rounded-2xl shadow-md p-8 text-center max-w-md w-full">

          <h1 className="text-2xl font-bold text-blue-900 mb-3">
            Login Required
          </h1>

          <p className="text-gray-600 mb-6">
            Please login before booking a service.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
          >
            Go to Login
          </button>

        </div>

      </section>
    );
  }

  /* =========================
     FORM CHANGE
  ========================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* =========================
     VALIDATION
  ========================= */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName =
        "Booking person name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Enter a valid 10-digit phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address =
        "Address is required";
    }

    if (!formData.date) {
      newErrors.date =
        "Please select a date";
    }

    if (!formData.time) {
      newErrors.time =
        "Please select a time";
    }

    return newErrors;
  };

  /* =========================
     CONFIRM BOOKING
  ========================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      // Scroll to the top of the form when validation fails
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });

      return;
    }

    const existingBookings = JSON.parse(
      localStorage.getItem("truefixBookings") || "[]"
    );

    const newBooking = {
      id: Date.now(),

      userEmail: user.email,

      serviceId: service.id,
      serviceName: service.name,
      servicePrice: service.price,
      serviceImage: service.image,

      customerName: formData.customerName,
      phone: formData.phone,
      address: formData.address,

      date: formData.date,
      time: formData.time,

      instructions: formData.instructions,

      status: "Pending",

      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "truefixBookings",
      JSON.stringify([
        ...existingBookings,
        newBooking,
      ])
    );

    /*
      Show confirmation screen first.
      The useEffect above will automatically
      scroll the page to the top.
    */
    setBookingConfirmed(true);

    /*
      Redirect after 3 seconds.
    */
    setTimeout(() => {
      navigate("/my-bookings");
    }, 3000);
  };

  /* =========================
     FULL-SCREEN CONFIRMATION
  ========================= */

  if (bookingConfirmed) {
    return (
      <section className="min-h-screen bg-gray-50 flex items-start justify-center px-4 py-16">

        <div className="w-full max-w-lg">

          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 text-center">

            {/* Success Icon */}

            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">

              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">

                <span className="text-white text-4xl font-bold">
                  ✓
                </span>

              </div>

            </div>

            {/* Heading */}

            <h1 className="text-3xl sm:text-4xl font-bold text-blue-900">
              Booking Confirmed!
            </h1>

            {/* Message */}

            <p className="text-gray-600 mt-4 text-lg">
              Your service booking has been successfully confirmed.
            </p>

            {/* Service */}

            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mt-6">

              <p className="text-sm text-gray-500">
                Service
              </p>

              <p className="text-lg font-bold text-blue-900 mt-1">
                {service.name}
              </p>

            </div>

            {/* Booking Person */}

            <div className="mt-4">

              <p className="text-sm text-gray-500">
                Booking Person
              </p>

              <p className="font-semibold text-gray-800 mt-1">
                {formData.customerName}
              </p>

            </div>

            {/* Redirect Message */}

            <p className="text-gray-500 text-sm mt-8">
              Redirecting you to My Bookings...
            </p>

            {/* Loading Animation */}

            <div className="mt-4 flex justify-center">

              <div className="w-8 h-8 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>

            </div>

          </div>

        </div>

      </section>
    );
  }

  /* =========================
     BOOKING FORM
  ========================= */

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 sm:py-14">

      <div className="max-w-3xl mx-auto">

        {/* Header */}

        <div className="text-center mb-8">

          <p className="text-orange-500 font-semibold">
            BOOK YOUR SERVICE
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mt-2">
            Book {service.name}
          </h1>

          <p className="text-gray-600 mt-3">
            Enter your details and choose a convenient appointment.
          </p>

        </div>

        {/* Service Summary */}

        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">

          <img
            src={service.image}
            alt={service.name}
            className="w-full h-52 object-cover"
          />

          <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

            <div>

              <h2 className="text-xl font-bold text-blue-900">
                {service.name}
              </h2>

              <p className="text-gray-500 mt-1">
                Professional home service
              </p>

            </div>

            <p className="text-orange-500 text-xl font-bold">
              ₹{service.price}
            </p>

          </div>

        </div>

        {/* Booking Form */}

        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Booking Person */}

            <div>

              <label
                htmlFor="customerName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Booking Person Name
              </label>

              <input
                id="customerName"
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Enter booking person's name"
                className={`w-full px-4 py-3 border rounded-xl outline-none transition ${
                  errors.customerName
                    ? "border-red-500"
                    : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                }`}
              />

              {errors.customerName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.customerName}
                </p>
              )}

            </div>

            {/* Phone */}

            <div>

              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit phone number"
                maxLength="10"
                className={`w-full px-4 py-3 border rounded-xl outline-none transition ${
                  errors.phone
                    ? "border-red-500"
                    : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                }`}
              />

              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone}
                </p>
              )}

            </div>

            {/* Address */}

            <div>

              <label
                htmlFor="address"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Service Address
              </label>

              <textarea
                id="address"
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter complete service address"
                className={`w-full px-4 py-3 border rounded-xl outline-none resize-none transition ${
                  errors.address
                    ? "border-red-500"
                    : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                }`}
              />

              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address}
                </p>
              )}

            </div>

            {/* Date + Time */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Date */}

              <div>

                <label
                  htmlFor="date"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Appointment Date
                </label>

                <input
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className={`w-full px-4 py-3 border rounded-xl outline-none transition ${
                    errors.date
                      ? "border-red-500"
                      : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  }`}
                />

                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.date}
                  </p>
                )}

              </div>

              {/* Time */}

              <div>

                <label
                  htmlFor="time"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Appointment Time
                </label>

                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl outline-none transition ${
                    errors.time
                      ? "border-red-500"
                      : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  }`}
                >

                  <option value="">
                    Select time
                  </option>

                  <option value="09:00 AM">
                    09:00 AM
                  </option>

                  <option value="11:00 AM">
                    11:00 AM
                  </option>

                  <option value="01:00 PM">
                    01:00 PM
                  </option>

                  <option value="03:00 PM">
                    03:00 PM
                  </option>

                  <option value="05:00 PM">
                    05:00 PM
                  </option>

                  <option value="07:00 PM">
                    07:00 PM
                  </option>

                </select>

                {errors.time && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.time}
                  </p>
                )}

              </div>

            </div>

            {/* Instructions */}

            <div>

              <label
                htmlFor="instructions"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Additional Instructions

                <span className="text-gray-400 font-normal">
                  {" "} (Optional)
                </span>
              </label>

              <textarea
                id="instructions"
                name="instructions"
                rows="4"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="Any specific instructions for the professional?"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none resize-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />

            </div>

            {/* Price */}

            <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">

              <div className="flex justify-between">

                <span className="text-gray-600">
                  Service Price
                </span>

                <span className="font-bold text-blue-900">
                  ₹{service.price}
                </span>

              </div>

              <div className="border-t border-orange-200 my-3"></div>

              <div className="flex justify-between">

                <span className="font-semibold text-gray-700">
                  Total Amount
                </span>

                <span className="text-xl font-bold text-orange-500">
                  ₹{service.price}
                </span>

              </div>

            </div>

            {/* Confirm Booking */}

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3.5 rounded-xl font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Confirm Booking
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}

export default BookService;