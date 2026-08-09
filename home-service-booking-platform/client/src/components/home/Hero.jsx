import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/images/hero-image.png";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-blue-950 text-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 items-center gap-12 lg:gap-16 min-h-[680px] py-16 lg:py-20">

          {/* =========================
              LEFT CONTENT
          ========================= */}

          <div className="max-w-xl">

            {/* Small Heading */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 mb-6">

              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>

              <p className="text-orange-300 text-sm font-semibold tracking-wide">
                YOUR HOME, OUR RESPONSIBILITY
              </p>

            </div>


            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6">

              Book Trusted

              <span className="block">
                Home Services
              </span>

              <span className="block text-orange-400">
                At Your Doorstep
              </span>

            </h1>


            {/* Description */}
            <p className="text-blue-100 text-lg leading-relaxed max-w-lg mb-8">
              Professional experts for cleaning, repairs, maintenance
              and other household services — whenever you need them.
            </p>


            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-9">

              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-500/15 text-orange-400 font-bold">
                  ✓
                </span>

                <span className="text-blue-50">
                  Verified Professionals
                </span>
              </div>


              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-500/15 text-orange-400 font-bold">
                  ✓
                </span>

                <span className="text-blue-50">
                  Quick & Reliable Service
                </span>
              </div>


              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-500/15 text-orange-400 font-bold">
                  ✓
                </span>

                <span className="text-blue-50">
                  Affordable Pricing
                </span>
              </div>


              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-500/15 text-orange-400 font-bold">
                  ✓
                </span>

                <span className="text-blue-50">
                  Pay After Service
                </span>
              </div>

            </div>


            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">

              <button
                onClick={() => navigate("/services")}
                className="group bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Book a Service

                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>

              </button>


              <button
                onClick={() => navigate("/services")}
                className="border border-white/30 hover:border-orange-400 hover:text-orange-400 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-300"
              >
                Explore Services
              </button>

            </div>


            {/* Trust Text */}
            <p className="text-sm text-blue-200 mt-6">
              Trusted professionals • Simple booking • Reliable service
            </p>

          </div>


          {/* =========================
              RIGHT IMAGE
          ========================= */}

          <div className="flex justify-center lg:justify-end">

            <div className="relative w-full max-w-xl">

              {/* Orange Glow */}
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl"></div>

              {/* Image Card */}
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/10 p-3 rounded-3xl shadow-2xl">

                <img
                  src={heroImage}
                  alt="TrueFix Home Services"
                  className="w-full rounded-2xl object-cover transition-transform duration-500 hover:scale-[1.02]"
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;