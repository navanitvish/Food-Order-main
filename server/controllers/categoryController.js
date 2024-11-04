const getValidPage = require("../helpers/getValidPageHelper");
const Category = require("../models/categorySchema");
const History = require("../models/historySchema");

// Create Category
const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get All Categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllCategoriesByPagination = async (req, res) => {
  try {
    const { page = 1, limit = 10, name } = req.query;

    let query = {};
    if (name) {
      query.name = { $regex: name, $options: "i" }; // case-insensitive search
    }

    const totalCategories = await Category.countDocuments(query);
    const totalPages = Math.ceil(totalCategories / limit);
    const currentPage = getValidPage(page, totalPages);

    const categories = await Category.find(query)
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
const getAllCategoriesForAdmin = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
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
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const history = new History({
      userId: req.userId,
      action: "update",
      performedBy: "admin",
      entityType: "category",
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
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const history = new History({
      userId: req.userId,
      action: "delete",
      performedBy: "admin",
      entityType: "category",
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
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getAllCategoriesForAdmin,
  getAllCategoriesByPagination,
};
