import { useNavigate } from "react-router-dom";

function CTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-orange-500 py-16 sm:py-20">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">

        {/* Heading */}
        <p className="text-orange-100 font-semibold uppercase tracking-wider text-sm mb-3">
          Get Started Today
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
          Ready to Book a Service?
        </h2>

        {/* Description */}
        <p className="text-orange-50 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          Book trusted professionals for your home and get reliable
          service at your doorstep.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/services")}
          className="group inline-flex items-center gap-2 bg-white text-blue-950 px-8 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          Book Now

          <span className="group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </button>

      </div>

    </section>
  );
}

export default CTA;