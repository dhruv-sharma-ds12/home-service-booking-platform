function HowItWorks() {
  const steps = [
    "Choose Service",
    "Book Appointment",
    "Professional Arrives",
    "Job Completed",
    "Make Payment"
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">
          How It Works
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">

          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center"
            >

              {/* Step Card */}
              <div className="bg-white p-6 rounded-xl shadow-md text-center w-48">

                <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center mx-auto mb-4 font-bold">
                  {index + 1}
                </div>

                <h3 className="font-semibold text-blue-900">
                  {step}
                </h3>

              </div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden md:block text-orange-500 text-3xl font-bold mx-2">
                  →
                </div>
              )}

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;