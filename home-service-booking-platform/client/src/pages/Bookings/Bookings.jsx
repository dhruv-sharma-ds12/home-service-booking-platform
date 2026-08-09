import { useLocation } from "react-router-dom";
import { useState } from "react";
import services from "../../data/services";

function Bookings() {
  const location = useLocation();

  // Service received from Service Details → Book Now
  const [selectedService, setSelectedService] = useState(
    location.state?.service || null
  );

  // Booking form data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    address: "",
    notes: ""
  });

  // Error and confirmation states
  const [error, setError] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setError("");
    setBookingConfirmed(false);
  };

  // Handle service selection
  const handleServiceChange = (e) => {
    const serviceId = Number(e.target.value);

    const service = services.find(
      (item) => item.id === serviceId
    );

    setSelectedService(service || null);

    setError("");
    setBookingConfirmed(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !selectedService ||
      !formData.name ||
      !formData.phone ||
      !formData.date ||
      !formData.time ||
      !formData.address
    ) {
      setError(
        "Please fill in all the required fields and select a service."
      );

      setBookingConfirmed(false);
      return;
    }

    if (formData.phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");

      setBookingConfirmed(false);
      return;
    }

    setError("");
    setBookingConfirmed(true);
  };

  return (
    <section className="min-h-screen bg-gray-100 py-12 px-6">

      <div className="max-w-3xl mx-auto">

        {/* Page Heading */}
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-8">
          Book a Service
        </h1>

        {/* Booking Confirmation */}
        {bookingConfirmed && (
          <div className="bg-green-100 border border-green-400 text-green-700 rounded-xl p-6 mb-8">

            <h2 className="text-2xl font-bold mb-2">
              Booking Confirmed!
            </h2>

            <p>
              Thank you, {formData.name}. Your service booking
              request has been received.
            </p>

            <div className="mt-4 space-y-1">

              <p>
                <strong>Service:</strong>{" "}
                {selectedService?.name}
              </p>

              <p>
                <strong>Price:</strong>{" "}
                ₹{selectedService?.price}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {formData.date}
              </p>

              <p>
                <strong>Time:</strong>{" "}
                {formData.time}
              </p>

              <p>
                <strong>Address:</strong>{" "}
                {formData.address}
              </p>

              {formData.notes && (
                <p>
                  <strong>Notes:</strong>{" "}
                  {formData.notes}
                </p>
              )}

            </div>

          </div>
        )}

        {/* Selected Service */}
        {selectedService && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">

            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              Selected Service
            </h2>

            <div className="flex flex-col md:flex-row gap-5 items-center">

              <img
                src={selectedService.image}
                alt={selectedService.name}
                className="w-full md:w-40 h-32 object-cover rounded-lg"
              />

              <div>

                <h3 className="text-xl font-semibold text-gray-800">
                  {selectedService.name}
                </h3>

                <p className="text-orange-500 font-bold text-lg mt-2">
                  ₹{selectedService.price}
                </p>

                <p className="text-gray-600 mt-2">
                  {selectedService.description}
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Booking Form */}
        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-2xl font-semibold text-blue-900 mb-6">
            Your Details
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Select Service */}
            <div>

              <label className="block font-medium text-gray-700 mb-2">
                Select Service
              </label>

              <select
                value={selectedService?.id || ""}
                onChange={handleServiceChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >

                <option value="">
                  Choose a service
                </option>

                {services.map((service) => (
                  <option
                    key={service.id}
                    value={service.id}
                  >
                    {service.name} - ₹{service.price}
                  </option>
                ))}

              </select>

            </div>

            {/* Full Name */}
            <div>

              <label className="block font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

            </div>

            {/* Phone */}
            <div>

              <label className="block font-medium text-gray-700 mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your 10-digit phone number"
                maxLength="10"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Date */}
              <div>

                <label className="block font-medium text-gray-700 mb-2">
                  Service Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

              </div>

              {/* Time */}
              <div>

                <label className="block font-medium text-gray-700 mb-2">
                  Service Time
                </label>

                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

              </div>

            </div>

            {/* Address */}
            <div>

              <label className="block font-medium text-gray-700 mb-2">
                Address
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="4"
                placeholder="Enter your complete address"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              ></textarea>

            </div>

            {/* Additional Notes */}
            <div>

              <label className="block font-medium text-gray-700 mb-2">
                Additional Notes
              </label>

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Any additional information for the professional (optional)"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              ></textarea>

            </div>

            {/* Booking Summary */}
            {selectedService && (
              <div className="bg-gray-100 rounded-lg p-5">

                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  Booking Summary
                </h3>

                <div className="space-y-2 text-gray-700">

                  <p>
                    <strong>Service:</strong>{" "}
                    {selectedService.name}
                  </p>

                  <p>
                    <strong>Price:</strong>{" "}
                    ₹{selectedService.price}
                  </p>

                  <p>
                    <strong>Name:</strong>{" "}
                    {formData.name || "Not provided"}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {formData.phone || "Not provided"}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {formData.date || "Not selected"}
                  </p>

                  <p>
                    <strong>Time:</strong>{" "}
                    {formData.time || "Not selected"}
                  </p>

                  <p>
                    <strong>Address:</strong>{" "}
                    {formData.address || "Not provided"}
                  </p>

                  <p>
                    <strong>Additional Notes:</strong>{" "}
                    {formData.notes || "None"}
                  </p>

                </div>

              </div>
            )}

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            {/* Confirm Booking Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Confirm Booking
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}

export default Bookings;