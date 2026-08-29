import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api";

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
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // ==========================================
  // UPDATE USER NAME
  // ==========================================

  useEffect(() => {
    if (user?.name) {
      setFormData((previous) => ({
        ...previous,
        customerName: user.name,
      }));
    }
  }, [user]);

  // ==========================================
  // SCROLL TO TOP AFTER BOOKING CONFIRMATION
  // ==========================================

  useEffect(() => {
    if (bookingConfirmed) {
      // Immediately move the confirmation page to the top
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    }
  }, [bookingConfirmed]);

  // ==========================================
  // SERVICE NOT FOUND
  // ==========================================

  if (!service) {
    return (
      <section className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-blue-900 mb-3">
            Service Not Found
          </h1>

          <p className="text-gray-600 mb-6">
            Please select a service before booking.
          </p>

          <button
            type="button"
            onClick={() => navigate("/services")}
            className="
              bg-orange-500
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              hover:bg-orange-600
              transition
              cursor-pointer
            "
          >
            Browse Services
          </button>
        </div>
      </section>
    );
  }

  // ==========================================
  // LOGIN REQUIRED
  // ==========================================

  if (!isAuthenticated) {
    return (
      <section className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-blue-900 mb-3">
            Login Required
          </h1>

          <p className="text-gray-600 mb-6">
            Please login before booking a service.
          </p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="
              bg-orange-500
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              hover:bg-orange-600
              transition
              cursor-pointer
            "
          >
            Go to Login
          </button>
        </div>
      </section>
    );
  }

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setApiError("");
  };

  // ==========================================
  // VALIDATION
  // ==========================================

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName =
        "Booking person name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Enter a valid 10-digit phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date";
    }

    if (!formData.time) {
      newErrors.time = "Please select a time";
    }

    return newErrors;
  };

  // ==========================================
  // SUBMIT BOOKING
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setApiError("");

      // ----------------------------------------
      // GET JWT TOKEN
      // ----------------------------------------

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Authentication token not found. Please login again."
        );
      }

      // ----------------------------------------
      // BOOKING DATA
      // ----------------------------------------

      const bookingData = {
        service: service.name,
        price: service.price,
        customerName: formData.customerName,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        address: formData.address,
        notes: formData.instructions,
      };

      console.log("Sending booking:", bookingData);

      // ----------------------------------------
      // CREATE BOOKING
      // ----------------------------------------

      const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(bookingData),
      });

      const data = await response.json().catch(() => ({}));

      console.log("Booking API response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create booking"
        );
      }

      // ----------------------------------------
      // SHOW CONFIRMATION
      // ----------------------------------------

      setBookingConfirmed(true);

      // ----------------------------------------
      // REDIRECT TO MY BOOKINGS
      // ----------------------------------------

      const redirectTimer = setTimeout(() => {
        navigate("/my-bookings");
      }, 2000);

      // Cleanup timer if component unmounts
      return () => clearTimeout(redirectTimer);
    } catch (error) {
      console.error("Booking error:", error);

      setApiError(
        error.message ||
          "Something went wrong while creating the booking."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // BOOKING CONFIRMED SCREEN
  // ==========================================

  if (bookingConfirmed) {
    return (
      <section
        className="
          min-h-screen
          bg-gray-100
          py-12
          px-4
          flex
          items-start
          justify-center
        "
      >
        <div className="w-full max-w-lg">
          <div
            className="
              bg-white
              rounded-3xl
              shadow-xl
              p-8
              sm:p-12
              text-center
            "
          >
            {/* SUCCESS ICON */}

            <div
              className="
                w-24
                h-24
                mx-auto
                mb-6
                rounded-full
                bg-green-100
                flex
                items-center
                justify-center
              "
            >
              <div
                className="
                  w-16
                  h-16
                  rounded-full
                  bg-green-500
                  flex
                  items-center
                  justify-center
                "
              >
                <span className="text-white text-4xl font-bold">
                  ✓
                </span>
              </div>
            </div>

            {/* TITLE */}

            <h1 className="text-3xl sm:text-4xl font-bold text-blue-900">
              Booking Confirmed!
            </h1>

            {/* MESSAGE */}

            <p className="text-gray-600 mt-4 text-lg">
              Your service booking has been successfully created.
            </p>

            {/* SERVICE */}

            <div
              className="
                bg-orange-50
                border
                border-orange-100
                rounded-xl
                p-4
                mt-6
              "
            >
              <p className="text-sm text-gray-500">
                Service
              </p>

              <p className="text-lg font-bold text-blue-900 mt-1">
                {service.name}
              </p>
            </div>

            {/* REDIRECT MESSAGE */}

            <p className="text-gray-500 text-sm mt-8">
              Redirecting you to My Bookings...
            </p>

            {/* LOADER */}

            <div className="mt-4 flex justify-center">
              <div
                className="
                  w-8
                  h-8
                  border-4
                  border-gray-200
                  border-t-orange-500
                  rounded-full
                  animate-spin
                "
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // BOOKING FORM
  // ==========================================

  return (
    <section className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* =====================================
            HEADER
        ===================================== */}

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

        {/* =====================================
            API ERROR
        ===================================== */}

        {apiError && (
          <div
            className="
              mb-6
              bg-red-50
              border
              border-red-200
              text-red-700
              rounded-xl
              p-4
            "
          >
            {apiError}
          </div>
        )}

        {/* =====================================
            SERVICE SUMMARY
        ===================================== */}

        <div
          className="
            bg-white
            rounded-2xl
            shadow-md
            overflow-hidden
            mb-6
          "
        >
          {/* SERVICE IMAGE */}

          {service.image ? (
            <img
              src={service.image}
              alt={service.name}
              className="
                w-full
                h-[400px]
                object-cover
              "
            />
          ) : (
            <div
              className="
                w-full
                h-52
                bg-gray-100
                flex
                items-center
                justify-center
                text-6xl
              "
            >
              🛠️
            </div>
          )}

          {/* SERVICE INFORMATION */}

          <div
            className="
              p-5
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-3
            "
          >
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

        {/* =====================================
            FORM CONTAINER
        ===================================== */}

        <div
          className="
            bg-white
            rounded-2xl
            shadow-md
            p-6
            sm:p-8
          "
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* =================================
                CUSTOMER NAME
            ================================= */}

            <div>
              <label
                className="
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  mb-2
                "
              >
                Booking Person Name
              </label>

              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Enter booking person's name"
                className={`
                  w-full
                  px-4
                  py-3
                  border
                  rounded-xl
                  outline-none
                  ${
                    errors.customerName
                      ? "border-red-500"
                      : "border-gray-300 focus:border-orange-500"
                  }
                `}
              />

              {errors.customerName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.customerName}
                </p>
              )}
            </div>

            {/* =================================
                PHONE
            ================================= */}

            <div>
              <label
                className="
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  mb-2
                "
              >
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit phone number"
                maxLength="10"
                className={`
                  w-full
                  px-4
                  py-3
                  border
                  rounded-xl
                  outline-none
                  ${
                    errors.phone
                      ? "border-red-500"
                      : "border-gray-300 focus:border-orange-500"
                  }
                `}
              />

              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* =================================
                ADDRESS
            ================================= */}

            <div>
              <label
                className="
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  mb-2
                "
              >
                Service Address
              </label>

              <textarea
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter complete service address"
                className={`
                  w-full
                  px-4
                  py-3
                  border
                  rounded-xl
                  outline-none
                  resize-none
                  ${
                    errors.address
                      ? "border-red-500"
                      : "border-gray-300 focus:border-orange-500"
                  }
                `}
              />

              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address}
                </p>
              )}
            </div>

            {/* =================================
                DATE + TIME
            ================================= */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-5
              "
            >
              {/* DATE */}

              <div>
                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  "
                >
                  Appointment Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                  className={`
                    w-full
                    px-4
                    py-3
                    border
                    rounded-xl
                    outline-none
                    ${
                      errors.date
                        ? "border-red-500"
                        : "border-gray-300 focus:border-orange-500"
                    }
                  `}
                />

                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.date}
                  </p>
                )}
              </div>

              {/* TIME */}

              <div>
                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  "
                >
                  Appointment Time
                </label>

                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`
                    w-full
                    px-4
                    py-3
                    border
                    rounded-xl
                    outline-none
                    ${
                      errors.time
                        ? "border-red-500"
                        : "border-gray-300 focus:border-orange-500"
                    }
                  `}
                >
                  <option value="">
                    Select time
                  </option>

                  <option value="08:00 AM">
                    08:00 AM
                  </option>

                  <option value="09:00 AM">
                    09:00 AM
                  </option>

                  <option value="10:00 AM">
                    10:00 AM
                  </option>

                  <option value="11:00 AM">
                    11:00 AM
                  </option>

                  <option value="12:00 PM">
                    12:00 PM
                  </option>

                  <option value="01:00 PM">
                    01:00 PM
                  </option>

                  <option value="02:00 PM">
                    02:00 PM
                  </option>

                  <option value="03:00 PM">
                    03:00 PM
                  </option>

                  <option value="04:00 PM">
                    04:00 PM
                  </option>

                  <option value="05:00 PM">
                    05:00 PM
                  </option>

                  <option value="06:00 PM">
                    06:00 PM
                  </option>

                  <option value="07:00 PM">
                    07:00 PM
                  </option>

                  <option value="08:00 PM">
                    08:00 PM
                  </option>
                </select>

                {errors.time && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.time}
                  </p>
                )}
              </div>
            </div>

            {/* =================================
                ADDITIONAL INSTRUCTIONS
            ================================= */}

            <div>
              <label
                className="
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  mb-2
                "
              >
                Additional Instructions

                <span className="text-gray-400 font-normal">
                  {" "}
                  (Optional)
                </span>
              </label>

              <textarea
                name="instructions"
                rows="4"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="Any specific instructions for the professional?"
                className="
                  w-full
                  px-4
                  py-3
                  border
                  border-gray-300
                  rounded-xl
                  outline-none
                  resize-none
                  focus:border-orange-500
                "
              />
            </div>

            {/* =================================
                PRICE
            ================================= */}

            <div
              className="
                bg-orange-50
                border
                border-orange-100
                rounded-xl
                p-5
              "
            >
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Service Price
                </span>

                <span className="font-bold text-blue-900">
                  ₹{service.price}
                </span>
              </div>

              <div
                className="
                  border-t
                  border-orange-200
                  my-3
                "
              />

              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">
                  Total Amount
                </span>

                <span className="text-xl font-bold text-orange-500">
                  ₹{service.price}
                </span>
              </div>
            </div>

            {/* =================================
                CONFIRM BUTTON
            ================================= */}

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full
                text-white
                py-3.5
                rounded-xl
                font-semibold
                shadow-md
                transition
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600 cursor-pointer"
                }
              `}
            >
              {loading
                ? "Creating Booking..."
                : "Confirm Booking"}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}

export default BookService;