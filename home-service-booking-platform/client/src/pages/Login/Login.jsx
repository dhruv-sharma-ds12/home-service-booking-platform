import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Connect Login page to AuthContext
    const result = login(
      formData.email,
      formData.password
    );

    if (result.success) {
      // Admin goes to Admin Dashboard
      if (result.user.role === "admin") {
        navigate("/admin");
      } else {
        // Customer goes to Home
        navigate("/");
      }
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-md">

        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-900 font-medium mb-6 hover:text-orange-500 transition"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">

          {/* Heading */}
          <div className="text-center mb-8">

            <h1 className="text-3xl sm:text-4xl font-bold">
              <span className="text-blue-900">True</span>
              <span className="text-orange-500">Fix</span>
            </h1>

            <h2 className="text-2xl font-bold text-gray-800 mt-4">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2">
              Login to manage your home services
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>

              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 border rounded-lg outline-none transition ${
                  errors.email
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                }`}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}

            </div>

            {/* Password */}
            <div>

              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>

              <div className="relative">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 pr-12 border rounded-lg outline-none transition ${
                    errors.password
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-900"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password}
                </p>
              )}

            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">

              <button
                type="button"
                onClick={() =>
                  alert(
                    "Forgot password feature will be added later."
                  )
                }
                className="text-sm text-blue-900 hover:text-orange-500 font-medium"
              >
                Forgot Password?
              </button>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-md hover:shadow-lg"
            >
              Login
            </button>

          </form>

          {/* Register */}
          <div className="text-center mt-6 text-gray-600">

            <span>Don't have an account? </span>

            <Link
              to="/register"
              className="text-blue-900 font-semibold hover:text-orange-500"
            >
              Register
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Login;