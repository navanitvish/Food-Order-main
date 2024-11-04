const express = require("express");
const router = express.Router();
const { isUser, isAdmin } = require("../../middlewares/account");

const {
  verifyOTP,
  getUserProfileAllDetails,
  AdminverifyRestaurentUserById,
  registerForRestaurentUser,
  listAllResturantOwner,
  listAllResturantOwnerByPagination,
} = require("../../controllers/restaurent/restaurentController");

router.post("/res/user", registerForRestaurentUser);
router.get("/res", isUser, getUserProfileAllDetails);

router.patch("/res/:id", isAdmin, AdminverifyRestaurentUserById);
router.get("/res/all", isAdmin, listAllResturantOwner);
router.get("/res/pag", isAdmin, listAllResturantOwnerByPagination);

router.put("/res/verify", verifyOTP);

module.exports = router;
