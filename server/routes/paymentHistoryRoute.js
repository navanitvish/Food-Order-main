const express = require("express");
const router = express.Router();

const {
  approvePayment,
  cancelPayment,
  creathistory,
  approvePaymentDuringOrder,
} = require("../controllers/paymentHistoryController");

router.post("/", creathistory);

router.put("/approve/:id", approvePayment);

router.put("/cancel/:id", cancelPayment);

router.put("/order/:id", approvePaymentDuringOrder);

module.exports = router;
