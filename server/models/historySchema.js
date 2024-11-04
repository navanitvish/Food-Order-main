const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  action: {
    type: String,
    enum: ["update", "delete", "verify"],
    required: true,
  },
  performedBy: {
    type: String,
    enum: ["admin", "restaurent", "user", "driver"],
    required: true,
  },
  entityType: {
    type: String,
    enum: [
      "user",
      "menu",
      "restaurant",
      "restaurantOwner",
      "order",
      "category",
      "coupon",
      "resturantVerify",
      "driverVerify",
      "driver",
      "banner",
      "resturanCategory",
      "location",
    ],
    required: true,
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "entityType",
    required: true,
  },
  changes: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("History", HistorySchema);
