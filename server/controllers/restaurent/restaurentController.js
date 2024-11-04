const User = require("../../models/userModel.js");
const History = require("../../models/historySchema");
const {
  sendOtpMail,
  sendResetPasswordEmail,
  confirmationEmail,
} = require("../../helpers/emailHelper.js");
const { generateOTP } = require("../../helpers/otpHelper.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Location = require("../../models/locationSchema.js");
const getValidPage = require("../../helpers/getValidPageHelper.js");

const registerForRestaurentUser = async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;
    const userFoundButNotVerified = await User.findOne({
      $or: [
        { email, isVerified: false },
        { mobile, isVerified: false },
      ],
    });

    if (userFoundButNotVerified) {
      sendOtpMail(userFoundButNotVerified.email, userFoundButNotVerified.otp);
      return res.status(400).json({
        success: false,
        message: "User found but not verified",
      });
    }

    const emailFound = await User.findOne({ email });
    const mobileFound = await User.findOne({ mobile });

    if (emailFound) {
      return res
        .status(409)
        .json({ success: false, message: "Email already in use" });
    }

    if (mobileFound) {
      return res
        .status(409)
        .json({ success: false, message: "Mobile number already in use" });
    }

    const otp = generateOTP();

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      mobile,
      email,
      password: hashedPassword,
      otp,
    };

    const user = await User.create(userData);
    sendOtpMail(email, otp);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
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
    const user = await User.findOne({ email });

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
          message: "Email verified successfully",
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
        message: "NO User found",
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
const AdminverifyRestaurentUserById = async (req, res) => {
  try {
    const { isVerified, status } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isVerified, status },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    console.log(user, "from approve or reject");
    confirmationEmail(status, user.email);

    const history = new History({
      userId: req.userId,
      action: "verify",
      performedBy: "admin",
      entityType: "resturantVerify",
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

const listAllUsers = async (req, res) => {
  try {
    const users = await User.find();
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
const listAllResturantOwner = async (req, res) => {
  try {
    const users = await User.find({ role: "restaurent" });
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
const listAllResturantOwnerByPagination = async (req, res) => {
  try {
    const { page = 1, limit = 10, name } = req.query;

    let query = { role: "restaurent" };
    if (name) {
      query.name = { $regex: name, $options: "i" }; // case-insensitive search
    }

    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limit);
    const currentPage = getValidPage(page, totalPages);

    const users = await User.find(query)
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

const getUserProfileAllDetails = async (req, res) => {
  try {
    const userProfile = await User.findById(req.userId)
      .populate({ path: "location" })
      .exec();

    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: userProfile,
      message: "User profile details retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  listAllUsers,
  verifyOTP,
  getUserProfileAllDetails,
  AdminverifyRestaurentUserById,
  listAllResturantOwner,
  registerForRestaurentUser,
  listAllResturantOwnerByPagination,
};
