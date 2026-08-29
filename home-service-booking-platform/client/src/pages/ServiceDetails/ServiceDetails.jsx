import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  CheckCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";

import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

import { getActiveServices } from "../../services/serviceService";

// ==========================================
// LOCAL IMAGES
// ==========================================

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
// IMAGE MAP
// ==========================================

const serviceImages = {
  "Home Cleaning": homeCleaning,

  "AC & Appliance Repair": acRepair,
  "AC Repair": acRepair,

  Plumbing: plumbing,

  Electrical: electrical,
  "Electrical Work": electrical,

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
// PAGE
// ==========================================

function ServiceDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [service, setService] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==========================================
  // FETCH SERVICE
  // ==========================================

  const fetchService = async () => {
    try {
      setLoading(true);

      setError("");

      setService(null);

      // ========================================
      // GET ACTIVE SERVICES
      // ========================================

      const data = await getActiveServices();

      // ========================================
      // NORMALIZE RESPONSE
      // ========================================

      let serviceList = [];

      if (Array.isArray(data)) {
        serviceList = data;
      } else if (
        Array.isArray(data?.services)
      ) {
        serviceList = data.services;
      }

      console.log(
        "ServiceDetails - Route ID:",
        id
      );

      console.log(
        "ServiceDetails - Services:",
        serviceList
      );

      // ========================================
      // NO SERVICES
      // ========================================

      if (serviceList.length === 0) {
        throw new Error(
          "No active services are available."
        );
      }

      // ========================================
      // FIND SERVICE
      // ========================================

      let foundService = null;

      // ----------------------------------------
      // 1. TRY MONGODB _id
      // ----------------------------------------

      foundService = serviceList.find(
        (item) =>
          String(item?._id || "") ===
          String(id)
      );

      // ----------------------------------------
      // 2. TRY NORMAL id
      // ----------------------------------------

      if (!foundService) {
        foundService = serviceList.find(
          (item) =>
            String(item?.id || "") ===
            String(id)
        );
      }

      // ----------------------------------------
      // 3. SUPPORT NUMERIC URL
      //
      // /services/1 -> first service
      // /services/2 -> second service
      // /services/3 -> third service
      //
      // ----------------------------------------

      if (!foundService) {
        const numericId = Number(id);

        if (
          Number.isInteger(numericId) &&
          numericId >= 1 &&
          numericId <= serviceList.length
        ) {
          foundService =
            serviceList[numericId - 1];
        }
      }

      // ========================================
      // SERVICE STILL NOT FOUND
      // ========================================

      if (!foundService) {
        console.error(
          "Service could not be found."
        );

        console.error(
          "Route ID:",
          id
        );

        console.error(
          "Available services:",
          serviceList.map(
            (item, index) => ({
              position: index + 1,
              id: item?.id,
              _id: item?._id,
              name: item?.name,
            })
          )
        );

        throw new Error(
          "Service not found."
        );
      }

      // ========================================
      // ADD IMAGE
      // ========================================

      const serviceWithImage = {
        ...foundService,

        image:
          foundService.image ||
          serviceImages[
            foundService.name
          ] ||
          "",
      };

      console.log(
        "Selected service:",
        serviceWithImage
      );

      // ========================================
      // SAVE SERVICE
      // ========================================

      setService(
        serviceWithImage
      );

    } catch (error) {
      console.error(
        "Fetch service details error:",
        error
      );

      setError(
        error.message ||
          "Failed to load service details."
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FETCH WHEN ID CHANGES
  // ==========================================

  useEffect(() => {
    fetchService();
  }, [id]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <Loader
        text="Loading service..."
        fullScreen
      />
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (
    error ||
    !service
  ) {
    return (
      <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

        <div className="max-w-lg w-full">

          {error && (
            <ErrorMessage
              message={error}
              onRetry={fetchService}
            />
          )}

          <button
            type="button"
            onClick={() =>
              navigate("/services")
            }
            className="
              mt-5
              w-full
              bg-orange-500
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              hover:bg-orange-600
              transition
              cursor-pointer
            "
          >
            Browse Services
          </button>

        </div>

      </section>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <section className="bg-gray-50 px-4 py-10 min-h-screen">

      <div className="max-w-6xl mx-auto">

        {/* ======================================
            BACK BUTTON
        ====================================== */}

        <button
          type="button"
          onClick={() =>
            navigate("/services")
          }
          className="
            flex
            items-center
            gap-2
            text-blue-900
            font-medium
            mb-6
            hover:text-orange-500
            transition
            cursor-pointer
          "
        >
          <ArrowLeft size={18} />

          Back to Services
        </button>

        {/* ======================================
            MAIN CARD
        ====================================== */}

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ==================================
                IMAGE
            ================================== */}

            <div className="min-h-[320px] bg-gray-100">

              {service.image ? (

                <img
                  src={service.image}
                  alt={service.name}
                  className="
                    w-full
                    h-full
                    min-h-[320px]
                    object-cover
                  "
                />

              ) : (

                <div className="
                  w-full
                  h-full
                  min-h-[320px]
                  flex
                  items-center
                  justify-center
                  text-6xl
                ">
                  🛠️
                </div>

              )}

            </div>

            {/* ==================================
                DETAILS
            ================================== */}

            <div className="p-6 sm:p-8 lg:p-10">

              <p className="
                text-orange-500
                font-semibold
                uppercase
                tracking-wide
              ">
                TrueFix Service
              </p>

              <h1 className="
                text-3xl
                sm:text-4xl
                font-bold
                text-blue-900
                mt-2
              ">
                {service.name}
              </h1>

              {/* DESCRIPTION */}

              <p className="
                text-gray-600
                text-lg
                leading-7
                mt-5
              ">
                {service.description ||
                  "Professional and reliable home service from TrueFix."}
              </p>

              {/* ==================================
                  PRICE
              ================================== */}

              <div className="mt-6">

                <p className="
                  text-sm
                  text-gray-500
                ">
                  Starting price
                </p>

                <p className="
                  text-2xl
                  font-bold
                  text-orange-500
                ">
                  ₹{service.price}
                </p>

              </div>

              <div className="
                border-t
                border-gray-100
                my-7
              " />

              {/* ==================================
                  FEATURES
              ================================== */}

              <h2 className="
                text-xl
                font-bold
                text-blue-900
                mb-4
              ">
                Why Choose This Service?
              </h2>

              <div className="space-y-4">

                {/* PROFESSIONAL */}

                <div className="
                  flex
                  items-center
                  gap-3
                ">

                  <CheckCircle
                    size={20}
                    className="
                      text-orange-500
                      shrink-0
                    "
                  />

                  <span className="text-gray-600">
                    Professional and reliable service
                  </span>

                </div>

                {/* TRUSTED */}

                <div className="
                  flex
                  items-center
                  gap-3
                ">

                  <ShieldCheck
                    size={20}
                    className="
                      text-orange-500
                      shrink-0
                    "
                  />

                  <span className="text-gray-600">
                    Trusted service professionals
                  </span>

                </div>

                {/* APPOINTMENT */}

                <div className="
                  flex
                  items-center
                  gap-3
                ">

                  <Clock
                    size={20}
                    className="
                      text-orange-500
                      shrink-0
                    "
                  />

                  <span className="text-gray-600">
                    Convenient appointment scheduling
                  </span>

                </div>

              </div>

              {/* ==================================
                  BOOK SERVICE
              ================================== */}

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/book-service",
                    {
                      state: {
                        service,
                      },
                    }
                  )
                }
                className="
                  w-full
                  mt-8
                  bg-orange-500
                  text-white
                  px-6
                  py-3.5
                  rounded-xl
                  font-semibold
                  shadow-md
                  hover:bg-orange-600
                  hover:shadow-lg
                  hover:-translate-y-0.5
                  transition-all
                  duration-300
                  cursor-pointer
                "
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