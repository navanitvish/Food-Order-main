const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getAllCategoriesForAdmin,
  getAllCategoriesByPagination,
} = require("../controllers/categoryController");
const { isAdmin } = require("../middlewares/account");

router.post("/", isAdmin, createCategory);
router.get("/", getAllCategories);
//for pagination
router.get("/get", isAdmin, getAllCategoriesForAdmin);
router.get("/pag", isAdmin, getAllCategoriesByPagination);
router.get("/:id", getCategoryById);
router.put("/:id", isAdmin, updateCategory);
router.delete("/:id", isAdmin, deleteCategory);

module.exports = router;
