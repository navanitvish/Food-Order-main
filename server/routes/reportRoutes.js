const express = require("express");
const router = express.Router();
const {
  customerPerformaceReport,
  gettopSoldDishes,

  resturantPerformaceReport,
  storewiseOrderReport,
} = require("../controllers/reportController");
const { isAdmin } = require("../middlewares/account");

router.get("/customer", isAdmin, customerPerformaceReport);

router.get("/topsold", isAdmin, gettopSoldDishes);

router.get("/resturant", isAdmin, resturantPerformaceReport);
router.get("/order", isAdmin, storewiseOrderReport);

module.exports = router;
