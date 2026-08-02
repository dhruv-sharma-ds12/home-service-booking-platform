import {
  FaUserCheck,
  FaRupeeSign,
  FaBolt,
  FaMoneyBillWave
} from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaUserCheck className="text-4xl text-orange-500" />,
      title: "Verified Professionals",
      desc: "All service providers are background verified."
    },
    {
      icon: <FaRupeeSign className="text-4xl text-orange-500" />,
      title: "Affordable Pricing",
      desc: "Transparent pricing with no hidden charges."
    },
    {
      icon: <FaBolt className="text-4xl text-orange-500" />,
      title: "Fast Service",
      desc: "Quick booking and same-day availability."
    },
    {
      icon: <FaMoneyBillWave className="text-4xl text-orange-500" />,
      title: "Pay After Service",
      desc: "Pay conveniently in cash after your service is completed."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">
          Why Choose TrueFix?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (
        <div
         key={index}
         className="bg-gray-100 rounded-xl p-6 text-center shadow hover:shadow-lg transition-transform hover:scale-105"
        >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-2 text-blue-900">
                {feature.title}
              </h3>

              <p className="text-gray-600">
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