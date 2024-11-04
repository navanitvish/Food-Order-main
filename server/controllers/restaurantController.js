const Restaurant = require("../models/restaurantModel");
const History = require("../models/historySchema");
const Order = require("../models/orderModel");
const getValidPage = require("../helpers/getValidPageHelper");
const {
  calculateDeliveryTime,
  calculateIsOpen,
  formateHelper,
} = require("../helpers/timeFormaterHelper");

const Menu = require("../models/menuModel");
const Coupon = require("../models/couponSchema");
const User = require("../models/userModel");

const createRestaurant = async (req, res) => {
  try {
    const restaurantData = {
      ...req.body,
      // owner: req.userId,
    };

    console.log(restaurantData, "Restaurant");
    const restaurant = await Restaurant.create(restaurantData);
    res.status(201).json({ success: true, data: restaurant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .populate("owner")
      .populate("resturantCategory")
      .populate("address");
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }
    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllRestaurant = async (req, res) => {
  try {
    const currentDate = new Date();
    const { selfPickup } = req.query;
    const userId = req.userId;

    // console.log(selfPickup);

    const user = await User.findById(userId);
    const userLocation = user.location.coordinates;
    const restaurants = await findNearbyRestaurants(userLocation);

    const coupon = await Coupon.find({ expiryDate: { $gte: currentDate } });

    // console.log("actual", restaurants);

    const updateCoupon = restaurants.map((restaurant) => {
      const restaurantCoupons = coupon.filter(
        (coupon) => coupon.restaurantId.toString() === restaurant._id.toString()
      );

      const restaurantObject = restaurant;
      delete restaurantObject.id;

      return {
        ...restaurantObject,
        coupons: restaurantCoupons.length > 0 ? restaurantCoupons : [], // Add coupons or empty array
      };
    });

    if (!restaurants) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }
    if (selfPickup === "pickup") {
      const resturantSelfPickup = updateCoupon.filter(
        (res) => res.selfPickup === true
      );

      return res.status(200).json({ success: true, data: resturantSelfPickup });
    } else {
      res.status(200).json({ success: true, data: updateCoupon });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const getAllRestaurantForAdmin = async (req, res) => {
  try {
    const currentDate = new Date();

    const restaurants = await Restaurant.find();

    const coupon = await Coupon.find({ expiryDate: { $gte: currentDate } });

    console.log("actual", restaurants);

    const updateCoupon = restaurants.map((restaurant) => {
      const restaurantCoupons = coupon.filter(
        (coupon) => coupon.restaurantId.toString() === restaurant._id.toString()
      );

      const restaurantObject = restaurant.toObject();
      delete restaurantObject.id;

      return {
        ...restaurantObject,
        coupons: restaurantCoupons.length > 0 ? restaurantCoupons : [], // Add coupons or empty array
      };
    });

    if (!restaurants) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({ success: true, data: updateCoupon });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const getAllRestaurantByPagination = async (req, res) => {
  try {
    const { page = 1, limit = 10, name } = req.query;

    let query = {};
    if (name) {
      query.name = { $regex: name, $options: "i" }; // case-insensitive search
    }

    const totalRestaurants = await Restaurant.countDocuments(query);
    const totalPages = Math.ceil(totalRestaurants / limit);

    const currentPage = getValidPage(page, totalPages);

    const restaurant = await Restaurant.find(query)
      .populate("owner")
      .populate("address")
      .populate("resturantCategory")
      .skip((currentPage - 1) * limit)
      .limit(parseInt(limit));

    console.log(restaurant);
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({
      success: true,
      data: restaurant,
      pagination: {
        currentPage,
        totalPages,
        totalItems: totalRestaurants,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    console.log(req.userId, restaurant);
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }
    const history = new History({
      userId: req.userId,
      action: "update",
      performedBy: req.role === "admin" ? "admin" : "restaurent",
      entityType: "restaurant",
      entityId: restaurant._id,
      changes: req.body,
    });

    await history.save();
    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getResturantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate(
      "resturantCategory"
    );
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }
    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    const history = new History({
      userId: req.userId,
      action: "delete",
      performedBy: req.role === "admin" ? "admin" : "restaurent",
      entityType: "restaurant",
      entityId: restaurant._id,
      changes: null,
    });

    await history.save();
    res
      .status(200)
      .json({ success: true, message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getRestaurantByOwner = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const totalRestaurants = await Restaurant.countDocuments({
      owner: req.userId,
    });
    const totalPages = Math.ceil(totalRestaurants / limit);

    const currentPage = getValidPage(page, totalPages);
    const skip = (currentPage - 1) * limit;

    const restaurant = await Restaurant.find({ owner: req.userId })
      .skip(skip)
      .limit(parseInt(limit));
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }
    res.status(200).json({
      success: true,
      data: restaurant,
      pagination: {
        currentPage,
        totalPages,
        totalItems: totalRestaurants,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getRestaurantfilterByCategory = async (req, res) => {
  try {
    const { categoryIds } = req.query;

    const currentDate = new Date();

    const user = await User.findById(req.userId);
    const userLocation = user.location.coordinates;

    const categoriesArray = categoryIds ? categoryIds.split(",") : [];
    // const restaurants = await Restaurant.find({
    //   resturantCategory: { $in: categoriesArray },
    // });
    const restaurants = await findNearbyRestaurants(userLocation);

    const filteredRestaurants = restaurants.filter((restaurant) =>
      categoriesArray.includes(restaurant.resturantCategory.toString())
    );

    const coupon = await Coupon.find({ expiryDate: { $gte: currentDate } });

    const updateCoupon = filteredRestaurants.map((restaurant) => {
      const restaurantCoupons = coupon.filter(
        (coupon) => coupon.restaurantId.toString() === restaurant._id.toString()
      );

      // console.log(restaurant, "from map");
      const restaurantObject = restaurant;
      delete restaurantObject.id;

      return {
        ...restaurantObject,
        coupons: restaurantCoupons.length > 0 ? restaurantCoupons : [], // Add coupons or empty array
      };
    });

    if (updateCoupon.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }
    return res.status(200).json({
      success: true,
      data: updateCoupon,
    });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getAllFavoritesResturant = async (req, res) => {
  try {
    const userId = req.userId; // Get userId from the middleware

    // Find posts where the `favorites` array contains the userId

    const user = await User.findById(userId);
    const userLocation = user.location.coordinates;
    const restaurants = await findNearbyRestaurants(userLocation);

    const favoriteMenu = restaurants.filter((rest) =>
      rest.favorites?.includes(userId)
    );

    if (favoriteMenu.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No Favorites Restaurant found for this user Add Some",
      });
    }

    res.status(200).json({
      success: true,
      data: favoriteMenu,
    });
  } catch (error) {
    console.log(error, "from favorite");
    res.status(500).json({ success: false, error: error.message });
  }
};

const addFavoriteRestaurant = async (req, res) => {
  try {
    const userId = req.userId;
    const retsaurantId = req.params.id;

    //remove if userId present
    const retsaurant = await Restaurant.findOneAndUpdate(
      { _id: retsaurantId, favorites: userId },
      { $pull: { favorites: userId } },
      { new: true }
    );

    console.log(retsaurant, retsaurantId, userId, "from add favorite");

    //add if userId not present
    if (!retsaurant) {
      const updatedMenu = await Restaurant.findByIdAndUpdate(
        retsaurantId,
        { $addToSet: { favorites: userId } },
        { new: true }
      );

      return res.status(200).json({ success: true, data: updatedMenu });
    }

    // If the user had already in favorites and we remove it from favorites, respond with the update retsaurant item
    res.status(200).json({ success: true, data: retsaurant });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getResturantbySearch = async (req, res) => {
  try {
    const currentDate = new Date();
    const searchTerm = req.query.search || "";
    const user = await User.findById(req.userId);
    const userLocation = user.location.coordinates; // [longitude, latitude]

    const nearbyRestaurants = await Restaurant.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: userLocation, // User's location
          },
          distanceField: "distanceFromUser", // Calculate distance
          maxDistance: 8000, // Maximum 8 km
          spherical: true, // Spherical distance calculation
        },
      },
    ]);

    const nearbyRestaurantIds = nearbyRestaurants.map((r) => r._id);

    const restaurantSearchCondition = searchTerm
      ? {
          _id: { $in: nearbyRestaurantIds }, // Only consider nearby restaurants
          name: { $regex: searchTerm, $options: "i" }, // Search for restaurant names
        }
      : {
          _id: { $in: nearbyRestaurantIds }, // Just get all nearby restaurants if no search term
        };

    const searchRestaurants = await Restaurant.find(restaurantSearchCondition);

    const coupon = await Coupon.find({ expiryDate: { $gte: currentDate } });

    const updateSearchRestWithCoupon = searchRestaurants.map((restaurant) => {
      const restaurantCoupons = coupon.filter(
        (coupon) => coupon.restaurantId.toString() === restaurant._id.toString()
      );

      const restaurantObject = restaurant.toObject();
      delete restaurantObject.id;

      return {
        ...restaurantObject,
        coupons: restaurantCoupons.length > 0 ? restaurantCoupons : [], // Add coupons or empty array
      };
    });

    const menuSearchCondition = searchTerm
      ? {
          name: { $regex: searchTerm, $options: "i" }, // Search for menu item names
          restaurantId: { $in: nearbyRestaurantIds }, // Ensure menu items are from nearby restaurants
        }
      : {
          restaurantId: { $in: nearbyRestaurantIds }, // Just get all menu items from nearby restaurants if no search term
        };

    const searchMenu = await Menu.find(menuSearchCondition).populate(
      "restaurantId"
    );

    console.log(searchMenu);

    if (searchRestaurants.length === 0 && searchMenu.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No items or restaurants found for this search: ${searchTerm}`,
      });
    }

    const updateSearchMenu = searchMenu.map((menu) => {
      const restaurantCoupons = coupon.filter(
        (coupon) =>
          coupon.restaurantId.toString() === menu.restaurantId._id.toString()
      );

      console.log(menu, "from map");
      const menuObject = menu.toObject();
      delete menuObject.restaurantId.id;

      return {
        ...menuObject,
        restaurantId: {
          ...menuObject.restaurantId,
          coupons: restaurantCoupons.length > 0 ? restaurantCoupons : [], // Add coupons or empty array
        },
      };
    });

    res.status(200).json({
      success: true,
      data: {
        restaurants: updateSearchRestWithCoupon,
        menu: updateSearchMenu,
      },
    });
  } catch (error) {
    console.log(error, "from search");
    res.status(500).json({ success: false, error: error.message });
  }
};

const getOffersResturant = async (req, res) => {
  try {
    const currentDate = new Date();
    const user = await User.findById(req.userId);
    const userLocation = user.location.coordinates;

    const restaurants = await findNearbyRestaurants(userLocation);

    const coupon = await Coupon.find({
      expiryDate: { $gte: currentDate },
    });

    const updateCoupon = restaurants
      .map((restaurant) => {
        const restaurantCoupons = coupon.filter(
          (coupon) =>
            coupon.restaurantId.toString() === restaurant._id.toString()
        );

        // console.log(restaurant, "from map");
        const restaurantObject = restaurant;
        delete restaurantObject.id;

        if (restaurantCoupons.length > 0) {
          return {
            ...restaurantObject,
            coupons: restaurantCoupons, // Add coupons array
          };
        }
        return null; // Return null for restaurants with no coupons
      })
      .filter((restaurant) => restaurant !== null);

    console.log(updateCoupon);

    if (updateCoupon.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No any restaurant have Offers available",
      });
    }

    res.status(200).json({
      success: true,
      data: updateCoupon,
    });
  } catch (error) {
    console.log(error, "from search");
    res.status(500).json({ success: false, error: error.message });
  }
};

const getRestaurantByCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  console.log(categoryId, "from category");

  try {
    const totalRestaurant = await Restaurant.countDocuments({
      resturantCategory: categoryId,
    });
    const totalPages = Math.ceil(totalRestaurant / limit);
    const currentPage = getValidPage(page, totalPages);
    const skip = (currentPage - 1) * limit;

    const restaurant = await Restaurant.find({ resturantCategory: categoryId })
      .populate("resturantCategory")

      .skip(skip)
      .limit(parseInt(limit));

    if (!restaurant || restaurant.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No restaurant found for the specified category",
      });
    }

    res.status(200).json({
      success: true,
      data: restaurant,
      pagination: {
        currentPage,
        totalPages,
        totalItems: totalRestaurant,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getRestaurantWithOrder = async (req, res) => {
  try {
    const currentDate = new Date();

    // Find orders with a delivery date greater than or equal to the current date
    const orders = await Order.find()
      .populate("userId")
      .populate("restaurant")
      .sort({ deliveredAt: 1 });

    // Extract restaurant IDs from the orders
    const restaurantIds = orders.map((order) => order.restaurant._id);

    // Use aggregation to count orders per restaurant, regardless of order status
    const orderCounts = await Order.aggregate([
      {
        $group: {
          _id: "$restaurant",
          orderCount: { $sum: 1 },
        },
      },
    ]);

    console.log(orderCounts, restaurantIds);

    // Find the restaurants and include their category
    const restaurants = await Restaurant.find({
      _id: { $in: restaurantIds },
    });

    // Map order counts to restaurant data
    const restaurantData = restaurants.map((restaurant) => {
      const orderCount =
        orderCounts.find(
          (count) => count._id.toString() === restaurant._id.toString()
        )?.orderCount || 0;

      return {
        ...restaurant.toObject(),
        orderCount,
      };
    });

    res.status(200).json({
      success: true,
      data: restaurantData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const findNearbyRestaurants = async (userLocation) => {
  try {
    const nearbyRestaurants = await Restaurant.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: userLocation, // [longitude, latitude]
          },
          distanceField: "distanceFromUser", // Field to store calculated distance
          maxDistance: 8000, // Maximum distance in meters (8 km)
          spherical: true, // Use spherical calculation
        },
      },
      // {
      //   $addFields: {
      //     // Set selfPickup to true if within 2 km, otherwise false
      //     selfPickup: {
      //       $cond: {
      //         if: { $lte: ["$distanceFromUser", 2000] }, // Threshold for selfPickup (2 km)
      //         then: true,
      //         else: false,
      //       },
      //     },
      //     deliveryTimeInMinutes: {
      //       $add: [
      //         30, // Cooking time in minutes
      //         {
      //           $divide: [
      //             "$distanceFromUser", // Distance in meters
      //             666.67, // Average speed of 40 km/h = 666.67 meters per minute
      //           ],
      //         },
      //       ],
      //     },
      //   },
      // },
      {
        $set: {
          // Update the existing fields without removing others
          selfPickup: {
            $cond: {
              if: { $lte: ["$distanceFromUser", 2000] }, // Threshold for selfPickup (2 km)
              then: true,
              else: false,
            },
          },
          deliveryTimeInMinutes: {
            $add: [
              30, // Cooking time in minutes
              {
                $divide: [
                  "$distanceFromUser", // Distance in meters
                  666.67, // Average speed of 40 km/h = 666.67 meters per minute
                ],
              },
            ],
          },
          minimumOrder: { $ifNull: ["$minimumOrder", 200] }, // Set to "200" if minimumOrder is not present
          type: {
            $ifNull: ["$type", "restaurant"], // Set to "restaurant" if type is not present
          },
        },
      },
    ]);

    // const restaurantDocuments = nearbyRestaurants.map((restaurant) =>
    //   Restaurant.hydrate(restaurant)
    // );

    // Hydrate and format delivery time for each restaurant
    // const restaurantDocuments = nearbyRestaurants.map((restaurant) => {
    //   const formattedDeliveryTime = calculateDeliveryTime(
    //     restaurant.deliveryTime
    //   ); // Format the delivery time

    //   const hydratedRestaurant = Restaurant.hydrate(restaurant); // Hydrate the restaurant document

    //   return {
    //     ...hydratedRestaurant.toObject(), // Convert the hydrated restaurant to a plain object
    //     deliveryTime: formattedDeliveryTime, // Add the formatted delivery time
    //   };
    // });

    const bulkOps = nearbyRestaurants.map((restaurant) => {
      const deliveryTime = calculateDeliveryTime(
        restaurant.deliveryTimeInMinutes
      );
      const isOpen = calculateIsOpen(
        restaurant.openingTime,
        restaurant.closingTime
      );
      const formattedOpeningTime = formateHelper(restaurant.openingTime);
      const formattedClosingTime = formateHelper(restaurant.closingTime);
      return {
        updateOne: {
          filter: { _id: restaurant._id },
          update: {
            distanceFromUser: restaurant.distanceFromUser,
            selfPickup: restaurant.selfPickup,
            deliveryTimeInMinutes: restaurant.deliveryTimeInMinutes,
            deliveryTime,
            isOpen,
            formattedOpeningTime,
            formattedClosingTime,
          },
        },
      };
    });

    await Restaurant.bulkWrite(bulkOps);

    // const formattedRestaurants = nearbyRestaurants.map((restaurant) => ({
    //   ...restaurant,
    //   deliveryTime: calculateDeliveryTime(restaurant.deliveryTimeInMinutes),
    //   isOpen: calculateIsOpen(restaurant.openingTime, restaurant.closingTime),
    //   formattedOpeningTime: formateHelper(restaurant.openingTime),
    //   formattedClosingTime: formateHelper(restaurant.closingTime),
    // }));

    return nearbyRestaurants;
  } catch (error) {
    console.error(error);
    return [];
  }
};

module.exports = {
  getAllRestaurant,
  createRestaurant,
  getResturantById,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantByOwner,
  getAllRestaurantByPagination,
  getRestaurantfilterByCategory,
  getAllFavoritesResturant,
  getResturantbySearch,
  addFavoriteRestaurant,
  getRestaurantByCategory,
  getOffersResturant,
  getAllRestaurantForAdmin,
  getRestaurantWithOrder,
};
