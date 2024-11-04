const User = require("../../models/userModel.js");
const History = require("../../models/historySchema");

const Driver = require("../../models/driverSchema");
const Order = require("../../models/orderModel.js");
const getValidPage = require("../../helpers/getValidPageHelper.js");
const { confirmationEmailDriver } = require("../../helpers/emailHelper.js");

const registerForDriverUser = async (req, res) => {
  try {
    const {
      name,
      avatar,
      mobile,
      email,
      password,
      drivingLicence,
      diverRc,
      vehicleDetails,
      vehiclePlate,
      aadharCardNumber,
      panCard,
      location,
      paymentType,
      bankName,
      ifscCode,
      accountNumber,
      upiId,
    } = req.body;

    const existingDriver = await Driver.findOne({ email });

    if (existingDriver) {
      if (
        existingDriver.password ||
        existingDriver.mobile ||
        existingUser.isSelfRegistered ||
        existingDriver.isVerified
      ) {
        return res.status(409).json({
          success: false,
          message: "Driver already registered and verified",
        });
      } else {
        const otp = generateOTP();

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        existingDriver.name = name;
        existingDriver.avatar = avatar;

        existingDriver.mobile = mobile;
        existingDriver.password = hashedPassword;
        existingUser.isSelfRegistered = true;
        existingDriver.driverDetails = {
          drivingLicence,
          diverRc,
          vehiclePlate,
          aadharCardNumber,
          vehicleDetails,
          panCard,
        };
        existingDriver.location = location;

        existingDriver.payment = {
          paymentType,
          bankName,
          ifscCode,
          accountNumber,
          upiId,
        };

        existingDriver.isVerified = false;

        await existingDriver.save();

        sendOtpMail(existingDriver.email, otp);

        return res.status(200).json({
          success: true,
          message: "Driver registerd. Verification required.",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "Driver not found. Please contact admin for assistance.",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await Driver.findOne({ email });

    if (user) {
      if (user.otp === otp) {
        user.isVerified = false;
        await user.save();

        const token = await jwt.sign(
          { _id: user._id, role: user.role },
          process.env.SECRET_KEY,
          {
            expiresIn: "24h",
          }
        );

        return res.status(201).json({
          token,
          success: true,
          message: "Email verified successfully wait for admin verification",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Invalid OTP",
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "NO Driver found",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateDriverProfile = async (req, res) => {
  try {
    const driverId = req.params.driverId;
    const {
      name,
      avatar,
      mobile,
      drivingLicence,
      diverRc,
      vehicleDetails,
      vehiclePlate,
      aadharCardNumber,
      panCard,
      location,
      paymentType,
      bankName,
      ifscCode,
      accountNumber,
      upiId,
    } = req.body;

    const driver = await Driver.findById(driverId);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    if (name) driver.name = name;
    if (mobile) driver.mobile = mobile;
    if (drivingLicence) driver.driverDetails.drivingLIcence = drivingLicence;
    if (diverRc) driver.driverDetails.diverRc = diverRc;
    if (vehiclePlate) driver.driverDetails.vehiclePlate = vehiclePlate;
    if (aadharCardNumber)
      driver.driverDetails.adharCardNumber = aadharCardNumber;
    if (vehicleDetails) driver.driverDetails.vehicleDetails = vehicleDetails;
    if (panCard) driver.driverDetails.pencard = panCard;
    if (location) driver.location = location;

    if (paymentType) {
      driver.payment.paymentType = paymentType;
      driver.payment.bankName = bankName || driver.payment.bankName;
      driver.payment.ifscCode = ifscCode || driver.payment.ifscCode;
      driver.payment.accountNumber =
        accountNumber || driver.payment.accountNumber;
      driver.payment.upiId = upiId || driver.payment.upiId;
    }

    await driver.save();

    return res.status(200).json({
      success: true,
      message: "Driver profile updated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const signInDriver = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await User.findOne({ email: email });

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    if (userData.isVerified === false) {
      if (userData.role === "driver") {
        return res.status(202).json({
          success: true,
          message: "Admin approval is Pending.",
        });
      }
    }

    const passwordMatch = await bcrypt.compare(password, userData.password);

    if (passwordMatch) {
      if (userData.role === "driver") {
        const token = jwt.sign(
          { _id: userData._id, role: userData.role },
          process.env.SECRET_KEY,
          {
            expiresIn: "24h",
          }
        );

        return res.status(200).json({
          success: true,
          message: "Signin Successful",
          token: token,
        });
      } else {
        return res.status(403).json({
          success: false,
          message: "Unauthorized Access",
        });
      }
    } else {
      return res.status(403).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const Adminverifydriver = async (req, res) => {
  try {
    const { isVerified, status, rejectionMessage } = req.body;

    const updateData = { isVerified, status };

    if (status === "rejected") {
      updateData.rejectionReason = rejectionMessage;
    }

    if (status === "blocked") {
      updateData.isBlocked = true;
    } else if (status === "unblocked") {
      updateData.isBlocked = false;
    } else {
      updateData.isBlocked = false; // Unblock if not blocked
    }

    const user = await Driver.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    if (status === "rejected") {
      confirmationEmailDriver(status, user.email, rejectionMessage);
    } else if (status === "blocked") {
      // Send blocked email
      confirmationEmailDriver(status, user.email, "You have been blocked.");
    } else if (status === "unblocked") {
      confirmationEmailDriver(
        status,
        user.email,
        "Your account has been unblocked."
      );
    } else {
      confirmationEmailDriver(status, user.email);
    }

    const history = new History({
      userId: req.userId,
      action: "verify",
      performedBy: "admin",
      entityType: "driverVerify",
      entityId: user._id,
      changes: req.body,
    });
    await history.save();
    return res.status(200).json({
      success: true,
      message: `User verified successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const documentVerificationOfDriver = async (req, res) => {
  const driverId = req.params.id;
  const { verification } = req.body;

  try {
    // Find the driver by ID and update verification statuses
    const updatedDriver = await Driver.findByIdAndUpdate(
      driverId,
      { $set: verification }, // Use $set to update only the specified fields
      { new: true, runValidators: true } // Return the updated document and run validation
    );

    if (!updatedDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    return res.status(200).json({
      message: "Driver verification statuses updated successfully",
      updatedDriver,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const listAlldriver = async (req, res) => {
  try {
    const users = await Driver.find();
    console.log("Users>>>", users);
    res.status(200).json({
      success: true,
      results: users.length,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const listAlldriverByPagination = async (req, res) => {
  try {
    const { page = 1, limit = 10, name } = req.query;

    let query = {};
    if (name) {
      query.name = { $regex: name, $options: "i" }; // case-insensitive search
    }

    const totalUsers = await Driver.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limit);
    const currentPage = getValidPage(page, totalPages);

    const users = await Driver.find(query)
      .skip((currentPage - 1) * limit)
      .limit(parseInt(limit));

    console.log("Users>>>", users);
    res.status(200).json({
      success: true,
      results: users.length,
      data: users,
      pagination: {
        currentPage,
        totalPages,
        totalItems: totalUsers,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllOrderByPaginationofDriver = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const driverId = req.params.driver;
    const totalOrders = await Order.countDocuments({ deliveredBy: driverId });

    const totalPages = Math.ceil(totalOrders / limit);
    const currentPage = getValidPage(page, totalPages);

    const orders = await Order.find({ deliveredBy: driverId })
      .skip((currentPage - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    if (!orders) {
      res
        .status(402)
        .json({ success: fasle, message: "driver orders not fount" });
    }

    res.status(200).json({
      success: true,
      results: orders.length,
      data: orders,
      pagination: {
        currentPage,
        totalPages,
        totalItems: totalOrders,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getdriverDetails = async (req, res) => {
  try {
    const driverId = req.params.id;
    const users = await Driver.findOne({ _id: driverId.toString() });
    console.log("Users>>>", users);
    res.status(200).json({
      success: true,

      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getDriverNearToResturant = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.orderId }).populate(
      "restaurant"
    );

    const resturantOrderLocation = order.restaurant.location.coordinates;
    const driver = await findNearbyRestaurants(resturantOrderLocation);

    if (!driver) {
      return res
        .status(404)
        .json({ success: false, message: "Driver not found" });
    }

    res.status(200).json({ success: true, data: driver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const requestReverification = async (req, res) => {
  try {
    const driverId = req.params.id;
    const { updatedDocuments } = req.body;

    const driver = await Driver.findById(driverId);

    if (!driver || driver.isVerified || !driver.rejectionReason) {
      return res.status(400).json({
        success: false,
        message: "Reverification not allowed for this driver",
      });
    }

    // Update driver document details
    if (updatedDocuments) {
      driver.driverDetails = { ...driver.driverDetails, ...updatedDocuments };
    }

    driver.isVerified = false;
    driver.rejectionReason = null;
    driver.status = "pending";

    await driver.save();

    return res.status(200).json({
      success: true,
      message: "Reverification request submitted. Awaiting admin review.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const findNearbyRestaurants = async (restaurantLocation) => {
  try {
    const nearbyRestaurants = await Driver.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: restaurantLocation, // [longitude, latitude]
          },
          distanceField: "distanceFromRestaurant", // Field to store calculated distance
          maxDistance: 500, // Maximum distance in meters (500 meter)
          spherical: true, // Use spherical calculation
        },
      },
    ]);

    return nearbyRestaurants;
  } catch (error) {
    console.error(error);
    return [];
  }
};

module.exports = {
  Adminverifydriver,
  listAlldriver,
  registerForDriverUser,
  updateDriverProfile,
  verifyOTP,
  signInDriver,
  listAlldriverByPagination,
  documentVerificationOfDriver,
  getAllOrderByPaginationofDriver,
  getdriverDetails,
  getDriverNearToResturant,
  requestReverification,
};
