import { useNavigate } from "react-router-dom";

function CTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-orange-500 text-white py-20">
      <div className="max-w-5xl mx-auto text-center">

        <h2 className="text-4xl font-bold mb-6">
          Ready to Book a Service?
        </h2>

        <p className="mb-8 text-lg">
          Book trusted professionals for your home today.
        </p>

        <button
          onClick={() => navigate("/services")}
          className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold shadow hover:shadow-lg transition-transform hover:scale-105">
          Book Now
        </button>

      </div>
    </section>
  );
}

export default CTA;