// C:\ABS\Projects\Food-Order\server\controllers\menuController.js
const Menu = require("../models/menuModel");
const History = require("../models/historySchema");
const getValidPage = require("../helpers/getValidPageHelper");

const createMenu = async (req, res) => {
  try {
    const menuData = {
      ...req.body,
      restaurantId: req.body.restaurantId,
      category: req.body.category,
    };

    console.log(menuData);
    const menu = await Menu.create(menuData);
    res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      data: menu,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getMenu = async (req, res) => {
  try {
    const menus = await Menu.find()
      .populate("category")
      .populate("restaurantId")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: menus,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getMenuByPagination = async (req, res) => {
  try {
    const { page = 1, limit = 10, name } = req.query;

    let query = {};
    if (name) {
      query.name = { $regex: name, $options: "i" }; // case-insensitive search
    }

    const totalMenus = await Menu.countDocuments(query);
    const totalPages = Math.ceil(totalMenus / limit);
    const currentPage = getValidPage(page, totalPages);

    const menus = await Menu.find(query)
      .populate("category")
      .populate("restaurantId")
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: menus,
      pagination: {
        currentPage,
        totalPages,
        totalItems: totalMenus,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getMenuById = async (req, res) => {
  try {
    const menuId = req.params.id;
    const menu = await Menu.findById(menuId)
      .populate({
        path: "category",
        select: "-createdAt -updatedAt -__v",
      })
      .populate({
        path: "restaurantId",
        select: "-createdAt -updatedAt -__v",
        populate: {
          path: "address",
          select: "-createdAt -updatedAt -__v",
        },
      })
      .lean();

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found",
      });
    }

    res.status(200).json({
      success: true,
      data: menu,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getMenuByRestaurantId = async (req, res) => {
  const { id, searchMenu } = req.params;
  const menuSearchCondition = searchMenu
    ? {
        name: { $regex: searchTerm, $options: "i" },
        restaurantId: id,
      }
    : { restaurantId: id };
  try {
    const menus = await Menu.find(menuSearchCondition)
      .populate("category")
      .populate("restaurantId");

    if (!menus || menus.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No menus found for the specified restaurant",
      });
    }

    res.status(200).json({
      success: true,
      data: menus,
      // data: updateMenu,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getMenuByRestaurantIdByPagination = async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const totalMenus = await Menu.countDocuments({ restaurantId: id });
    const totalPages = Math.ceil(totalMenus / limit) || 1;
    const currentPage = getValidPage(page, totalPages);
    console.log(currentPage);

    const menus = await Menu.find({ restaurantId: id })
      .populate("category")
      .populate("restaurantId")
      .skip((currentPage - 1) * limit)
      .limit(parseInt(limit));

    if (!menus || menus.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No menus found for the specified restaurant",
      });
    }

    res.status(200).json({
      success: true,
      data: menus,
      pagination: {
        currentPage,
        totalPages,
        totalItems: totalMenus,
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

const getMenuByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const menus = await Menu.find({ category: categoryId })
      .populate("category")
      .populate("restaurantId");

    if (!menus || menus.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No menu items found for the specified category",
      });
    }

    res.status(200).json({
      success: true,
      data: menus,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getMenuByCategoryId = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const menus = await Menu.find({ category: categoryId }).populate(
      "category"
    );

    if (!menus || menus.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No menus found for the specified category",
      });
    }

    res.status(200).json({
      success: true,
      data: menus,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getMenuByCategoryIdByPagination = async (req, res) => {
  const { categoryId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  console.log(categoryId, "from category");

  try {
    const totalMenus = await Menu.countDocuments({ category: categoryId });
    const totalPages = Math.ceil(totalMenus / limit);
    const currentPage = getValidPage(page, totalPages);
    const skip = (currentPage - 1) * limit;

    const menus = await Menu.find({ category: categoryId })
      .populate("category")
      .populate("restaurantId")
      .skip(skip)
      .limit(parseInt(limit));

    if (!menus || menus.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No menus found for the specified category",
      });
    }

    res.status(200).json({
      success: true,
      data: menus,
      pagination: {
        currentPage,
        totalPages,
        totalItems: totalMenus,
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

const getMunuByDishType = async (req, res) => {
  const { type } = req.params;

  try {
    const menus = await Menu.find({ dishtype: type }).populate(
      "category restaurantId"
    );

    if (!menus || menus.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No menus found for the specified category",
      });
    }

    res.status(200).json({
      success: true,
      data: menus,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    const history = new History({
      userId: req.userId,
      action: "update",
      performedBy: req.role === "admin" ? "admin" : "restaurent",
      entityType: "menu",
      entityId: menu._id,
      changes: req.body,
    });

    await history.save();
    res.status(200).json({
      success: true,
      message: "Menu item updated successfully",
      data: menu,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteMenu = async (req, res) => {
  try {
    console.log(req.params.id);
    const menu = await Menu.findByIdAndDelete(req.params.id);

    console.log(menu);
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    const history = new History({
      userId: req.userId,
      action: "delete",
      performedBy: req.role === "admin" ? "admin" : "restaurent",
      entityType: "menu",
      entityId: menu._id,
      changes: null,
    });

    await history.save();
    res.status(200).json({
      success: true,
      message: "Menu item deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const searchmenu = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const menus = await Menu.find({
      $and: [
        { available: true },
        {
          $or: [{ name: { $regex: searchTerm, $options: "i" } }],
        },
      ],
    });

    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const getAllspecialOfferMenu = async (req, res) => {
  try {
    const allSponser = await Menu.find({ specialOffer: true }).populate({
      path: "category",
    });
    console.log(allSponser);
    if (!allSponser) {
      return res.status(404).json({
        success: false,
        message: "No special offer menu found",
      });
    }

    res.status(200).json({
      success: true,
      data: allSponser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const addFavoriteDish = async (req, res) => {
  try {
    const userId = req.userId;
    const menuId = req.params.id;

    //remove if userId present
    const menu = await Menu.findOneAndUpdate(
      { _id: menuId, favorites: userId },
      { $pull: { favorites: userId } },
      { new: true }
    );

    console.log(menu, menuId, userId, "from add favorite");

    //add if userId not present
    if (!menu) {
      const updatedMenu = await Menu.findByIdAndUpdate(
        menuId,
        { $addToSet: { favorites: userId } },
        { new: true }
      );

      return res.status(200).json({ success: true, data: updatedMenu });
    }

    // If the user had already in favorites and we remove it from favorites, respond with the update menu item
    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllFavoritesDishwithSearch = async (req, res) => {
  try {
    const userId = req.userId; // Get userId from the middleware
    const searchTerm = req.query.search || "";

    console.log(searchTerm, "from search");

    const searchCondition = searchTerm
      ? {
          favorites: userId,
          name: { $regex: searchTerm, $options: "i" },
        }
      : {
          favorites: userId,
        };

    // Find posts where the `favorites` array contains the userId
    const favoriteMenu = await Menu.find(searchCondition);

    if (favoriteMenu.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Favorites Menu found for this user Add Some",
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

module.exports = {
  getMunuByDishType,
  getMenuByRestaurantId,
  getMenuByCategoryId,
  getMenuByCategory,
  createMenu,
  getMenu,
  getMenuById,
  updateMenu,
  deleteMenu,
  searchmenu,
  getAllspecialOfferMenu,
  getAllFavoritesDishwithSearch,
  addFavoriteDish,
  getMenuByPagination,
  getMenuByRestaurantIdByPagination,
  getMenuByCategoryIdByPagination,
};
