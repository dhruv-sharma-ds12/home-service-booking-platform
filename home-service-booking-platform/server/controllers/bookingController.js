const Booking = require("../models/Booking");

// ==========================================
// CREATE BOOKING
// ==========================================

const createBooking = async (req, res) => {
  console.log("AUTH USER:", req.user);
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
    
    const userId = req.user.userId;

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
        message: "Please provide all required booking details.",
      });
    }

    const booking = await Booking.create({
      user: req.user.userId,
      service,
      price,
      customerName,
      phone,
      date,
      time,
      address,
      notes,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });

  } catch (error) {
    console.error("Create booking error:", error);

    res.status(500).json({
      message: "Failed to create booking",
      error: error.message,
    });
  }
};


// ==========================================
// GET ALL BOOKINGS
// ==========================================

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({
      createdAt: -1,
    });

    res.status(200).json(bookings);

  } catch (error) {
    console.error("Get bookings error:", error);

    res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

// ============================================
// GET MY BOOKINGS
// ============================================

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get my bookings error:", error);

    res.status(500).json({
      message: "Failed to fetch your bookings",
      error: error.message,
    });
  }
};


// ==========================================
// UPDATE BOOKING STATUS
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

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid booking status.",
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    res.status(200).json({
      message: "Booking status updated successfully",
      booking,
    });

  } catch (error) {
    console.error("Update booking status error:", error);

    res.status(500).json({
      message: "Failed to update booking status",
      error: error.message,
    });
  }
};

// ========================================
// CANCEL BOOKING
// ========================================

const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the booking
        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        // Make sure the booking is linked to a user
        if (!booking.user) {
            return res.status(400).json({
                message: "This booking is not linked to a user"
            });
        }

        // Only the owner can cancel the booking
        if (booking.user.toString() !== req.user.userId.toString()) {
            return res.status(403).json({
                message: "You are not authorized to cancel this booking"
            });
        }

        // Only pending bookings can be cancelled
        if (booking.status !== "Pending") {
            return res.status(400).json({
                message: "Booking cannot be cancelled because its current status is not Pending"
            });
        }

        // Change status instead of deleting the booking
        booking.status = "Cancelled";

        await booking.save();

        return res.status(200).json({
            message: "Booking cancelled successfully",
            booking
        });

    } catch (error) {
        console.error("Cancel booking error:", error);

        return res.status(500).json({
            message: "Failed to cancel booking",
            error: error.message
        });
    }
};


// ========================================
// EXPORT CONTROLLERS
// ========================================

module.exports = {
    createBooking,
    getBookings,
    getMyBookings,
    updateBookingStatus,
    cancelBooking
};