const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ==========================================
// GET CURRENT USER PROFILE
// ==========================================

const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Get my profile error:", error);

    return res.status(500).json({
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE CURRENT USER PROFILE
// ==========================================

const updateMyProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
    } = req.body;

    // ==========================================
    // NAME VALIDATION
    // ==========================================

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Full name is required.",
      });
    }

    // ==========================================
    // PHONE VALIDATION
    // ==========================================

    if (!phone || !phone.trim()) {
      return res.status(400).json({
        message: "Phone number is required.",
      });
    }

    const cleanedPhone = phone
      .trim()
      .replace(/\s+/g, "");

    if (!/^[0-9]{10}$/.test(cleanedPhone)) {
      return res.status(400).json({
        message:
          "Phone number must contain exactly 10 digits.",
      });
    }

    // ==========================================
    // FIND USER
    // ==========================================

    const user = await User.findById(
      req.user.userId
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // ==========================================
    // UPDATE USER
    // ==========================================

    user.name = name.trim();
    user.phone = cleanedPhone;

    if (address !== undefined) {
      user.address = address.trim();
    }

    await user.save();

    // ==========================================
    // RETURN UPDATED USER
    // ==========================================

    const updatedUser = await User.findById(
      user._id
    ).select("-password");

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error(
      "Update my profile error:",
      error
    );

    return res.status(500).json({
      message: "Failed to update profile.",
      error: error.message,
    });
  }
};

// ==========================================
// CHANGE PASSWORD
// ==========================================

const changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    // ==========================================
    // REQUIRED FIELDS
    // ==========================================

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      return res.status(400).json({
        message:
          "Current password, new password and confirmation are required.",
      });
    }

    // ==========================================
    // NEW PASSWORD VALIDATION
    // ==========================================

    if (newPassword.length < 6) {
      return res.status(400).json({
        message:
          "New password must be at least 6 characters long.",
      });
    }

    // ==========================================
    // CONFIRM PASSWORD
    // ==========================================

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message:
          "New password and confirm password do not match.",
      });
    }

    // ==========================================
    // FIND USER
    // ==========================================

    const user = await User.findById(
      req.user.userId
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // ==========================================
    // CHECK CURRENT PASSWORD
    // ==========================================

    const passwordMatches =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!passwordMatches) {
      return res.status(400).json({
        message: "Current password is incorrect.",
      });
    }

    // ==========================================
    // PREVENT SAME PASSWORD
    // ==========================================

    const samePassword =
      await bcrypt.compare(
        newPassword,
        user.password
      );

    if (samePassword) {
      return res.status(400).json({
        message:
          "New password must be different from your current password.",
      });
    }

    // ==========================================
    // HASH NEW PASSWORD
    // ==========================================

    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      message:
        "Password changed successfully.",
    });
  } catch (error) {
    console.error(
      "Change password error:",
      error
    );

    return res.status(500).json({
      message: "Failed to change password.",
      error: error.message,
    });
  }
};

// ==========================================
// DELETE CURRENT USER ACCOUNT
// ==========================================

const deleteMyAccount = async (req, res) => {
  try {
    // ==========================================
    // GET USER ONLY FROM JWT
    // ==========================================

    const userId = req.user.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    // ==========================================
    // FIND CURRENT USER
    // ==========================================

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User account not found.",
      });
    }

    // ==========================================
    // SAFETY CHECK
    // ==========================================

    // Do not allow an admin to use the
    // customer self-delete endpoint.
    if (user.role === "admin") {
      return res.status(403).json({
        message:
          "Admin accounts cannot be deleted from this endpoint.",
      });
    }

    // ==========================================
    // DELETE CURRENT USER
    // ==========================================

    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      message:
        "Your account has been permanently deleted.",
    });
  } catch (error) {
    console.error(
      "Delete my account error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to delete your account. Please try again.",
      error: error.message,
    });
  }
};

// ==========================================
// ADMIN - GET ALL USERS
// ==========================================

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      users,
    });
  } catch (error) {
    console.error(
      "Get users error:",
      error
    );

    return res.status(500).json({
      message: "Failed to fetch users.",
      error: error.message,
    });
  }
};

// ==========================================
// ADMIN - DELETE USER
// ==========================================

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // ==========================================
    // NEVER DELETE ADMIN
    // ==========================================

    if (user.role === "admin") {
      return res.status(403).json({
        message: "Admin users cannot be deleted.",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete user error:",
      error
    );

    return res.status(500).json({
      message: "Failed to delete user.",
      error: error.message,
    });
  }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  getMyProfile,
  updateMyProfile,
  changePassword,
  deleteMyAccount,
  getUsers,
  deleteUser,
};