const Location = require("../models/locationSchema");
const User = require("../models/userModel");
const History = require("../models/historySchema");

// Create Location
const createLocation = async (req, res) => {
  try {
    const userId = req.userId;
    const locationData = {
      ...req.body,
      userId: userId,
    };
    const location = await Location.create(locationData);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
      },
      { new: true, runValidators: true } // Options: return updated document and validate
    );

    res.status(201).json({ success: true, data: location });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Location
const getLocation = async (req, res) => {
  try {
    const userId = req.userId;
    const location = await Location.find({ userId: userId.toString() });

    console.log("locatib:", userId, location);
    if (!location) {
      return res
        .status(404)
        .json({ success: false, message: "Location not found" });
    }
    res.status(200).json({ success: true, data: location });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update Location
const updateLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!location) {
      return res
        .status(404)
        .json({ success: false, message: "Location not found" });
    }

    const history = new History({
      userId: req.userId,
      action: "update",
      performedBy: "admin",
      entityType: "location",
      entityId: location._id,
      changes: req.body,
    });

    await history.save();
    res.status(200).json({ success: true, data: location });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete Location
const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);

    console.log(req.params.id, location);
    if (!location) {
      return res
        .status(404)
        .json({ success: false, message: "Location not found" });
    }

    const history = new History({
      userId: req.userId,
      action: "delete",
      performedBy: req.role,
      entityType: "location",
      entityId: location._id,
      changes: null,
    });

    await history.save();
    res
      .status(200)
      .json({ success: true, message: "Location deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createLocation,
  getLocation,
  updateLocation,
  deleteLocation,
};
