import {
  FaUserCheck,
  FaRupeeSign,
  FaBolt,
  FaHandHoldingUsd,
} from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaUserCheck />,
      title: "Verified Professionals",
      desc: "All service providers are background verified.",
    },
    {
      icon: <FaRupeeSign />,
      title: "Affordable Pricing",
      desc: "Transparent pricing with no hidden charges.",
    },
    {
      icon: <FaBolt />,
      title: "Fast Service",
      desc: "Quick booking and same-day availability.",
    },
    {
      icon: <FaHandHoldingUsd />,
      title: "Pay After Service",
      desc: "Pay conveniently in cash after your service is completed.",
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center mb-12">

          <p className="text-orange-500 font-semibold uppercase tracking-wider text-sm mb-2">
            Why TrueFix
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-blue-950">
            Why Choose TrueFix?
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We make home services simple, reliable, and convenient
            from booking to completion.
          </p>

        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">

          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gray-50 border border-gray-100 rounded-2xl p-7 text-center shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >

              {/* Icon */}
              <div className="flex justify-center mb-5">

                <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center text-2xl group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>

              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-3 text-blue-950">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.desc}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;