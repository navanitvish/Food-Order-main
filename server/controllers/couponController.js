const getValidPage = require("../helpers/getValidPageHelper");
const Coupon = require("../models/couponSchema");
const History = require("../models/historySchema");

const createCoupon = async (req, res) => {
  try {
    const response = await Coupon.create(req.body);
    res.status(201).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllCoupon = async (req, res) => {
  try {
    const categories = await Coupon.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const getAllAdminCoupon = async (req, res) => {
  try {
    const { page = 1, limit = 10, code } = req.query;

    let query = {};

    if (code) {
      query.couponcode = { $regex: code, $options: "i" };
    }

    const totalCoupon = await Coupon.countDocuments(query);
    const totalPages = Math.ceil(totalCoupon / limit);

    const currentPage = getValidPage(page, totalPages);

    const coupons = await Coupon.find(query)
      .skip((currentPage - 1) * limit)
      .limit(parseInt(limit))
      .populate("restaurantId");

    console.log(query, code, coupons);

    res.status(200).json({
      success: true,
      data: coupons,
      pagination: {
        currentPage,
        totalPages,
        totalItems: totalCoupon,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const getCouponbyRestaurant = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const userId = req.userId;

    const coupons = await Coupon.find().populate("restaurantId");

    const ownerResturantCoupon = coupons.filter(
      (coupon) =>
        coupon.restaurantId && coupon.restaurantId.owner.toString() === userId
    );

    const totalCoupon = ownerResturantCoupon.length;
    const totalPages = Math.ceil(totalCoupon / limit);

    const currentPage = getValidPage(page, totalPages);

    const paginatedCoupons = ownerResturantCoupon.slice(
      (currentPage - 1) * limit,
      currentPage * limit
    );

    res.status(200).json({
      success: true,
      data: paginatedCoupons,
      pagination: {
        currentPage,
        totalPages,
        totalItems: totalCoupon,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getcouponById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Coupon.findById(id);
    if (!response) {
      return res
        .status(402)
        .json({ success: false, message: "Coupon Not Found" });
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateCoupon = async (req, res) => {
  try {
    const Response = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!Response) {
      return res
        .status(404)
        .json({ success: false, message: "Coupon not found" });
    }

    const history = new History({
      userId: req.userId,
      action: "update",
      performedBy: req.role,
      entityType: "coupon",
      entityId: Response._id,
      changes: req.body,
    });

    await history.save();
    res.status(200).json({ success: true, data: Response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete Coupon
const deleteCoupon = async (req, res) => {
  try {
    const Response = await Coupon.findByIdAndDelete(req.params.id);
    if (!Response) {
      return res
        .status(404)
        .json({ success: false, message: "Coupon not found" });
    }

    const history = new History({
      userId: req.userId,
      action: "delete",
      performedBy: req.role,
      entityType: "coupon",
      entityId: Response._id,
      changes: null,
    });

    await history.save();
    res
      .status(200)
      .json({ success: true, message: "Coupon deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createCoupon,
  getAllCoupon,
  getcouponById,
  updateCoupon,
  deleteCoupon,
  getAllAdminCoupon,
  getCouponbyRestaurant,
};
