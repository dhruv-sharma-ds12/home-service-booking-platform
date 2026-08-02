import services from "../../data/services";
import ServiceGrid from "../../components/service/ServiceGrid";

function Services() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-10">
          <p className="text-orange-500 font-semibold">
            OUR SERVICES
          </p>

          <h1 className="text-4xl font-bold text-blue-900 mt-2">
            All Home Services
          </h1>

          <p className="text-gray-600 mt-3">
            Choose a service and book a trusted professional.
          </p>
        </div>

        <ServiceGrid services={services} />

      </div>
    </section>
  );
}

export default Services;