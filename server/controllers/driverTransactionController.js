const DriverTransaction = require("../models/driverTransactionSchema");
const Driver = require("../models/driverSchema");

const addDriverTransaction = async (req, res) => {
  try {
    const { driverId, orderId, cashOnHand, amountPaidToAdmin } = req.body;

    const transaction = new DriverTransaction({
      driverId,
      orderId,
      cashOnHand,
      amountPaidToAdmin,
    });

    await transaction.save();

    res.status(201).json({
      success: true,
      message: "Transaction details added successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDriverSummary = async (req, res) => {
  try {
    const drivers = await DriverTransaction.aggregate([
      {
        $group: {
          _id: "$driverId",
          totalCashOnHand: { $sum: "$cashOnHand" },
          totalPaidToAdmin: { $sum: "$amountPaidToAdmin" },
        },
      },
      {
        $lookup: {
          from: "drivers",
          localField: "_id",
          foreignField: "_id",
          as: "driver",
        },
      },
      {
        $unwind: "$driver",
      },
      {
        $project: {
          driverId: "$_id",
          driverName: "$driver.name",
          totalCashOnHand: 1,
          totalPaidToAdmin: 1,
        },
      },
    ]);

    res.status(200).json({ success: true, data: drivers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDriverTransactionLog = async (req, res) => {
  try {
    const { driverId } = req.params;

    console.log(driverId);
    const transactions = await DriverTransaction.find({ driverId }).sort({
      transactionDate: -1,
    });
    // .select("transactionDate cashOnHand amountPaidToAdmin");

    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDriverTransactionLog,
  getDriverSummary,
  addDriverTransaction,
};
