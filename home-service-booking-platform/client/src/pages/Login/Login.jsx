import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Eye,
  EyeOff,
  ArrowLeft,
  Mail,
  Lock,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login, loadingAuth } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

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

  // ==========================================
  // VALIDATION
  // ==========================================

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email = "Enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    return newErrors;
  };

  // ==========================================
  // HANDLE LOGIN
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple requests
    if (loadingAuth) {
      return;
    }

    // Validate form
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      // ==========================================
      // REAL LOGIN REQUEST
      // ==========================================

      const result = await login(
        formData.email.trim(),
        formData.password
      );

      // ==========================================
      // LOGIN FAILED
      // ==========================================

      if (!result.success) {
        setErrors({
          general:
            result.message ||
            "Invalid email or password.",
        });

        return;
      }

      // ==========================================
      // LOGIN SUCCESSFUL
      // ==========================================

      /*
       * ADMIN
       * -----
       * Admin goes to Admin Dashboard.
       */

      if (result.user?.role === "admin") {
        navigate("/admin", {
          replace: true,
        });

        return;
      }

      /*
       * CUSTOMER / NORMAL USER
       * ----------------------
       * Normal user goes to Home Page.
       */

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error("Login error:", error);

      setErrors({
        general:
          error?.message ||
          "Login failed. Please try again.",
      });
    }
  };

  return (
    <section className="min-h-screen bg-gray-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* ==========================================
            BACK TO HOME
        ========================================== */}

        <Link
          to="/"
          className="
            inline-flex
            items-center
            gap-2
            text-blue-900
            font-medium
            mb-6
            hover:text-orange-500
            transition-colors
            duration-300
          "
        >
          <ArrowLeft size={18} />

          Back to Home
        </Link>

        {/* ==========================================
            LOGIN CARD
        ========================================== */}

        <div
          className="
            bg-white
            rounded-2xl
            shadow-lg
            border
            border-gray-100
            p-6
            sm:p-8
          "
        >

          {/* ==========================================
              HEADING
          ========================================== */}

          <div className="text-center mb-8">

            <div
              className="
                inline-flex
                items-center
                justify-center
                w-14
                h-14
                rounded-full
                bg-orange-50
                mb-4
              "
            >
              <ShieldCheck
                className="text-orange-500"
                size={30}
              />
            </div>

            <h1
              className="
                text-3xl
                sm:text-4xl
                font-bold
                tracking-tight
              "
            >
              <span className="text-blue-950">
                True
              </span>

              <span className="text-orange-500">
                Fix
              </span>
            </h1>

            <h2
              className="
                text-2xl
                font-bold
                text-gray-800
                mt-4
              "
            >
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2">
              Login to manage your home services
            </p>
          </div>

          {/* ==========================================
              GENERAL ERROR
          ========================================== */}

          {errors.general && (
            <div
              className="
                mb-5
                bg-red-50
                border
                border-red-200
                text-red-600
                px-4
                py-3
                rounded-lg
                text-sm
              "
            >
              {errors.general}
            </div>
          )}

          {/* ==========================================
              LOGIN FORM
          ========================================== */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* ==========================================
                EMAIL
            ========================================== */}

            <div>

              <label
                htmlFor="email"
                className="
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  mb-2
                "
              >
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loadingAuth}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className={`
                    w-full
                    pl-11
                    pr-4
                    py-3
                    border
                    rounded-xl
                    outline-none
                    transition-all
                    duration-300

                    ${
                      errors.email
                        ? "border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    }

                    ${
                      loadingAuth
                        ? "bg-gray-100 cursor-not-allowed"
                        : "bg-white"
                    }
                  `}
                />

              </div>

              {errors.email && (
                <p
                  className="
                    text-red-500
                    text-sm
                    mt-1.5
                  "
                >
                  {errors.email}
                </p>
              )}

            </div>

            {/* ==========================================
                PASSWORD
            ========================================== */}

            <div>

              <label
                htmlFor="password"
                className="
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  mb-2
                "
              >
                Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
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
                  disabled={loadingAuth}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`
                    w-full
                    pl-11
                    pr-12
                    py-3
                    border
                    rounded-xl
                    outline-none
                    transition-all
                    duration-300

                    ${
                      errors.password
                        ? "border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    }

                    ${
                      loadingAuth
                        ? "bg-gray-100 cursor-not-allowed"
                        : "bg-white"
                    }
                  `}
                />

                {/* ======================================
                    SHOW / HIDE PASSWORD
                ====================================== */}

                <button
                  type="button"
                  disabled={loadingAuth}
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    p-1.5
                    text-gray-400
                    hover:text-blue-900
                    transition-colors
                    duration-200
                    disabled:opacity-50
                  "
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
                <p
                  className="
                    text-red-500
                    text-sm
                    mt-1.5
                  "
                >
                  {errors.password}
                </p>
              )}

            </div>

            {/* ==========================================
                FORGOT PASSWORD
            ========================================== */}

            <div className="flex justify-end">

              <button
                type="button"
                disabled={loadingAuth}
                onClick={() =>
                  alert(
                    "Forgot password feature will be added later."
                  )
                }
                className="
                  text-sm
                  text-blue-900
                  hover:text-orange-500
                  font-medium
                  transition-colors
                  duration-200
                  disabled:opacity-50
                "
              >
                Forgot Password?
              </button>

            </div>

            {/* ==========================================
                LOGIN BUTTON
            ========================================== */}

            <button
              type="submit"
              disabled={loadingAuth}
              className={`
                w-full
                text-white
                py-3.5
                rounded-xl
                font-semibold
                shadow-md
                transition-all
                duration-300
                flex
                items-center
                justify-center
                gap-2

                ${
                  loadingAuth
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                }
              `}
            >

              {loadingAuth ? (
                <>
                  {/* REAL API REQUEST SPINNER */}

                  <span
                    className="
                      w-5
                      h-5
                      border-2
                      border-white/40
                      border-t-white
                      rounded-full
                      animate-spin
                    "
                  />

                  <span>
                    Logging in...
                  </span>
                </>
              ) : (
                "Login"
              )}

            </button>

          </form>

          {/* ==========================================
              REGISTER LINK
          ========================================== */}

          <div
            className="
              text-center
              mt-7
              pt-6
              border-t
              border-gray-100
              text-gray-600
            "
          >

            <span>
              Don't have an account?{" "}
            </span>

            <Link
              to="/register"
              className="
                text-blue-900
                font-semibold
                hover:text-orange-500
                transition-colors
                duration-200
              "
            >
              Create an account
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Login;