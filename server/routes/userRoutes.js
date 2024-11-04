const express = require("express");
const router = express.Router();
const {
  isUser,
  isAdmin,
  accountMiddleware,
} = require("../middlewares/account");

const {
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
  listAllUsers,
  creatUserByAdmin,
  updateUserByAdmin,
  removeUserByAdmin,
  listAllUsersByPagination,
} = require("../controllers/userController");

// Register User Route
router.post("/register", registerUser);
router.post("/register-admin", registerAdmin);

// Verify OTP
router.put("/verify-otp", verifyOTP);

// Sign In User
router.post("/signin", signInUser);
router.post("/login-verify", LoginOTPVerify);
router.post("/signin-admin", signInAdmin);

// Reset Password Route
router.put("/reset-password", isUser, resetPassword);

// Update Account Details
router.put("/update-user", isUser, profileUpdate);

// User Profile
router.get("/profile", isUser, getUserProfile);

router.get("/get-user-profile-all-details", isUser, getUserProfileAllDetails);
router.get("/admin-details-info", accountMiddleware, getUserProfileAllDetails);

// Forgot Password Route
router.post("/forgot-password", forgotPassword);

// Reset Password Route
router.put("/forgot-reset-password", forgotResetPassword);

router.get("/all-users", isAdmin, listAllUsers);

//for pagination
router.get("/pag", isAdmin, listAllUsersByPagination);

//creat user by admin
router.post("/", isAdmin, creatUserByAdmin);
router.put("/:id", isAdmin, updateUserByAdmin);
router.delete("/:id", isAdmin, removeUserByAdmin);

module.exports = router;
