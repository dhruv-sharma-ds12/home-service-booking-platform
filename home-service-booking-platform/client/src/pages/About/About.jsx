function About() {
  return (
    <section className="bg-gray-200 py-16 sm:py-20">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =========================
            PAGE HEADING
        ========================= */}

        <div className="text-center mb-14">

          <p className="text-orange-500 font-semibold tracking-wide uppercase text-sm mb-3">
            About TrueFix
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold text-blue-950">
            Making Home Services
            <span className="text-orange-500"> Simple</span>
          </h1>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto leading-7">
            Reliable home services, trusted professionals, and convenient
            bookings — all in one place.
          </p>

        </div>


        {/* =========================
            ABOUT CONTENT
        ========================= */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">


          {/* =========================
              LEFT CONTENT
          ========================= */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 sm:p-9 hover:shadow-lg transition-all duration-300">

            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-2xl mb-6">
              🏠
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 mb-5">
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


          {/* =========================
              FEATURES
          ========================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Trusted Services */}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">

              <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-2xl mb-4">
                🛠️
              </div>

              <h3 className="font-bold text-blue-950 text-lg">
                Trusted Services
              </h3>

              <p className="text-gray-600 text-sm mt-2 leading-6">
                Connect with professionals for essential home services.
              </p>

            </div>


            {/* Easy Booking */}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">

              <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-2xl mb-4">
                📅
              </div>

              <h3 className="font-bold text-blue-950 text-lg">
                Easy Booking
              </h3>

              <p className="text-gray-600 text-sm mt-2 leading-6">
                Select a service and schedule it at your convenience.
              </p>

            </div>


            {/* Transparent Pricing */}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">

              <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-2xl mb-4">
                💰
              </div>

              <h3 className="font-bold text-blue-950 text-lg">
                Transparent Pricing
              </h3>

              <p className="text-gray-600 text-sm mt-2 leading-6">
                View service prices before confirming your booking.
              </p>

            </div>


            {/* Convenient Management */}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">

              <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-2xl mb-4">
                📱
              </div>

              <h3 className="font-bold text-blue-950 text-lg">
                Convenient Management
              </h3>

              <p className="text-gray-600 text-sm mt-2 leading-6">
                Keep track of your bookings through your TrueFix account.
              </p>

            </div>

          </div>

        </div>


        {/* =========================
            MISSION
        ========================= */}

        <div className="relative overflow-hidden bg-blue-950 rounded-2xl shadow-lg p-8 sm:p-10 mt-10 text-white text-center">

          {/* Orange accent */}

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-orange-500 rounded-full"></div>

          <p className="text-orange-400 font-semibold text-sm uppercase tracking-wide mb-3">
            What We Believe
          </p>

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