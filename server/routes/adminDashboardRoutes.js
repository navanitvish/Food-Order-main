const express = require("express");
const router = express.Router();
const {
  filterDataDashboard,
  getLatestReviews,
  getNewSignups,
  getRecentOrders,
  getOrderStatusPercentages,
  getTopRestaurantsForMonth,
} = require("../controllers/adminDashBoardController");
const { isAdmin } = require("../middlewares/account");

router.get("/", isAdmin, filterDataDashboard);
router.get("/latest-reviews", isAdmin, getLatestReviews);
router.get("/new-signups", isAdmin, getNewSignups);
router.get("/recent-orders", isAdmin, getRecentOrders);
router.get("/orders/status-percentages", isAdmin, getOrderStatusPercentages);
router.get("/restaurants/top-this-month", isAdmin, getTopRestaurantsForMonth);

module.exports = router;
