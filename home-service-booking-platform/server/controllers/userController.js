const User = require("../models/User");

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

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Get my profile error:", error);

    res.status(500).json({
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

    // Validate name
    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    // Find currently logged-in user
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Update fields
    user.name = name.trim();

    if (phone !== undefined) {
      user.phone = phone.trim();
    }

    if (address !== undefined) {
      user.address = address.trim();
    }

    await user.save();

    // Return updated user without password
    const updatedUser = await User.findById(user._id)
      .select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error(
      "Update my profile error:",
      error
    );

    res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
};


// ==========================================
// GET ALL USERS - ADMIN
// ==========================================

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      users,
    });

  } catch (error) {
    console.error(
      "Get users error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};


// ==========================================
// DELETE USER - ADMIN
// ==========================================

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Never allow deleting admin
    if (user.role === "admin") {
      return res.status(403).json({
        message: "Admin users cannot be deleted",
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "User deleted successfully",
    });

  } catch (error) {
    console.error(
      "Delete user error:",
      error
    );

    res.status(500).json({
      message: "Failed to delete user",
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
  getUsers,
  deleteUser,
};