const express = require("express");
const router = express.Router();
const {
  createBanner,
  getAllBanner,
  getBannerById,
  updateBanner,
  deleteBanner,
  getAllBannerByPagination,
} = require("../controllers/bannerController");
const { isAdmin } = require("../middlewares/account");

router.post("/", isAdmin, createBanner);
router.get("/", getAllBanner);
// for pagination
router.get("/pag", isAdmin, getAllBannerByPagination);
router.get("/:id", getBannerById);
router.put("/:id", isAdmin, updateBanner);
router.delete("/:id", isAdmin, deleteBanner);

module.exports = router;
