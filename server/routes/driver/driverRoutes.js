const express = require("express");
const router = express.Router();
const { isUser, isDriver, isAdmin } = require("../../middlewares/account");

const {
  Adminverifydriver,
  listAlldriver,
  registerForDriverUser,
  updateDriverProfile,
  signInDriver,
  verifyOTP,
  listAlldriverByPagination,
  documentVerificationOfDriver,
  getAllOrderByPaginationofDriver,
  getdriverDetails,
  getDriverNearToResturant,
  requestReverification,
} = require("../../controllers/driver/driverController");

router.post("/register", registerForDriverUser);
router.put("/update", isDriver, updateDriverProfile);
router.put("/verify", verifyOTP);
router.post("/login", signInDriver);

router.patch("/:id", isAdmin, Adminverifydriver);
router.patch("/reverify/:id", isDriver, requestReverification);

router.get("/all", isAdmin, listAlldriver);
router.get("/pag", isAdmin, listAlldriverByPagination);
router.get("/:id", isAdmin, getdriverDetails);

router.put("/:id/verify", isAdmin, documentVerificationOfDriver);
router.get("/order/pag", isAdmin, getAllOrderByPaginationofDriver);
router.get("/order/:orderId", isAdmin, getDriverNearToResturant);

module.exports = router;
