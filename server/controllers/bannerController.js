const getValidPage = require("../helpers/getValidPageHelper");
const Banner = require("../models/bannereSchema");
const History = require("../models/historySchema");
const Coupon = require("../models/couponSchema");

// Create Banner
const createBanner = async (req, res) => {
  try {
    const response = await Banner.create(req.body);
    console.log(req.body, response);
    res.status(201).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllBanner = async (req, res) => {
  try {
    const currentDate = new Date();
    const banners = await Banner.find().populate("restaurantId");
    const coupons = await Coupon.find({ expiryDate: { $gte: currentDate } });

    const bannersWithCoupons = banners.map((banner) => {
      const matchedCoupons = coupons.filter(
        (coupon) =>
          coupon.restaurantId.toString() === banner.restaurantId._id.toString()
      );

      // Add matched coupons to the banner object
      return {
        ...banner._doc, // Spread banner data
        restaurantId: {
          ...banner.restaurantId._doc, // Spread restaurant data
          coupons: matchedCoupons, // Add matched coupons inside restaurantId
        },
      };
    });
    res.status(200).json(bannersWithCoupons);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const getAllBannerByPagination = async (req, res) => {
  try {
    const { page = 1, limit = 10, name } = req.query;

    let query = {};
    if (name) {
      query.name = { $regex: name, $options: "i" }; // case-insensitive search
    }

    const totalBanner = await Banner.countDocuments(query);
    const totalPages = Math.ceil(totalBanner / limit);

    const currentPage = getValidPage(page, totalPages);
    const skip = (currentPage - 1) * limit;

    const categories = await Banner.find(query)
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: categories,
      pagination: {
        currentPage,
        totalPages,
        totalItems: totalBanner,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getBannerById = async (req, res) => {
  try {
    const Response = await Banner.findById(req.params.id);
    if (!Response) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }
    res.status(200).json({ success: true, data: Response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update banner
const updateBanner = async (req, res) => {
  try {
    console.log("ReqBody>>>", req.body);
    const Response = await Banner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!Response) {
      return res
        .status(404)
        .json({ success: false, message: "Response not found" });
    }

    const history = new History({
      action: "update",
      performedBy: "admin",
      entityType: "banner",
      entityId: Response._id,
      changes: req.body,
    });
    await history.save();
    res.status(200).json({ success: true, data: Response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete Banner
const deleteBanner = async (req, res) => {
  try {
    console.log("ReqParams>>>", req.params);
    const Response = await Banner.findByIdAndDelete(req.params.id);
    if (!Response) {
      return res
        .status(404)
        .json({ success: false, message: "Response not found" });
    }

    const history = new History({
      userId: req.userId,
      action: "delete",
      performedBy: "admin",
      entityType: "banner",
      entityId: Response._id,
      changes: null,
    });

    await history.save();
    res
      .status(200)
      .json({ success: true, message: "Response deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createBanner,
  getAllBanner,
  getBannerById,
  updateBanner,
  deleteBanner,
  getAllBannerByPagination,
};
