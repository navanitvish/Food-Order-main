const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: String },
    dob: { type: String },
    gender: { type: String },
    lastLogin: { type: Date },
    isVerified: { type: Boolean, default: false },
    resetPasswordLink: { type: String },
    otp: { type: Number },
    otpexpire: { type: Date },
    address: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    isSelfRegistered: {
      type: Boolean,
      default: false, // Set true for self-registration, false for admin-created
    },
    tag: { type: String },
    addressName: { type: String },

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

    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin", "restaurent", "driver"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
