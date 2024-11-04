const express = require("express");
const router = express.Router();
const { isRestaurent, isAdmin } = require("../../middlewares/account");
const {
  updateOrder,
  deleteOrder,
  getAllOrderByrestaurent,
  getOneOrderById,
  orderBySrartusResturentOwner,
  updateOrderStatus,
} = require("../../controllers/orderController");
const {
  createRestaurant,
  getRestaurant,
  getResturantById,
  updateRestaurant,
  getRestaurantByOwner,
  deleteRestaurant,
  getAllRestaurant,
} = require("../../controllers/restaurantController");
const {
  createMenu,
  deleteMenu,
  getMenu,
  getMenuByRestaurantId,
  getMenuByRestaurantIdByPagination,
  getMenuById,
  updateMenu,
} = require("../../controllers/menuController");

const {
  createCoupon,
  getCouponbyRestaurant,
  getcouponById,
  updateCoupon,
  deleteCoupon,
} = require("../../controllers/couponController");
const { getAllCategories } = require("../../controllers/categoryController");

//restuarant
router.post("/create/rest", isRestaurent, createRestaurant);
router.put("/update/rest/:id", isRestaurent, updateRestaurant);
router.delete("/delete/rest/:id", isRestaurent, deleteRestaurant);
router.get("/get/rest/:id", isRestaurent, getResturantById);
router.get("/get/rest", isRestaurent, getRestaurantByOwner);

//Orders
router.get("/order/:restId", isRestaurent, getAllOrderByrestaurent);
router.get(
  "/order/all/status/:status",
  isRestaurent,
  orderBySrartusResturentOwner
);
router.put("/order/:id", isRestaurent, updateOrder);
router.delete("/order/:id", isRestaurent, deleteOrder);
router.get("/order/get/one/:id", isRestaurent, getOneOrderById);
router.patch("/order/status/:id", isRestaurent, updateOrderStatus);

//Menu
router.post("/create/menu", isRestaurent, createMenu);
router.put("/update/menu/:id", isRestaurent, updateMenu);
router.delete("/delete/menu/:id", isRestaurent, deleteMenu);
// router.get("/get/menu", isRestaurent, getMenu);
router.get(
  "/get/res/menu/:id",
  isRestaurent,
  getMenuByRestaurantIdByPagination
);
router.get("/get/menu/:id", isRestaurent, getMenuById);

//category
router.get("/get/catgeory", isRestaurent, getAllCategories);

//coupon
router.get("/get/coupon", isRestaurent, getCouponbyRestaurant);
router.post("/", isRestaurent, createCoupon);
router.get("/:id", isRestaurent, getcouponById);
router.put("/:id", isRestaurent, updateCoupon);
router.delete("/:id", isRestaurent, deleteCoupon);

module.exports = router;
