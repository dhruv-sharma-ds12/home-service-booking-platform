import ServiceCard from "./ServiceCard";

function ServiceGrid({ services }) {
  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
        items-stretch
      "
    >
      {services.map((service) => (
        <ServiceCard
          key={service._id || service.id}
          service={service}
        />
      ))}
    </div>
  );
}

export default ServiceGrid;