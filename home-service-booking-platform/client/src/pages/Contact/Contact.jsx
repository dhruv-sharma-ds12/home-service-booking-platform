import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { sendContactMessage } from "../../services/contactService";

function Contact() {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSuccess("");
    setError("");
  };

  // ==========================================
  // SUBMIT FORM
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccess("");
    setError("");

    // ==========================================
    // LOGIN REQUIRED
    // ==========================================

    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: "/contact",
          message:
            "Please login to send a contact message.",
        },
      });

      return;
    }

    // ==========================================
    // VALIDATION
    // ==========================================

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    // ==========================================
    // PHONE VALIDATION
    // ==========================================

    const phone = formData.phone.replace(/\D/g, "");

    if (phone.length !== 10) {
      setError(
        "Please enter a valid 10-digit phone number."
      );

      return;
    }

    try {
      setLoading(true);

      await sendContactMessage({
        ...formData,
        phone,
      });

      setSuccess(
        "Your message has been sent successfully. Our team will contact you soon."
      );

      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        subject: "",
        message: "",
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(
        "Contact form error:",
        error
      );

      setError(
        error.message ||
          "Unable to send your message. Please try again."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <section className="bg-gray-200 py-16 sm:py-20">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="text-center mb-14">

          <p className="text-orange-500 font-semibold tracking-wide uppercase text-sm mb-3">
            Contact TrueFix
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold text-blue-950">
            We're Here to
            <span className="text-orange-500">
              {" "}Help
            </span>
          </h1>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto leading-7">
            Have a question or need help?
            Get in touch with our team
            and we'll be happy to assist you.
          </p>

        </div>

        {/* ======================================
            MAIN CONTENT
        ====================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

          {/* ======================================
              CONTACT INFORMATION
          ====================================== */}

          <div className="relative overflow-hidden bg-blue-950 text-white rounded-2xl p-8 sm:p-10 shadow-lg">

            <div className="absolute top-0 left-0 w-24 h-1 bg-orange-500 rounded-full"></div>

            <p className="text-orange-400 font-semibold text-sm uppercase tracking-wide mb-3">
              Get In Touch
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold mb-5">
              Let's Talk
            </h2>

            <p className="text-blue-100 leading-7 mb-8">
              Contact TrueFix for service enquiries,
              booking assistance, or any other questions.
            </p>

            <div className="space-y-6">

              {/* ADDRESS */}

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

              {/* PHONE */}

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

              {/* EMAIL */}

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

              {/* HOURS */}

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
                    8:00 AM - 9:00 PM
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* ======================================
              CONTACT FORM
          ====================================== */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 sm:p-9">

            <p className="text-orange-500 font-semibold text-sm uppercase tracking-wide mb-2">
              Send a Message
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 mb-7">
              How Can We Help?
            </h2>

            {/* LOGIN NOTICE */}

            {!isAuthenticated && (
              <div className="mb-5 bg-orange-50 border border-orange-200 text-orange-700 rounded-xl p-4">

                <div className="flex items-start gap-3">

                  <span className="text-lg">
                    🔐
                  </span>

                  <div>
                    <p className="font-semibold">
                      Login required
                    </p>

                    <p className="text-sm mt-1">
                      Please login before sending a
                      message to TrueFix.
                    </p>
                  </div>

                </div>

              </div>
            )}

            {/* SUCCESS */}

            {success && (
              <div className="mb-5 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4">

                <div className="flex items-start gap-3">

                  <span className="text-lg">
                    ✓
                  </span>

                  <p className="font-medium">
                    {success}
                  </p>

                </div>

              </div>
            )}

            {/* ERROR */}

            {error && (
              <div className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">

                <div className="flex items-start gap-3">

                  <span className="text-lg">
                    !
                  </span>

                  <p className="font-medium">
                    {error}
                  </p>

                </div>

              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* NAME */}

              <div>

                <label className="block font-medium text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
                />

              </div>

              {/* EMAIL */}

              <div>

                <label className="block font-medium text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
                />

              </div>

              {/* PHONE */}

              <div>

                <label className="block font-medium text-gray-700 mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  inputMode="numeric"
                  placeholder="Enter your 10-digit phone number"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
                />

              </div>

              {/* SUBJECT */}

              <div>

                <label className="block font-medium text-gray-700 mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What can we help you with?"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
                />

              </div>

              {/* MESSAGE */}

              <div>

                <label className="block font-medium text-gray-700 mb-2">
                  Message
                </label>

                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 outline-none resize-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
                />

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  bg-orange-500
                  text-white
                  py-3.5
                  rounded-xl
                  font-semibold
                  shadow-sm
                  hover:bg-orange-600
                  hover:shadow-lg
                  transition-all
                  duration-200
                  disabled:bg-gray-400
                  disabled:cursor-not-allowed
                "
              >
                {loading
                  ? "Sending..."
                  : isAuthenticated
                    ? "Send Message"
                    : "Login to Send Message"}
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Contact;