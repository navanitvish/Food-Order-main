const Review = require("../models/reviewSchema");
const Menu = require("../models/menuModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");

const getValidPage = require("../helpers/getValidPageHelper");

const calculateAverageRating = async (menuId) => {
  const reviews = await Review.find({ menuId });
  const totalStars = reviews.reduce((acc, review) => acc + review.star, 0);
  const averageRating = totalStars / reviews.length || 0;
  await Menu.findByIdAndUpdate(menuId, {
    rating: averageRating,
    star: averageRating,
  });
  return averageRating;
};

const createReview = async (req, res) => {
  try {
    const { userId, menuId, comment, orderId, star } = req.body;
    const newReview = new Review({
      userId,
      menuId,
      orderId,
      comment,
      star,
    });

    await newReview.save();

    const averageRating = await calculateAverageRating(menuId);

    res.status(201).json({ message: "Review created", averageRating });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatereview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { comment, star } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { comment, star },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    const averageRating = await calculateAverageRating(updatedReview.menuId);

    res.status(200).json({ message: "Review updated", averageRating });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletereview = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    const averageRating = await calculateAverageRating(deletedReview.menuId);

    res.status(200).json({ message: "Review deleted", averageRating });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getreviwBymenuId = async (req, res) => {
  try {
    const { menuId } = req.params;
    const { rating } = req.query;

    let query = {
      menuId: menuId,
    };
    if (rating === "negative") {
      query.star = { $lt: 3 };
    } else if (rating === "positive") {
      query.star = { $gt: 3 };
    } else if (rating == 1) {
      query.star = 1;
    } else if (rating == 2) {
      query.star = 2;
    } else if (rating == 3) {
      query.star = 3;
    } else if (rating == 4) {
      query.star = 4;
    } else if (rating == 5) {
      query.star = 5;
    }

    const reviews = await Review.find(query).populate("userId");

    let rangeStar = {
      5: await Review.countDocuments({ menuId: menuId, star: 5 }),
      4: await Review.countDocuments({ menuId: menuId, star: 4 }),
      3: await Review.countDocuments({ menuId: menuId, star: 3 }),
      2: await Review.countDocuments({ menuId: menuId, star: 2 }),
      1: await Review.countDocuments({ menuId: menuId, star: 1 }),
    };

    const reviewCount = await Review.countDocuments({ menuId: menuId });

    res
      .status(200)
      .json({ reviews, totalReviewCount: reviewCount, totalRange: rangeStar });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllReview = async (req, res) => {
  try {
    const reviews = await Review.find().populate("userId menuId");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllReviewByPagination = async (req, res) => {
  try {
    const { page = 1, limit = 10, name } = req.query;

    let userFilter = {};

    // If `name` is provided, find users with a matching name
    if (name) {
      userFilter = { name: { $regex: name, $options: "i" } }; // case-insensitive search
    }

    // Find user IDs matching the name filter, if provided
    const users = await User.find(userFilter).select("_id");
    const userIds = users.map((user) => user._id);

    // Build review query
    let reviewQuery = {};
    if (name) {
      reviewQuery.userId = { $in: userIds };
    }

    const totalReviews = await Review.countDocuments(reviewQuery);
    const totalPages = Math.ceil(totalReviews / limit);

    const currentPage = getValidPage(page, totalPages);

    const skip = (currentPage - 1) * limit;
    const reviews = await Review.find(reviewQuery)
      .populate("userId menuId")
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: reviews,
      pagination: {
        currentPage,
        totalPages,
        totalItems: totalReviews,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
const getReviewByRating = async (req, res) => {
  try {
    const { rating } = req.query;

    let query = {};

    if (rating === "negative") {
      query = { star: { $lt: 3 } };
    } else if (rating === "positive") {
      query = { star: { $gt: 3 } };
    } else if (rating == 4) {
      query = { star: 4 };
    } else if (rating == 5) {
      query = { star: 5 };
    } else if (rating === "all") {
      query;
    }

    const reviews =
      rating === "all"
        ? await Review.find().populate("userId menuId")
        : await Review.find(query).populate("userId menuId");

    return res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReview,
  updatereview,
  deletereview,
  getreviwBymenuId,
  getAllReview,
  getReviewByRating,
  getAllReviewByPagination,
};
