import { useLocation } from "react-router-dom";

function Bookings() {
  const location = useLocation();

  const selectedService = location.state?.service;

  return (
    <section className="py-16 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        <h1 className="text-4xl font-bold text-blue-900 text-center mb-10">
          Book a Service
        </h1>

        {/* Selected Service */}
        {selectedService && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">
              Selected Service
            </h2>

            <div className="flex items-center gap-4">
              <img
                src={selectedService.image}
                alt={selectedService.name}
                className="w-24 h-20 object-cover rounded-lg"
              />

              <div>
                <h3 className="font-semibold text-lg">
                  {selectedService.name}
                </h3>

                <p className="text-orange-500 font-bold">
                  ₹{selectedService.price}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Booking Form */}
        <form className="bg-white rounded-xl shadow-md p-6 sm:p-8">

          <div className="mb-5">
            <label className="block font-medium text-gray-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="mb-5">
            <label className="block font-medium text-gray-700 mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Service Date
              </label>

              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Service Time
              </label>

              <input
                type="time"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

          </div>

          <div className="mt-5 mb-5">
            <label className="block font-medium text-gray-700 mb-2">
              Address
            </label>

            <textarea
              rows="4"
              placeholder="Enter your complete address"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Confirm Booking
          </button>

        </form>

      </div>
    </section>
  );
}

export default Bookings;