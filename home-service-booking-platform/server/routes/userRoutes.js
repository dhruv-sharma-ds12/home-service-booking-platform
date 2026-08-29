const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getMyProfile,
  updateMyProfile,
  changePassword,
  deleteMyAccount,
  getUsers,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// ==========================================
// CURRENT USER PROFILE
// ==========================================

// GET /api/users/me
router.get(
  "/me",
  authMiddleware,
  getMyProfile
);

// PUT /api/users/me
router.put(
  "/me",
  authMiddleware,
  updateMyProfile
);

// ==========================================
// CHANGE PASSWORD
// ==========================================

// PUT /api/users/change-password
router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

// ==========================================
// DELETE CURRENT USER ACCOUNT
// ==========================================

// DELETE /api/users/me
router.delete(
  "/me",
  authMiddleware,
  deleteMyAccount
);

// ==========================================
// ADMIN USERS
// ==========================================

// GET /api/users
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getUsers
);

// DELETE /api/users/:id
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);

module.exports = router;