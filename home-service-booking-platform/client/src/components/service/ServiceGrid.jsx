import services from "../../data/services";
import ServiceGrid from "../service/ServiceGrid";

function ServicesPreview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-10">
          <p className="text-orange-500 font-semibold mb-2">
            OUR SERVICES
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
            Popular Home Services
          </h2>

          <p className="text-gray-600 mt-3">
            Reliable professionals for all your household needs.
          </p>
        </div>

        <ServiceGrid services={services} />

      </div>
    </section>
  );
}

export default ServicesPreview;