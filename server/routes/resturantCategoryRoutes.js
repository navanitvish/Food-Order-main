const express = require("express");
const router = express.Router();
const {
  createReasturantCategory,
  deleteResturantCategory,
  getAllRestuarantCategories,
  getAllResturantCategoriesByPagination,
  getAllResturantCategoriesForAdmin,
  getResturantCategoryById,
  updateResturantCategory,
} = require("../controllers/resturantCategoryController");
const { isUser, isAdmin } = require("../middlewares/account");

router.post("/", isAdmin, createReasturantCategory);
router.get("/", isUser, getAllRestuarantCategories);
//for pagination
router.get("/get", isAdmin, getAllResturantCategoriesForAdmin);
router.get("/pag", isAdmin, getAllResturantCategoriesByPagination);
router.get("/:id", getResturantCategoryById);
router.put("/:id", isAdmin, updateResturantCategory);
router.delete("/:id", isAdmin, deleteResturantCategory);

module.exports = router;
