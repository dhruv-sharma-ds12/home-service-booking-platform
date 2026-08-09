import services from "../../data/services";
import ServiceGrid from "../../components/service/ServiceGrid";

function Services() {
  return (
    <section className="bg-gray-200 py-16 sm:py-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =========================
            PAGE HEADER
        ========================= */}

        <div className="text-center mb-5">

          <p className="text-orange-500 font-semibold tracking-wide uppercase text-sm mb-3">
            Our Services
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold text-blue-950">
            All Home
            <span className="text-orange-500"> Services</span>
          </h1>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto leading-7">
            Choose from our range of reliable home services and book
            trusted professionals at your convenience.
          </p>

          {/* Small accent */}

          <div className="flex justify-center mt-6">
            <div className="w-16 h-1 bg-orange-500 rounded-full"></div>
          </div>

        </div>


        {/* =========================
            SERVICES
        ========================= */}

        <ServiceGrid services={services} />

      </div>

    </section>
  );
}

export default Services;