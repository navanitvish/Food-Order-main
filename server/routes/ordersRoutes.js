const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getAllOrder,
  orderDatbystatus,
  getOneOrderById,
  getSingleOrderById,
  getAllOrderByrestaurent,
  updateOrderStatus,
  getAllOrderByPagination,
  validateOrder,
  getAllOrderForTransectionByrestaurent,
} = require("../controllers/orderController");
const { isUser, isAdmin } = require("../middlewares/account");

router.post("/", isUser, createOrder);
router.get("/", isUser, getOrder);
//
router.get("/validation/:restaurantId", isUser, validateOrder);

router.get("/all-orders", isAdmin, getAllOrder);
//for pagination
router.get("/pag", isAdmin, getAllOrderByPagination);
router.put("/:id", isUser, updateOrder);
router.delete("/:id", isUser, deleteOrder);
// with search
router.get("/all/status/:status", isUser, orderDatbystatus);
router.get("/get/one/:id", isUser, getOneOrderById);

router.get("/single/:id", getSingleOrderById);

//get order by resturant id
router.get("/by-resturant/:restId", isAdmin, getAllOrderByrestaurent);

//get all order for transection by restaurent id
router.get(
  "/transection/:restId",
  isAdmin,
  getAllOrderForTransectionByrestaurent
);

router.put("/:id/status", isAdmin, updateOrderStatus);
router.put("/:id/admin", isAdmin, updateOrder);

module.exports = router;
