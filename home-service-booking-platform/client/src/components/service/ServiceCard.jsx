import { useNavigate } from "react-router-dom";

function ServiceCard({ service }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/services/${service.id}`)}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer shadow hover:shadow-lg transition-transform hover:scale-105"
    >
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-semibold text-blue-900 mb-2">
          {service.name}
        </h3>

        <p className="text-gray-600 mb-3">
          {service.description}
        </p>

        <p className="text-orange-500 font-bold mb-4">
          Just At ₹{service.price}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/services/${service.id}`);
          }}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg cursor-pointer shadow hover:shadow-lg transition-transform hover:scale-105"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;