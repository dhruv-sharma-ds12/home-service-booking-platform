function ServiceCard({ service }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">

      <img
        src={service.image}
        alt={service.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">

        <h3 className="text-xl font-bold text-blue-900">
          {service.name}
        </h3>

        <p className="text-gray-600 mt-2">
          {service.description}
        </p>

        <p className="text-orange-500 font-bold mt-4">
          Just at ₹{service.price}
        </p>

        <button className="mt-4 bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600">
          Book Now
        </button>

      </div>

    </div>
  );
}

export default ServiceCard;