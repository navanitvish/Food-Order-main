// models/settlement.js
const mongoose = require("mongoose");

// const settlementSchema = new mongoose.Schema({
//   restaurantId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Restaurant",
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ["Pending", "Approved", "Rejected"],
//     default: "Pending",
//   },
//   transactionMode: {
//     type: String,
//     enum: ["Bank Transfer", "UPI", "Cash", "Other"], // Options for payment modes
//     default: null,
//   },
//   allocatedAmount: {
//     type: Number,
//   },
//   createdDate: {
//     type: Date,
//     default: Date.now,
//   },
//   settlementDate: {
//     type: Date,
//   },
//   remarks: {
//     type: String,
//   },
// });

const ticketSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  transactionMode: {
    type: String,
    enum: ["Bank Transfer", "UPI", "Cash", "Other"],
    default: null,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  settlementDate: {
    type: Date,
    default: Date.now,
  },
  paidAmount: {
    // New field for the paid amount
    type: Number,
    default: 0,
  },
  remarks: {
    type: String,
  },
});
const settlementSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  allocatedAmount: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    // required: true,
    default: 0,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  tickets: [ticketSchema],
});

module.exports = mongoose.model("Settlement", settlementSchema);
