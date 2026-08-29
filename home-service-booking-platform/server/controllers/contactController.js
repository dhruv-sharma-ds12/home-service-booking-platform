const Contact = require("../models/Contact");

// ==========================================
// CREATE CONTACT MESSAGE
// PUBLIC ROUTE
// POST /api/contacts
// ==========================================

const createContactMessage = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
    } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (
      !name ||
      !email ||
      !phone ||
      !subject ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // ==========================================
    // CREATE MESSAGE
    // ==========================================

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message:
        "Your message has been sent successfully. Our team will contact you soon.",
      contact,
    });
  } catch (error) {
    console.error(
      "Create contact message error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to send contact message.",
    });
  }
};

// ==========================================
// GET ALL CONTACT MESSAGES
// ADMIN ROUTE
// GET /api/contacts
// ==========================================

const getAllContactMessages = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    console.error(
      "Get contact messages error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact messages.",
    });
  }
};

// ==========================================
// GET SINGLE CONTACT MESSAGE
// ADMIN ROUTE
// GET /api/contacts/:id
// ==========================================

const getContactMessage = async (req, res) => {
  try {
    const contact = await Contact.findById(
      req.params.id
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      contact,
    });
  } catch (error) {
    console.error(
      "Get contact message error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact message.",
    });
  }
};

// ==========================================
// UPDATE CONTACT STATUS
// ADMIN ROUTE
// PUT /api/contacts/:id/status
// ==========================================

const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "New",
      "Read",
      "Resolved",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact status.",
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact status updated successfully.",
      contact,
    });
  } catch (error) {
    console.error(
      "Update contact status error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update contact status.",
    });
  }
};

// ==========================================
// DELETE CONTACT MESSAGE
// ADMIN ROUTE
// DELETE /api/contacts/:id
// ==========================================

const deleteContactMessage = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(
      req.params.id
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact message deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete contact message error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete contact message.",
    });
  }
};

module.exports = {
  createContactMessage,
  getAllContactMessages,
  getContactMessage,
  updateContactStatus,
  deleteContactMessage,
};