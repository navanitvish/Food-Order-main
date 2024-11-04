const mongoose = require("mongoose");

const { formateHelper } = require("../helpers/timeFormaterHelper");

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: [String] },

    address: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Location",
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["restaurant", "other"],
      default: "restaurant",
      required: true,
    },
    rating: {
      type: Number,
    },
    openinghour: {
      type: String,
      // required: true,
    },

    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true },

    recomended: { type: Boolean },

    minimumOrder: {
      type: Number,
      default: 200,
    },

    contact: { type: Number },
    cuisine: {
      type: String,
    },
    resturantCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ResturantCategory",
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
      },
    },
    menuitem: {
      type: Number,
    },
    description: {
      type: String,
    },
    favorites: [
      {
        type: String,

        required: false,
      },
    ],

    distanceFromUser: { type: Number },
    selfPickup: { type: Boolean, default: false },
    deliveryTimeInMinutes: { type: Number },
    deliveryTime: { type: String },
    isOpen: { type: Boolean, default: false },
    formattedOpeningTime: { type: String },
    formattedClosingTime: { type: String },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    balance: Number,
    allocatedBalance: {
      type: Number,
      default: 0, // Amount allocated by super admin for withdrawal
    },
  },
  { timestamps: true }
);

// Add a virtual field to check if the restaurant is open or closed
// restaurantSchema.virtual("isOpen").get(function () {
//   const currentTime = new Date();

//   // Parse opening and closing times into Date objects
//   const [openingHour, openingMinute] = this?.openingTime?.split(":");
//   const [closingHour, closingMinute] = this?.closingTime?.split(":");

//   // Create new Date objects with current day but the stored time
//   const openingDateTime = new Date(
//     currentTime.getFullYear(),
//     currentTime.getMonth(),
//     currentTime.getDate(),
//     openingHour,
//     openingMinute
//   );
//   const closingDateTime = new Date(
//     currentTime.getFullYear(),
//     currentTime.getMonth(),
//     currentTime.getDate(),
//     closingHour,
//     closingMinute
//   );

//   return currentTime >= openingDateTime && currentTime <= closingDateTime;
// });

// // Virtual field for formatted opening time
// restaurantSchema.virtual("formattedOpeningTime").get(function () {
//   return formateHelper(this.openingTime);
// });

// // Virtual field for formatted closing time
// restaurantSchema.virtual("formattedClosingTime").get(function () {
//   return formateHelper(this.closingTime);
// });

// // Ensure virtuals are included when converting to JSON or Object
// restaurantSchema.set("toObject", { virtuals: true });
// restaurantSchema.set("toJSON", { virtuals: true });

restaurantSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Restaurant", restaurantSchema);
