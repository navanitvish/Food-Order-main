const express = require("express");
const router = express.Router();
const { isUser } = require("../middlewares/account");
const {
  createLocation,
  getLocation,
  updateLocation,
  deleteLocation,
} = require("../controllers/locationController");
router.post("/", isUser, createLocation);
router.get("/", isUser, getLocation);
router.put("/:id", isUser, updateLocation);
router.delete("/:id", isUser, deleteLocation);

module.exports = router;
