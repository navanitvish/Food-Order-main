// import { useState } from "react";
// import { FaCaretDown } from "react-icons/fa6";
// import { TiArrowBackOutline } from "react-icons/ti";
// import { Link, useParams } from "react-router-dom";

// const restaurants = [
//   "The Hungry Owl",
//   "Savory Bites Cafe",
//   "Spice Route Kitchen",
//   "Bella Italia Trattoria",
//   "Oceanview Grill",
//   "Fire & Ice Bistro",
// ];

// const ingredientsOptions = [
//   "Tomato",
//   "Lettuce",
//   "Cheese",
//   "Bacon",
//   "Chicken",
//   "Beef",
//   "Avocado",
// ];

// const labels = ["Veg", "Non-Veg"];

// const CategoryDishesForm = () => {
//   const [dishesData, setDishesData] = useState({
//     name: "",
//     label: "",
//     image: "",
//     description: "",
//     ingredients: "",
//     price: "",
//     restaurantName: "",
//   });

//   const [isOpen, setOpen] = useState({
//     label: false,
//     ingredients: false,
//     restaurant: false,
//   });

//   const handleChange = (e) => {
//     setDishesData({ ...dishesData, [e.target.name]: e.target.value });
//   };

//   const selectOption = (key, value) => {
//     setDishesData({ ...dishesData, [key]: value });
//     setOpen({ ...isOpen, [key]: false });
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     console.log(dishesData);
//   };

//   const { id } = useParams();

//   console.log(id);

//   return (
//     <div className="px-4 pt-4 md:pl-0">
//       <form
//         className="w-full h-[calc(100vh-6rem)] bg-white rounded-md"
//         onSubmit={submitHandler}
//       >
//         <div className="flex-1 p-6 rounded font-montserrat ">
//           <div className="flex pb-2">
//             <h2 className="md:text-4xl text-[28px] font-bold text-gray-700">
//               Dish Form
//             </h2>
//             <Link to={`/category/${id}`}>
//               <TiArrowBackOutline className="w-10 h-10 ml-4 hover:text-orange-600 text-sky-600" />
//             </Link>
//           </div>
//           <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
//             <input
//               value={dishesData.name}
//               type="text"
//               onChange={handleChange}
//               name="name"
//               className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
//               placeholder="Dish Name"
//               required
//             />
//             <input
//               value={dishesData.image}
//               type="text"
//               onChange={handleChange}
//               name="image"
//               className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
//               placeholder="Image URL"
//             />

//             <input
//               value={dishesData.price}
//               type="number"
//               onChange={handleChange}
//               name="price"
//               className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
//               placeholder="Price"
//               required
//             />

//             {/* Label Dropdown */}
//             <div className="relative ">
//               <div
//                 className="flex justify-between p-2 text-sm border border-gray-400 rounded-md cursor-pointer"
//                 onClick={() => setOpen({ ...isOpen, label: !isOpen.label })}
//               >
//                 {dishesData.label !== "" ? dishesData.label : "Select Label"}
//                 <FaCaretDown className="m-1" />
//               </div>
//               <ul
//                 className={`mt-2 p-2 rounded-md w-28 bg-gray-600 shadow-lg absolute z-10 ${
//                   isOpen.label ? "max-h-60" : "hidden"
//                 } custom-scrollbar`}
//               >
//                 {labels.map((label, i) => (
//                   <li
//                     key={i}
//                     className={`p-2 mb-2 text-sm text-white rounded-md cursor-pointer hover:bg-blue-200/60 ${
//                       dishesData.label === label ? "bg-rose-600" : ""
//                     }`}
//                     onClick={() => selectOption("label", label)}
//                   >
//                     <span>{label}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Ingredients Dropdown */}
//             <div className="relative ">
//               <div
//                 className="flex justify-between p-2 text-sm border border-gray-400 rounded-md cursor-pointer"
//                 onClick={() =>
//                   setOpen({ ...isOpen, ingredients: !isOpen.ingredients })
//                 }
//               >
//                 {dishesData.ingredients !== ""
//                   ? dishesData.ingredients
//                   : "Select Ingredients"}
//                 <FaCaretDown className="m-1" />
//               </div>
//               <ul
//                 className={`mt-2 p-2 rounded-md w-36 overflow-y-scroll bg-gray-600 shadow-lg absolute z-10 ${
//                   isOpen.ingredients ? "max-h-40" : "hidden"
//                 } custom-scrollbar`}
//               >
//                 {ingredientsOptions.map((ingredient, i) => (
//                   <li
//                     key={i}
//                     className={`p-2 mb-2 text-sm text-white rounded-md cursor-pointer hover:bg-blue-200/60 ${
//                       dishesData.ingredients === ingredient ? "bg-rose-600" : ""
//                     }`}
//                     onClick={() => selectOption("ingredients", ingredient)}
//                   >
//                     <span>{ingredient}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Restaurant Dropdown */}
//             <div className="relative ">
//               <div
//                 className="flex justify-between p-2 text-sm border border-gray-400 rounded-md cursor-pointer"
//                 onClick={() =>
//                   setOpen({ ...isOpen, restaurant: !isOpen.restaurant })
//                 }
//               >
//                 {dishesData.restaurantName !== ""
//                   ? dishesData.restaurantName
//                   : "Select Restaurant"}
//                 <FaCaretDown className="m-1" />
//               </div>
//               <ul
//                 className={`mt-2 p-2 rounded-md w-48 overflow-y-scroll bg-gray-600 shadow-lg absolute z-10 ${
//                   isOpen.restaurant ? "max-h-40" : "hidden"
//                 } custom-scrollbar`}
//               >
//                 {restaurants.map((restaurant, i) => (
//                   <li
//                     key={i}
//                     className={`p-2 mb-2 text-sm text-white rounded-md cursor-pointer hover:bg-blue-200/60 ${
//                       dishesData.restaurantName === restaurant
//                         ? "bg-rose-600"
//                         : ""
//                     }`}
//                     onClick={() => selectOption("restaurantName", restaurant)}
//                   >
//                     <span>{restaurant}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <textarea
//               value={dishesData.description}
//               onChange={handleChange}
//               name="description"
//               className="w-full h-24 py-4 pl-4 font-medium border border-gray-400 rounded-md outline-none md:col-span-2 focus-within:border-blue-400"
//               placeholder="Description"
//               required
//             />
//           </div>

//           <div className="flex ">
//             <button
//               className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-400"
//               type="submit"
//             >
//               Submit
//             </button>
//             <button
//               className="px-4 py-2 ml-8 text-white bg-red-500 rounded hover:bg-red-400"
//               onClick={() =>
//                 setDishesData({
//                   name: "",
//                   label: "",
//                   image: "",
//                   description: "",
//                   ingredients: "",
//                   price: "",
//                   restaurantName: "",
//                 })
//               }
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CategoryDishesForm;
