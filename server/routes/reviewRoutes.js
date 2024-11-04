const express = require("express");
const router = express.Router();
const {
  createReview,
  updatereview,
  deletereview,
  getreviwBymenuId,
  getAllReview,
  getReviewByRating,
  getAllReviewByPagination,
} = require("../controllers/reviewController");
const { isAdmin, isUser } = require("../middlewares/account");

router.post("/", isUser, createReview);
router.put("/:id", isUser, updatereview);
router.get("/:menuId", isUser, getreviwBymenuId);
router.get("/all/review", isAdmin, getAllReview);
//for pagination
router.get("/get/pag", isAdmin, getAllReviewByPagination);
router.get("/", getReviewByRating);
router.delete("/:id", isAdmin, deletereview);

module.exports = router;
