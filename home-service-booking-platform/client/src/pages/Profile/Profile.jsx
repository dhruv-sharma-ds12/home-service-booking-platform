import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user, isAuthenticated } = useAuth();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  // Load authenticated user into profile
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((previousProfile) => ({
      ...previousProfile,
      [name]: value
    }));

    setMessage("");
  };

  const handleSave = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "truefixProfile",
      JSON.stringify(profile)
    );

    setIsEditing(false);
    setMessage("Profile updated successfully.");
  };

  if (!isAuthenticated || !user) {
    return (
      <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-md w-full">
          <h1 className="text-2xl font-bold text-blue-900">
            Please Login
          </h1>

          <p className="text-gray-600 mt-2">
            You need to login to view your profile.
          </p>

          <NavLink
            to="/login"
            className="inline-block mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Login
          </NavLink>
        </div>
      </section>
    );
  }

  const initials = profile.name
    .trim()
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <section className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6">

      <div className="max-w-4xl mx-auto">

        {/* Page Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 text-center mb-8">
          My Profile
        </h1>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">

          {/* Profile Header */}
          <div className="flex flex-col items-center mb-8">

            <div className="w-24 h-24 bg-blue-900 text-white rounded-full flex items-center justify-center text-3xl font-bold">
              {initials || "U"}
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mt-4 text-center">
              {profile.name || "User"}
            </h2>

            <p className="text-gray-500">
              {user.role === "admin"
                ? "TrueFix Administrator"
                : "TrueFix Customer"}
            </p>

          </div>

          {/* Success Message */}
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 rounded-lg p-3 mb-6">
              {message}
            </div>
          )}

          {/* Profile Form */}
          <form onSubmit={handleSave} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border rounded-lg px-4 py-3 outline-none ${
                  isEditing
                    ? "border-gray-300 bg-white focus:ring-2 focus:ring-orange-500"
                    : "border-gray-200 bg-gray-100"
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={profile.email}
                disabled
                className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-3 outline-none cursor-not-allowed"
              />

              <p className="text-xs text-gray-500 mt-1">
                Email cannot be changed here.
              </p>
            </div>

            {/* Phone */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!isEditing}
                maxLength="10"
                placeholder="Enter phone number"
                className={`w-full border rounded-lg px-4 py-3 outline-none ${
                  isEditing
                    ? "border-gray-300 bg-white focus:ring-2 focus:ring-orange-500"
                    : "border-gray-200 bg-gray-100"
                }`}
              />
            </div>

            {/* Address */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Address
              </label>

              <textarea
                name="address"
                value={profile.address}
                onChange={handleChange}
                disabled={!isEditing}
                rows="3"
                placeholder="Enter your address"
                className={`w-full border rounded-lg px-4 py-3 outline-none resize-none ${
                  isEditing
                    ? "border-gray-300 bg-white focus:ring-2 focus:ring-orange-500"
                    : "border-gray-200 bg-gray-100"
                }`}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">

              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(true);
                    setMessage("");
                  }}
                  className="w-full sm:w-auto bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);

                      setProfile({
                        name: user.name || "",
                        email: user.email || "",
                        phone: user.phone || "",
                        address: user.address || ""
                      });

                      setMessage("");
                    }}
                    className="w-full sm:w-auto bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </>
              )}

              {/* Customer: Book Service */}
              {user.role === "customer" && (
                <NavLink
                  to="/services"
                  className="w-full sm:w-auto text-center bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
                >
                  Book a Service
                </NavLink>
              )}

              {/* Customer: My Bookings */}
              {user.role === "customer" && (
                <NavLink
                  to="/my-bookings"
                  className="w-full sm:w-auto text-center bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  My Bookings
                </NavLink>
              )}

              {/* Admin: Dashboard */}
              {user.role === "admin" && (
                <NavLink
                  to="/admin"
                  className="w-full sm:w-auto text-center bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
                >
                  Admin Dashboard
                </NavLink>
              )}

            </div>

          </form>

        </div>

      </div>

    </section>
  );
}

export default Profile;