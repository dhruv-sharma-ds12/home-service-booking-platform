import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  ShieldCheck,
  IndianRupee,
} from "lucide-react";

import services from "../../data/services";

function ServiceDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const service = services.find(
    (item) => item.id === Number(id)
  );

  // =========================
  // SERVICE NOT FOUND
  // =========================

  if (!service) {
    return (
      <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

        <div className="text-center">

          <h1 className="text-3xl font-bold text-blue-900 mb-3">
            Service Not Found
          </h1>

          <p className="text-gray-600 mb-6">
            The service you are looking for does not exist.
          </p>

          <button
            onClick={() => navigate("/services")}
            className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
          >
            Browse Services
          </button>

        </div>

      </section>
    );
  }

  return (
    <section className="bg-gray-50 px-4 py-10">

      <div className="max-w-6xl mx-auto">

        {/* =========================
            BACK BUTTON
        ========================= */}

        <button
          onClick={() => navigate("/services")}
          className="flex items-center gap-2 text-blue-900 font-medium mb-6 hover:text-orange-500 transition"
        >
          <ArrowLeft size={18} />
          Back to Services
        </button>


        {/* =========================
            MAIN CARD
        ========================= */}

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* =========================
                IMAGE
            ========================= */}

            <div className="h-full min-h-[320px]">

              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full min-h-[320px] object-cover"
              />

            </div>


            {/* =========================
                DETAILS
            ========================= */}

            <div className="p-6 sm:p-8 lg:p-10">

              <p className="text-orange-500 font-semibold uppercase tracking-wide">
                TrueFix Service
              </p>

              <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mt-2">
                {service.name}
              </h1>

              <p className="text-gray-600 text-lg leading-7 mt-5">
                {service.description}
              </p>


              {/* Price */}

              <div className="flex items-center gap-2 mt-6">

                <IndianRupee
                  size={24}
                  className="text-orange-500"
                />

                <div>

                  <p className="text-sm text-gray-500">
                    Starting price
                  </p>

                  <p className="text-2xl font-bold text-orange-500">
                    ₹{service.price}
                  </p>

                </div>

              </div>


              {/* =========================
                  FEATURES
              ========================= */}

              <div className="border-t border-gray-100 my-7"></div>

              <h2 className="text-xl font-bold text-blue-900 mb-4">
                Why Choose This Service?
              </h2>

              <div className="space-y-4">

                <div className="flex items-center gap-3">

                  <CheckCircle
                    size={20}
                    className="text-orange-500 shrink-0"
                  />

                  <span className="text-gray-600">
                    Professional and reliable service
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <ShieldCheck
                    size={20}
                    className="text-orange-500 shrink-0"
                  />

                  <span className="text-gray-600">
                    Trusted service professionals
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <Clock
                    size={20}
                    className="text-orange-500 shrink-0"
                  />

                  <span className="text-gray-600">
                    Convenient appointment scheduling
                  </span>

                </div>

              </div>


              {/* =========================
                  BOOK BUTTON
              ========================= */}

              <button
                onClick={() =>
                  navigate("/book-service", {
                    state: {
                      service: service,
                    },
                  })
                }
                className="w-full mt-8 bg-orange-500 text-white px-6 py-3.5 rounded-xl font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                Book This Service
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ServiceDetails;