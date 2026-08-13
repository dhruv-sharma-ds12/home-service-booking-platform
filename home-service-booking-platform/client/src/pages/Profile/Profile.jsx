import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
  updateMyProfile,
} from "../../services/userService";

function Profile() {
  const {
    user,
    isAuthenticated,
    updateUser,
  } = useAuth();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [saving, setSaving] = useState(false);


  // ==========================================
  // LOAD USER DATA
  // ==========================================

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);


  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setProfile((previousProfile) => ({
      ...previousProfile,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };


  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const handleSave = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    // Basic validation
    if (!profile.name.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!profile.phone.trim()) {
      setError("Phone number is required.");
      return;
    }

    try {
      setSaving(true);

      const data = await updateMyProfile({
        name: profile.name.trim(),
        phone: profile.phone.trim(),
        address: profile.address.trim(),
      });

      // Update AuthContext
      updateUser(data.user);

      // Update local page state
      setProfile({
        name: data.user.name || "",
        email: data.user.email || "",
        phone: data.user.phone || "",
        address: data.user.address || "",
      });

      setIsEditing(false);

      setMessage(
        "Profile updated successfully."
      );
    } catch (error) {
      console.error(
        "Profile update error:",
        error
      );

      setError(
        error.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };


  // ==========================================
  // CANCEL EDITING
  // ==========================================

  const handleCancel = () => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }

    setIsEditing(false);

    setMessage("");

    setError("");
  };


  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  if (!isAuthenticated || !user) {
    return (
      <section className="min-h-screen bg-gray-200 flex items-center justify-center px-4">

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


  // ==========================================
  // USER INITIALS
  // ==========================================

  const initials = profile.name
    .trim()
    .split(" ")
    .filter(
      (word) => word.length > 0
    )
    .map(
      (word) => word[0]
    )
    .join("")
    .toUpperCase();


  // ==========================================
  // PROFILE PAGE
  // ==========================================

  return (
    <section className="min-h-screen bg-gray-200 py-12 px-4 sm:px-6">

      <div className="max-w-4xl mx-auto">

        {/* ================================= */}
        {/* PAGE HEADING */}
        {/* ================================= */}

        <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 text-center mb-8">
          My Profile
        </h1>


        {/* ================================= */}
        {/* PROFILE CARD */}
        {/* ================================= */}

        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">


          {/* ================================= */}
          {/* PROFILE HEADER */}
          {/* ================================= */}

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


          {/* ================================= */}
          {/* SUCCESS MESSAGE */}
          {/* ================================= */}

          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 rounded-lg p-3 mb-6">
              {message}
            </div>
          )}


          {/* ================================= */}
          {/* ERROR MESSAGE */}
          {/* ================================= */}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 rounded-lg p-3 mb-6">
              {error}
            </div>
          )}


          {/* ================================= */}
          {/* PROFILE FORM */}
          {/* ================================= */}

          <form
            onSubmit={handleSave}
            className="space-y-5"
          >


            {/* ================================= */}
            {/* NAME */}
            {/* ================================= */}

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
                placeholder="Enter your full name"
                className={`w-full border rounded-lg px-4 py-3 outline-none ${
                  isEditing
                    ? "border-gray-300 bg-white focus:ring-2 focus:ring-orange-500"
                    : "border-gray-200 bg-gray-100"
                }`}
              />

            </div>


            {/* ================================= */}
            {/* EMAIL */}
            {/* ================================= */}

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


            {/* ================================= */}
            {/* PHONE */}
            {/* ================================= */}

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


            {/* ================================= */}
            {/* ADDRESS */}
            {/* ================================= */}

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


            {/* ================================= */}
            {/* BUTTONS */}
            {/* ================================= */}

            <div className="flex flex-col sm:flex-row gap-4 pt-2">


              {/* EDIT MODE OFF */}
              {!isEditing ? (

                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(true);
                    setMessage("");
                    setError("");
                  }}
                  className="w-full sm:w-auto bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  Edit Profile
                </button>

              ) : (

                <>

                  {/* SAVE */}

                  <button
                    type="submit"
                    disabled={saving}
                    className={`w-full sm:w-auto text-white px-6 py-3 rounded-lg font-semibold transition ${
                      saving
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600"
                    }`}
                  >

                    {saving
                      ? "Saving..."
                      : "Save Changes"}

                  </button>


                  {/* CANCEL */}

                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={saving}
                    className="w-full sm:w-auto bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>

                </>

              )}


              {/* ================================= */}
              {/* CUSTOMER BUTTONS */}
              {/* ================================= */}

              {user.role === "customer" && (

                <>

                  <NavLink
                    to="/services"
                    className="w-full sm:w-auto text-center bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
                  >
                    Book a Service
                  </NavLink>


                  <NavLink
                    to="/my-bookings"
                    className="w-full sm:w-auto text-center bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                    My Bookings
                  </NavLink>

                </>

              )}


              {/* ================================= */}
              {/* ADMIN BUTTON */}
              {/* ================================= */}

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