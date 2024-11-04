const express = require("express");
const router = express.Router();
const { isUser, isAdmin } = require("../middlewares/account");
const {
  createRestaurant,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getAllRestaurant,
  getAllRestaurantByPagination,
  getRestaurantfilterByCategory,
  getAllFavoritesResturant,
  getResturantbySearch,
  addFavoriteRestaurant,
  getRestaurantByCategory,
  getOffersResturant,
  getAllRestaurantForAdmin,
  getRestaurantWithOrder,
} = require("../controllers/restaurantController");

//for pagination
router.get("/pag", isAdmin, getAllRestaurantByPagination);

router.get("/admin", isAdmin, getAllRestaurantForAdmin);

router.get("/order", isAdmin, getRestaurantWithOrder);

router.get("/filter-by-category", isUser, getRestaurantfilterByCategory);

router.get("/favorites", isUser, getAllFavoritesResturant);

router.get("/search", isUser, getResturantbySearch);
router.get("/offers", isUser, getOffersResturant);

//for FavoriteDish
router.post("/favorites/:id", isUser, addFavoriteRestaurant);

router.get("/:id", getRestaurant);

//only for users
router.get("/", isUser, getAllRestaurant);

router.get("/category/pag/:categoryId", isAdmin, getRestaurantByCategory);

router.post("/", isAdmin, createRestaurant);
router.put("/:id", isAdmin, updateRestaurant);
router.delete("/:id", isAdmin, deleteRestaurant);

module.exports = router;
