const express = require("express");
const router = express.Router();
const {
  addDriverTransaction,
  getDriverSummary,
  getDriverTransactionLog,
} = require("../controllers/driverTransactionController");
const { isAdmin, isDriver } = require("../middlewares/account");

// Route to add transaction details (Driver)
router.post("/add", addDriverTransaction);
router.get("/driver/:driverId", getDriverTransactionLog);

// Route to get driver transaction summary (Super Admin)
router.get("/summary", isAdmin, getDriverSummary);

// Route to get a specific driver's transaction log (Super Admin)
router.get("/:driverId", isAdmin, getDriverTransactionLog);

module.exports = router;
