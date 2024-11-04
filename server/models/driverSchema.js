const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const DriverDetails = new mongoose.Schema({
  drivingLIcence: {
    type: [String], //image
    required: true,
  },
  diverRc: {
    type: String, //image
    required: true,
  },
  vehiclePlate: {
    type: String,
    required: true,
  },
  adharCardNumber: {
    type: [String], //image
    required: true,
  },
  vehicleDetails: {
    type: String, // related to model, variant, color, chassis number, engine number, fuel type, vehicle class
    required: true,
  },
  pencard: {
    type: [String], //image
    required: true,
  },
  otp: { type: Number },
});

const paymentSchema = new mongoose.Schema({
  paymentType: {
    type: String,
    enum: ["upi", "bank"],
    required: true,
  },
  bankName: {
    type: String,
  },
  ifscCode: {
    type: String,
  },
  accountNumber: {
    type: String,
  },

  upiId: {
    type: String,
  },
});

const DriverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },

    availability: {
      type: Boolean,
      default: true,
    },
    mobile: {
      type: Number,
      required: true,
    },

    payment: { type: paymentSchema, required: true },

    driverDetails: { type: DriverDetails, required: true },
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
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    // Verification fields
    aadharCardVerified: {
      type: Boolean,
      default: false,
    },
    panCardVerified: {
      type: Boolean,
      default: false,
    },
    drivingLicenceVerified: {
      type: Boolean,
      default: false,
    },
    diverRcVerified: {
      type: Boolean,
      default: false,
    },
    vehiclePlateVerified: {
      type: Boolean,
      default: false,
    },
    vehicleDetailsVerified: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    isSelfRegistered: {
      type: Boolean,
      default: false,
    },

    isVerified: { type: Boolean, default: false },

    rejectionReason: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

DriverSchema.index({ location: "2dsphere" });

DriverSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

DriverSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Driver", DriverSchema);
