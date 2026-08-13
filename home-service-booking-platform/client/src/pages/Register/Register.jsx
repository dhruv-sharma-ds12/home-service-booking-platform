import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Eye,
  EyeOff,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Lock,
  UserPlus,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      general: "",
    }));
  };

  // =========================
  // VALIDATION
  // =========================

  const validateForm = () => {
    const newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name =
        "Name must be at least 3 characters";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email =
        "Enter a valid email address";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Enter a valid 10-digit phone number";
    }

    // Password
    if (!formData.password) {
      newErrors.password =
        "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    // Confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (
      formData.password !==
      formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    return newErrors;
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      // Registration failed
      if (!result.success) {
        setErrors({
          general:
            result.message ||
            "Registration failed.",
        });

        return;
      }

      // Registration successful
      navigate("/login");
    } catch (error) {
      setErrors({
        general:
          error.message ||
          "Registration failed. Please try again.",
      });
    }
  };

  return (
    <section className="min-h-screen bg-gray-200 flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-md">

        {/* BACK TO HOME */}

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-900 font-medium mb-6 hover:text-orange-500 transition-colors duration-300"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* REGISTER CARD */}

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">

          {/* HEADING */}

          <div className="text-center mb-8">

            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-50 mb-4">
              <UserPlus
                className="text-orange-500"
                size={30}
              />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">

              <span className="text-blue-950">
                True
              </span>

              <span className="text-orange-500">
                Fix
              </span>

            </h1>

            <h2 className="text-2xl font-bold text-gray-800 mt-4">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2">
              Create your TrueFix account
            </p>

          </div>

          {/* GENERAL ERROR */}

          {errors.general && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {errors.general}
            </div>
          )}

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* NAME */}

            <div>

              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Full Name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl outline-none transition-all duration-300 ${
                    errors.name
                      ? "border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  }`}
                />

              </div>

              {errors.name && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.name}
                </p>
              )}

            </div>

            {/* EMAIL */}

            <div>

              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl outline-none transition-all duration-300 ${
                    errors.email
                      ? "border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  }`}
                />

              </div>

              {errors.email && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.email}
                </p>
              )}

            </div>

            {/* PHONE */}

            <div>

              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Phone Number
              </label>

              <div className="relative">

                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter 10-digit phone number"
                  maxLength="10"
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl outline-none transition-all duration-300 ${
                    errors.phone
                      ? "border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  }`}
                />

              </div>

              {errors.phone && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.phone}
                </p>
              )}

            </div>

            {/* PASSWORD */}

            <div>

              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full pl-11 pr-12 py-3 border rounded-xl outline-none transition-all duration-300 ${
                    errors.password
                      ? "border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-blue-900 transition-colors duration-200"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.password}
                </p>
              )}

            </div>

            {/* CONFIRM PASSWORD */}

            <div>

              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Confirm Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={`w-full pl-11 pr-12 py-3 border rounded-xl outline-none transition-all duration-300 ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-blue-900 transition-colors duration-200"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.confirmPassword}
                </p>
              )}

            </div>

            {/* REGISTER BUTTON */}

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3.5 rounded-xl font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Create Account
            </button>

          </form>

          {/* LOGIN LINK */}

          <div className="text-center mt-7 pt-6 border-t border-gray-100 text-gray-600">

            <span>
              Already have an account?{" "}
            </span>

            <Link
              to="/login"
              className="text-blue-900 font-semibold hover:text-orange-500 transition-colors duration-200"
            >
              Login
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Register;