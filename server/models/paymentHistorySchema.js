const mongoose = require("mongoose");

const paymentHistorySchema = new mongoose.Schema({
  orderId: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  merchandTransectionId: { type: String, required: true },
  totalAmount: { type: Number, required: true },

  status: {
    type: String,
    enum: ["pending", "completed", "canceled"],
    default: "pending",
  },

  orderStatus: {
    type: String,
    enum: ["pending", "order_placed", "payment_failed", "payment_successfull"],
    default: "order_pending",
  },
});

module.exports = mongoose.model("PaymentHistory", paymentHistorySchema);
