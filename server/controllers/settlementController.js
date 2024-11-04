// controllers/settlementController.js
const Settlement = require("../models/settlementSchema");
const Restaurant = require("../models/restaurantModel");
const mongoose = require("mongoose");

// Create a settlement ticket
const createSettlementTicket = async (req, res) => {
  try {
    const { restaurantId, amount, transactionMode, remarks } = req.body;
    const ownerId = req.userId;

    // Verify if the restaurant belongs to the logged-in owner
    const restaurant = await Restaurant.findOne({
      _id: restaurantId,
      ownerId: ownerId.toString(),
    });

    if (!restaurant) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to create a ticket for this restaurant",
      });
    }

    // Find the settlement record for the specified restaurant
    const settlement = await Settlement.findOne({ restaurantId });

    if (!settlement) {
      return res.status(404).json({
        success: false,
        message: "Settlement record not found for this restaurant",
      });
    }

    // Check if the balance is sufficient for the requested ticket amount
    if (settlement.balance < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient allocated balance for the requested amount",
      });
    }

    // Add the new ticket to the tickets array and adjust the balance
    const newTicket = {
      amount,
      transactionMode,
      status: "Pending",
      createdDate: new Date(),
      remarks,
    };
    settlement.tickets.push(newTicket);
    settlement.balance -= amount; // Deduct the amount from the allocated balance

    await settlement.save();

    // Return response with the created ticket details
    res.status(201).json({
      success: true,
      message: "Settlement ticket created successfully",
      data: {
        settlementId: settlement._id,
        balance: settlement.balance,
        ticket: newTicket,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//list of tickets of settelement for resturant owner
const getFilteredSettlements = async (req, res) => {
  try {
    const { restaurantId, page = 1, limit = 10 } = req.query;
    const ownerId = req.userId;

    if (!ownerId) {
      return res
        .status(400)
        .json({ success: false, message: "Owner ID is required" });
    }

    // Query to filter restaurants by ownerId
    const restaurants = await Restaurant.find({ owner: ownerId.toString() });

    if (!restaurants.length) {
      return res.status(404).json({
        success: false,
        message: "No restaurants found for the specified owner",
      });
    }

    // Extract restaurant IDs from found restaurants
    const restaurantIds = restaurants.map((restaurant) => restaurant._id);
    console.log(
      ownerId,
      restaurantId,
      restaurantIds.includes(restaurantId.toString()),
      restaurantIds
    );

    // Further filter settlements by specific restaurantId if provided
    const settlementFilter = { restaurantId: restaurantIds };

    if (restaurantId) {
      // Ensure the restaurantId belongs to the owner
      // if (!restaurantIds.includes(restaurantObjectId)) {
      if (
        !restaurantIds.some((id) => id.toString() === restaurantId.toString())
      ) {
        return res.status(404).json({
          success: false,
          message: "Restaurant not found for the specified owner",
        });
      }
      settlementFilter.restaurantId = restaurantId;
    }

    // Find the settlement(s) based on the filter
    const settlements = await Settlement.find(settlementFilter)
      .populate("restaurantId", "name") // Populate the restaurant name
      .select("tickets restaurantId") // Fetch only tickets and restaurantId
      .sort({ createdDate: -1 });

    if (!settlements.length) {
      return res
        .status(404)
        .json({ success: false, message: "No settlements found" });
    }

    // Apply pagination on tickets within each settlement
    const paginatedSettlements = settlements.map((settlement) => {
      const paginatedTickets = settlement.tickets.slice(
        (page - 1) * limit,
        page * limit
      );

      return {
        restaurantId: settlement.restaurantId,
        tickets: paginatedTickets,
        totalTickets: settlement.tickets.length,
        totalPages: Math.ceil(settlement.tickets.length / limit),
      };
    });

    res.status(200).json({
      success: true,
      data: paginatedSettlements,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// List all settlement tickets (for Super Admin) and same for resturant admin

const getSettlementTickets = async (req, res) => {
  try {
    const { page = 1, limit = 10, restaurantId } = req.query;

    // Filter settlements by restaurantId if provided
    const query = restaurantId ? { restaurantId } : {};

    // Find the settlement document for the specified restaurant
    const settlement = await Settlement.findOne(query).populate("restaurantId"); // Populate the restaurant name

    console.log(settlement);

    if (!settlement) {
      return res
        .status(404)
        .json({ success: false, message: "Settlement not found" });
    }

    // Apply pagination to the tickets array within the found settlement document
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedTickets = settlement.tickets.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      data: paginatedTickets,
      resturantAmount: {
        allocatedAmount: settlement.allocatedAmount,
        balance: settlement.balance,
      },
      currentPage: parseInt(page),
      totalPages: Math.ceil(settlement.tickets.length / limit),
      totalItems: settlement.tickets.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update settlement ticket with payment details (for Super Admin)
// const updateSettlementStatus = async (req, res) => {
//   try {
//     const { settlementId, status, transactionMode, settlementDate, remarks } =
//       req.body;

//     const settlement = await Settlement.findById(settlementId);
//     if (!settlement) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Settlement request not found" });
//     }

//     // Update the fields based on super admin's input
//     settlement.status = status;
//     settlement.transactionMode = transactionMode;
//     settlement.settlementDate = settlementDate;
//     settlement.remarks = remarks;

//     await settlement.save();

//     res.status(200).json({
//       success: true,
//       message: "Settlement status updated successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
const updateSettlementStatus = async (req, res) => {
  try {
    const {
      restaurantId,
      ticketId,
      status,
      transactionMode,
      settlementDate,
      remarks,
      paidAmount,
    } = req.body;

    const parsedSettlementDate = new Date(
      settlementDate.split("/").reverse().join("-")
    );

    // Find the settlement by restaurantId
    const settlement = await Settlement.findOne({ restaurantId });
    if (!settlement) {
      return res.status(404).json({
        success: false,
        message: "Settlement request not found for this restaurant",
      });
    }

    // Find the ticket by its ID
    const ticket = settlement.tickets.id(ticketId); // Use the ticket ID to find the specific ticket
    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }

    // Update the ticket details
    ticket.status = status;
    ticket.transactionMode = transactionMode;
    ticket.settlementDate = settlementDate ? parsedSettlementDate : Date.now;
    ticket.remarks = remarks;
    ticket.paidAmount = paidAmount; // Add or update the paid amount in the ticket

    // Save the updated settlement document
    await settlement.save();

    res.status(200).json({
      success: true,
      message: "Settlement status updated successfully",
      data: settlement,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const allocateFundsToRestaurant = async (req, res) => {
  try {
    const { restaurantId, allocationAmount } = req.body;
    console.log(restaurantId, allocationAmount);

    // Find the settlement for the restaurant or create a new one if it doesn't exist
    let settlement = await Settlement.findOne({ restaurantId });

    if (!settlement) {
      // If no settlement exists, create a new one with the allocated amount and balance
      settlement = new Settlement({
        restaurantId,
        allocatedAmount: allocationAmount,
        balance: allocationAmount, // Set the balance to the initial allocated amount
      });
    } else {
      // Update the allocated amount and balance for the existing settlement
      settlement.allocatedAmount += allocationAmount;
      settlement.balance += allocationAmount;
    }

    await settlement.save();

    res.status(200).json({
      success: true,
      message: "Funds allocated successfully",
      data: {
        allocatedAmount: settlement.allocatedAmount,
        balance: settlement.balance,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createSettlementTicket,
  getFilteredSettlements,
  getSettlementTickets,
  updateSettlementStatus,
  allocateFundsToRestaurant,
};
