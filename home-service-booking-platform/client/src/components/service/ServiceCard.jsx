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
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col h-full"
    >

      {/* =========================
          SERVICE IMAGE
      ========================= */}

      <div className="relative h-52 overflow-hidden bg-gray-100">

        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      </div>


      {/* =========================
          CARD CONTENT
      ========================= */}

      <div className="p-5 sm:p-6 flex flex-col flex-1">

        <h3 className="text-2xl font-bold text-blue-950 mb-3">
          {service.name}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed min-h-[48px] mb-5">
          {service.description}
        </p>


        {/* Price */}
        <div className="mb-5">

          <span className="text-xl text-gray-500 block mb-1">
            Starting from
          </span>

          <p className="text-orange-500 font-bold text-xl">
            ₹{service.price}/-
          </p>

        </div>


        {/* Button */}
        <div className="mt-auto">

          <button
            onClick={handleViewDetails}
            className="w-full bg-orange-500 text-white font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:bg-orange-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            View Details
          </button>

        </div>

      </div>

    </div>
  );
}

export default ServiceCard;