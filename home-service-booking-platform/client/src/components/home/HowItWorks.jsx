function HowItWorks() {
  const steps = [
    "Choose Service",
    "Book Appointment",
    "Professional Arrives",
    "Job Completed",
    "Make Payment",
  ];

  return (
    <section className="bg-gray-100 py-16 sm:py-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center mb-12">

          <p className="text-orange-500 font-semibold uppercase tracking-wider text-sm mb-2">
            Simple Process
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-blue-950">
            How It Works
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Book your required home service in just a few simple steps.
          </p>

        </div>


        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative"
            >

              {/* Step Card */}
              <div className="group bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full">

                {/* Number */}
                <div className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center mx-auto mb-5 text-lg font-bold shadow-md group-hover:bg-blue-950 transition-colors duration-300">
                  {index + 1}
                </div>

                {/* Step */}
                <h3 className="font-semibold text-blue-950 text-lg">
                  {step}
                </h3>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;