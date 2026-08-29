import {
  useEffect,
  useState,
} from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
  updateMyProfile,
  changePassword,
  deleteMyAccount,
} from "../../services/userService";

function Profile() {
  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    updateUser,
    logout,
    loadingUser,
    loadingAuth,
  } = useAuth();

  // ==========================================
  // PROFILE STATE
  // ==========================================

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // PASSWORD STATE
  // ==========================================

  const [isChangingPassword, setIsChangingPassword] =
    useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [changingPassword, setChangingPassword] =
    useState(false);

  const [passwordMessage, setPasswordMessage] =
    useState("");

  const [passwordError, setPasswordError] =
    useState("");

  // ==========================================
  // DELETE ACCOUNT STATE
  // ==========================================

  const [deletingAccount, setDeletingAccount] =
    useState(false);

  const [showDeleteWarning, setShowDeleteWarning] =
    useState(false);

  const [showPermanentDelete, setShowPermanentDelete] =
    useState(false);

  const [deleteError, setDeleteError] =
    useState("");

  // ==========================================
  // LOGOUT STATE
  // ==========================================

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

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
  // RESET PASSWORD FORM
  // ==========================================

  const resetPasswordForm = () => {
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);

    setPasswordMessage("");
    setPasswordError("");
  };

  // ==========================================
  // OPEN PASSWORD SECTION
  // ==========================================

  const handleOpenChangePassword = () => {
    resetPasswordForm();
    setIsChangingPassword(true);
  };

  // ==========================================
  // CLOSE PASSWORD SECTION
  // ==========================================

  const handleCloseChangePassword = () => {
    resetPasswordForm();
    setIsChangingPassword(false);
  };

  // ==========================================
  // PROFILE INPUT
  // ==========================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  // ==========================================
  // PHONE VALIDATION
  // ==========================================

  const validatePhone = (phone) => {
    return /^[0-9]{10}$/.test(phone);
  };

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const handleSave = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const name = profile.name.trim();

    const phone = profile.phone.replace(
      /\D/g,
      ""
    );

    const address = profile.address.trim();

    if (!name) {
      setError("Full name is required.");
      return;
    }

    if (!validatePhone(phone)) {
      setError(
        "Please enter a valid 10-digit phone number."
      );
      return;
    }

    try {
      setSaving(true);

      const data = await updateMyProfile({
        name,
        phone,
        address,
      });

      if (!data?.user) {
        throw new Error(
          "Updated user information was not returned by the server."
        );
      }

      updateUser(data.user);

      setProfile({
        name: data.user.name || "",
        email: data.user.email || "",
        phone: data.user.phone || "",
        address: data.user.address || "",
      });

      setIsEditing(false);

      setMessage(
        "Your profile has been updated successfully."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    } catch (error) {
      console.error(
        "Profile update error:",
        error
      );

      setError(
        error.message ||
          "Failed to update profile."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // CANCEL PROFILE EDITING
  // ==========================================

  const handleCancel = () => {
    if (!user) return;

    setProfile({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
    });

    setIsEditing(false);

    setMessage("");
    setError("");
  };

  // ==========================================
  // PASSWORD INPUT
  // ==========================================

  const handlePasswordChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setPasswords((previous) => ({
      ...previous,
      [name]: value,
    }));

    setPasswordMessage("");
    setPasswordError("");
  };

  // ==========================================
  // CHANGE PASSWORD
  // ==========================================

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setPasswordMessage("");
    setPasswordError("");

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = passwords;

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setPasswordError(
        "Please fill in all password fields."
      );
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError(
        "New password must be at least 6 characters."
      );
      return;
    }

    if (
      newPassword !== confirmPassword
    ) {
      setPasswordError(
        "New password and confirm password do not match."
      );
      return;
    }

    if (
      currentPassword === newPassword
    ) {
      setPasswordError(
        "New password must be different from your current password."
      );
      return;
    }

    try {
      setChangingPassword(true);

      const data = await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      const successMessage =
        data.message ||
        "Password changed successfully.";

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);

      setPasswordError("");
      setPasswordMessage(successMessage);

      setIsChangingPassword(true);

    } catch (error) {
      console.error(
        "Change password error:",
        error
      );

      setPasswordError(
        error.message ||
          "Failed to change password."
      );

    } finally {
      setChangingPassword(false);
    }
  };

  // ==========================================
  // LOGOUT - OPEN MODAL
  // ==========================================

  const handleLogout = () => {
    if (loadingAuth) {
      return;
    }

    setShowLogoutModal(true);
  };

  // ==========================================
  // LOGOUT - CANCEL
  // ==========================================

  const handleCancelLogout = () => {
    if (loadingAuth) {
      return;
    }

    setShowLogoutModal(false);
  };

  // ==========================================
  // LOGOUT - CONFIRM
  // ==========================================

  const handleConfirmLogout = async () => {
    if (loadingAuth) {
      return;
    }

    try {
      resetPasswordForm();
      setIsChangingPassword(false);

      /*
       * IMPORTANT:
       * No artificial timeout.
       *
       * We wait for the REAL logout operation.
       */
      await logout();

      setShowLogoutModal(false);

      navigate("/", {
        replace: true,
      });

    } catch (error) {
      console.error(
        "Logout error:",
        error
      );

      setShowLogoutModal(false);
    }
  };

  // ==========================================
  // DELETE ACCOUNT - OPEN WARNING
  // ==========================================

  const handleOpenDeleteAccount = () => {
    setDeleteError("");
    setShowDeleteWarning(true);
  };

  // ==========================================
  // DELETE ACCOUNT - SECOND WARNING
  // ==========================================

  const handleContinueDelete = () => {
    setShowDeleteWarning(false);
    setDeleteError("");
    setShowPermanentDelete(true);
  };

  // ==========================================
  // DELETE ACCOUNT - PERMANENT
  // ==========================================

  const handleDeleteAccount = async () => {
    try {
      setDeleteError("");
      setDeletingAccount(true);

      const data = await deleteMyAccount();

      await logout();

      navigate("/", {
        replace: true,
        state: {
          accountDeleted:
            data?.message ||
            "Your account has been permanently deleted.",
        },
      });

    } catch (error) {
      console.error(
        "Delete account error:",
        error
      );

      setDeleteError(
        error.message ||
          "Failed to delete your account. Please try again."
      );

      setDeletingAccount(false);
      setShowPermanentDelete(false);
    }
  };

  // ==========================================
  // LOADING USER
  // ==========================================

  if (loadingUser) {
    return (
      <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin" />

          <p className="mt-4 text-gray-600">
            Loading your profile...
          </p>
        </div>
      </section>
    );
  }

  // ==========================================
  // NOT AUTHENTICATED
  // ==========================================

  if (!isAuthenticated || !user) {
    return (
      <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">

          <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center text-3xl">
            🔐
          </div>

          <h1 className="text-2xl font-bold text-blue-900 mt-5">
            Login Required
          </h1>

          <p className="text-gray-500 mt-2">
            Please login to access your TrueFix profile.
          </p>

          <NavLink
            to="/login"
            className="inline-flex items-center justify-center mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            Go to Login
          </NavLink>

        </div>
      </section>
    );
  }

  // ==========================================
  // INITIALS
  // ==========================================

  const initials = profile.name
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // ==========================================
  // PASSWORD FIELD COMPONENT
  // ==========================================

  const PasswordField = ({
    label,
    name,
    value,
    show,
    setShow,
    placeholder,
    autoComplete,
  }) => {
    return (
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>

        <div className="relative">

          <input
            type={
              show
                ? "text"
                : "password"
            }
            name={name}
            value={value}
            onChange={handlePasswordChange}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 pr-20 outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />

          <button
            type="button"
            onClick={() =>
              setShow(
                (previous) => !previous
              )
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-sm font-semibold text-blue-900 hover:text-orange-500 cursor-pointer transition"
          >
            {show ? "Hide" : "Show"}
          </button>

        </div>
      </div>
    );
  };

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <section className="min-h-screen bg-gray-100 py-8 sm:py-12 px-4">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <p className="text-sm font-bold tracking-wider text-orange-500 uppercase">
            TrueFix Account
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mt-1">
            My Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your personal information, security and account.
          </p>

        </div>

        {/* PROFILE CARD */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">

          <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 sm:px-8 py-8">

            <div className="flex flex-col sm:flex-row items-center gap-5">

              <div className="w-24 h-24 shrink-0 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-3xl font-bold shadow-lg">
                {initials || "U"}
              </div>

              <div className="text-center sm:text-left">

                <h2 className="text-2xl font-bold text-white">
                  {profile.name || "User"}
                </h2>

                <p className="text-blue-100 mt-1">
                  {profile.email}
                </p>

                <span className="inline-flex mt-3 px-3 py-1 rounded-full bg-white/10 text-white text-sm">
                  {user.role === "admin"
                    ? "Administrator"
                    : "Customer"}
                </span>

              </div>

            </div>

          </div>

          <div className="p-6 sm:p-8">

            {message && (
              <div className="mb-6 flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4">
                <span className="text-lg">✓</span>

                <p className="font-medium">
                  {message}
                </p>
              </div>
            )}

            {error && (
              <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
                <span className="text-lg">!</span>

                <p className="font-medium">
                  {error}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

              <div>

                <h2 className="text-xl font-bold text-blue-900">
                  Personal Information
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Your basic TrueFix account information.
                </p>

              </div>

              {!isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(true);
                    setMessage("");
                    setError("");
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                >
                  Edit Profile
                </button>
              )}

            </div>

            <form
              onSubmit={handleSave}
              className="space-y-5"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* NAME */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter your full name"
                    className={`w-full border rounded-xl px-4 py-3.5 outline-none transition-all duration-200 ${
                      isEditing
                        ? "border-gray-300 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                        : "border-gray-200 bg-gray-50 text-gray-700"
                    }`}
                  />

                </div>

                {/* EMAIL */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full border border-gray-200 bg-gray-50 text-gray-500 rounded-xl px-4 py-3.5 outline-none cursor-not-allowed"
                  />

                  <p className="text-xs text-gray-400 mt-1.5">
                    Email cannot be changed.
                  </p>

                </div>

                {/* PHONE */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    maxLength={10}
                    inputMode="numeric"
                    placeholder="10-digit phone number"
                    className={`w-full border rounded-xl px-4 py-3.5 outline-none transition-all duration-200 ${
                      isEditing
                        ? "border-gray-300 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                        : "border-gray-200 bg-gray-50 text-gray-700"
                    }`}
                  />

                </div>

                {/* ADDRESS */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows={3}
                    placeholder="Enter your address"
                    className={`w-full border rounded-xl px-4 py-3.5 outline-none resize-none transition-all duration-200 ${
                      isEditing
                        ? "border-gray-300 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                        : "border-gray-200 bg-gray-50 text-gray-700"
                    }`}
                  />

                </div>

              </div>

              {isEditing && (
                <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-100">

                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {saving
                      ? "Saving..."
                      : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={saving}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>

                </div>
              )}

            </form>

          </div>

        </div>

        {/* LOWER GRID */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* SECURITY */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">

            <div className="flex items-start justify-between gap-4">

              <div>

                <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center text-xl">
                  🔒
                </div>

                <h2 className="text-xl font-bold text-blue-900 mt-4">
                  Account Security
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Keep your TrueFix account secure.
                </p>

              </div>

              {!isChangingPassword && (
                <button
                  type="button"
                  onClick={handleOpenChangePassword}
                  className="shrink-0 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                >
                  Change Password
                </button>
              )}

            </div>

            {isChangingPassword && (
              <div className="mt-6 pt-6 border-t border-gray-100">

                {passwordMessage && (
                  <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-5">

                    <div className="flex items-start gap-3">

                      <span className="text-lg">
                        ✓
                      </span>

                      <p className="font-medium">
                        {passwordMessage}
                      </p>

                    </div>

                  </div>
                )}

                {passwordError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-5">

                    <div className="flex items-start gap-3">

                      <span className="text-lg">
                        !
                      </span>

                      <p className="font-medium">
                        {passwordError}
                      </p>

                    </div>

                  </div>
                )}

                <form
                  onSubmit={handleChangePassword}
                  className="space-y-5"
                  autoComplete="off"
                >

                  <PasswordField
                    label="Current Password"
                    name="currentPassword"
                    value={passwords.currentPassword}
                    show={showCurrentPassword}
                    setShow={setShowCurrentPassword}
                    placeholder="Enter current password"
                    autoComplete="current-password"
                  />

                  <PasswordField
                    label="New Password"
                    name="newPassword"
                    value={passwords.newPassword}
                    show={showNewPassword}
                    setShow={setShowNewPassword}
                    placeholder="Minimum 6 characters"
                    autoComplete="new-password"
                  />

                  <PasswordField
                    label="Re-enter New Password"
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    show={showConfirmPassword}
                    setShow={setShowConfirmPassword}
                    placeholder="Enter new password again"
                    autoComplete="new-password"
                  />

                  <div className="flex flex-col sm:flex-row gap-3">

                    <button
                      type="submit"
                      disabled={changingPassword}
                      className="flex-1 bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {changingPassword
                        ? "Changing Password..."
                        : "Update Password"}
                    </button>

                    <button
                      type="button"
                      onClick={
                        handleCloseChangePassword
                      }
                      disabled={changingPassword}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>

                  </div>

                </form>

              </div>
            )}

          </div>

          {/* QUICK ACTIONS */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">

            <div className="mb-6">

              <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-xl">
                ⚡
              </div>

              <h2 className="text-xl font-bold text-blue-900 mt-4">
                Quick Actions
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Quickly access important TrueFix features.
              </p>

            </div>

            <div className="grid grid-cols-1 gap-3">

              {user.role === "customer" && (
                <>
                  <NavLink
                    to="/services"
                    className="flex items-center justify-between bg-blue-900 hover:bg-blue-800 text-white px-5 py-4 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>
                      Book a Service
                    </span>

                    <span>
                      →
                    </span>
                  </NavLink>

                  <NavLink
                    to="/my-bookings"
                    className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-4 rounded-xl font-semibold transition-all duration-200 cursor-pointer"
                  >
                    <span>
                      My Bookings
                    </span>

                    <span>
                      →
                    </span>
                  </NavLink>
                </>
              )}

              {user.role === "admin" && (
                <NavLink
                  to="/admin"
                  className="flex items-center justify-between bg-blue-900 hover:bg-blue-800 text-white px-5 py-4 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>
                    Admin Dashboard
                  </span>

                  <span>
                    →
                  </span>
                </NavLink>
              )}

              {/* LOGOUT */}

              <button
                type="button"
                onClick={handleLogout}
                disabled={loadingAuth}
                className="flex items-center justify-between bg-red-50 hover:bg-red-100 text-red-600 px-5 py-4 rounded-xl font-semibold transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span>
                  {loadingAuth
                    ? "Logging out..."
                    : "Logout"}
                </span>

                <span>
                  →
                </span>
              </button>

            </div>

          </div>

        </div>

        {/* DANGER ZONE */}

        <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-6 sm:p-8 mt-6">

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">

            <div>

              <div className="w-11 h-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-xl">
                ⚠️
              </div>

              <h2 className="text-xl font-bold text-red-700 mt-4">
                Danger Zone
              </h2>

              <p className="text-sm text-gray-500 mt-1 max-w-xl">
                Permanently delete your TrueFix account and remove
                your personal account information.
              </p>

              {deleteError && (
                <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
                  {deleteError}
                </div>
              )}

            </div>

            <button
              type="button"
              onClick={handleOpenDeleteAccount}
              disabled={deletingAccount}
              className="shrink-0 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Delete Account
            </button>

          </div>

        </div>

      </div>

      {/* DELETE WARNING MODAL */}

      {showDeleteWarning && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">

          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6">

            <div className="w-14 h-14 mx-auto rounded-full bg-red-100 flex items-center justify-center text-2xl">
              ⚠️
            </div>

            <h2 className="text-xl font-bold text-gray-900 text-center mt-5">
              Delete Your Account?
            </h2>

            <p className="text-gray-500 text-center mt-3">
              Are you sure you want to delete your TrueFix
              account?
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-7">

              <button
                type="button"
                onClick={() => {
                  setShowDeleteWarning(false);
                }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleContinueDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold cursor-pointer"
              >
                Yes, Continue
              </button>

            </div>

          </div>

        </div>
      )}

      {/* PERMANENT DELETE MODAL */}

      {showPermanentDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">

          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 border-2 border-red-100">

            <div className="w-14 h-14 mx-auto rounded-full bg-red-600 text-white flex items-center justify-center text-2xl">
              !
            </div>

            <h2 className="text-xl font-bold text-red-700 text-center mt-5">
              Permanently Delete Account?
            </h2>

            <p className="text-gray-600 text-center mt-3">
              This action cannot be undone. Your account will
              be permanently deleted.
            </p>

            <p className="text-sm text-red-600 text-center font-semibold mt-3">
              Are you absolutely sure?
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-7">

              <button
                type="button"
                onClick={() => {
                  setShowPermanentDelete(false);
                }}
                disabled={deletingAccount}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold cursor-pointer disabled:cursor-not-allowed"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deletingAccount}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {deletingAccount
                  ? "Deleting Account..."
                  : "Delete Permanently"}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* LOGOUT CONFIRMATION MODAL */}

      {showLogoutModal && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center px-4">

          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6">

            <div className="w-14 h-14 mx-auto rounded-full bg-orange-100 flex items-center justify-center text-2xl">
              🚪
            </div>

            <h2 className="text-xl font-bold text-gray-900 text-center mt-5">
              Logout from TrueFix?
            </h2>

            <p className="text-gray-500 text-center mt-3">
              Are you sure you want to logout from
              your TrueFix account?
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-7">

              <button
                type="button"
                onClick={handleCancelLogout}
                disabled={loadingAuth}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmLogout}
                disabled={loadingAuth}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loadingAuth
                  ? "Logging out..."
                  : "Confirm Logout"}
              </button>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}

export default Profile;