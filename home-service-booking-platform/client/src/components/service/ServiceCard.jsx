import { useNavigate } from "react-router-dom";

function ServiceCard({ service }) {
  const navigate = useNavigate();

  // Supports both:
  // MongoDB services -> _id
  // Local services -> id
  const serviceId = service._id || service.id;

  // ==========================================
  // OPEN SERVICE DETAILS
  // ==========================================

  const handleCardClick = () => {
    navigate(`/services/${serviceId}`);
  };

  // ==========================================
  // VIEW DETAILS BUTTON
  // ==========================================

  const handleViewDetails = (event) => {
    event.stopPropagation();

    navigate(`/services/${serviceId}`);
  };

  // ==========================================
  // CARD
  // ==========================================

  return (
    <div
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          handleCardClick();
        }
      }}
      className="
        group
        bg-white
        rounded-2xl
        shadow-md
        overflow-hidden

        cursor-pointer

        flex
        flex-col

        h-full
        min-h-[500px]

        border
        border-transparent

        transition-all
        duration-300
        ease-out

        hover:-translate-y-2
        hover:scale-[1.02]
        hover:shadow-2xl
        hover:border-orange-200
      "
    >
      {/* ==========================================
          IMAGE
      ========================================== */}

      <div className="relative h-52 shrink-0 overflow-hidden bg-gray-100">
        {service.image ? (
          <img
            src={service.image}
            alt={service.name}
            className="
              w-full
              h-full
              object-cover

              transition-transform
              duration-500
              ease-out

              group-hover:scale-110
            "
          />
        ) : (
          <div
            className="
              w-full
              h-full
              flex
              items-center
              justify-center
              bg-gray-100
              text-6xl
            "
          >
            🛠️
          </div>
        )}

        {/* IMAGE OVERLAY */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-t
            from-black/40
            via-black/5
            to-transparent

            opacity-0
            group-hover:opacity-100

            transition-opacity
            duration-300
          "
        />
      </div>

      {/* ==========================================
          CARD CONTENT
      ========================================== */}

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* SERVICE NAME */}

        <h3
          className="
            text-xl
            sm:text-2xl
            font-bold
            text-blue-950

            mb-3

            leading-tight

            transition-colors
            duration-300

            group-hover:text-orange-500
          "
        >
          {service.name}
        </h3>

        {/* ==========================================
            DESCRIPTION
        ========================================== */}

        <p
          className="
            text-gray-600
            text-sm
            leading-relaxed

            min-h-[72px]

            line-clamp-3

            mb-5
          "
        >
          {service.description}
        </p>

        {/* ==========================================
            BOTTOM SECTION
        ========================================== */}

        <div className="mt-auto">
          {/* ==========================================
              PRICE
          ========================================== */}

          <div className="mb-5">
            <span
              className="
                text-sm
                text-gray-500
                block
                mb-1
              "
            >
              Starting from
            </span>

            <p
              className="
                text-orange-500
                font-bold
                text-xl
                leading-none
              "
            >
              ₹{service.price}/-
            </p>
          </div>

          {/* ==========================================
              VIEW DETAILS BUTTON
          ========================================== */}

          <button
            type="button"
            onClick={handleViewDetails}
            className="
              w-full

              bg-orange-500
              text-white

              font-semibold

              px-4
              py-3

              rounded-xl

              shadow-sm

              cursor-pointer

              transition-all
              duration-300

              hover:bg-orange-600
              hover:shadow-lg
              hover:-translate-y-0.5

              active:translate-y-0
              active:scale-[0.98]
            "
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;