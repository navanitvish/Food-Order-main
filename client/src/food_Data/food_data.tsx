import { Dish, FoodItem } from "../types/contentType";

import idleDish from "../assets/idle.png";
import burgure from "../assets/burgur.png";
import largeBurgure from "../assets/double patti burgur.png";
import tikkiBurgure from "../assets/grilled tikki burgur.png";
import proteinBowl from "../assets/high protein diet.png";
import fullBowl from "../assets/meet bowl with veggies.png";
import sandwitch from "../assets/subway sandwitch.png";
import tacos from "../assets/tacos.png";

export const dishes: Dish[] = [
  { image: idleDish, name: "Idle Dish", type: "Dish", _id: "IdleDish1" },
  { image: burgure, name: "Burgur", type: "Dish", _id: "Burgur2" },
  {
    image: largeBurgure,
    name: "Double Patti Burgur",
    type: "Dish",
    _id: "DoublePattiBurgur3",
  },
  {
    image: tikkiBurgure,
    name: "Grilled Tikki Burgur",
    type: "Dish",
    _id: "GrilledTikkiBurgur4",
  },
  {
    image: proteinBowl,
    name: "High Protein Diet",
    type: "Dish",
    _id: "HighProteinDiet5",
  },
  {
    image: fullBowl,
    name: "Meat Bowl with Veggies",
    type: "Dish",
    _id: "MeatBowlWithVeggies6",
  },
  {
    image: sandwitch,
    name: "Subway Sandwitch",
    type: "Dish",
    _id: "SubwaySandwitch7",
  },
  { image: tacos, name: "Tacos", type: "Dish", _id: "Tacos8" },
];

export const dishesWithResturant = [
  {
    image: idleDish,
    name: "Idle Dish",
    type: "Dish",
    _id: "IdleDish1",
  },
  { image: burgure, name: "Burgur", type: "Dish", _id: "Burgur2" },
  {
    image: largeBurgure,
    name: "Double Patti Burgur",
    type: "Dish",
    _id: "DoublePattiBurgur3",
  },
  {
    image: tikkiBurgure,
    name: "Grilled Tikki Burgur",
    type: "Dish",
    _id: "GrilledTikkiBurgur4",
  },
  {
    image: proteinBowl,
    name: "High Protein Diet",
    type: "Dish",
    _id: "HighProteinDiet5",
  },
  {
    image: fullBowl,
    name: "Meat Bowl with Veggies",
    type: "Dish",
    _id: "MeatBowlWithVeggies6",
  },
  {
    image: sandwitch,
    name: "Subway Sandwitch",
    type: "Dish",
    _id: "SubwaySandwitch7",
  },
  { image: tacos, name: "Tacos", type: "Dish", _id: "Tacos8" },
  {
    image: idleDish,
    name: "Spicy Idle Dish",
    type: "Dish",
    _id: "SpicyIdleDish9",
  },
  {
    image: burgure,
    name: "Chicken Burgur",
    type: "Dish",
    _id: "ChickenBurgur10",
  },
  {
    image: largeBurgure,
    name: "Triple Patti Burgur",
    type: "Dish",
    _id: "TriplePattiBurgur11",
  },
  {
    image: tikkiBurgure,
    name: "Spicy Tikki Burgur",
    type: "Dish",
    _id: "SpicyTikkiBurgur12",
  },
  {
    image: proteinBowl,
    name: "Vegan Protein Bowl",
    type: "Dish",
    _id: "VeganProteinBowl13",
  },
  {
    image: fullBowl,
    name: "Keto Meat Bowl",
    type: "Dish",
    _id: "KetoMeatBowl14",
  },
  {
    image: sandwitch,
    name: "Club Sandwitch",
    type: "Dish",
    _id: "ClubSandwitch15",
  },
  {
    image: tacos,
    name: "Fish Tacos",
    type: "Dish",
    _id: "FishTacos16",
  },
  {
    image: idleDish,
    name: "Idle Restaurant",
    type: "Restaurant",
    _id: "IdleRestaurant17",
  },
  {
    image: burgure,
    name: "Burgur Heaven",
    type: "Restaurant",
    _id: "BurgurHeaven18",
  },
  {
    image: largeBurgure,
    name: "Big Burgur Joint",
    type: "Restaurant",
    _id: "BigBurgurJoint19",
  },
  {
    image: tikkiBurgure,
    name: "Tikki Palace",
    type: "Restaurant",
    _id: "TikkiPalace20",
  },
  {
    image: proteinBowl,
    name: "Protein Powerhouse",
    type: "Restaurant",
    _id: "ProteinPowerhouse21",
  },
  {
    image: fullBowl,
    name: "Veggie Meat Delight",
    type: "Restaurant",
    _id: "VeggieMeatDelight22",
  },
  {
    image: sandwitch,
    name: "Sandwitch Central",
    type: "Restaurant",
    _id: "SandwitchCentral23",
  },
  {
    image: tacos,
    name: "Taco Fiesta",
    type: "Restaurant",
    _id: "TacoFiesta24",
  },
];

// const idleDishItems: FoodItem[] = [
//   {
//     label: "Veg",
//     image: idleDish,
//     name: "Idle Dish",
//     description:
//       "A simple yet delicious South Indian dish made from fermented rice and lentil batter, served with sambar and chutney...",
//     ingredients: ["Rice", "Lentils", "Sambar", "Chutney"],
//     price: "₹ 150/-",
//   },
//   {
//     label: "Veg",
//     image: idleDish,
//     name: "Spicy Idle Dish",
//     description:
//       "A spicier version of the classic Idle Dish, served with a tangy and hot sambar...",
//     ingredients: ["Rice", "Lentils", "Spicy Sambar", "Chutney"],
//     price: "₹ 160/-",
//   },
//   {
//     label: "Non-Veg",
//     image: idleDish,
//     name: "Idle Restaurant Special",
//     description:
//       "A special dish from Idle Restaurant combining various flavors...",
//     ingredients: ["Rice", "Lentils", "Chicken", "Spices"],
//     price: "₹ 250/-",
//   },
//   {
//     label: "Veg",
//     image: idleDish,
//     name: "Idle Supreme",
//     description:
//       "An upgraded version of the Idle Dish with additional spices and ingredients...",
//     ingredients: ["Rice", "Lentils", "Vegetables", "Spices"],
//     price: "₹ 180/-",
//   },
//   {
//     label: "Veg",
//     image: idleDish,
//     name: "Healthy Idle",
//     description: "A healthier version of Idle Dish with added greens...",
//     ingredients: ["Rice", "Lentils", "Spinach", "Chutney"],
//     price: "₹ 170/-",
//   },
//   {
//     label: "Non-Veg",
//     image: idleDish,
//     name: "Non-Veg Idle",
//     description: "A unique combination of Idle with non-veg curry...",
//     ingredients: ["Rice", "Lentils", "Chicken Curry", "Chutney"],
//     price: "₹ 200/-",
//   },
// ];

// const burgerItems: FoodItem[] = [
//   {
//     label: "Non-Veg",
//     image: burgure,
//     name: "Burgur",
//     description:
//       "A classic beef burger with lettuce, tomato, and cheese, served with fries...",
//     ingredients: ["Beef Patty", "Lettuce", "Tomato", "Cheese", "Fries"],
//     price: "₹ 399/-",
//   },
//   {
//     label: "Non-Veg",
//     image: burgure,
//     name: "Chicken Burgur",
//     description:
//       "A juicy chicken burger with a crispy coating, topped with fresh lettuce and mayo...",
//     ingredients: ["Chicken Patty", "Lettuce", "Mayo", "Cheese"],
//     price: "₹ 349/-",
//   },
//   {
//     label: "Non-Veg",
//     image: burgure,
//     name: "Burgur Heaven",
//     description:
//       "Experience the ultimate in burger delight with a range of premium ingredients...",
//     ingredients: ["Various"],
//     price: "₹ 499/-",
//   },
//   {
//     label: "Veg",
//     image: burgure,
//     name: "Veggie Burgur",
//     description:
//       "A tasty veggie burger with fresh lettuce, tomato, and cheese...",
//     ingredients: ["Veggie Patty", "Lettuce", "Tomato", "Cheese"],
//     price: "₹ 299/-",
//   },
//   {
//     label: "Non-Veg",
//     image: burgure,
//     name: "Spicy Chicken Burgur",
//     description:
//       "A spicy version of the chicken burger with jalapenos and hot sauce...",
//     ingredients: [
//       "Chicken Patty",
//       "Lettuce",
//       "Tomato",
//       "Jalapenos",
//       "Hot Sauce",
//     ],
//     price: "₹ 379/-",
//   },
//   {
//     label: "Veg",
//     image: burgure,
//     name: "Classic Veg Burgur",
//     description:
//       "A classic veggie burger with mixed vegetable patty, cheese, and condiments...",
//     ingredients: ["Veggie Patty", "Cheese", "Lettuce", "Tomato", "Condiments"],
//     price: "₹ 289/-",
//   },
// ];

// const largeBurgerItems: FoodItem[] = [
//   {
//     label: "Non-Veg",
//     image: largeBurgure,
//     name: "Double Patti Burgur",
//     description:
//       "A hearty double patty beef burger with extra cheese, lettuce, and tomato...",
//     ingredients: ["Beef Patties", "Lettuce", "Tomato", "Cheese"],
//     price: "₹ 499/-",
//   },
//   {
//     label: "Non-Veg",
//     image: largeBurgure,
//     name: "Triple Patti Burgur",
//     description:
//       "A towering triple patty burger for those with a big appetite...",
//     ingredients: ["Beef Patties", "Lettuce", "Tomato", "Cheese"],
//     price: "₹ 599/-",
//   },
//   {
//     label: "Non-Veg",
//     image: largeBurgure,
//     name: "Big Burgur Joint",
//     description:
//       "A burger joint known for its massive and delicious burgers...",
//     ingredients: ["Various"],
//     price: "₹ 699/-",
//   },
//   {
//     label: "Non-Veg",
//     image: largeBurgure,
//     name: "Mega Beef Burgur",
//     description:
//       "A giant beef burger with three patties, extra cheese, and all the fixings...",
//     ingredients: ["Beef Patties", "Lettuce", "Tomato", "Cheese", "Pickles"],
//     price: "₹ 649/-",
//   },
//   {
//     label: "Non-Veg",
//     image: largeBurgure,
//     name: "Ultimate Double Burgur",
//     description:
//       "The ultimate burger experience with double patties and double cheese...",
//     ingredients: [
//       "Beef Patties",
//       "Lettuce",
//       "Tomato",
//       "Double Cheese",
//       "Onions",
//     ],
//     price: "₹ 549/-",
//   },
//   {
//     label: "Non-Veg",
//     image: largeBurgure,
//     name: "Colossal Burgur",
//     description:
//       "A colossal burger with multiple layers of beef patties, cheese, and special sauce...",
//     ingredients: [
//       "Beef Patties",
//       "Cheese",
//       "Special Sauce",
//       "Lettuce",
//       "Tomato",
//     ],
//     price: "₹ 699/-",
//   },
// ];

// const tikkiBurgerItems: FoodItem[] = [
//   {
//     label: "Veg",
//     image: tikkiBurgure,
//     name: "Grilled Tikki Burgur",
//     description:
//       "A delicious vegetarian burger with a grilled tikki patty, fresh vegetables, and spicy sauce...",
//     ingredients: ["Tikki Patty", "Lettuce", "Tomato", "Spicy Sauce"],
//     price: "₹ 299/-",
//   },
//   {
//     label: "Veg",
//     image: tikkiBurgure,
//     name: "Spicy Tikki Burgur",
//     description:
//       "A spicy version of the Grilled Tikki Burger with extra jalapenos...",
//     ingredients: [
//       "Tikki Patty",
//       "Lettuce",
//       "Tomato",
//       "Jalapenos",
//       "Spicy Sauce",
//     ],
//     price: "₹ 349/-",
//   },
//   {
//     label: "Veg",
//     image: tikkiBurgure,
//     name: "Tikki Palace",
//     description:
//       "A place where you can enjoy a variety of delicious tikki burgers...",
//     ingredients: ["Various"],
//     price: "₹ 399/-",
//   },
//   {
//     label: "Veg",
//     image: tikkiBurgure,
//     name: "Classic Tikki Burgur",
//     description:
//       "A classic tikki burger with a mix of vegetables and flavorful spices...",
//     ingredients: ["Tikki Patty", "Lettuce", "Tomato", "Cheese", "Spices"],
//     price: "₹ 329/-",
//   },
//   {
//     label: "Veg",
//     image: tikkiBurgure,
//     name: "Deluxe Tikki Burgur",
//     description:
//       "A deluxe version with additional toppings and special sauce...",
//     ingredients: [
//       "Tikki Patty",
//       "Lettuce",
//       "Tomato",
//       "Cheese",
//       "Special Sauce",
//     ],
//     price: "₹ 359/-",
//   },
//   {
//     label: "Veg",
//     image: tikkiBurgure,
//     name: "Tikki Supreme",
//     description: "A supreme tikki burger with all the best ingredients...",
//     ingredients: [
//       "Tikki Patty",
//       "Lettuce",
//       "Tomato",
//       "Cheese",
//       "Onions",
//       "Pickles",
//     ],
//     price: "₹ 379/-",
//   },
// ];

// const proteinBowlItems: FoodItem[] = [
//   {
//     label: "Veg",
//     image: proteinBowl,
//     name: "High Protein Diet",
//     description:
//       "A bowl packed with high protein ingredients, perfect for a healthy meal...",
//     ingredients: ["Quinoa", "Chickpeas", "Avocado", "Egg"],
//     price: "₹ 299/-",
//   },
//   {
//     label: "Veg",
//     image: proteinBowl,
//     name: "Vegan Protein Bowl",
//     description:
//       "A completely vegan protein bowl with a mix of plant-based proteins...",
//     ingredients: ["Quinoa", "Beans", "Tofu", "Vegetables"],
//     price: "₹ 349/-",
//   },
//   {
//     label: "Veg",
//     image: proteinBowl,
//     name: "Protein Powerhouse",
//     description:
//       "A powerhouse of protein-rich ingredients for a fulfilling meal...",
//     ingredients: ["Various"],
//     price: "₹ 399/-",
//   },
//   {
//     label: "Veg",
//     image: proteinBowl,
//     name: "Green Protein Bowl",
//     description:
//       "A green protein bowl with a variety of green veggies and protein sources...",
//     ingredients: ["Spinach", "Broccoli", "Quinoa", "Tofu"],
//     price: "₹ 319/-",
//   },
//   {
//     label: "Veg",
//     image: proteinBowl,
//     name: "Super Protein Mix",
//     description:
//       "A mix of superfoods and protein-rich ingredients for a balanced diet...",
//     ingredients: ["Quinoa", "Chickpeas", "Kale", "Avocado"],
//     price: "₹ 369/-",
//   },
//   {
//     label: "Veg",
//     image: proteinBowl,
//     name: "Power Protein Bowl",
//     description: "A bowl designed to give you a power-packed protein boost...",
//     ingredients: ["Quinoa", "Beans", "Avocado", "Boiled Eggs"],
//     price: "₹ 379/-",
//   },
// ];

// const fullBowlItems: FoodItem[] = [
//   {
//     label: "Non-Veg",
//     image: fullBowl,
//     name: "Meat Bowl with Veggies",
//     description:
//       "A hearty bowl of meat and vegetables, perfect for a balanced meal...",
//     ingredients: ["Chicken", "Broccoli", "Carrots", "Rice"],
//     price: "₹ 399/-",
//   },
//   {
//     label: "Non-Veg",
//     image: fullBowl,
//     name: "Keto Meat Bowl",
//     description: "A keto-friendly bowl with high-fat, low-carb ingredients...",
//     ingredients: ["Beef", "Avocado", "Lettuce", "Cheese"],
//     price: "₹ 449/-",
//   },
//   {
//     label: "Non-Veg",
//     image: fullBowl,
//     name: "Veggie Meat Delight",
//     description: "A delightful mix of meat and veggies in one bowl...",
//     ingredients: ["Various"],
//     price: "₹ 499/-",
//   },
//   {
//     label: "Non-Veg",
//     image: fullBowl,
//     name: "Chicken Veggie Bowl",
//     description:
//       "A bowl of grilled chicken with fresh veggies and brown rice...",
//     ingredients: ["Chicken", "Broccoli", "Carrots", "Brown Rice"],
//     price: "₹ 429/-",
//   },
//   {
//     label: "Non-Veg",
//     image: fullBowl,
//     name: "Protein Meat Bowl",
//     description:
//       "A protein-packed bowl with meat and a variety of vegetables...",
//     ingredients: ["Beef", "Broccoli", "Carrots", "Rice"],
//     price: "₹ 459/-",
//   },
//   {
//     label: "Non-Veg",
//     image: fullBowl,
//     name: "Mixed Meat Bowl",
//     description:
//       "A mix of different meats with a selection of fresh vegetables...",
//     ingredients: ["Chicken", "Beef", "Carrots", "Broccoli", "Rice"],
//     price: "₹ 479/-",
//   },
// ];

// const sandwichItems: FoodItem[] = [
//   {
//     label: "Veg",
//     image: sandwitch,
//     name: "Subway Sandwich",
//     description:
//       "A classic subway sandwich with fresh vegetables and cheese...",
//     ingredients: ["Bread", "Lettuce", "Tomato", "Cheese", "Cucumber"],
//     price: "₹ 199/-",
//   },
//   {
//     label: "Veg",
//     image: sandwitch,
//     name: "Club Sandwich",
//     description:
//       "A delicious club sandwich with layers of fresh ingredients...",
//     ingredients: ["Bread", "Lettuce", "Tomato", "Cheese", "Ham"],
//     price: "₹ 249/-",
//   },
//   {
//     label: "Veg",
//     image: sandwitch,
//     name: "Sandwich Central",
//     description: "A central place for enjoying a variety of sandwiches...",
//     ingredients: ["Various"],
//     price: "₹ 299/-",
//   },
//   {
//     label: "Veg",
//     image: sandwitch,
//     name: "Grilled Cheese Sandwich",
//     description:
//       "A classic grilled cheese sandwich with melted cheese and crispy bread...",
//     ingredients: ["Bread", "Cheese", "Butter"],
//     price: "₹ 179/-",
//   },
//   {
//     label: "Non-Veg",
//     image: sandwitch,
//     name: "Chicken Sandwich",
//     description:
//       "A tasty chicken sandwich with grilled chicken, lettuce, and mayo...",
//     ingredients: ["Bread", "Grilled Chicken", "Lettuce", "Mayo"],
//     price: "₹ 229/-",
//   },
//   {
//     label: "Veg",
//     image: sandwitch,
//     name: "Veggie Delight Sandwich",
//     description:
//       "A delightful sandwich with fresh vegetables and creamy avocado...",
//     ingredients: ["Bread", "Lettuce", "Tomato", "Avocado", "Cucumber"],
//     price: "₹ 209/-",
//   },
// ];

// const tacosItems: FoodItem[] = [
//   {
//     label: "Non-Veg",
//     image: tacos,
//     name: "Tacos",
//     description:
//       "Authentic Mexican tacos with a choice of fillings and fresh toppings...",
//     ingredients: ["Tortilla", "Beef", "Lettuce", "Tomato", "Cheese"],
//     price: "₹ 199/-",
//   },
//   {
//     label: "Non-Veg",
//     image: tacos,
//     name: "Fish Tacos",
//     description: "Crispy fish tacos with fresh slaw and tangy sauce...",
//     ingredients: ["Tortilla", "Fish", "Slaw", "Tangy Sauce"],
//     price: "₹ 249/-",
//   },
//   {
//     label: "Non-Veg",
//     image: tacos,
//     name: "Taco Fiesta",
//     description:
//       "A fiesta of flavors in every bite with a variety of taco options...",
//     ingredients: ["Various"],
//     price: "₹ 299/-",
//   },
//   {
//     label: "Veg",
//     image: tacos,
//     name: "Veggie Tacos",
//     description:
//       "Delicious veggie tacos with fresh vegetables and a tangy sauce...",
//     ingredients: ["Tortilla", "Lettuce", "Tomato", "Cheese", "Beans"],
//     price: "₹ 179/-",
//   },
//   {
//     label: "Non-Veg",
//     image: tacos,
//     name: "Chicken Tacos",
//     description:
//       "Juicy chicken tacos with fresh salsa and a sprinkle of cheese...",
//     ingredients: ["Tortilla", "Chicken", "Salsa", "Cheese"],
//     price: "₹ 229/-",
//   },
//   {
//     label: "Non-Veg",
//     image: tacos,
//     name: "Pork Tacos",
//     description: "Savory pork tacos with a spicy kick and fresh cilantro...",
//     ingredients: ["Tortilla", "Pork", "Spices", "Cilantro"],
//     price: "₹ 239/-",
//   },
// ];

export const idleDishItems: FoodItem[] = [
  {
    label: "Veg",
    image: idleDish,
    name: "Idle Dish",
    description:
      "A simple yet delicious South Indian dish made from fermented rice and lentil batter, served with sambar and chutney...",
    ingredients: ["Rice", "Lentils", "Sambar", "Chutney"],
    price: "₹ 150/-",
    restaurantName: "The Hungry Owl",
  },
  {
    label: "Veg",
    image: idleDish,
    name: "Spicy Idle Dish",
    description:
      "A spicier version of the classic Idle Dish, served with a tangy and hot sambar...",
    ingredients: ["Rice", "Lentils", "Spicy Sambar", "Chutney"],
    price: "₹ 160/-",
    restaurantName: "Savory Bites Cafe",
  },
  {
    label: "Veg",
    image: idleDish,
    name: "Deluxe Idle Dish",
    description:
      "A deluxe version of the Idle Dish with added spices and ingredients...",
    ingredients: ["Rice", "Lentils", "Vegetables", "Spices"],
    price: "₹ 180/-",
    restaurantName: "Spice Route Kitchen",
  },
  {
    label: "Veg",
    image: idleDish,
    name: "Healthy Idle Dish",
    description: "A healthier version of Idle Dish with added greens...",
    ingredients: ["Rice", "Lentils", "Spinach", "Chutney"],
    price: "₹ 170/-",
    restaurantName: "Bella Italia Trattoria",
  },
];

export const burgurItems: FoodItem[] = [
  {
    label: "Non-Veg",
    image: burgure,
    name: "Burgur",
    description:
      "A classic beef burger with lettuce, tomato, and cheese, served with fries...",
    ingredients: ["Beef Patty", "Lettuce", "Tomato", "Cheese", "Fries"],
    price: "₹ 399/-",
    restaurantName: "Oceanview Grill",
  },
  {
    label: "Non-Veg",
    image: burgure,
    name: "Chicken Burgur",
    description:
      "A juicy chicken burger with a crispy coating, topped with fresh lettuce and mayo...",
    ingredients: ["Chicken Patty", "Lettuce", "Mayo", "Cheese"],
    price: "₹ 349/-",
    restaurantName: "The Hungry Owl",
  },
  {
    label: "Veg",
    image: burgure,
    name: "Veggie Burgur",
    description:
      "A tasty veggie burger with fresh lettuce, tomato, and cheese...",
    ingredients: ["Veggie Patty", "Lettuce", "Tomato", "Cheese"],
    price: "₹ 299/-",
    restaurantName: "Savory Bites Cafe",
  },
  {
    label: "Non-Veg",
    image: burgure,
    name: "Spicy Chicken Burgur",
    description:
      "A spicy version of the chicken burger with jalapenos and hot sauce...",
    ingredients: [
      "Chicken Patty",
      "Lettuce",
      "Tomato",
      "Jalapenos",
      "Hot Sauce",
    ],
    price: "₹ 379/-",
    restaurantName: "Spice Route Kitchen",
  },
];

export const doublePattiBurgurItems: FoodItem[] = [
  {
    label: "Non-Veg",
    image: largeBurgure,
    name: "Double Patti Burgur",
    description:
      "A hearty double patty beef burger with extra cheese, lettuce, and tomato...",
    ingredients: ["Beef Patties", "Lettuce", "Tomato", "Cheese"],
    price: "₹ 499/-",
    restaurantName: "Bella Italia Trattoria",
  },
  {
    label: "Non-Veg",
    image: largeBurgure,
    name: "Triple Patti Burgur",
    description:
      "A towering triple patty burger for those with a big appetite...",
    ingredients: ["Beef Patties", "Lettuce", "Tomato", "Cheese"],
    price: "₹ 599/-",
    restaurantName: "Oceanview Grill",
  },
  {
    label: "Non-Veg",
    image: largeBurgure,
    name: "Mega Beef Burgur",
    description:
      "A giant beef burger with three patties, extra cheese, and all the fixings...",
    ingredients: ["Beef Patties", "Lettuce", "Tomato", "Cheese", "Pickles"],
    price: "₹ 649/-",
    restaurantName: "Fire & Ice Bistro",
  },
  {
    label: "Non-Veg",
    image: largeBurgure,
    name: "Ultimate Double Burgur",
    description:
      "The ultimate burger experience with double patties and double cheese...",
    ingredients: [
      "Beef Patties",
      "Lettuce",
      "Tomato",
      "Double Cheese",
      "Onions",
    ],
    price: "₹ 549/-",
    restaurantName: "The Hungry Owl",
  },
];

export const grilledTikkiBurgurItems: FoodItem[] = [
  {
    label: "Veg",
    image: tikkiBurgure,
    name: "Grilled Tikki Burgur",
    description:
      "A delicious vegetarian burger with a grilled tikki patty, fresh vegetables, and spicy sauce...",
    ingredients: ["Tikki Patty", "Lettuce", "Tomato", "Spicy Sauce"],
    price: "₹ 299/-",
    restaurantName: "Tokyo Fusion Sushi Bar",
  },
  {
    label: "Veg",
    image: tikkiBurgure,
    name: "Spicy Tikki Burgur",
    description:
      "A spicy version of the Grilled Tikki Burger with extra jalapenos...",
    ingredients: [
      "Tikki Patty",
      "Lettuce",
      "Tomato",
      "Jalapenos",
      "Spicy Sauce",
    ],
    price: "₹ 349/-",
    restaurantName: "La Petite Creperie",
  },
  {
    label: "Veg",
    image: tikkiBurgure,
    name: "Classic Tikki Burgur",
    description:
      "A classic tikki burger with a mix of vegetables and flavorful spices...",
    ingredients: ["Tikki Patty", "Lettuce", "Tomato", "Cheese", "Spices"],
    price: "₹ 329/-",
    restaurantName: "Himalayan Spice House",
  },
  {
    label: "Veg",
    image: tikkiBurgure,
    name: "Deluxe Tikki Burgur",
    description:
      "A deluxe version with additional toppings and special sauce...",
    ingredients: [
      "Tikki Patty",
      "Lettuce",
      "Tomato",
      "Cheese",
      "Special Sauce",
    ],
    price: "₹ 359/-",
    restaurantName: "The Rustic Table",
  },
];

export const highProteinDietItems: FoodItem[] = [
  {
    label: "Veg",
    image: proteinBowl,
    name: "High Protein Diet",
    description:
      "A bowl packed with high protein ingredients, perfect for a healthy meal...",
    ingredients: ["Quinoa", "Chickpeas", "Avocado", "Egg"],
    price: "₹ 299/-",
    restaurantName: "Saffron Garden Indian Cuisine",
  },
  {
    label: "Veg",
    image: proteinBowl,
    name: "Vegan Protein Bowl",
    description:
      "A completely vegan protein bowl with a mix of plant-based proteins...",
    ingredients: ["Quinoa", "Beans", "Tofu", "Vegetables"],
    price: "₹ 349/-",
    restaurantName: "Mediterranean Delights Bistro",
  },
  {
    label: "Veg",
    image: proteinBowl,
    name: "Green Protein Bowl",
    description:
      "A green protein bowl with a variety of green veggies and protein sources...",
    ingredients: ["Spinach", "Broccoli", "Quinoa", "Tofu"],
    price: "₹ 319/-",
    restaurantName: "Savory Bites Cafe",
  },
  {
    label: "Veg",
    image: proteinBowl,
    name: "Super Protein Mix",
    description:
      "A mix of superfoods and protein-rich ingredients for a balanced diet...",
    ingredients: ["Quinoa", "Chickpeas", "Kale", "Avocado"],
    price: "₹ 369/-",
    restaurantName: "Fire & Ice Bistro",
  },
];

export const meatBowlWithVeggiesItems: FoodItem[] = [
  {
    label: "Non-Veg",
    image: fullBowl,
    name: "Meat Bowl with Veggies",
    description:
      "A hearty bowl of meat and vegetables, perfect for a balanced meal...",
    ingredients: ["Chicken", "Broccoli", "Carrots", "Rice"],
    price: "₹ 399/-",
    restaurantName: "Spice Route Kitchen",
  },
  {
    label: "Non-Veg",
    image: fullBowl,
    name: "Keto Meat Bowl",
    description: "A keto-friendly bowl with high-fat, low-carb ingredients...",
    ingredients: ["Beef", "Avocado", "Lettuce", "Cheese"],
    price: "₹ 449/-",
    restaurantName: "Oceanview Grill",
  },
  {
    label: "Non-Veg",
    image: fullBowl,
    name: "Chicken Veggie Bowl",
    description:
      "A bowl of grilled chicken with fresh veggies and brown rice...",
    ingredients: ["Chicken", "Broccoli", "Carrots", "Brown Rice"],
    price: "₹ 429/-",
    restaurantName: "Bella Italia Trattoria",
  },
  {
    label: "Non-Veg",
    image: fullBowl,
    name: "Protein Meat Bowl",
    description:
      "A protein-packed bowl with meat and a variety of vegetables...",
    ingredients: ["Beef", "Broccoli", "Carrots", "Rice"],
    price: "₹ 459/-",
    restaurantName: "The Hungry Owl",
  },
];

export const subwaySandwitchItems: FoodItem[] = [
  {
    label: "Veg",
    image: sandwitch,
    name: "Subway Sandwich",
    description:
      "A classic subway sandwich with fresh vegetables and cheese...",
    ingredients: ["Bread", "Lettuce", "Tomato", "Cheese", "Cucumber"],
    price: "₹ 199/-",
    restaurantName: "The Hungry Owl",
  },
  {
    label: "Veg",
    image: sandwitch,
    name: "Club Sandwich",
    description:
      "A delicious club sandwich with layers of fresh ingredients...",
    ingredients: ["Bread", "Lettuce", "Tomato", "Cheese", "Ham"],
    price: "₹ 249/-",
    restaurantName: "Savory Bites Cafe",
  },
  {
    label: "Veg",
    image: sandwitch,
    name: "Sandwich Central",
    description: "A central place for enjoying a variety of sandwiches...",
    ingredients: ["Various"],
    price: "₹ 299/-",
    restaurantName: "Spice Route Kitchen",
  },
  {
    label: "Veg",
    image: sandwitch,
    name: "Grilled Cheese Sandwich",
    description:
      "A classic grilled cheese sandwich with melted cheese and crispy bread...",
    ingredients: ["Bread", "Cheese", "Butter"],
    price: "₹ 179/-",
    restaurantName: "Bella Italia Trattoria",
  },
  {
    label: "Non-Veg",
    image: sandwitch,
    name: "Chicken Sandwich",
    description:
      "A tasty chicken sandwich with grilled chicken, lettuce, and mayo...",
    ingredients: ["Bread", "Grilled Chicken", "Lettuce", "Mayo"],
    price: "₹ 229/-",
    restaurantName: "Oceanview Grill",
  },
  {
    label: "Veg",
    image: sandwitch,
    name: "Veggie Delight Sandwich",
    description:
      "A delightful sandwich with fresh vegetables and creamy avocado...",
    ingredients: ["Bread", "Lettuce", "Tomato", "Avocado", "Cucumber"],
    price: "₹ 209/-",
    restaurantName: "Fire & Ice Bistro",
  },
];

export const tacosItems: FoodItem[] = [
  {
    label: "Non-Veg",
    image: tacos,
    name: "Tacos",
    description:
      "Authentic Mexican tacos with a choice of fillings and fresh toppings...",
    ingredients: ["Tortilla", "Beef", "Lettuce", "Tomato", "Cheese"],
    price: "₹ 199/-",
    restaurantName: "The Hungry Owl",
  },
  {
    label: "Non-Veg",
    image: tacos,
    name: "Fish Tacos",
    description: "Crispy fish tacos with fresh slaw and tangy sauce...",
    ingredients: ["Tortilla", "Fish", "Slaw", "Tangy Sauce"],
    price: "₹ 249/-",
    restaurantName: "Savory Bites Cafe",
  },
  {
    label: "Non-Veg",
    image: tacos,
    name: "Taco Fiesta",
    description:
      "A fiesta of flavors in every bite with a variety of taco options...",
    ingredients: ["Various"],
    price: "₹ 299/-",
    restaurantName: "Spice Route Kitchen",
  },
  {
    label: "Veg",
    image: tacos,
    name: "Veggie Tacos",
    description:
      "Delicious veggie tacos with fresh vegetables and a tangy sauce...",
    ingredients: ["Tortilla", "Lettuce", "Tomato", "Cheese", "Beans"],
    price: "₹ 179/-",
    restaurantName: "Bella Italia Trattoria",
  },
  {
    label: "Non-Veg",
    image: tacos,
    name: "Chicken Tacos",
    description:
      "Juicy chicken tacos with fresh salsa and a sprinkle of cheese...",
    ingredients: ["Tortilla", "Chicken", "Salsa", "Cheese"],
    price: "₹ 229/-",
    restaurantName: "Oceanview Grill",
  },
  {
    label: "Non-Veg",
    image: tacos,
    name: "Pork Tacos",
    description: "Savory pork tacos with a spicy kick and fresh cilantro...",
    ingredients: ["Tortilla", "Pork", "Spices", "Cilantro"],
    price: "₹ 239/-",
    restaurantName: "Fire & Ice Bistro",
  },
];

export const spicyIdleDishItems: FoodItem[] = [
  {
    label: "Veg",
    image: idleDish,
    name: "Spicy Idle Dish",
    description:
      "A spicier version of the classic Idle Dish, served with a tangy and hot sambar...",
    ingredients: ["Rice", "Lentils", "Spicy Sambar", "Chutney"],
    price: "₹ 160/-",
    restaurantName: "The Hungry Owl",
  },
  {
    label: "Veg",
    image: idleDish,
    name: "Fiery Idle Dish",
    description:
      "An extra spicy version of the Idle Dish, for those who love heat...",
    ingredients: ["Rice", "Lentils", "Extra Spicy Sambar", "Chutney"],
    price: "₹ 170/-",
    restaurantName: "Savory Bites Cafe",
  },
  {
    label: "Veg",
    image: idleDish,
    name: "Sizzling Idle Platter",
    description:
      "A sizzling platter of Idle Dish with a variety of chutneys and toppings...",
    ingredients: ["Rice", "Lentils", "Assorted Chutneys", "Toppings"],
    price: "₹ 180/-",
    restaurantName: "Spice Route Kitchen",
  },
  {
    label: "Veg",
    image: idleDish,
    name: "Spicy Masala Idle",
    description:
      "Masala Idle served hot with a spicy twist and aromatic spices...",
    ingredients: ["Rice", "Lentils", "Spicy Masala", "Chutney"],
    price: "₹ 165/-",
    restaurantName: "Bella Italia Trattoria",
  },
];

export const chickenBurgurItems: FoodItem[] = [
  {
    label: "Non-Veg",
    image: burgure,
    name: "Chicken Burgur",
    description:
      "A juicy chicken burger with a crispy coating, topped with fresh lettuce and mayo...",
    ingredients: ["Chicken Patty", "Lettuce", "Mayo", "Cheese"],
    price: "₹ 349/-",
    restaurantName: "Oceanview Grill",
  },
  {
    label: "Non-Veg",
    image: burgure,
    name: "Spicy Chicken Burgur",
    description:
      "A spicy version of the Chicken Burgur with jalapenos and hot sauce...",
    ingredients: [
      "Chicken Patty",
      "Lettuce",
      "Tomato",
      "Jalapenos",
      "Hot Sauce",
    ],
    price: "₹ 379/-",
    restaurantName: "Fire & Ice Bistro",
  },
  {
    label: "Non-Veg",
    image: burgure,
    name: "BBQ Chicken Burgur",
    description:
      "A BBQ-flavored chicken burger with tangy BBQ sauce and crispy onions...",
    ingredients: ["Chicken Patty", "BBQ Sauce", "Lettuce", "Cheese"],
    price: "₹ 369/-",
    restaurantName: "The Hungry Owl",
  },
  {
    label: "Non-Veg",
    image: burgure,
    name: "Chicken Cheese Supreme",
    description:
      "A supreme burger with chicken, double cheese, and secret sauce...",
    ingredients: ["Chicken Patty", "Double Cheese", "Secret Sauce"],
    price: "₹ 389/-",
    restaurantName: "Savory Bites Cafe",
  },
];

export const triplePattiBurgurItems: FoodItem[] = [
  {
    label: "Non-Veg",
    image: largeBurgure,
    name: "Triple Patti Burgur",
    description:
      "A towering triple patty burger for those with a big appetite...",
    ingredients: ["Beef Patties", "Lettuce", "Tomato", "Cheese"],
    price: "₹ 599/-",
    restaurantName: "The Hungry Owl",
  },
  {
    label: "Non-Veg",
    image: largeBurgure,
    name: "Ultimate Triple Burgur",
    description:
      "The ultimate burger experience with triple patties, double cheese, and all the fixings...",
    ingredients: [
      "Beef Patties",
      "Lettuce",
      "Tomato",
      "Double Cheese",
      "Pickles",
    ],
    price: "₹ 649/-",
    restaurantName: "Savory Bites Cafe",
  },
  {
    label: "Non-Veg",
    image: largeBurgure,
    name: "Big Beef Bonanza",
    description:
      "A bonanza of beefy goodness with triple patties and special sauce...",
    ingredients: ["Beef Patties", "Special Sauce", "Lettuce", "Cheese"],
    price: "₹ 629/-",
    restaurantName: "Spice Route Kitchen",
  },
  {
    label: "Non-Veg",
    image: largeBurgure,
    name: "Mega Meat Monster",
    description:
      "The ultimate mega burger with triple patties, bacon, and spicy jalapenos...",
    ingredients: [
      "Beef Patties",
      "Bacon",
      "Jalapenos",
      "Cheddar Cheese",
      "Special Sauce",
    ],
    price: "₹ 679/-",
    restaurantName: "Bella Italia Trattoria",
  },
  {
    label: "Non-Veg",
    image: largeBurgure,
    name: "Super Size Beef Burger",
    description:
      "A super-sized beef burger with triple patties and extra cheese...",
    ingredients: ["Beef Patties", "Extra Cheese", "Lettuce", "Tomato"],
    price: "₹ 659/-",
    restaurantName: "Oceanview Grill",
  },
  {
    label: "Non-Veg",
    image: largeBurgure,
    name: "Gourmet Triple Burger",
    description:
      "A gourmet triple burger with premium beef patties and gourmet toppings...",
    ingredients: [
      "Beef Patties",
      "Gourmet Toppings",
      "Lettuce",
      "Tomato",
      "Cheese",
    ],
    price: "₹ 689/-",
    restaurantName: "Fire & Ice Bistro",
  },
];

export const spicyTikkiBurgurItems: FoodItem[] = [
  {
    label: "Veg",
    image: tikkiBurgure,
    name: "Spicy Tikki Burgur",
    description:
      "A spicy version of the Grilled Tikki Burger with extra jalapenos...",
    ingredients: [
      "Tikki Patty",
      "Lettuce",
      "Tomato",
      "Jalapenos",
      "Spicy Sauce",
    ],
    price: "₹ 349/-",
    restaurantName: "The Hungry Owl",
  },
  {
    label: "Veg",
    image: tikkiBurgure,
    name: "Hot Tikki Burgur",
    description:
      "A hot and spicy version of the Tikki Burger with fiery sauce...",
    ingredients: ["Tikki Patty", "Lettuce", "Tomato", "Cheese", "Fiery Sauce"],
    price: "₹ 359/-",
    restaurantName: "Savory Bites Cafe",
  },
  {
    label: "Veg",
    image: tikkiBurgure,
    name: "Tikki Treat",
    description: "A treat for tikka lovers with a variety of tikka burgers...",
    ingredients: ["Tikki Patty", "Special Sauce", "Lettuce", "Tomato"],
    price: "₹ 369/-",
    restaurantName: "Spice Route Kitchen",
  },
  {
    label: "Veg",
    image: tikkiBurgure,
    name: "Fiery Tikki Blast",
    description:
      "A blast of fiery flavors in every bite with jalapenos and spicy sauce...",
    ingredients: ["Tikki Patty", "Jalapenos", "Spicy Sauce", "Lettuce"],
    price: "₹ 379/-",
    restaurantName: "Bella Italia Trattoria",
  },
  {
    label: "Veg",
    image: tikkiBurgure,
    name: "Smoky Tikki Burger",
    description:
      "A smoky twist on the classic Tikki Burger with grilled flavors...",
    ingredients: ["Tikki Patty", "Lettuce", "Tomato", "Smoky Sauce"],
    price: "₹ 369/-",
    restaurantName: "Oceanview Grill",
  },
  {
    label: "Veg",
    image: tikkiBurgure,
    name: "Cheesy Tikki Supreme",
    description:
      "Supremely cheesy Tikki Burger with extra cheese and savory toppings...",
    ingredients: [
      "Tikki Patty",
      "Cheese",
      "Lettuce",
      "Tomato",
      "Special Sauce",
    ],
    price: "₹ 389/-",
    restaurantName: "Fire & Ice Bistro",
  },
];

export const veganProteinBowlItems: FoodItem[] = [
  {
    label: "Veg",
    image: proteinBowl,
    name: "Vegan Protein Bowl",
    description:
      "A completely vegan protein bowl with a mix of plant-based proteins...",
    ingredients: ["Quinoa", "Beans", "Tofu", "Vegetables"],
    price: "₹ 349/-",
    restaurantName: "The Hungry Owl",
  },
  {
    label: "Veg",
    image: proteinBowl,
    name: "Green Protein Bowl",
    description:
      "A green protein bowl with a variety of green veggies and protein sources...",
    ingredients: ["Spinach", "Broccoli", "Quinoa", "Tofu"],
    price: "₹ 319/-",
    restaurantName: "Savory Bites Cafe",
  },
  {
    label: "Veg",
    image: proteinBowl,
    name: "Protein Power Pack",
    description:
      "A power-packed protein bowl with nutrient-rich ingredients...",
    ingredients: ["Lentils", "Chickpeas", "Quinoa", "Tofu"],
    price: "₹ 369/-",
    restaurantName: "Spice Route Kitchen",
  },
  {
    label: "Veg",
    image: proteinBowl,
    name: "Superfood Quinoa Bowl",
    description:
      "A superfood bowl featuring quinoa, kale, avocado, and other superfoods...",
    ingredients: ["Quinoa", "Kale", "Avocado", "Chickpeas"],
    price: "₹ 379/-",
    restaurantName: "Bella Italia Trattoria",
  },
  {
    label: "Veg",
    image: proteinBowl,
    name: "Mediterranean Protein Bowl",
    description:
      "A Mediterranean-inspired protein bowl with hummus, olives, and falafel...",
    ingredients: ["Quinoa", "Hummus", "Olives", "Falafel"],
    price: "₹ 359/-",
    restaurantName: "Oceanview Grill",
  },
  {
    label: "Veg",
    image: proteinBowl,
    name: "Asian Tofu Bowl",
    description:
      "An Asian-inspired tofu bowl with sesame ginger dressing and crispy tofu...",
    ingredients: ["Quinoa", "Tofu", "Sesame Ginger Dressing", "Vegetables"],
    price: "₹ 389/-",
    restaurantName: "Fire & Ice Bistro",
  },
];

export const ketoMeatBowlItems: FoodItem[] = [
  {
    label: "Non-Veg",
    image: fullBowl,
    name: "Keto Meat Bowl",
    description: "A keto-friendly bowl with high-fat, low-carb ingredients...",
    ingredients: ["Beef", "Avocado", "Lettuce", "Cheese"],
    price: "₹ 449/-",
    restaurantName: "The Hungry Owl",
  },
  {
    label: "Non-Veg",
    image: fullBowl,
    name: "Low-Carb Meat Bowl",
    description:
      "A low-carb meat bowl with a balanced mix of proteins and fats...",
    ingredients: ["Chicken", "Broccoli", "Cheese", "Avocado"],
    price: "₹ 429/-",
    restaurantName: "Savory Bites Cafe",
  },
  {
    label: "Non-Veg",
    image: fullBowl,
    name: "High-Protein Keto Bowl",
    description:
      "A high-protein bowl for keto enthusiasts with savory meats and greens...",
    ingredients: ["Beef", "Chicken", "Spinach", "Cheese"],
    price: "₹ 469/-",
    restaurantName: "Spice Route Kitchen",
  },
  {
    label: "Non-Veg",
    image: fullBowl,
    name: "Carnivore Meat Bowl",
    description:
      "A meat lover's dream bowl with assorted meats and rich sauces...",
    ingredients: ["Beef", "Chicken", "Pork", "Sausage", "Cheese"],
    price: "₹ 489/-",
    restaurantName: "Bella Italia Trattoria",
  },
  {
    label: "Non-Veg",
    image: fullBowl,
    name: "Mighty Steak Bowl",
    description:
      "A mighty bowl featuring juicy steak cuts with roasted vegetables...",
    ingredients: ["Steak", "Roasted Vegetables", "Cheese", "Garlic Butter"],
    price: "₹ 499/-",
    restaurantName: "Oceanview Grill",
  },
  {
    label: "Non-Veg",
    image: fullBowl,
    name: "Spicy Beef Bowl",
    description:
      "Spicy beef bowl with peppers, onions, and a kick of hot sauce...",
    ingredients: ["Spicy Beef", "Peppers", "Onions", "Hot Sauce"],
    price: "₹ 459/-",
    restaurantName: "Fire & Ice Bistro",
  },
];

export const clubSandwitchItems: FoodItem[] = [
  {
    label: "Veg",
    image: sandwitch,
    name: "Club Sandwitch",
    description: "A classic club sandwich with layers of fresh ingredients...",
    ingredients: ["Bread", "Lettuce", "Tomato", "Cheese", "Ham"],
    price: "₹ 249/-",
    restaurantName: "The Hungry Owl",
  },
  {
    label: "Veg",
    image: sandwitch,
    name: "Deluxe Club Sandwitch",
    description:
      "A deluxe club sandwich with extra fillings and a special sauce...",
    ingredients: ["Bread", "Lettuce", "Tomato", "Cheese", "Special Sauce"],
    price: "₹ 279/-",
    restaurantName: "Savory Bites Cafe",
  },
  {
    label: "Veg",
    image: sandwitch,
    name: "Turkey Club Sandwitch",
    description:
      "A turkey club sandwich with fresh turkey slices and creamy mayo...",
    ingredients: ["Bread", "Turkey", "Lettuce", "Tomato", "Mayo"],
    price: "₹ 269/-",
    restaurantName: "Spice Route Kitchen",
  },
  {
    label: "Veg",
    image: sandwitch,
    name: "Veggie Lover's Club",
    description:
      "A veggie-packed club sandwich with avocado, sprouts, and hummus...",
    ingredients: ["Bread", "Avocado", "Sprouts", "Hummus", "Tomato"],
    price: "₹ 259/-",
    restaurantName: "Bella Italia Trattoria",
  },
  {
    label: "Veg",
    image: sandwitch,
    name: "Grilled Chicken Club",
    description:
      "Grilled chicken club sandwich with crispy bacon and ranch dressing...",
    ingredients: [
      "Bread",
      "Grilled Chicken",
      "Bacon",
      "Lettuce",
      "Ranch Dressing",
    ],
    price: "₹ 289/-",
    restaurantName: "Oceanview Grill",
  },
  {
    label: "Veg",
    image: sandwitch,
    name: "Mushroom Swiss Club",
    description:
      "Mushroom and Swiss cheese club sandwich with sautéed mushrooms...",
    ingredients: ["Bread", "Mushrooms", "Swiss Cheese", "Lettuce", "Tomato"],
    price: "₹ 269/-",
    restaurantName: "Fire & Ice Bistro",
  },
];

export const fishTacosItems: FoodItem[] = [
  {
    label: "Non-Veg",
    image: tacos,
    name: "Fish Tacos",
    description: "Crispy fish tacos with fresh slaw and tangy sauce...",
    ingredients: ["Tortilla", "Fish", "Slaw", "Tangy Sauce"],
    price: "₹ 249/-",
    restaurantName: "The Hungry Owl",
  },
  {
    label: "Non-Veg",
    image: tacos,
    name: "Grilled Fish Tacos",
    description:
      "Grilled fish tacos with a zesty lime marinade and avocado salsa...",
    ingredients: ["Tortilla", "Grilled Fish", "Avocado Salsa", "Lime Marinade"],
    price: "₹ 279/-",
    restaurantName: "Savory Bites Cafe",
  },
  {
    label: "Non-Veg",
    image: tacos,
    name: "Baja Fish Tacos",
    description:
      "Baja-style fish tacos with beer-battered fish and creamy sauce...",
    ingredients: [
      "Tortilla",
      "Beer-Battered Fish",
      "Cabbage Slaw",
      "Creamy Sauce",
    ],
    price: "₹ 299/-",
    restaurantName: "Spice Route Kitchen",
  },
  {
    label: "Non-Veg",
    image: tacos,
    name: "Spicy Shrimp Tacos",
    description: "Spicy shrimp tacos with chipotle mayo and fresh cilantro...",
    ingredients: ["Tortilla", "Spicy Shrimp", "Chipotle Mayo", "Cilantro"],
    price: "₹ 269/-",
    restaurantName: "Bella Italia Trattoria",
  },
  {
    label: "Non-Veg",
    image: tacos,
    name: "Cajun Fish Tacos",
    description:
      "Cajun-style fish tacos with Cajun spices and tangy coleslaw...",
    ingredients: ["Tortilla", "Cajun Fish", "Coleslaw", "Lime Crema"],
    price: "₹ 289/-",
    restaurantName: "Oceanview Grill",
  },
  {
    label: "Non-Veg",
    image: tacos,
    name: "Grilled Shrimp Tacos",
    description:
      "Grilled shrimp tacos with pineapple salsa and avocado cream...",
    ingredients: [
      "Tortilla",
      "Grilled Shrimp",
      "Pineapple Salsa",
      "Avocado Cream",
    ],
    price: "₹ 299/-",
    restaurantName: "Fire & Ice Bistro",
  },
];

export const burgurHeavenItems: FoodItem[] = [
  {
    label: "Non-Veg",
    image: burgure,
    name: "Burger Heaven",
    description:
      "A heavenly experience with gourmet burgers crafted with premium ingredients...",
    ingredients: ["Burger Patty", "Lettuce", "Tomato", "Cheese"],
    price: "₹ 399/-",
    restaurantName: "The Hungry Owl",
  },
  {
    label: "Non-Veg",
    image: burgure,
    name: "Ultimate Burger Feast",
    description:
      "An ultimate feast with a variety of burgers including classic and specialty options...",
    ingredients: [
      "Burger Patty",
      "Special Sauce",
      "Lettuce",
      "Tomato",
      "Cheese",
    ],
    price: "₹ 429/-",
    restaurantName: "Savory Bites Cafe",
  },
  {
    label: "Non-Veg",
    image: burgure,
    name: "Burger Delights",
    description: "Delightful burgers with unique flavors and combinations...",
    ingredients: ["Burger Patty", "Lettuce", "Tomato", "Pickles", "Cheese"],
    price: "₹ 379/-",
    restaurantName: "Spice Route Kitchen",
  },
  {
    label: "Non-Veg",
    image: burgure,
    name: "Premium Burger Selection",
    description:
      "A premium selection of burgers with gourmet toppings and sauces...",
    ingredients: [
      "Burger Patty",
      "Truffle Mayo",
      "Lettuce",
      "Tomato",
      "Cheese",
    ],
    price: "₹ 449/-",
    restaurantName: "Bella Italia Trattoria",
  },
  {
    label: "Non-Veg",
    image: burgure,
    name: "Gourmet Burger Box",
    description:
      "A box filled with gourmet burgers for a luxurious dining experience...",
    ingredients: [
      "Burger Patty",
      "Caramelized Onions",
      "Lettuce",
      "Tomato",
      "Cheese",
    ],
    price: "₹ 409/-",
    restaurantName: "Oceanview Grill",
  },
  {
    label: "Non-Veg",
    image: burgure,
    name: "Signature Burger Platter",
    description:
      "A platter featuring signature burgers with house-made sauces and toppings...",
    ingredients: [
      "Burger Patty",
      "House Special Sauce",
      "Lettuce",
      "Tomato",
      "Cheese",
    ],
    price: "₹ 439/-",
    restaurantName: "Fire & Ice Bistro",
  },
];

export const idleRestaurantItems: FoodItem[] = [
  {
    label: "Veg",
    image: idleDish,
    name: "Idle Restaurant",
    description:
      "A specialty restaurant serving a variety of idlis with different accompaniments...",
    ingredients: ["Idli", "Sambar", "Chutney", "Ghee"],
    price: "₹ 199/-",
    restaurantName: "The Hungry Owl",
  },
  {
    label: "Veg",
    image: idleDish,
    name: "South Indian Delights",
    description:
      "A delightful assortment of South Indian dishes including idlis, dosas, and uttapams...",
    ingredients: ["Idli", "Dosa", "Uttapam", "Chutney", "Sambar"],
    price: "₹ 229/-",
    restaurantName: "Savory Bites Cafe",
  },
  {
    label: "Veg",
    image: idleDish,
    name: "Traditional Idli Platter",
    description:
      "A traditional platter featuring different varieties of idlis with authentic flavors...",
    ingredients: ["Idli", "Coconut Chutney", "Tomato Chutney", "Sambar"],
    price: "₹ 219/-",
    restaurantName: "Spice Route Kitchen",
  },
  {
    label: "Veg",
    image: idleDish,
    name: "Idli Feast",
    description:
      "A feast of fluffy idlis served with a variety of chutneys and sambar...",
    ingredients: ["Idli", "Chutney Assortment", "Sambar", "Ghee"],
    price: "₹ 239/-",
    restaurantName: "Bella Italia Trattoria",
  },
  {
    label: "Veg",
    image: idleDish,
    name: "Special Idli Combo",
    description:
      "A special combo featuring different types of idlis with unique accompaniments...",
    ingredients: ["Idli Varieties", "Chutney Trio", "Sambar", "Ghee"],
    price: "₹ 249/-",
    restaurantName: "Oceanview Grill",
  },
  {
    label: "Veg",
    image: idleDish,
    name: "Idli Fusion Platter",
    description:
      "A fusion platter combining traditional idlis with modern twists...",
    ingredients: ["Idli Varieties", "Fusion Sauces", "Sambar", "Ghee"],
    price: "₹ 259/-",
    restaurantName: "Fire & Ice Bistro",
  },
];

export const bigBurgurJointItems: FoodItem[] = [
  {
    label: "Non-Veg",
    image: burgure,
    name: "Big Burger Joint",
    description: "A joint serving big, hearty burgers with all the fixings...",
    ingredients: ["Burger Patty", "Lettuce", "Tomato", "Pickles", "Cheese"],
    price: "₹ 349/-",
    restaurantName: "The Hungry Owl",
  },
  {
    label: "Non-Veg",
    image: burgure,
    name: "Classic Burger Joint",
    description:
      "A classic joint offering traditional burgers with fresh ingredients...",
    ingredients: ["Burger Patty", "Lettuce", "Tomato", "Cheese", "Onion"],
    price: "₹ 329/-",
    restaurantName: "Savory Bites Cafe",
  },
  {
    label: "Non-Veg",
    image: burgure,
    name: "Signature Burger Joint",
    description:
      "Signature burgers with unique flavors and house-made sauces...",
    ingredients: [
      "Burger Patty",
      "Special Sauce",
      "Lettuce",
      "Tomato",
      "Cheese",
    ],
    price: "₹ 359/-",
    restaurantName: "Spice Route Kitchen",
  },
  {
    label: "Non-Veg",
    image: burgure,
    name: "Deluxe Burger Joint",
    description:
      "Deluxe burgers with premium toppings and a variety of sauces...",
    ingredients: [
      "Burger Patty",
      "Avocado",
      "Bacon",
      "Lettuce",
      "Special Sauce",
    ],
    price: "₹ 369/-",
    restaurantName: "Bella Italia Trattoria",
  },
  {
    label: "Non-Veg",
    image: burgure,
    name: "BBQ Burger Joint",
    description:
      "BBQ burgers with smoky flavors, crispy onions, and BBQ sauce...",
    ingredients: ["Burger Patty", "BBQ Sauce", "Crispy Onions", "Lettuce"],
    price: "₹ 339/-",
    restaurantName: "Oceanview Grill",
  },
  {
    label: "Non-Veg",
    image: burgure,
    name: "Double Patty Joint",
    description:
      "Double patty burgers loaded with cheese, lettuce, and secret sauce...",
    ingredients: [
      "Double Burger Patty",
      "Secret Sauce",
      "Lettuce",
      "Cheese",
      "Pickles",
    ],
    price: "₹ 379/-",
    restaurantName: "Fire & Ice Bistro",
  },
];

export const tikkiPalaceItems: FoodItem[] = [
  {
    label: "Veg",
    image: tikkiBurgure,
    name: "Tikki Palace",
    description:
      "A palace of tikka delights with a variety of tikki burgers...",
    ingredients: ["Tikki Patty", "Lettuce", "Tomato", "Special Sauce"],
    price: "₹ 299/-",
    restaurantName: "The Hungry Owl",
  },
  {
    label: "Veg",
    image: tikkiBurgure,
    name: "Royal Tikki Treat",
    description:
      "A royal treat with the finest tikki burgers fit for a king...",
    ingredients: ["Tikki Patty", "Special Sauce", "Lettuce", "Tomato"],
    price: "₹ 329/-",
    restaurantName: "Savory Bites Cafe",
  },
  {
    label: "Veg",
    image: tikkiBurgure,
    name: "Gourmet Tikki Burgers",
    description:
      "Gourmet tikki burgers with premium ingredients and artisan buns...",
    ingredients: ["Tikki Patty", "Artisan Buns", "Lettuce", "Cheese"],
    price: "₹ 349/-",
    restaurantName: "Spice Route Kitchen",
  },
  {
    label: "Veg",
    image: tikkiBurgure,
    name: "Spicy Tikki Fusion",
    description:
      "A fusion of spicy flavors in a tikki burger topped with jalapenos...",
    ingredients: ["Tikki Patty", "Jalapenos", "Lettuce", "Special Sauce"],
    price: "₹ 319/-",
    restaurantName: "Bella Italia Trattoria",
  },
  {
    label: "Veg",
    image: tikkiBurgure,
    name: "Tikki Supreme",
    description:
      "A supreme tikki burger loaded with gourmet toppings and special sauce...",
    ingredients: [
      "Tikki Patty",
      "Gourmet Toppings",
      "Lettuce",
      "Special Sauce",
    ],
    price: "₹ 369/-",
    restaurantName: "Oceanview Grill",
  },
  {
    label: "Veg",
    image: tikkiBurgure,
    name: "Classic Tikki Burger",
    description:
      "A classic tikki burger with traditional flavors and fresh ingredients...",
    ingredients: ["Tikki Patty", "Classic Toppings", "Lettuce", "Tomato"],
    price: "₹ 309/-",
    restaurantName: "Fire & Ice Bistro",
  },
];

export const proteinPowerhouseItems: FoodItem[] = [
  {
    label: "Veg",
    image: proteinBowl,
    name: "Protein Powerhouse",
    description:
      "A powerhouse of protein-rich ingredients for a fulfilling meal...",
    ingredients: ["Quinoa", "Beans", "Tofu", "Vegetables"],
    price: "₹ 399/-",
    restaurantName: "The Hungry Owl",
  },
  {
    label: "Veg",
    image: proteinBowl,
    name: "Superfood Protein Bowl",
    description:
      "A superfood bowl packed with protein and nutrient-rich ingredients...",
    ingredients: ["Quinoa", "Kale", "Chickpeas", "Avocado"],
    price: "₹ 429/-",
    restaurantName: "Savory Bites Cafe",
  },
  {
    label: "Veg",
    image: proteinBowl,
    name: "Green Goddess Bowl",
    description:
      "A bowl fit for a goddess, packed with green veggies and protein...",
    ingredients: ["Quinoa", "Spinach", "Broccoli", "Tofu"],
    price: "₹ 379/-",
    restaurantName: "Spice Route Kitchen",
  },
  {
    label: "Veg",
    image: proteinBowl,
    name: "Power Protein Bowl",
    description:
      "A power-packed protein bowl with a variety of protein sources and fresh greens...",
    ingredients: ["Quinoa", "Lentils", "Edamame", "Cucumber", "Tofu"],
    price: "₹ 449/-",
    restaurantName: "Bella Italia Trattoria",
  },
  {
    label: "Veg",
    image: proteinBowl,
    name: "Vegan Protein Feast",
    description:
      "A feast of vegan proteins with a variety of plant-based ingredients...",
    ingredients: ["Quinoa", "Chickpeas", "Tempeh", "Spinach"],
    price: "₹ 459/-",
    restaurantName: "Oceanview Grill",
  },
  {
    label: "Veg",
    image: proteinBowl,
    name: "Nutrient-Packed Protein Bowl",
    description:
      "A nutrient-packed bowl with a blend of superfoods and protein-rich ingredients...",
    ingredients: ["Quinoa", "Chia Seeds", "Almonds", "Broccoli", "Tofu"],
    price: "₹ 439/-",
    restaurantName: "Fire & Ice Bistro",
  },
];

export const veggieMeatDelightItems: FoodItem[] = [
  {
    label: "Veg",
    image: fullBowl,
    name: "Veggie Meat Delight",
    description:
      "A delightful bowl with vegetarian 'meat' substitutes and fresh veggies...",
    ingredients: ["Vegetarian Meat", "Lettuce", "Tomato", "Cheese"],
    price: "₹ 349/-",
    restaurantName: "The Hungry Owl",
  },
  {
    label: "Veg",
    image: fullBowl,
    name: "Plant-Based Protein Bowl",
    description:
      "A plant-based protein bowl with a variety of vegan protein sources...",
    ingredients: ["Quinoa", "Tofu", "Lentils", "Vegetables"],
    price: "₹ 379/-",
    restaurantName: "Savory Bites Cafe",
  },
  {
    label: "Veg",
    image: fullBowl,
    name: "Mediterranean Veggie Bowl",
    description:
      "A Mediterranean-inspired veggie bowl with fresh ingredients and flavors...",
    ingredients: ["Couscous", "Chickpeas", "Olives", "Feta Cheese"],
    price: "₹ 359/-",
    restaurantName: "Spice Route Kitchen",
  },
  {
    label: "Veg",
    image: fullBowl,
    name: "Vegetarian Delight Bowl",
    description:
      "A delightful bowl packed with vegetarian delights and fresh greens...",
    ingredients: ["Vegetarian Meat", "Avocado", "Mixed Greens", "Tomato"],
    price: "₹ 389/-",
    restaurantName: "Bella Italia Trattoria",
  },
  {
    label: "Veg",
    image: fullBowl,
    name: "Garden Fresh Veggie Bowl",
    description:
      "A bowl filled with garden-fresh veggies and a variety of toppings...",
    ingredients: ["Mixed Vegetables", "Croutons", "Cheese", "Sunflower Seeds"],
    price: "₹ 369/-",
    restaurantName: "Oceanview Grill",
  },
  {
    label: "Veg",
    image: fullBowl,
    name: "Asian Inspired Veggie Bowl",
    description:
      "An Asian-inspired veggie bowl with sesame dressing and crispy tofu...",
    ingredients: ["Tofu", "Edamame", "Cabbage", "Sesame Dressing"],
    price: "₹ 399/-",
    restaurantName: "Fire & Ice Bistro",
  },
];

export const sandwitchCentralItems: FoodItem[] = [
  {
    label: "Veg",
    image: sandwitch,
    name: "Sandwich Central",
    description: "A central place for enjoying a variety of sandwiches...",
    ingredients: ["Various"],
    price: "₹ 299/-",
    restaurantName: "The Hungry Owl",
  },
  {
    label: "Veg",
    image: sandwitch,
    name: "Gourmet Sandwiches",
    description:
      "Gourmet sandwiches with premium fillings and artisan breads...",
    ingredients: ["Various"],
    price: "₹ 349/-",
    restaurantName: "Savory Bites Cafe",
  },
  {
    label: "Veg",
    image: sandwitch,
    name: "Deluxe Sandwich Platter",
    description:
      "A deluxe platter with an assortment of sandwiches for every taste...",
    ingredients: ["Various"],
    price: "₹ 379/-",
    restaurantName: "Spice Route Kitchen",
  },
  {
    label: "Veg",
    image: sandwitch,
    name: "Classic Club Sandwich",
    description:
      "A classic club sandwich with layers of fresh ingredients and special sauce...",
    ingredients: ["Bread", "Lettuce", "Tomato", "Cheese", "Special Sauce"],
    price: "₹ 329/-",
    restaurantName: "Bella Italia Trattoria",
  },
  {
    label: "Veg",
    image: sandwitch,
    name: "Vegetarian Panini",
    description:
      "A grilled panini sandwich filled with savory vegetarian ingredients...",
    ingredients: ["Ciabatta Bread", "Grilled Vegetables", "Cheese", "Pesto"],
    price: "₹ 359/-",
    restaurantName: "Oceanview Grill",
  },
  {
    label: "Veg",
    image: sandwitch,
    name: "Mediterranean Wrap",
    description:
      "A Mediterranean-inspired wrap filled with fresh veggies and hummus...",
    ingredients: [
      "Whole Wheat Wrap",
      "Hummus",
      "Cucumbers",
      "Tomatoes",
      "Olives",
    ],
    price: "₹ 339/-",
    restaurantName: "Fire & Ice Bistro",
  },
];

export const tacoFiestaItems: FoodItem[] = [
  {
    label: "Non-Veg",
    image: tacos,
    name: "Taco Fiesta",
    description:
      "A fiesta of flavors in every bite with a variety of taco options...",
    ingredients: ["Various"],
    price: "₹ 299/-",
    restaurantName: "The Hungry Owl",
  },
  {
    label: "Non-Veg",
    image: tacos,
    name: "Mexican Taco Platter",
    description:
      "A platter of authentic Mexican tacos with traditional fillings...",
    ingredients: ["Various"],
    price: "₹ 349/-",
    restaurantName: "Savory Bites Cafe",
  },
  {
    label: "Non-Veg",
    image: tacos,
    name: "Spicy Taco Trio",
    description: "A trio of spicy tacos with extra jalapenos and hot sauce...",
    ingredients: ["Various"],
    price: "₹ 329/-",
    restaurantName: "Spice Route Kitchen",
  },
  {
    label: "Non-Veg",
    image: tacos,
    name: "Baja Fish Tacos",
    description:
      "Baja-style fish tacos with beer-battered fish and creamy sauce...",
    ingredients: [
      "Tortilla",
      "Beer-Battered Fish",
      "Cabbage Slaw",
      "Creamy Sauce",
    ],
    price: "₹ 299/-",
    restaurantName: "Bella Italia Trattoria",
  },
  {
    label: "Non-Veg",
    image: tacos,
    name: "Grilled Chicken Tacos",
    description:
      "Grilled chicken tacos with a zesty lime marinade and avocado salsa...",
    ingredients: [
      "Tortilla",
      "Grilled Chicken",
      "Avocado Salsa",
      "Lime Marinade",
    ],
    price: "₹ 319/-",
    restaurantName: "Oceanview Grill",
  },
  {
    label: "Non-Veg",
    image: tacos,
    name: "Vegetarian Tacos",
    description:
      "Vegetarian tacos filled with beans, cheese, and fresh toppings...",
    ingredients: ["Tortilla", "Refried Beans", "Cheese", "Lettuce", "Tomato"],
    price: "₹ 289/-",
    restaurantName: "Fire & Ice Bistro",
  },
];

// export const foodItems: FoodItem[] = [
//   {
//     label: "Veg",
//     image: burger,
//     name: "The Big League Burger",
//     description:
//       "Our MVP Veggie Burger is a delicious and satisfying burger made with a patty of mixed vegetables, beans, and spices...",
//     ingredients: ["Patty", "Onion", "Tomato", "Chesse"],
//     price: "₹ 399/-",
//   },
//   {
//     label: "Non-Veg",
//     image: chikenTikka,
//     name: "Chicken Tikka Masala",
//     description:
//       "Tender chunks of chicken marinated in yogurt and spices, cooked in a creamy tomato sauce with garlic, ginger, and onions...",
//     ingredients: ["Chicken", "Yogurt", "Tomato Sauce", "Spices"],
//     price: "₹ 499/-",
//   },
//   {
//     label: "Veg",
//     image: pizza,
//     name: "Margherita Pizza",
//     description:
//       "Classic Neapolitan pizza topped with tomato sauce, fresh mozzarella cheese, basil leaves, and a drizzle of olive oil...",
//     ingredients: ["Dough", "Tomato Sauce", "Mozzarella", "Basil"],
//     price: "₹ 349/-",
//   },
//   {
//     label: "Veg",
//     image: pasta,
//     name: "Spaghetti Aglio e Olio",
//     description:
//       "Simple yet delicious Italian pasta dish made with spaghetti, garlic, olive oil, and chili flakes...",
//     ingredients: ["Spaghetti", "Garlic", "Olive Oil", "Chili Flakes"],
//     price: "₹ 299/-",
//   },
//   {
//     label: "Non-Veg",
//     image: steak,
//     name: "Grilled Ribeye Steak",
//     description:
//       "Juicy and flavorful ribeye steak seasoned with salt, pepper, and herbs, grilled to perfection...",
//     ingredients: ["Ribeye Steak", "Salt", "Pepper", "Herbs"],
//     price: "₹ 599/-",
//   },
//   {
//     label: "Veg",
//     image: bowl,
//     name: "Greek Salad",
//     description:
//       "Healthy and refreshing salad made with crisp lettuce, tomatoes, cucumbers, red onions, olives, and feta cheese...",
//     ingredients: ["Lettuce", "Tomatoes", "Cucumbers", "Olives", "Feta Cheese"],
//     price: "₹ 249/-",
//   },
// ];
