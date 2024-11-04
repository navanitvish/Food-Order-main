const express = require("express");
const router = express.Router();
const {
  createMenu,
  getMenu,
  updateMenu,
  deleteMenu,
  getMenuByRestaurantId,
  getMenuByCategoryId,
  getMenuByCategory,
  getMunuByDishType,
  searchmenu,
  getMenuById,
  getAllspecialOfferMenu,
  addFavoriteDish,
  getAllFavoritesDishwithSearch,
  getMenuByPagination,
  getMenuByRestaurantIdByPagination,
  getMenuByCategoryIdByPagination,
} = require("../controllers/menuController");
const { isUser, isAdmin } = require("../middlewares/account");

// Create Menu Item
router.post("/", isAdmin, createMenu);

//special offer menu
router.get("/offers", getAllspecialOfferMenu);

router.get("/favorites", isUser, getAllFavoritesDishwithSearch);

// Get All Menu Items
router.get("/", getMenu);
//for pagination
router.get("/pag", isAdmin, getMenuByPagination);
router.get("/restaurant/pag/:id", isAdmin, getMenuByRestaurantIdByPagination);
router.get("/categories/pag/:categoryId", getMenuByCategoryIdByPagination);
router.get("/:id", getMenuById);

router.get("/restaurant/:id", isUser, getMenuByRestaurantId);

router.get("/category/:categoryId", getMenuByCategoryId);
router.get("/categories/:categoryId", getMenuByCategory);
router.get("/dishtype/:type", getMunuByDishType);

//for FavoriteDish
router.post("/favorites/:id", isUser, addFavoriteDish);

// Update Menu Item
router.put("/:id", isAdmin, updateMenu);
// Delete Menu Item
router.delete("/:id", isAdmin, deleteMenu);
router.get("/search/dishes", searchmenu);
module.exports = router;
