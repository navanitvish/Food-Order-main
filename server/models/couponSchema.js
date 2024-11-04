const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    couponcode: {
      type: String,
      required: true,
    },
    percent: {
      type: Number,
      required: true,
    },

    image: { type: String, required: true },

    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
    },
    description: { type: String, required: true },

    isAll: {
      type: Boolean,
      default: false,
    },

    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    minOrderAmount: {
      type: Number,
      required: true,
    },

    upto: {
      type: Number,
      default: 0,
    },

    maxDiscountAmount: {
      type: Number,
    },
    expiryDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("coupon", couponSchema);
