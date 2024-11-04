const Order = require("../models/orderModel");
const User = require("../models/userModel.js");
const Restaurant = require("../models/restaurantModel");
const Review = require("../models/reviewSchema");

const filterDataDashboard = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let startDateFilter = null;
    let endDateFilter = null;

    if (startDate && endDate) {
      startDateFilter = new Date(startDate);
      endDateFilter = new Date(endDate);
      // Adjust the end date to include the entire day until 23:59:59
      endDateFilter.setHours(23, 59, 59, 999);
    }

    const orders = await Order.find({
      createdAt: { $gte: startDateFilter, $lte: endDateFilter },
    });

    const users = await User.find({
      createdAt: { $gte: startDateFilter, $lte: endDateFilter },
    });

    const restaurants = await Restaurant.find({
      createdAt: { $gte: startDateFilter, $lte: endDateFilter },
    });

    // Example of calculating total earnings from completed orders
    const completedOrders = await Order.find({
      createdAt: { $gte: startDateFilter, $lte: endDateFilter },
      status: "completed", // Ensure your order schema uses this status value for completed orders
    });
    const totalEarnings = completedOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    res.status(200).json({
      success: true,
      data: {
        orderCount: orders.length,
        userCount: users.length,
        restaurantCount: restaurants.length,
        totalEarnings,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getRecentOrders = async (req, res) => {
  try {
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10) // Adjust the limit as needed
      .populate("userId") // Populate userId fields if needed
      .populate("restaurant"); // Populate restaurant fields if needed
    res.status(200).json(recentOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNewSignups = async (req, res) => {
  try {
    const newSignups = await User.find().sort({ createdAt: -1 }).limit(10); // Adjust the limit as needed
    res.status(200).json(newSignups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLatestReviews = async (req, res) => {
  try {
    const latestReviews = await Review.find()
      .sort({ createdAt: -1 })
      .limit(10) // Adjust the limit as needed
      .populate("userId menuId"); // Populate related fields as needed
    res.status(200).json(latestReviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrderStatusPercentages = async (req, res) => {
  try {
    // const startOfDay = new Date();
    // startOfDay.setHours(0, 0, 0, 0);
    // const endOfDay = new Date();
    // endOfDay.setHours(23, 59, 59, 999);

    const { startDate, endDate } = req.query;
    let startDateFilter = null;
    let endDateFilter = null;

    if (startDate && endDate) {
      startDateFilter = new Date(startDate);
      endDateFilter = new Date(endDate);
      // Adjust the end date to include the entire day until 23:59:59
      endDateFilter.setHours(23, 59, 59, 999);
    }

    // Step 1: Group orders by status and count them
    const orderStatusCounts = await Order.aggregate([
      {
        $match: {
          //   createdAt: { $gte: startOfDay, $lte: endOfDay },
          createdAt: { $gte: startDateFilter, $lte: endDateFilter },
        },
      },
      {
        $group: {
          _id: "$orderStatus",
          count: { $sum: 1 },
        },
      },
    ]);

    // Step 2: Calculate the total number of orders
    const totalOrders = orderStatusCounts.reduce(
      (total, status) => total + status.count,
      0
    );

    // Step 3: Calculate the percentage of each status
    const orderStatusPercentages = orderStatusCounts.map((status) => ({
      status: status._id,
      percentage: ((status.count / totalOrders) * 100).toFixed(2),
    }));

    // Step 4: Send the result
    res.status(200).json({
      success: true,
      data: orderStatusPercentages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getTopRestaurantsForMonth = async (req, res) => {
  try {
    // Step 1: Define the start and end of the current month
    const startOfMonth = new Date();
    startOfMonth.setDate(1); // Set to the first day of the month
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1); // Move to next month
    endOfMonth.setDate(0); // Set to the last day of the current month
    endOfMonth.setHours(23, 59, 59, 999);

    // Step 2: Filter orders by current month and completed status, then group by restaurant
    const topRestaurants = await Order.aggregate([
      {
        $match: {
          orderStatus: "complete",
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: "$restaurant",
          orderCount: { $sum: 1 }, // Count the number of completed orders per restaurant
          totalRevenue: { $sum: "$totalAmount" }, // Sum totalAmount to get revenue per restaurant
        },
      },
      {
        $sort: { orderCount: -1 }, // Sort by order count in descending order
      },
      {
        $limit: 10, // Limit to top 10 restaurants; adjust as needed
      },
      {
        $lookup: {
          from: "restaurants", // Name of your Restaurant collection
          localField: "_id",
          foreignField: "_id",
          as: "restaurantDetails",
        },
      },
      {
        $unwind: "$restaurantDetails",
      },
      {
        $project: {
          restaurantId: "$_id",
          restaurantName: "$restaurantDetails.name",
          orderCount: 1,
          totalRevenue: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: topRestaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  filterDataDashboard,
  getRecentOrders,
  getNewSignups,
  getLatestReviews,
  getOrderStatusPercentages,
  getTopRestaurantsForMonth,
};
