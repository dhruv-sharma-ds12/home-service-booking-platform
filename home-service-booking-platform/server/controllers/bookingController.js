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


// ==========================================
// DELETE / CANCEL BOOKING
// ==========================================

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    res.status(200).json({
      message: "Booking cancelled successfully",
    });

  } catch (error) {
    console.error("Delete booking error:", error);

    res.status(500).json({
      message: "Failed to cancel booking",
      error: error.message,
    });
  }
};


module.exports = {
  createBooking,
  getBookings,
  updateBookingStatus,
  deleteBooking,
};