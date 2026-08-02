import ServiceCard from "./ServiceCard";

function ServiceGrid({ services }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
        />
      ))}
    </div>
  );
}

export default ServiceGrid;