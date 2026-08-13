const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getMyProfile,
  updateMyProfile,
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