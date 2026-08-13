const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getServices,
  getActiveServices,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const router = express.Router();


// ==========================================
// PUBLIC ROUTES
// ==========================================

// Get active services
router.get("/active", getActiveServices);


// ==========================================
// ADMIN ROUTES
// ==========================================

// Get all services
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getServices
);


// Create service
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createService
);


// Update service
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateService
);


// Delete service
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteService
);


module.exports = router;