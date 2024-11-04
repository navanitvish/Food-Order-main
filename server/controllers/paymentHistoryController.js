const PaymentHistory = require("../models/paymentHistorySchema");

const creathistory = async (req, res) => {
  try {
    const response = await PaymentHistory.create(req.body);

    res.status(201).json({ success: true, data: response });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const cancelPayment = async (req, res) => {
  try {
    const payment = await PaymentHistory.findByIdAndUpdate(
      req.params.id,
      { status: "canceled" },
      { orderStatus: "payment_failed" },

      { new: true }
    );
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }
    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const approvePayment = async (req, res) => {
  try {
    const payment = await PaymentHistory.findByIdAndUpdate(
      req.params.id,
      { status: "completed" },
      { orderStatus: "payment_successfull" },
      { new: true }
    );
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }
    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const approvePaymentDuringOrder = async (req, res) => {
  try {
    const payment = await PaymentHistory.findByIdAndUpdate(
      req.params.id,
      { orderStatus: "order_placed" },
      { new: true }
    );
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }
    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  creathistory,
  cancelPayment,
  approvePayment,
  approvePaymentDuringOrder,
};
