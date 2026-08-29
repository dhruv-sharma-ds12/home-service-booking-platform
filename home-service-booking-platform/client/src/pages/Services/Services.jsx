import { useEffect, useState } from "react";

import ServiceGrid from "../../components/service/ServiceGrid";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

import { getActiveServices } from "../../services/serviceService";

// Local fallback images
import homeCleaning from "../../assets/images/home-cleaning.jpg";
import acRepair from "../../assets/images/ac-repair.jpg";
import plumbing from "../../assets/images/plumbing.jpg";
import electrical from "../../assets/images/electrical.jpg";
import carpentry from "../../assets/images/carpentry.jpg";
import pestControl from "../../assets/images/pest-control.jpg";
import painting from "../../assets/images/painting.jpg";
import salonSpa from "../../assets/images/salon-spa.jpg";
import laundry from "../../assets/images/laundry.jpg";
import gardening from "../../assets/images/gardening.jpg";
import smartHome from "../../assets/images/smart-home-services.jpg";
import packersMovers from "../../assets/images/packers-movers.jpg";

// ==========================================
// LOCAL IMAGE FALLBACKS
// ==========================================

const serviceImages = {
  "Home Cleaning": homeCleaning,
  "AC & Appliance Repair": acRepair,
  "AC Repair": acRepair,
  Plumbing: plumbing,
  "Electrical Work": electrical,
  Electrical: electrical,
  Carpentry: carpentry,
  "Pest Control": pestControl,
  Painting: painting,
  "Salon & Spa at Home": salonSpa,
  "Salon & Spa": salonSpa,
  "Laundry & Ironing": laundry,
  Gardening: gardening,
  "Smart Home Services": smartHome,
  "Smart Home Installation": smartHome,
  "Packers & Movers": packersMovers,
};

// ==========================================
// ADD FALLBACK IMAGE
// ==========================================

const prepareServices = (services) => {
  return services.map((service) => ({
    ...service,

    image:
      service.image ||
      serviceImages[service.name] ||
      "",
  }));
};

// ==========================================
// COMPONENT
// ==========================================

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH ACTIVE SERVICES
  // ==========================================

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getActiveServices();

      const serviceList = Array.isArray(data)
        ? data
        : data.services || [];

      setServices(prepareServices(serviceList));
    } catch (error) {
      console.error("Fetch customer services error:", error);

      setError(
        error.message || "Failed to load services."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-200 py-20">
        <Loader text="Loading services..." />
      </section>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <section className="min-h-screen bg-gray-200 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <ErrorMessage
            message={error}
            onRetry={fetchServices}
          />
        </div>
      </section>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <section className="bg-gray-200 py-16 sm:py-20 min-h-screen">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* PAGE HEADER */}

        <div className="text-center mb-10">

          <p className="text-orange-500 font-semibold tracking-wide uppercase text-sm mb-3">
            Our Services
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold text-blue-950">
            All Home
            <span className="text-orange-500">
              {" "}Services
            </span>
          </h1>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto leading-7">
            Choose from our range of reliable home services and book
            trusted professionals at your convenience.
          </p>

          <div className="flex justify-center mt-6">
            <div className="w-16 h-1 bg-orange-500 rounded-full"></div>
          </div>

        </div>

        {/* SERVICES */}

        {services.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">

            <div className="text-5xl mb-4">
              🛠️
            </div>

            <h2 className="text-2xl font-bold text-blue-950">
              No Services Available
            </h2>

            <p className="text-gray-500 mt-2">
              Please check back later for available services.
            </p>

          </div>
        ) : (
          <ServiceGrid services={services} />
        )}

      </div>

    </section>
  );
}

export default Services;