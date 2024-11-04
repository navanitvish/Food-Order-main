// models/DriverTransaction.js
const mongoose = require("mongoose");

const DriverTransactionSchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  cashOnHand: {
    type: Number,
    required: true,
    default: 0,
  },
  amountPaidToAdmin: {
    type: Number,
    required: true,
    default: 0,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("DriverTransaction", DriverTransactionSchema);
