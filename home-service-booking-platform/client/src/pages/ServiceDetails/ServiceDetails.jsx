import { useParams, useNavigate } from "react-router-dom";
import services from "../../data/services";

function ServiceDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const service = services.find(
    (item) => item.id === Number(id)
  );

  if (!service) {
    return <h1>Service not found</h1>;
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-5xl mx-auto px-6">

        <div className="bg-white rounded-xl shadow-md overflow-hidden">

          <img
            src={service.image}
            alt={service.name}
            className="w-full h-80 object-cover"
          />

          <div className="p-8">

            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              {service.name}
            </h1>

            <p className="text-gray-600 text-lg mb-6">
              {service.description}
            </p>

            <p className="text-2xl font-bold text-orange-500 mb-6">
              Starting from ₹{service.price}
            </p>

            <button
              onClick={() =>
                navigate("/bookings", {
                  state: { service: service }
                })
            }
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 shadow hover:shadow-lg transition-transform hover:scale-105"
            >
              Book Now
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ServiceDetails;