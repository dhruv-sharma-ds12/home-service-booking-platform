const Service = require("../models/Service");

// ==========================================
// GET ALL SERVICES
// ==========================================

const getServices = async (req, res) => {
  try {
    const services = await Service.find()
      .sort({ createdAt: -1 });

    res.status(200).json(services);
  } catch (error) {
    console.error("Get services error:", error);

    res.status(500).json({
      message: "Failed to fetch services",
      error: error.message,
    });
  }
};


// ==========================================
// GET ACTIVE SERVICES
// ==========================================

const getActiveServices = async (req, res) => {
  try {
    const services = await Service.find({
      active: true,
    }).sort({ createdAt: -1 });

    res.status(200).json(services);
  } catch (error) {
    console.error("Get active services error:", error);

    res.status(500).json({
      message: "Failed to fetch active services",
      error: error.message,
    });
  }
};


// ==========================================
// CREATE SERVICE
// ==========================================

const createService = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      active,
    } = req.body;

    if (!name || !description || price === undefined) {
      return res.status(400).json({
        message:
          "Name, description and price are required.",
      });
    }

    const existingService = await Service.findOne({
      name: name.trim(),
    });

    if (existingService) {
      return res.status(400).json({
        message: "A service with this name already exists.",
      });
    }

    const service = await Service.create({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      image: image || "",
      active: active !== undefined ? active : true,
    });

    res.status(201).json({
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    console.error("Create service error:", error);

    res.status(500).json({
      message: "Failed to create service",
      error: error.message,
    });
  }
};


// ==========================================
// UPDATE SERVICE
// ==========================================

const updateService = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      price,
      image,
      active,
    } = req.body;

    if (!name || !description || price === undefined) {
      return res.status(400).json({
        message:
          "Name, description and price are required.",
      });
    }

    const service = await Service.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        image: image || "",
        active:
          active !== undefined ? active : true,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!service) {
      return res.status(404).json({
        message: "Service not found.",
      });
    }

    res.status(200).json({
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    console.error("Update service error:", error);

    res.status(500).json({
      message: "Failed to update service",
      error: error.message,
    });
  }
};


// ==========================================
// DELETE SERVICE
// ==========================================

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found.",
      });
    }

    res.status(200).json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete service error:", error);

    res.status(500).json({
      message: "Failed to delete service",
      error: error.message,
    });
  }
};


// ==========================================
// EXPORT
// ==========================================

module.exports = {
  getServices,
  getActiveServices,
  createService,
  updateService,
  deleteService,
};