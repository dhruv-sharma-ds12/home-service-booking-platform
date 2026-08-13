function Contact() {
  return (
    <section className="bg-gray-200 py-16 sm:py-20">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =========================
            HEADER
        ========================= */}

        <div className="text-center mb-14">

          <p className="text-orange-500 font-semibold tracking-wide uppercase text-sm mb-3">
            Contact TrueFix
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold text-blue-950">
            We're Here to
            <span className="text-orange-500"> Help</span>
          </h1>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto leading-7">
            Have a question or need help? Get in touch with our team
            and we'll be happy to assist you.
          </p>

        </div>


        {/* =========================
            MAIN CONTENT
        ========================= */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">


          {/* =========================
              CONTACT INFORMATION
          ========================= */}

          <div className="relative overflow-hidden bg-blue-950 text-white rounded-2xl p-8 sm:p-10 shadow-lg">

            {/* Orange accent */}

            <div className="absolute top-0 left-0 w-24 h-1 bg-orange-500 rounded-full"></div>

            <p className="text-orange-400 font-semibold text-sm uppercase tracking-wide mb-3">
              Get In Touch
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold mb-5">
              Let's Talk
            </h2>

            <p className="text-blue-100 leading-7 mb-8">
              Contact TrueFix for service enquiries, booking assistance,
              or any other questions.
            </p>


            {/* Contact Details */}

            <div className="space-y-6">


              {/* Address */}

              <div className="flex gap-4 items-start">

                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-xl shrink-0">
                  📍
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Address
                  </h3>

                  <p className="text-blue-100 mt-1">
                    Karnal, Haryana, India
                  </p>
                </div>

              </div>


              {/* Phone */}

              <div className="flex gap-4 items-start">

                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-xl shrink-0">
                  📞
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Phone
                  </h3>

                  <p className="text-blue-100 mt-1">
                    +91 83073 57247
                  </p>

                  <p className="text-blue-100 mt-1">
                    +91 98965 57247
                  </p>
                </div>

              </div>


              {/* Email */}

              <div className="flex gap-4 items-start">

                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-xl shrink-0">
                  ✉️
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Email
                  </h3>

                  <p className="text-blue-100 mt-1 break-all">
                    support@truefix.com
                  </p>
                </div>

              </div>


              {/* Working Hours */}

              <div className="flex gap-4 items-start">

                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-xl shrink-0">
                  🕐
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Working Hours
                  </h3>

                  <p className="text-blue-100 mt-1">
                    Monday - Sunday
                  </p>

                  <p className="text-blue-100">
                    8:00 AM - 8:00 PM
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* =========================
              CONTACT FORM
          ========================= */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 sm:p-9 hover:shadow-lg transition-all duration-300">

            <p className="text-orange-500 font-semibold text-sm uppercase tracking-wide mb-2">
              Send a Message
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 mb-7">
              How Can We Help?
            </h2>

            <form className="space-y-5">


              {/* Name */}

              <div>

                <label className="block font-medium text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-200"
                />

              </div>


              {/* Email */}

              <div>

                <label className="block font-medium text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-200"
                />

              </div>


              {/* Phone */}

              <div>

                <label className="block font-medium text-gray-700 mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-200"
                />

              </div>


              {/* Subject */}

              <div>

                <label className="block font-medium text-gray-700 mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="What can we help you with?"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-200"
                />

              </div>


              {/* Message */}

              <div>

                <label className="block font-medium text-gray-700 mb-2">
                  Message
                </label>

                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 outline-none resize-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-200"
                ></textarea>

              </div>


              {/* Button */}

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3.5 rounded-xl font-semibold shadow-sm hover:bg-orange-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Contact;