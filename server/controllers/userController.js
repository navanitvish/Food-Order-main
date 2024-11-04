const User = require("../models/userModel.js");
const Driver = require("../models/driverSchema.js");
const History = require("../models/historySchema.js");
const {
  sendOtpMail,
  sendResetPasswordEmail,
} = require("../helpers/emailHelper.js");
const { generateOTP } = require("../helpers/otpHelper.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Location = require("../models/locationSchema.js");
const getValidPage = require("../helpers/getValidPageHelper.js");

const registerUser = async (req, res) => {
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
// const registerAdmin = async (req, res) => {
//   try {
//     const { name, mobile, email, password } = req.body;

//     // Check if email or mobile number is found but not verified
//     const userFoundButNotVerified = await User.findOne({
//       $or: [
//         { email, isVerified: false },
//         { mobile, isVerified: false },
//       ],
//     });

//     if (userFoundButNotVerified) {
//       sendOtpMail(userFoundButNotVerified.email, userFoundButNotVerified.otp);
//       return res.status(400).json({
//         success: false,
//         message: "User found but not verified",
//       });
//     }

//     const emailFound = await User.findOne({ email });
//     const mobileFound = await User.findOne({ mobile });

//     if (emailFound) {
//       return res
//         .status(409)
//         .json({ success: false, message: "Email already in use" });
//     }

//     if (mobileFound) {
//       return res
//         .status(409)
//         .json({ success: false, message: "Mobile number already in use" });
//     }

//     const otp = generateOTP();

//     const saltRounds = 10;
//     const salt = await bcrypt.genSalt(saltRounds);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const userData = {
//       name,
//       mobile,
//       email,
//       password: hashedPassword,
//       otp,
//       role: "admin",
//     };

//     const user = await User.create(userData);
//     sendOtpMail(email, otp);

//     return res.status(201).json({
//       success: true,
//       message: "User created successfully",
//       data: user,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

const registerAdmin = async (req, res) => {
  try {
    const { name, mobile, email, password, role } = req.body;

    if (role !== "restaurent") {
      return res.status(403).json({
        success: false,
        message: "Only restaurant users can be created.",
      });
    }

    // Find user by email or mobile, regardless of verification status
    const existingUser = await User.findOne({
      $or: [
        { email, isVerified: false },
        { mobile, isVerified: false },
      ],
    });

    if (existingUser) {
      if (!existingUser.password) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        existingUser.password = hashedPassword;
        existingUser.name = name || existingUser.name;
        existingUser.role = existingUser.role || role;
        existingUser.isVerified = false;
        existingUser.isSelfRegistered = true;
        existingUser.mobile = mobile;
        const otp = generateOTP();
        existingUser.otp = otp;

        await existingUser.save();

        sendOtpMail(existingUser.email, otp);

        return res.status(200).json({
          success: true,
          message: "User updated with password. OTP sent for verification.",
        });
      }

      return res.status(409).json({
        success: false,
        message: "User already registered. Please log in.",
      });
    }

    // res
    //   .status(402)
    //   .json({ success: false, message: "Cant Creat Admin from here" });

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
      role: "restaurent",
    };

    const newUser = await User.create(userData);
    sendOtpMail(email, otp); // Send OTP for verification

    return res.status(201).json({
      success: true,
      message: "User created successfully. OTP sent for verification.",
      data: newUser,
    });
  } catch (err) {
    console.error("Error during user registration:", err);
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
        if (user.role === "admin" || user.role === "user") {
          user.isVerified = true;
        } else {
          user.isVerified = false;
        }

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
          message: `${
            user.role === "admin" || user.role === "user"
              ? "Email verified successfully"
              : "Email verified but waite for admin verification"
          }`,
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
const LoginOTPVerify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      if (user.otp === otp) {
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
          message: "Logged in successfully",
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
const resendOTPForLoginVerify = async (req, res) => {
  try {
    const { email } = req.body;
    const resp = await User.findOne();
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email: email });

    if (!userData || email != userData.email) {
      return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    const role = userData.role;

    if (userData) {
      if (userData.isVerified == false) {
        return res.status(403).json({
          success: false,
          message: "Please verify your email",
          role: role,
        });
      }

      const passwordMatch = await bcrypt.compare(password, userData.password);

      if (passwordMatch) {
        const otp = generateOTP();

        console.log(otp, "user login");
        sendOtpMail(email, otp);
        userData.otp = otp;
        await userData.save();
        return res.status(200).json({
          success: true,
          message: "successfully sent Login OTP on Email",
        });
      } else {
        return res.status(403).json({
          success: false,
          message: "Invalid Email or Password",
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const signInAdmin = async (req, res) => {
  try {
    console.log("admin login>>>", req.body);
    const { email, password } = req.body;

    const userData = await User.findOne({ email: email });

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    if (userData.isVerified === false) {
      if (userData.role !== "admin") {
        return res.status(202).json({
          success: true,
          message: "Admin approval is Pending.",
        });
      }
      return res.status(403).json({
        success: false,
        message: "Please verify your email",
      });
    }

    const passwordMatch = await bcrypt.compare(password, userData.password);

    if (passwordMatch) {
      if (
        userData.role === "admin" ||
        userData.role === "restaurent" ||
        userData.role === "driver"
      ) {
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
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.account; // Extract user ID from the request object set by the middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify old password
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid old password",
      });
    }

    // Update password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.resetToken = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const min = 100000;
    const max = 999999;
    const OTP = Math.floor(Math.random() * (max - min + 1)) + min;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Email credentials" });
    }
    await User.findByIdAndUpdate(user._id, { otp: OTP }, { new: true });

    sendOtpMail(email, OTP);
    return res
      .status(200)
      .json({ success: true, message: "OTP has been sent on you email " });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const forgotResetPassword = async (req, res) => {
  try {
    const { otp, email, newPassword } = req.body;

    const user = await User.findOne({ email, otp });

    if (!user) {
      Alert(email);
      return res
        .status(401)
        .json({ success: false, message: "Invalid OTP or email." });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    const response = await User.findByIdAndUpdate(
      user._id,
      { password: hashPassword },
      { new: true }
    );
    if (!response)
      return res
        .status(401)
        .json({ success: false, message: "password Not Update" });
    res
      .status(200)
      .json({ success: true, message: "Password has been changed" });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Something went wrong..." });
  }
};
const profileUpdate = async (req, res) => {
  try {
    const id = req.userId;
    const userData = req.body;

    // const fieldsToUpdate = {
    //   email: userData.email,
    //   mobile: userData.mobile,
    //   name: userData.name,
    //   avatar: userData?.avatar || "",
    //   dob: userData?.dob,
    //   gender: userData?.gender | "",
    //   address: userData?.address || "",
    // };
    // Find and update user with specified fields
    const dbUpdateUserData = await User.findByIdAndUpdate(id, userData, {
      new: true,
    }).select("-password -otp -role -isVerified");

    return res.status(200).json({ success: true, dbUpdateUserData });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    console.log(req.userId);
    const user = await User.findById(req.userId).select(
      "-password -otp -isVerified"
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const listAllUsers = async (req, res) => {
  try {
    const { role } = req.query;

    if (!role) {
      return res.status(400).json({ message: "Role parameter is required" });
    }

    if (role === "all") {
      const users = await User.find();

      return res.status(200).json({
        success: true,
        results: users.length,
        data: users,
      });
    }

    const users = await User.find({ role: role });

    return res.status(200).json({
      success: true,
      results: users.length,
      data: users,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const listAllUsersByPagination = async (req, res) => {
  try {
    const { role, page = 1, limit = 10, name } = req.query;

    if (!role) {
      return res.status(400).json({ message: "Role parameter is required" });
    }

    let query = {};

    if (role !== "all") {
      query.role = role;
    }

    if (name) {
      query.name = { $regex: name, $options: "i" }; // case-insensitive search
    }

    console.log(query, name);

    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limit);

    const currentPage = getValidPage(page, totalPages);

    const skip = (currentPage - 1) * limit;

    const users = await User.find(query).skip(skip).limit(parseInt(limit));

    return res.status(200).json({
      success: true,

      data: users,
      pagination: {
        currentPage,
        totalPages,
        totalItems: totalUsers,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
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

const creatUserByAdmin = async (req, res) => {
  try {
    const newUserData = req.body;

    if (newUserData.role === "driver") {
      const driver = new Driver(newUserData);
      const user = new User(newUserData);
      await user.save({ validateModifiedOnly: true });
      await driver.save({ validateModifiedOnly: true });

      return res.status(201).json({
        success: true,
        data: driver,
      });
    }

    // Create the user without password validation
    const user = new User(newUserData);

    // Save the user and only validate modified fields
    await user.save({ validateModifiedOnly: true });

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const updateUserByAdmin = async (req, res) => {
  try {
    const response = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    console.log("User>>>", response);
    if (!response) {
      const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!driver) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      } else {
        const history = new History({
          userId: req.userId,
          action: "update",
          performedBy: "admin",
          entityType: "driver",
          entityId: response._id,
          changes: req.body,
        });

        await history.save();
        return res.status(201).json({
          success: true,
          data: response,
        });
      }
    }

    const history = new History({
      userId: req.userId,
      action: "update",
      performedBy: "admin",
      entityType: "user",
      entityId: response._id,
      changes: req.body,
    });

    await history.save();
    return res.status(201).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const removeUserByAdmin = async (req, res) => {
  try {
    const response = await User.findByIdAndDelete(req.params.id);

    if (!response) {
      res.status(404).json({ success: false, message: "User not found" });
    }

    const history = new History({
      userId: req.userId,
      action: "delete",
      performedBy: "admin",
      entityType: "user",
      entityId: response._id,
      changes: null,
    });

    await history.save();
    return res.status(201).json({
      success: true,
      data: response,
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
  registerUser,
  registerAdmin,
  verifyOTP,
  signInUser,
  signInAdmin,
  profileUpdate,
  getUserProfile,
  resetPassword,
  forgotPassword,
  forgotResetPassword,
  getUserProfileAllDetails,
  LoginOTPVerify,
  creatUserByAdmin,
  updateUserByAdmin,
  removeUserByAdmin,
  listAllUsersByPagination,
};
