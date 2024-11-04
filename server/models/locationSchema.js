// const locationSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     country: { type: String, trim: true },
//     state: { type: String, trim: true },
//     city: { type: String, trim: true },
//     address: { type: String, trim: true },
//     zipCode: { type: String, trim: true },
//   },
//   {
//     timestamps: true,
//   }
// );

const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  tag: { type: String },
  addressName: { type: String },
  isCurrent: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Location", locationSchema);
