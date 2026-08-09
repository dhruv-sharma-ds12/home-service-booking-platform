import services from "../../data/services";
import ServiceCard from "../service/ServiceCard";

function ServicesPreview() {
  return (
    <section className="bg-gray-200 py-16 sm:py-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center mb-12">

          <p className="text-orange-500 font-semibold uppercase tracking-wider text-sm mb-2">
            Our Services
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-blue-950">
            Popular Services
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Professional home services delivered by trusted and
            verified professionals at your doorstep.
          </p>

        </div>


        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">

          {services.slice(0, 6).map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}

        </div>


        {/* View All Services */}
        <div className="flex justify-center mt-12">

          <a
            href="/services"
            className="inline-flex items-center gap-2 border-2 border-blue-950 text-blue-950 font-semibold px-6 py-3 rounded-xl hover:bg-blue-950 hover:text-white transition-all duration-300"
          >
            View All Services
            <span>→</span>
          </a>

        </div>

      </div>

    </section>
  );
}

export default ServicesPreview;