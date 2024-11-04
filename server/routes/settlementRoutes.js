const express = require("express");
const router = express.Router();
const {
  createSettlementTicket,
  getSettlementTickets,
  getFilteredSettlements,
  updateSettlementStatus,
  allocateFundsToRestaurant,
} = require("../controllers/settlementController");

const { isAdmin, isRestaurent } = require("../middlewares/account");

// Route to create a settlement ticket (for Restaurant Admin)
router.post(
  "/restaurant/settlement/create",
  isRestaurent,
  createSettlementTicket
);

// Route to fetch all settlements for a restaurant (for Restaurant Admin)
router.get("/restaurant/tickets", isRestaurent, getFilteredSettlements);

// Route to allocate to every resturant (for Super Admin)
router.put("/admin/allocate", isAdmin, allocateFundsToRestaurant);

// Route to fetch all settlement tickets (for Super Admin)
router.get("/admin/tickets", isAdmin, getSettlementTickets);

// Route to update settlement status (for Super Admin)
router.put("/admin/update", isAdmin, updateSettlementStatus);

module.exports = router;
