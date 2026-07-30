function HowItWorks() {
  const steps = [
    "Choose a Service",
    "Select Date & Time",
    "Professional Visits",
    "Service Completed",
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-10">
          How It Works
        </h2>

        <div className="grid grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={step}
              className="bg-white p-6 rounded-xl shadow text-center"
            >
              <h3 className="text-2xl font-bold text-blue-600">
                {index + 1}
              </h3>
              <p className="mt-3">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;