function About() {
  return (
    <section className="min-h-screen bg-gray-100 py-16 px-4 sm:px-6">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">

          <h1 className="text-4xl sm:text-5xl font-bold text-blue-900">
            About TrueFix
          </h1>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Reliable home services, trusted professionals, and convenient
            bookings — all in one place.
          </p>

        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <div className="bg-white rounded-2xl shadow-md p-8">

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              What is TrueFix?
            </h2>

            <p className="text-gray-600 leading-7">
              TrueFix is a home service booking platform designed to make
              finding and booking reliable professionals simple and
              convenient.
            </p>

            <p className="text-gray-600 leading-7 mt-4">
              Customers can explore different home services, view service
              details, choose a convenient date and time, and manage their
              bookings from one platform.
            </p>

          </div>

          {/* Right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl mb-3">🛠️</div>

              <h3 className="font-bold text-blue-900 text-lg">
                Trusted Services
              </h3>

              <p className="text-gray-600 text-sm mt-2">
                Connect with professionals for essential home services.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl mb-3">📅</div>

              <h3 className="font-bold text-blue-900 text-lg">
                Easy Booking
              </h3>

              <p className="text-gray-600 text-sm mt-2">
                Select a service and schedule it at your convenience.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl mb-3">💰</div>

              <h3 className="font-bold text-blue-900 text-lg">
                Transparent Pricing
              </h3>

              <p className="text-gray-600 text-sm mt-2">
                View service prices before confirming your booking.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-3xl mb-3">📱</div>

              <h3 className="font-bold text-blue-900 text-lg">
                Convenient Management
              </h3>

              <p className="text-gray-600 text-sm mt-2">
                Keep track of your bookings through your TrueFix account.
              </p>
            </div>

          </div>

        </div>

        {/* Mission */}
        <div className="bg-blue-900 rounded-2xl shadow-md p-8 sm:p-10 mt-10 text-white text-center">

          <h2 className="text-2xl sm:text-3xl font-bold">
            Our Mission
          </h2>

          <p className="max-w-3xl mx-auto mt-4 text-blue-100 leading-7">
            Our goal is to simplify everyday home maintenance by connecting
            customers with useful services through an easy-to-use digital
            platform.
          </p>

        </div>

      </div>

    </section>
  );
}

export default About;