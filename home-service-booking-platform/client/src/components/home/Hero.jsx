import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/images/hero-image.png";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-blue-50">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0 pointer-events-none">

        {/* Orange glow */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-orange-300/30 blur-3xl" />

        {/* Blue glow */}
        <div className="absolute top-20 -right-40 w-[520px] h-[520px] rounded-full bg-blue-300/30 blur-3xl" />

        {/* Yellow glow */}
        <div className="absolute bottom-0 left-[35%] w-[300px] h-[300px] rounded-full bg-yellow-200/20 blur-3xl" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#172554 1px, transparent 1px), linear-gradient(90deg, #172554 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

      </div>


      {/* =====================================================
          DECORATIVE DOTS
      ===================================================== */}

      <div className="absolute top-24 right-[42%] w-3 h-3 bg-orange-400 rounded-full opacity-70" />

      <div className="absolute bottom-32 left-[7%] w-4 h-4 bg-blue-500 rounded-full opacity-50" />

      <div className="absolute top-44 left-[45%] w-2 h-2 bg-yellow-400 rounded-full opacity-80" />


      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 xl:gap-20 items-center min-h-[680px] py-16 sm:py-20 lg:py-24">


          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}

          <div className="max-w-2xl animate-[heroPopup_0.7s_ease-out_both]">

            {/* Eyebrow */}

            <div className="inline-flex items-center gap-3 mb-7 animate-[heroPopup_0.7s_ease-out_0.05s_both]">

              <span className="w-10 h-[3px] bg-orange-500 rounded-full" />

              <span className="text-sm font-bold tracking-[0.16em] text-orange-600 uppercase">
                Trusted Home Services
              </span>

            </div>


            {/* Main Heading */}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-extrabold text-blue-950 leading-[1.04] tracking-tight animate-[heroPopup_0.7s_ease-out_0.15s_both]">

              Your Home.

              <span className="block">
                Your Comfort.
              </span>

              <span className="block text-orange-500">
                Our Expertise.
              </span>

            </h1>


            {/* Description */}

            <p className="mt-7 max-w-xl text-base sm:text-lg text-gray-600 leading-8 animate-[heroPopup_0.7s_ease-out_0.25s_both]">

              From everyday cleaning to essential repairs,
              TrueFix connects you with reliable professionals
              who take care of your home — right at your doorstep.

            </p>


            {/* =====================================================
                BUTTONS
            ===================================================== */}

            <div className="flex flex-col sm:flex-row gap-4 mt-9 animate-[heroPopup_0.7s_ease-out_0.35s_both]">

              {/* Primary Button */}

              <button
                onClick={() => navigate("/services")}
                className="group inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-4 rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                <span>
                  Book a Service
                </span>

                <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>

              </button>


              {/* Secondary Button */}

              <button
                onClick={() => navigate("/services")}
                className="group inline-flex items-center justify-center gap-3 bg-white border-2 border-blue-100 hover:border-blue-900 text-blue-950 font-bold px-7 py-4 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >

                <span>
                  Explore Services
                </span>

                <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>

              </button>

            </div>


            {/* =====================================================
                TRUST POINTS
            ===================================================== */}

            <div className="flex flex-wrap items-center gap-x-7 gap-y-3 mt-8 animate-[heroPopup_0.7s_ease-out_0.45s_both]">

              {/* Verified */}

              <div className="flex items-center gap-2 text-sm text-gray-600">

                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 font-bold">
                  ✓
                </span>

                Verified Professionals

              </div>


              {/* Pricing */}

              <div className="flex items-center gap-2 text-sm text-gray-600">

                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-bold">
                  ✓
                </span>

                Transparent Pricing

              </div>


              {/* Reliability */}

              <div className="flex items-center gap-2 text-sm text-gray-600">

                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600 font-bold">
                  ✓
                </span>

                Reliable Service

              </div>

            </div>


            {/* =====================================================
                STATS
            ===================================================== */}

            <div className="flex items-center gap-7 sm:gap-10 mt-10 pt-7 border-t border-gray-200 max-w-lg animate-[heroPopup_0.7s_ease-out_0.55s_both]">

              {/* Services */}

              <div>

                <p className="text-2xl sm:text-3xl font-extrabold text-blue-950">
                  12+
                </p>

                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Home Services
                </p>

              </div>


              <div className="w-px h-10 bg-gray-200" />


              {/* Convenience */}

              <div>

                <p className="text-2xl sm:text-3xl font-extrabold text-orange-500">
                  100%
                </p>

                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Convenience
                </p>

              </div>


              <div className="w-px h-10 bg-gray-200" />


              {/* Booking */}

              <div>

                <p className="text-2xl sm:text-3xl font-extrabold text-blue-950">
                  24/7
                </p>

                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Booking
                </p>

              </div>

            </div>

          </div>


          {/* =====================================================
              RIGHT IMAGE
          ===================================================== */}

          <div className="relative flex justify-center lg:justify-end animate-[heroImagePopup_0.9s_ease-out_0.15s_both]">


            {/* Orange Decorative Circle */}

            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-orange-200/40" />


            {/* Blue Decorative Circle */}

            <div className="absolute -bottom-14 -left-14 w-56 h-56 rounded-full bg-blue-200/40" />


            {/* Yellow Decorative Shape */}

            <div className="absolute top-1/2 -right-10 w-20 h-20 bg-yellow-200/50 rounded-2xl rotate-12" />


            {/* =================================================
                IMAGE
            ================================================= */}

            <div className="relative w-full max-w-xl">


              {/* Top Accent */}

              <div className="absolute -top-4 left-10 right-10 h-2 bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 rounded-full" />


              {/* Image Card */}

              <div className="relative bg-white rounded-[2rem] p-3 shadow-[0_25px_70px_rgba(15,23,42,0.16)] border border-white">

                <div className="overflow-hidden rounded-[1.5rem]">

                  <img
                    src={heroImage}
                    alt="TrueFix home services"
                    className="w-full h-[360px] sm:h-[440px] lg:h-[510px] object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />

                </div>

              </div>


              {/* Bottom Accent */}

              <div className="absolute -bottom-4 right-10 w-28 h-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full" />

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          BOTTOM COLOR TRANSITION
      ===================================================== */}

      <div className="relative h-8">

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-yellow-300 to-blue-500 opacity-70" />

      </div>


      {/* =====================================================
          POPUP ANIMATIONS
      ===================================================== */}

      <style>
        {`
          @keyframes heroPopup {
            0% {
              opacity: 0;
              transform: translateY(28px) scale(0.97);
            }

            70% {
              opacity: 1;
              transform: translateY(-3px) scale(1.005);
            }

            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes heroImagePopup {
            0% {
              opacity: 0;
              transform: translateX(35px) scale(0.94);
            }

            70% {
              opacity: 1;
              transform: translateX(-3px) scale(1.01);
            }

            100% {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
      </style>

    </section>
  );
}

export default Hero;