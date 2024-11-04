const mongoose = require("mongoose");
const Restaurant = require("../models/restaurantModel");
const Location = require("../models/locationSchema");

// Example restaurant IDs
const restaurantIds = [
  "667418a547af0a1a300755d3",
  "667418e947af0a1a300755d5",
  "667418fc47af0a1a300755d7",
  "6674190747af0a1a300755d9",
  "6674193547af0a1a300755db",
];

// Example owner ID
const ownerId = "66740fbb9dde6f3998fae378";

// Example location data for each restaurant
const locations = [
  {
    userId: ownerId,
    country: "USA",
    state: "Florida",
    city: "Miami",
    address: "123 Ocean Drive",
    zipCode: "33139",
  },
  {
    userId: ownerId,
    country: "USA",
    state: "Colorado",
    city: "Denver",
    address: "456 Alpine Street",
    zipCode: "80202",
  },
  {
    userId: ownerId,
    country: "USA",
    state: "New York",
    city: "New York",
    address: "789 Broadway Avenue",
    zipCode: "10003",
  },
  {
    userId: ownerId,
    country: "USA",
    state: "California",
    city: "San Francisco",
    address: "101 Garden Lane",
    zipCode: "94107",
  },
  {
    userId: ownerId,
    country: "USA",
    state: "Texas",
    city: "Austin",
    address: "202 River Road",
    zipCode: "78701",
  },
];

async function createLocationsAndAssignToRestaurants() {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/FoodApp");

    // Create location documents
    const createdLocations = await Location.insertMany(locations);

    // Update restaurants with location references
    const updates = createdLocations.map((location, index) =>
      Restaurant.findByIdAndUpdate(restaurantIds[index], {
        address: location._id,
      })
    );
    await Promise.all(updates);

    console.log("Locations created and assigned to restaurants successfully");
  } catch (err) {
    console.error(
      "Error creating locations and assigning to restaurants:",
      err
    );
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
  }
}

createLocationsAndAssignToRestaurants();
