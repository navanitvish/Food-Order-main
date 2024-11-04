const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    dishtype: { type: String },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    actualPrice: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: { type: Number },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    specialOffer: { type: Boolean, default: false },
    specialOfferPrice: { type: Number },
    nutritionalInfo: [{ type: String }],
    additionalOption: [
      {
        name: {
          type: String,
        },
        price: {
          type: Number,
        },
      },
    ],
    label: {
      type: String,
    },
    dietry: {
      type: String,
      required: true,
    },
    ingredient: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    recommended: { type: Boolean, default: false },
    favorites: [
      {
        type: String,

        required: false,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);
