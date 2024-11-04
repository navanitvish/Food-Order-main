const express = require("express");
const router = express.Router();
const {
  updateOrderByDriver,
  getOrderByDriver,
} = require("../../controllers/orderController");

const { isDriver } = require("../../middlewares/account");

router.put("/order/:id", updateOrderByDriver);
router.get("/order/:driver", getOrderByDriver);

module.exports = router;
