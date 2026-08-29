const express = require("express");

const {
  createContactMessage,
  getAllContactMessages,
  getContactMessage,
  updateContactStatus,
  deleteContactMessage,
} = require("../controllers/contactController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// ==========================================
// PUBLIC
// CUSTOMER SENDS CONTACT MESSAGE
// POST /api/contacts
// ==========================================

router.post(
  "/",
  createContactMessage
);

// ==========================================
// ADMIN
// GET ALL CONTACT MESSAGES
// GET /api/contacts
// ==========================================

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllContactMessages
);

// ==========================================
// ADMIN
// GET ONE CONTACT MESSAGE
// GET /api/contacts/:id
// ==========================================

router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  getContactMessage
);

// ==========================================
// ADMIN
// UPDATE CONTACT STATUS
// PUT /api/contacts/:id/status
// ==========================================

router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateContactStatus
);

// ==========================================
// ADMIN
// DELETE CONTACT MESSAGE
// DELETE /api/contacts/:id
// ==========================================

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteContactMessage
);

module.exports = router;