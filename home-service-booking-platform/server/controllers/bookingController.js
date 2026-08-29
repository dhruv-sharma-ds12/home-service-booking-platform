const Booking = require("../models/Booking");

// ==========================================
// CREATE BOOKING
// ==========================================

const createBooking = async (req, res) => {
  try {
    const {
      service,
      price,
      customerName,
      phone,
      date,
      time,
      address,
      notes,
    } = req.body;

    // ==========================================
    // CHECK REQUIRED FIELDS
    // ==========================================

    if (
      !service ||
      price === undefined ||
      !customerName ||
      !phone ||
      !date ||
      !time ||
      !address
    ) {
      return res.status(400).json({
        message:
          "Please provide all required booking details.",
      });
    }

    // ==========================================
    // CHECK AUTHENTICATED USER
    // ==========================================

    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    // ==========================================
    // CREATE BOOKING
    // ==========================================

    const booking = await Booking.create({
      user: req.user.userId,
      service: service.trim(),
      price: Number(price),
      customerName: customerName.trim(),
      phone: phone.trim(),
      date,
      time,
      address: address.trim(),
      notes: notes ? notes.trim() : "",
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Create booking error:", error);

    return res.status(500).json({
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

// ==========================================
// GET ALL BOOKINGS - ADMIN
// ==========================================

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email phone")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      bookings,
    });
  } catch (error) {
    console.error("Get bookings error:", error);

    return res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

// ==========================================
// GET MY BOOKINGS - CUSTOMER
// ==========================================

const getMyBookings = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    const bookings = await Booking.find({
      user: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      bookings,
    });
  } catch (error) {
    console.error("Get my bookings error:", error);

    return res.status(500).json({
      message: "Failed to fetch your bookings",
      error: error.message,
    });
  }
};

// ==========================================
// GET SINGLE BOOKING
// ==========================================

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id).populate(
      "user",
      "name email phone"
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // ==========================================
    // ADMIN CAN VIEW ANY BOOKING
    // ==========================================

    if (req.user.role === "admin") {
      return res.status(200).json({
        booking,
      });
    }

    // ==========================================
    // CUSTOMER MUST OWN BOOKING
    // ==========================================

    if (!booking.user) {
      return res.status(400).json({
        message: "This booking is not linked to a user",
      });
    }

    if (
      booking.user._id.toString() !==
      req.user.userId.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not authorized to view this booking",
      });
    }

    return res.status(200).json({
      booking,
    });
  } catch (error) {
    console.error("Get booking by ID error:", error);

    return res.status(500).json({
      message: "Failed to fetch booking",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE BOOKING STATUS - ADMIN
// ==========================================

const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "Pending",
      "Confirmed",
      "Completed",
      "Cancelled",
    ];

    // ==========================================
    // VALIDATE STATUS
    // ==========================================

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid booking status.",
      });
    }

    // ==========================================
    // FIND BOOKING
    // ==========================================

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    // ==========================================
    // UPDATE STATUS
    // ==========================================

    const updatedBooking =
      await Booking.findByIdAndUpdate(
        id,
        {
          $set: {
            status,
          },
        },
        {
          new: true,
        }
      );

    return res.status(200).json({
      message: "Booking status updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error(
      "Update booking status error:",
      error
    );

    return res.status(500).json({
      message: "Failed to update booking status",
      error: error.message,
    });
  }
};

// ==========================================
// CANCEL BOOKING
// ==========================================

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // ==========================================
    // FIND BOOKING
    // ==========================================

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // ==========================================
    // ADMIN CANCEL
    // ==========================================

    if (req.user.role === "admin") {
      // Completed bookings cannot be cancelled
      if (booking.status === "Completed") {
        return res.status(400).json({
          message:
            "Completed bookings cannot be cancelled",
        });
      }

      // IMPORTANT:
      // Use findByIdAndUpdate instead of booking.save().
      //
      // Some older bookings may not have the required
      // "user" field. booking.save() would validate the
      // entire document and fail.
      //
      // This update changes only the status field.

      const updatedBooking =
        await Booking.findByIdAndUpdate(
          id,
          {
            $set: {
              status: "Cancelled",
            },
          },
          {
            new: true,
          }
        );

      return res.status(200).json({
        message:
          "Booking cancelled successfully by admin",
        booking: updatedBooking,
      });
    }

    // ==========================================
    // CUSTOMER BOOKING OWNERSHIP
    // ==========================================

    if (!booking.user) {
      return res.status(400).json({
        message:
          "This booking is not linked to a user",
      });
    }

    if (
      booking.user.toString() !==
      req.user.userId.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not authorized to cancel this booking",
      });
    }

    // ==========================================
    // CUSTOMER CAN ONLY CANCEL PENDING BOOKINGS
    // ==========================================

    if (booking.status !== "Pending") {
      return res.status(400).json({
        message:
          "Booking cannot be cancelled because its current status is not Pending",
      });
    }

    // ==========================================
    // CANCEL CUSTOMER BOOKING
    // ==========================================

    const updatedBooking =
      await Booking.findByIdAndUpdate(
        id,
        {
          $set: {
            status: "Cancelled",
          },
        },
        {
          new: true,
        }
      );

    return res.status(200).json({
      message: "Booking cancelled successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error(
      "Cancel booking error:",
      error
    );

    return res.status(500).json({
      message: "Failed to cancel booking",
      error: error.message,
    });
  }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  createBooking,
  getBookings,
  getMyBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
};