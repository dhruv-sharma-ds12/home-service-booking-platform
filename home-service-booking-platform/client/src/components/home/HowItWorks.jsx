function HowItWorks() {
  const steps = [
    "Choose Service",
    "Book Appointment",
    "Professional Arrives",
    "Job Completed",
    "Make Payment"
  ];

  return (
    <section className="py-14 sm:py-16 lg:py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-12 text-blue-900">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center justify-center"
            >

              {/* Step Card */}
              <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md text-center w-full max-w-xs hover:shadow-lg transition-transform hover:scale-105">

                <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center mx-auto mb-4 font-bold">
                  {index + 1}
                </div>

                <h3 className="font-semibold text-blue-900">
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