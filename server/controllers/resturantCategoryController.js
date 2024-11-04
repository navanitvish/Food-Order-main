const getValidPage = require("../helpers/getValidPageHelper");
const ResturantCategory = require("../models/resturantCategorySchema");
const History = require("../models/historySchema");

// Create resturant Category
const createReasturantCategory = async (req, res) => {
  try {
    const category = await ResturantCategory.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get All resturant Categories
const getAllRestuarantCategories = async (req, res) => {
  try {
    const categories = await ResturantCategory.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllResturantCategoriesByPagination = async (req, res) => {
  try {
    const { page = 1, limit = 10, name } = req.query;
    let query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" }; // case-insensitive search
    }

    const totalCategories = await ResturantCategory.countDocuments(query);
    const totalPages = Math.ceil(totalCategories / limit);
    const currentPage = getValidPage(page, totalPages);

    const categories = await ResturantCategory.find(query)
      .skip((currentPage - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: categories,
      pagination: {
        currentPage,
        totalPages,
        totalItems: totalCategories,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const getAllResturantCategoriesForAdmin = async (req, res) => {
  try {
    const categories = await ResturantCategory.find();

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Category by ID
const getResturantCategoryById = async (req, res) => {
  try {
    const category = await ResturantCategory.findById(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update Category
const updateResturantCategory = async (req, res) => {
  try {
    const category = await ResturantCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const history = new History({
      userId: req.userId,
      action: "update",
      performedBy: "admin",
      entityType: "resturanCategory",
      entityId: category._id,
      changes: req.body,
    });

    await history.save();

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete Category
const deleteResturantCategory = async (req, res) => {
  try {
    const category = await ResturantCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const history = new History({
      userId: req.userId,
      action: "delete",
      performedBy: "admin",
      entityType: "resturanCategory",
      entityId: category._id,
      changes: null,
    });

    await history.save();
    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createReasturantCategory,
  getAllRestuarantCategories,
  getResturantCategoryById,
  updateResturantCategory,
  deleteResturantCategory,
  getAllResturantCategoriesForAdmin,
  getAllResturantCategoriesByPagination,
};
