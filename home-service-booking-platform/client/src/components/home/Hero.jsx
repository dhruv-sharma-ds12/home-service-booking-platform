import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/images/hero-image.png";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-blue-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center gap-12">

        <div>
          <p className="text-orange-400 font-semibold mb-3">
            YOUR HOME, OUR RESPONSIBILITY
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Book Trusted Home Services
            <span className="block text-orange-400">
              At Your Doorstep
            </span>
          </h1>

          <p className="text-lg text-blue-100 mb-8 max-w-xl">
            Professional experts for cleaning, repairs, maintenance
            and other household services.
          </p>

          <div className="space-y-3 mb-8">
            <p>✅ Verified Professionals</p>
            <p>✅ Quick & Reliable Service</p>
            <p>✅ Affordable Pricing</p>
            <p>✅ Pay After Service</p>
          </div>

          <button
            onClick={() => navigate("/services")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3 rounded-xl shadow hover:shadow-lg transition-transform hover:scale-105">
            Book a Service
          </button>
        </div>

        <div className="flex justify-center">
          <div className="bg-white p-3 rounded-2xl shadow-xl">
            <img
              src={heroImage}
              alt="TrueFix Home Services"
              className="w-full max-w-lg rounded-xl object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;