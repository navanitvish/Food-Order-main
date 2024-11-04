const Order = require("../models/orderModel");
const Restaurant = require("../models/restaurantModel");

const gettopSoldDishes = async (req, res) => {
  try {
    const { startDate, endDate, restaurantId } = req.query;
    const matchConditions = {};

    // Filter by date range if provided
    if (startDate && endDate) {
      matchConditions.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Filter by restaurant name if provided
    if (restaurantId) {
      const restaurant = await Restaurant.findOne({ _id: restaurantId });
      if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }
      matchConditions["items.restaurantId"] = restaurant._id; // Assuming items contain restaurantId for each dish
    }

    const topDishes = await Order.aggregate([
      { $match: matchConditions }, // Match based on date and restaurant filters
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.menuItemId",
          totalSold: { $sum: "$items.quantity" },
          totalRevenue: {
            $sum: { $multiply: ["$items.quantity", "$items.price"] },
          }, // Calculates total revenue
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "menus",
          localField: "_id",
          foreignField: "_id",
          as: "dishDetails",
        },
      },
      { $unwind: "$dishDetails" },
      {
        $project: {
          _id: 0,
          dishId: "$_id",
          totalSold: 1,
          totalRevenue: 1,
          dishName: "$dishDetails.name",
          price: "$dishDetails.price",
        },
      },
    ]);

    res.status(200).json(topDishes);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve top sold dishes" });
  }
};

const customerPerformaceReport = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Convert page and limit to integers
    const pageNum = parseInt(page);
    const pageLimit = parseInt(limit);

    console.log();
    const result = await Order.aggregate([
      {
        $group: {
          _id: "$userId",
          totalOrders: { $sum: 1 },
          completedOrders: {
            $sum: { $cond: [{ $eq: ["$orderStatus", "complete"] }, 1, 0] },
          },
          canceledOrders: {
            $sum: { $cond: [{ $eq: ["$orderStatus", "cancel"] }, 1, 0] },
          },
          totalAmount: { $sum: "$totalAmount" },
          dishCount: { $push: "$items.dishId" },
          restaurantCount: { $push: "$restaurantId" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $addFields: {
          userName: "$userDetails.name",
          joinDate: "$userDetails.joinDate",
        },
      },
      {
        $project: {
          _id: "$_id",
          // userId: "$_id",
          userName: 1,
          joinDate: 1,
          totalOrders: 1,
          completedOrders: 1,
          canceledOrders: 1,
          totalAmount: 1,
        },
      },
      // Pagination
      { $skip: (pageNum - 1) * pageLimit },
      { $limit: pageLimit },
      {
        $facet: {
          userStats: [],
          overallStats: [
            {
              $group: {
                _id: null,
                totalUsers: { $sum: 1 },
                totalOrders: { $sum: "$totalOrders" },
                totalAmount: { $sum: "$totalAmount" },
              },
            },
          ],
        },
      },
      {
        $project: {
          userStats: 1,
          overallStats: { $arrayElemAt: ["$overallStats", 0] },
        },
      },
    ]);

    console.log(result);

    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user order statistics" });
  }
};

const resturantPerformaceReport = async (req, res) => {
  try {
    const { startDate, endDate, page = 1, limit = 10 } = req.query;

    // Convert page and limit to integers
    const pageNum = parseInt(page);
    const pageLimit = parseInt(limit);

    const matchStage = {
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    };

    // const result = await Order.aggregate([
    //   // Filter by date range
    //   // { $match: matchStage },
    //   {
    //     $group: {
    //       _id: "$restaurant._id",
    //       totalOrders: { $sum: 1 },
    //       completedOrders: {
    //         $sum: { $cond: [{ $eq: ["$orderStatus", "complete"] }, 1, 0] },
    //       },
    //       canceledOrders: {
    //         $sum: { $cond: [{ $eq: ["$orderStatus", "cancel"] }, 1, 0] },
    //       },
    //       totalEarnings: { $sum: "$totalAmount" },
    //     },
    //   },
    //   // Lookup to get restaurant details
    //   {
    //     $lookup: {
    //       from: "restaurants",
    //       localField: "_id",
    //       foreignField: "_id",
    //       as: "restaurantDetails",
    //     },
    //   },
    //   { $unwind: "$restaurantDetails" },
    //   // Project required fields
    //   {
    //     $project: {
    //       _id: "$_id",
    //       // restaurantId: "$_id",
    //       restaurantName: "$restaurantDetails.name",
    //       joinDate: "$restaurantDetails.createdAt",
    //       totalOrders: 1,
    //       completedOrders: 1,
    //       canceledOrders: 1,
    //       totalEarnings: 1,
    //     },
    //   },
    //   // Sort by total earnings (optional, change as needed)
    //   // { $sort: { totalEarnings: -1 } },
    //   // Pagination
    //   { $skip: (pageNum - 1) * pageLimit },
    //   { $limit: pageLimit },
    //   // Use facet to separate the main data and overall totals
    //   {
    //     $facet: {
    //       restaurantStats: [],
    //       overallStats: [
    //         {
    //           $group: {
    //             _id: null,
    //             totalRestaurants: { $sum: 1 },
    //             totalOrders: { $sum: "$totalOrders" },
    //             totalEarnings: { $sum: "$totalEarnings" },
    //           },
    //         },
    //       ],
    //     },
    //   },
    //   // Restructure the final result
    //   {
    //     $project: {
    //       restaurantStats: 1,
    //       overallStats: { $arrayElemAt: ["$overallStats", 0] },
    //     },
    //   },
    // ]);

    const orders = await Order.find(matchStage)
      .populate("restaurant", "name") // Populate restaurant details to get the name
      .lean();

    // Prepare a structure to hold statistics
    const stats = {};

    // Calculate statistics
    orders.forEach((order) => {
      const restaurantId = order.restaurant._id.toString();

      if (!stats[restaurantId]) {
        stats[restaurantId] = {
          restaurantName: order.restaurant.name,
          totalOrders: 0,
          completeOrders: 0,
          cancelOrders: 0,
          totalAmount: 0,
        };
      }

      // Increment total orders
      stats[restaurantId].totalOrders += 1;

      // Increment complete or cancel orders
      if (order.orderStatus === "complete") {
        stats[restaurantId].completeOrders += 1;
      } else if (order.orderStatus === "cancel") {
        stats[restaurantId].cancelOrders += 1;
      }

      // Add to the total amount
      stats[restaurantId].totalAmount += order.totalAmount || 0;
    });

    // Convert stats object to an array and calculate overall totals
    const result = Object.values(stats);

    // Pagination logic
    const totalRecords = result.length; // Total records for the paginated results
    const totalPages = Math.ceil(totalRecords / pageLimit); // Total number of pages
    const startIndex = (pageNum - 1) * pageLimit; // Calculate start index for pagination
    const paginatedResults = result.slice(startIndex, startIndex + pageLimit); // Get current page results

    const totalApproveStores = result.length; // Total number of unique restaurants
    const totalOrders = result.reduce((sum, item) => sum + item.totalOrders, 0);
    const totalAmount = result.reduce((sum, item) => sum + item.totalAmount, 0);

    // Prepare the final response
    const response = {
      pagination: {
        totalRecords,
        totalPages,
        currentPage: pageNum,
      },
      totalApproveStores,
      totalOrders,
      totalAmount,

      stores: paginatedResults,
    };

    console.log(
      `Start Date: ${startDate}, End Date: ${endDate}`,
      matchStage,
      result
    );

    // Send the response
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to retrieve restaurant performance report" });
  }
};

const storewiseOrderReport = async (req, res) => {
  try {
    const {
      restaurantName,
      paymentMethod,
      couponCode,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = req.query;

    // Parse page and limit to numbers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const matchStage = {
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    };

    // Add filters for restaurant name, payment method, and coupon code if provided
    if (restaurantName) {
      matchStage["restaurant._id"] = restaurantName.toString(); // Assuming restaurantId is passed
    }
    if (paymentMethod) {
      matchStage["payment.method"] = paymentMethod; // Assuming payment method is in the order object
    }
    if (couponCode) {
      matchStage["coupon.couponcode"] = couponCode; // Assuming coupon code is in the order object
    }

    // Fetch the total number of orders matching the criteria
    const totalOrders = await Order.countDocuments(matchStage);

    // Send the response
    const orders = await Order.find(matchStage)
      .populate("restaurant")
      .populate("coupon")
      .skip((pageNumber - 1) * limitNumber) // Skip the records for previous pages
      .limit(limitNumber)
      .lean();

    console.log(orders);

    // Process data to get the required fields
    const results = orders.map((order) => ({
      date: order.createdAt,
      restaurantName: order.restaurant?.name || "N/A",
      orderId: order.orderId,
      distance: order.restaurant.distanceFromUser, // Assume a calculateDistance function here
      paymentMode: order.payment?.method,
      totalAmount: order.totalAmount,
      couponCode: order.coupon?.couponcode || "N/A",
      couponPercentage: order.coupon?.percentage || 0,
    }));

    const totalPages = Math.ceil(totalOrders / limitNumber);

    // res.status(200).json(orders);
    res.status(200).json({
      success: true,
      data: results,
      pagination: {
        totalOrders,
        totalPages,
        currentPage: pageNumber,
        limit: limitNumber,
      },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to retrieve store-wise order report" });
  }
};

module.exports = {
  gettopSoldDishes,
  customerPerformaceReport,
  resturantPerformaceReport,
  storewiseOrderReport,
};
