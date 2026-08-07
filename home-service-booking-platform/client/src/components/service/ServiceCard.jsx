import { useNavigate } from "react-router-dom";

function ServiceCard({ service }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/services/${service.id}`);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/services/${service.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-transform hover:scale-105 h-full flex flex-col"
    >

      {/* Service Image */}
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-48 object-cover"
      />

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1">

        <h3 className="text-2xl font-semibold text-blue-900 mb-2">
          {service.name}
        </h3>

        <p className="text-gray-600 mb-3 min-h-[48px]">
          {service.description}
        </p>

        <p className="text-orange-500 font-bold mb-4 text-xl">
          Just At ₹{service.price}
        </p>

        <div className="mt-auto">
          <button
            onClick={handleViewDetails}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg cursor-pointer shadow hover:bg-orange-600 hover:shadow-lg transition-transform hover:scale-105"
          >
            View Details
          </button>
        </div>

      </div>
    </div>
  );
}

export default ServiceCard;