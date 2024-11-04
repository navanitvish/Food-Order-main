import idleDish from "../../assets/idle.png";
import login from "../../assets/login.svg";

import forgot from "../../assets/Forgot password.svg";
import secure from "../../assets/Secure login.svg";

import {
  FoodItem,
  ListUserProfileHeadingItem,
  UserData,
} from "../../types/contentType";

//userData
export const listHeading = [
  "Name",
  // "Email",
  "MobileNo.",
  "R.Date",
  // "Type",
  "Address",
  // "City",
  // "State",
  // "Country",
  "Role",
  // "Exp",
  "View",
  "Action",
];

//user useState intial data
export const initialUserData: UserData = {
  _id: "",
  name: "",
  email: "",
  password: "",
  mobile: "",
  dob: "",
  gender: "",
  lastLogin: "",
  isVerified: false,
  resetPasswordLink: "",
  otp: "",
  otpexpire: "",
  location: {
    address: "",
    city: "",
    country: "",
    state: "",
    userId: "",
    zipCode: "",
    _id: "",
  },
  avatar: "",
  role: "",
  resetLink: "",
  registrationDate: "",
  createdAt: "",
  status: "",
  isSelfRegistered: false,
  address: "",
};

//user Profile
export const listUserProfileHeading: ListUserProfileHeadingItem[] = [
  { heading: "Name", key: "name" },
  { heading: "Email", key: "email" },
  { heading: "Mobile", key: "mobile" },
  { heading: "Verified", key: "isVerified" },
  { heading: "Role", key: "role" },
  { heading: "Registration Date", key: "registrationDate" },
  { heading: "Country", key: "location.country" },
  { heading: "State", key: "location.state" },
  { heading: "City", key: "location.city" },
  { heading: "Address", key: "location.address" },
  { heading: "Zip Code", key: "location.zipCode" },
];

export const usersData = [
  {
    Name: "User A",
    Profile: login,
    //   Type: "Admin",
    Location: "Mumbai",
    City: "Mumbai",
    Country: "India",
    //   Package: "10 LPA",
    //   Exp: "2 years",
    View: "Details",
    _id: "1",
  },
  {
    Name: "User B",
    Profile: forgot,
    //   Type: "Editor",
    Location: "Delhi",
    City: "Delhi",
    Country: "India",
    //   Package: "12 LPA",
    //   Exp: "3 years",
    View: "Details",
    _id: "2",
  },
  {
    Name: "User C",
    Profile: secure,
    //   Type: "Viewer",
    Location: "Bangalore",
    City: "Bangalore",
    Country: "India",
    //   Package: "8 LPA",
    //   Exp: "1 year",
    View: "Details",
    _id: "3",
  },
];

export const categorylistDishHeading = [
  "Type",
  "Label",
  "image",
  "Name",
  "Description",
  "Ingredients",
  "Price",
  //   "Restaurant Name",
  "R.Name",
];
export const resturantOwnerDishHeadings = [
  "Type",
  "Label",
  "image",
  "Name",
  "Description",
  "Ingredients",
  "Price",
  //   "Restaurant Name",
  "R.Name",
  "Action",
];

//Dishes Data and form data
export const listDishHeading = [
  "Type",
  "Label",
  "image",
  "Name",
  "Description",
  "Ingredients",
  "Price",
  //   "Restaurant Name",
  "R.Name",
  "Setting",
];
export const lisReviewHeading = [
  "name",
  "image",
  "email",
  "menu",
  "review",
  "rating",
  "action",
];
export const lisBannerHeading = ["name", "image", "description", "action"];
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

export const ingredientsOptions = [
  "salt",
  "pepper",
  "olive oil",
  "butter",
  "garlic",
  "onion",
  "tomato",
  "basil",
  "oregano",
  "thyme",
  "parsley",
  "chicken",
  "beef",
  "fish",
  "shrimp",
  "flour",
  "sugar",
  "brown sugar",
  "baking powder",
  "baking soda",
  "eggs",
  "milk",
  "cream",
  "cheddar cheese",
  "mozzarella cheese",
  "parmesan cheese",
  "bread",
  "rice",
  "pasta",
  "potato",
  "carrot",
  "celery",
  "bell pepper",
  "spinach",
  "mushroom",
  "lemon",
  "lime",
  "vinegar",
  "soy sauce",
  "honey",
  "maple syrup",
  "cinnamon",
  "nutmeg",
  "cumin",
  "chili powder",
  "paprika",
  "turmeric",
  "ginger",
  "cilantro",
];
export const labels = ["Spicy", "Vegan", "Gluten-Free", "New"];
export const dietaryRestrictions = ["Veg", "Non-Veg"];

//Restaurant Data
export const resturantHeading = [
  "Name",
  "Address",
  "Rating",
  "Image",
  "Opening Time",
  "Closing Time",
  "Contact",
  "Cuisine",
  "Menu",
  "View",
  "Settings",
];

// export const restaurants: Restaurant[] = [
//   {
//     name: "The Hungry Owl",
//     address: "123 Main St, Cityville",
//     rating: 4.5,
//     openingHours: "9:00 AM - 10:00 PM",
//     contact: "123-456-7890",
//     cuisineType: "indian",
//     menuItems: 6, // Placeholder for the number of menu items
//   },
//   {
//     name: "Savory Bites Cafe",
//     address: "456 Elm St, Townsville",
//     rating: 4.2,
//     openingHours: "8:00 AM - 9:00 PM",
//     contact: "987-654-3210",
//     cuisineType: "Cafe",
//     menuItems: 6, // Placeholder for the number of menu items
//   },
//   {
//     name: "Spice Route Kitchen",
//     address: "789 Oak St, Villageville",
//     rating: 4.7,
//     openingHours: "10:00 AM - 11:00 PM",
//     contact: "555-123-4567",
//     cuisineType: "Indian",
//     menuItems: 6, // Placeholder for the number of menu items
//   },
//   {
//     name: "Bella Italia Trattoria",
//     address: "321 Pine St, Hamletville",
//     rating: 4.8,
//     openingHours: "11:00 AM - 10:00 PM",
//     contact: "444-321-6789",
//     cuisineType: "Italian",
//     menuItems: 6, // Placeholder for the number of menu items
//   },
//   {
//     name: "Oceanview Grill",
//     address: "654 Maple St, Seaside",
//     rating: 4.6,
//     openingHours: "12:00 PM - 10:00 PM",
//     contact: "333-222-1111",
//     cuisineType: "Seafood",
//     menuItems: 6, // Placeholder for the number of menu items
//   },
//   {
//     name: "Fire & Ice Bistro",
//     address: "987 Birch St, Metropolis",
//     rating: 4.4,
//     openingHours: "10:00 AM - 11:00 PM",
//     contact: "222-333-4444",
//     cuisineType: "Fusion",
//     menuItems: 6, // Placeholder for the number of menu items
//   },
// ];

//order Data
// export const orderHeading = [
//   "orderId",
//   "restaurantName",
//   "customerName",
//   "customerAddress",
//   "customerContact",
//   "orderItems",
//   "totalPrice",
//   "orderStatus",
//   "orderDate",
// ];

export const orderHeading = [
  //   "id",
  "Restaurant",
  "Customer",
  "Address",
  "Contact",
  "Qty",
  "Price",
  "Status",
  "Date",
  "View",
];
export const orderItemHeading = ["Name", "Qty", "Price"];

//category form data
export const categoryType = ["Veg", "Non-Veg"];

//rider

//heading
export const riderheading = ["Name", "email", "comment", "Rating", "action"];

//data
export const ridersData = [
  {
    id: 1,
    name: "John Doe",
    age: 28,

    city: "New York",
    rating: 4.8,
    contactNumber: "123-456-7890",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 32,

    city: "Los Angeles",
    rating: 4.6,
    contactNumber: "234-567-8901",
  },
  {
    id: 3,
    name: "Mike Johnson",
    age: 25,

    city: "Chicago",
    rating: 4.7,
    contactNumber: "345-678-9012",
  },
  {
    id: 4,
    name: "Emily Davis",
    age: 30,

    city: "Houston",
    rating: 4.9,
    contactNumber: "456-789-0123",
  },
  {
    id: 5,
    name: "Robert Wilson",
    age: 27,

    city: "Phoenix",
    rating: 4.5,
    contactNumber: "567-890-1234",
  },
  {
    id: 6,
    name: "Sophia Brown",
    age: 29,

    city: "Philadelphia",
    rating: 4.8,
    contactNumber: "678-901-2345",
  },
];

export const couponheading = ["Code", "Discount", "Resturant Name", "Action"];
