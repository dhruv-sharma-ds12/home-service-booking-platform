function ServicesPreview() {
  const services = [
    "Electrician",
    "Plumber",
    "AC Repair",
    "House Cleaning",
    "Carpenter",
    "Painting",
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-10">
          Popular Services
        </h2>

        <div className="grid grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service}
              className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold">{service}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesPreview;