const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const orderItemSchema = new mongoose.Schema({
  menuItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    required: true,
  },
  name: {
    type: String,
    // required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    // required: true,
  },

  star: {
    type: Number,
    required: true,
    default: 0,
  },

  totalprice: { type: Number },
  quantity: { type: Number, required: true },
});

const paymentSchema = new mongoose.Schema({
  method: { type: String, enum: ["UPI", "Card", "COD"], required: true },
  merchandTransectionId: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "complete", "cancel"],
    default: "pending",
  },
});

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true, // Ensures orderId is unique
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deliveredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },

    address: { type: String },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },

    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coupon",
      default: null,
    },
    items: [orderItemSchema],
    address: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    payment: { paymentSchema },
    deliveredAt: { type: Date },
    averageRating: { type: Number },
    orderStatus: {
      type: String,
      enum: [
        "active",
        "complete",
        "cancel",
        "pending",
        "preparing_food",
        "driver_assign",
        "cancel_driver",
        "cancel_resturant",
        "cancel_admin",
        "pickup",
        // "deliverd",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

orderSchema.pre("save", async function (next) {
  if (!this.orderId) {
    // Generate a UUID orderId
    this.orderId = `ORD-${uuidv4()}`;
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
