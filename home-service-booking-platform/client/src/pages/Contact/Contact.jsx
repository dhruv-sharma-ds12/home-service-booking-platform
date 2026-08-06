function Contact() {
  return (
    <section className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold text-blue-900">
            Contact Us
          </h1>

          <p className="text-gray-600 mt-3">
            Have a question or need help? We're here to help.
          </p>

        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Contact Information */}
          <div className="bg-blue-900 text-white rounded-2xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              Get In Touch
            </h2>

            <p className="text-blue-100 mb-8">
              Contact TrueFix for service enquiries, booking
              assistance, or any other questions.
            </p>

            <div className="space-y-6">

              <div>
                <h3 className="font-semibold text-lg">
                  📍 Address
                </h3>

                <p className="text-blue-100 mt-1">
                  Karnal, Haryana, India
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  📞 Phone
                </h3>

                <p className="text-blue-100 mt-1">
                  +91 83073 57247
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  ✉️ Email
                </h3>

                <p className="text-blue-100 mt-1">
                  support@truefix.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  🕐 Working Hours
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

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-md p-8">

            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              Send Us a Message
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
                ></textarea>

              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
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