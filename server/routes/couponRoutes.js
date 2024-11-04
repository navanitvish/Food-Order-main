const express = require("express");
const router = express.Router();
const {
  createCoupon,
  getAllCoupon,
  getcouponById,
  updateCoupon,
  deleteCoupon,
  getAllAdminCoupon,
} = require("../controllers/couponController");
const { isAdmin } = require("../middlewares/account");

router.post("/", isAdmin, createCoupon);
router.get("/", getAllCoupon);
//pagination
router.get("/pag", isAdmin, getAllAdminCoupon);
router.get("/:id", getcouponById);
router.put("/:id", isAdmin, updateCoupon);
router.delete("/:id", isAdmin, deleteCoupon);
module.exports = router;
