const Order = require("../models/orderModel");
const History = require("../models/historySchema");
const User = require("../models/userModel");
const Restaurant = require("../models/restaurantModel");
const Driver = require("../models/driverSchema");
const { getIO } = require("../socket");
const getValidPage = require("../helpers/getValidPageHelper");

const calculateAverageRating = (order) => {
  const items = order.reduce(
    (acc, item) => acc + (item.menuItemId.rating ? item.menuItemId.rating : 0),
    0
  );

  const averageRating = +items / order.length;

  return averageRating;
};

const createOrder = async (req, res) => {
  try {
    const data = req.body;
    const order = new Order({
      ...data,
      userId: req.userId,
    });

    console.log(order, req.userId, "from order", data);

    await order.save();
    const averageRating = calculateAverageRating(order.items);
    order.averageRating = averageRating;
    await order.save();
    // const io = getIO();

    // io.emit("newOrder", order);
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const validateOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const restaurantId = req.params.restaurantId;
    const user = await User.findById(userId);
    const userLocation = user.location.coordinates;

    console.log(user, restaurantId, req.params);
    const nearbyRestaurants = await Restaurant.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: userLocation, // User's location [longitude, latitude]
          },
          distanceField: "distanceFromUser", // Calculate distance
          maxDistance: 8000, // Maximum 8 km
          spherical: true, // Spherical distance calculation
        },
      },
    ]);

    const findResturant = nearbyRestaurants.find(
      (rest) => rest._id.toString() === restaurantId.toString()
    );

    console.log(findResturant);

    if (!findResturant) {
      return res.status(404).json({
        success: false,
        message: "user Location far away by restaurant Location",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Resturant near to User Loaction" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .populate("restaurant")
      .populate("coupon")
      .populate({
        path: "items.menuItemId", // Path to populate
      });
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const allOrders = await Order.find()
      .populate("userId", "name email")
      // .populate("items.menuItemId", "name price")
      .populate({
        path: "items.menuItemId",
        populate: {
          path: "restaurantId",
        },
      })
      .populate("restaurant")
      .populate("coupon");

    res.status(200).json({
      success: true,
      data: allOrders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllOrderByPagination = async (req, res) => {
  try {
    const { page = 1, limit = 10, name } = req.query;

    let query = {};
    if (name) {
      query.name = { $regex: name, $options: "i" }; // case-insensitive search
    }

    const totalOrders = await Order.countDocuments(query);
    const totalPages = Math.ceil(totalOrders / limit);
    const currentPage = getValidPage(page, totalPages);

    const allOrders = await Order.find(query)
      .populate("userId", "name email")
      .populate({
        path: "items.menuItemId",
        populate: {
          path: "restaurantId",
          select: "name image address rating",
        },
      })
      .populate("restaurant")
      .skip((currentPage - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: allOrders,
      pagination: {
        currentPage,
        totalPages,
        totalItems: totalOrders,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getOneOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Order.findById(id)
      .populate("userId", "name email")
      .populate("items.menuItemId", "name price image additionalOption")
      .populate("restaurant");
    if (!response) {
      return res
        .status(200)
        .json({ success: false, message: "order not found" });
    }
    res.status(200).json({ success: true, data: response });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getSingleOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Order.findById(id)
      .populate("userId", "name email")
      .populate("items.menuItemId", "name price")
      .populate("restaurant");
    if (!response) {
      return res
        .status(200)
        .json({ success: false, message: "order not found" });
    }
    res.status(200).json({ success: true, data: response });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    console.log(req.role);
    const history = new History({
      userId: req.userId,
      action: "update",
      performedBy: req.role,
      entityType: "order",
      entityId: order._id,
      changes: req.body,
    });

    await history.save();
    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    console.log(req.role);
    const history = new History({
      userId: req.userId,
      action: "update",
      performedBy: req.role,
      entityType: "order",
      entityId: order._id,
      changes: req.body,
    });

    await history.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (err) {
    console.log(err, "from status update");
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const history = new History({
      userId: req.userId,
      action: "delete",
      performedBy: req.role === "admin" ? "admin" : "restaurent",
      entityType: "order",
      entityId: order._id,
      changes: null,
    });

    await history.save();
    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const orderDatbystatus = async (req, res) => {
  try {
    const { status } = req.params;
    const { search } = req.query;
    if (!status) {
      return res
        .status(400)
        .json({ message: "orderStatus query parameter is required" });
    }

    const query = { userId: req.userId };

    if (search) {
      query.$or = [
        { orderId: { $regex: search, $options: "i" } }, // Search by orderId
      ];
    }

    if (status === "all") {
      const response = await Order.find(query)
        .populate("restaurant")
        .populate({
          path: "items.menuItemId",
          populate: {
            path: "restaurantId",
            select: "name image address rating",
          },
        });

      const updatedOrders = response.map((order) => {
        const averageRating = calculateAverageRating(order.items);
        order.averageRating = averageRating;
        order.save();
        return order;
      });

      // console.log(response);
      return res.status(200).json(updatedOrders);
    }

    query.orderStatus = status;

    const orders = await Order.find(query).populate({
      path: "items.menuItemId",
      populate: {
        path: "restaurantId",
        select: "name image address rating",
      },
    });

    const updatedOrders = orders.map((order) => {
      const averageRating = calculateAverageRating(order.items); // No await
      order.averageRating = averageRating;
      order.save();
      return order;
    });

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found with the specified orderStatus" });
    }
    return res.status(200).json(updatedOrders);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

//For restaurent
const getAllOrderByrestaurent = async (req, res) => {
  try {
    const { restId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const restaurantObjectId = restId.toString();

    const allOrders = await Order.find()
      .populate("userId", "name email")
      .populate({
        path: "items.menuItemId",
        populate: {
          path: "restaurantId",
          select: "name image address rating",
        },
      })
      .populate("restaurant")
      .populate("deliveredBy")
      .exec();

    const filterOrders = allOrders.filter((order) =>
      order.items.some(
        (item) =>
          item.menuItemId.restaurantId &&
          item.menuItemId.restaurantId.equals(restaurantObjectId)
      )
    );

    const totalOrders = filterOrders.length;
    const totalPages = Math.ceil(totalOrders / limit);
    const currentPage = getValidPage(page, totalPages);
    const skip = (currentPage - 1) * limit;

    const paginatedOrders = filterOrders.slice(skip, skip + parseInt(limit));

    const updatedOrders = paginatedOrders.map((order) => {
      const averageRating = calculateAverageRating(order.items); // No await
      order.averageRating = averageRating.toFixed(1);

      order.save();
      return order;
    });

    // console.log(updatedOrders, filterOrders);

    res.status(200).json({
      success: true,
      data: updatedOrders,
      pagination: {
        currentPage,
        totalPages,
        totalItems: totalOrders,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//for when click on resturnt this order transection will come for perticular resturant
const getAllOrderForTransectionByrestaurent = async (req, res) => {
  try {
    const { restId } = req.params;
    const {
      page = 1,
      limit = 10,
      paymentMethod,
      startDate,
      endDate,
      restaurantName,
    } = req.query;

    const restaurantObjectId = restId.toString();

    const allOrders = await Order.find()
      .populate("userId")
      .populate({
        path: "items.menuItemId",
        populate: {
          path: "restaurantId",
        },
      })
      .populate("restaurant")
      .populate("deliveredBy")
      .exec();

    // Filter orders by restaurantId
    const filterOrders = allOrders.filter((order) =>
      order.items.some(
        (item) =>
          item.menuItemId.restaurantId &&
          item.menuItemId.restaurantId.equals(restaurantObjectId)
      )
    );

    // Further filter by payment method, start date, end date, and restaurant name if provided
    const filteredOrders = filterOrders.filter((order) => {
      // Payment method filter
      const paymentMethodMatches = paymentMethod
        ? order.paymentMethod === paymentMethod
        : true;

      // Date range filter
      const orderDate = new Date(order.createdAt); // Adjust if your date field is different
      const startDateMatches = startDate
        ? orderDate >= new Date(startDate)
        : true;
      const endDateMatches = endDate ? orderDate <= new Date(endDate) : true;

      // Restaurant name filter
      const restaurantNameMatches = restaurantName
        ? order.restaurant.name
            .toLowerCase()
            .includes(restaurantName.toLowerCase())
        : true;

      return (
        paymentMethodMatches &&
        startDateMatches &&
        endDateMatches &&
        restaurantNameMatches
      );
    });

    const totalOrders = filteredOrders.length;
    const totalPages = Math.ceil(totalOrders / limit);
    const currentPage = getValidPage(page, totalPages);
    const skip = (currentPage - 1) * limit;

    const paginatedOrders = filteredOrders.slice(skip, skip + parseInt(limit));

    const updatedOrders = paginatedOrders.map((order) => {
      const averageRating = calculateAverageRating(order.items);
      order.averageRating = averageRating.toFixed(1);

      return {
        orderId: order._id,
        orderDate: order.createdAt,
        restaurantName: order.restaurant.name,
        paymentMethod: order.paymentMethod,
        totalAmount: order.totalAmount,
        averageRating: order.averageRating,
      };
    });

    res.status(200).json({
      success: true,
      data: updatedOrders,
      pagination: {
        currentPage,
        totalPages,
        totalItems: totalOrders,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const orderBySrartusResturentOwner = async (req, res) => {
  const { status } = req.params;
  const ownerId = req.userId;

  console.log(req.userId, req.role);
  try {
    const { page = 1, limit = 10 } = req.query;

    const query = status && status !== "all" ? { orderStatus: status } : {};

    console.log(status, "from restirant");
    const orders = await Order.find(query)

      .populate("userId", "name email")
      .populate("deliveredBy", "name email")
      .populate({
        path: "items.menuItemId",
        populate: {
          path: "restaurantId",
          match: { owner: ownerId },
          select: "_id name image",
        },
      })
      .lean()
      .exec();

    // const filteredOrders = orders.filter((order) => order.restaurant !== null);
    const filteredOrders = orders.filter((order) =>
      order.items.some(
        (item) => item.menuItemId && item.menuItemId.restaurantId
      )
    );

    const totalOrders = filteredOrders.length;

    const totalPages = Math.ceil(totalOrders / limit);

    const currentPage = getValidPage(page, totalPages);

    const skip = (currentPage - 1) * limit;

    const paginatedOrders = filteredOrders.slice(skip, skip + parseInt(limit));

    return res.status(200).json({
      success: true,
      data: paginatedOrders,
      pagination: {
        currentPage,
        totalPages,
        totalItems: totalOrders,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getOrderByDriver = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const totalOrders = await Order.countDocuments({
      deliveredBy: req.params.driver,
    });
    const totalPages = Math.ceil(totalOrders / limit);
    const currentPage = getValidPage(page, totalPages);

    const order = await Order.find({ deliveredBy: req.params.driver })
      .skip((currentPage - 1) * limit)
      .limit(parseInt(limit));

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      data: order,
      pagination: {
        currentPage,
        totalPages,
        totalItems: totalOrders,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateOrderByDriver = async (req, res) => {
  try {
    // Find the order by ID
    const order = await Order.findById(req.params.id);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if the order is assigned to the driver
    if (order.deliveredBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this order",
      });
    }

    // Update the order with the new data
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    // Log the update action in the history
    const history = new History({
      userId: req.userId,
      action: "update",
      performedBy: req.role,
      entityType: "order",
      entityId: updatedOrder._id,
      changes: req.body,
    });

    await history.save();

    // Respond with the updated order
    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllOrder,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  orderDatbystatus,
  getOneOrderById,
  getAllOrderByrestaurent,
  orderBySrartusResturentOwner,
  getSingleOrderById,
  updateOrderStatus,
  getAllOrderByPagination,
  validateOrder,
  getAllOrderForTransectionByrestaurent,
  getOrderByDriver,
  updateOrderByDriver,
};
