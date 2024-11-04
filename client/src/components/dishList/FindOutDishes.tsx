// import React, { useState } from "react";
// import {
//   bigBurgurJointItems,
//   burgurHeavenItems,
//   burgurItems,
//   chickenBurgurItems,
//   clubSandwitchItems,
//   doublePattiBurgurItems,
//   fishTacosItems,
//   grilledTikkiBurgurItems,
//   highProteinDietItems,
//   idleDishItems,
//   idleRestaurantItems,
//   ketoMeatBowlItems,
//   meatBowlWithVeggiesItems,
//   proteinPowerhouseItems,
//   sandwitchCentralItems,
//   spicyIdleDishItems,
//   spicyTikkiBurgurItems,
//   subwaySandwitchItems,
//   tacoFiestaItems,
//   tacosItems,
//   tikkiPalaceItems,
//   triplePattiBurgurItems,
//   veganProteinBowlItems,
//   veggieMeatDelightItems,
// } from "../../food_Data/food_data";
// import FoodCard from "../card/FoodCard";

// import { useDispatch } from "react-redux";
// import { decreaseQuantity, increaseQunatity } from "../../app-store/cart";
// import {
//   CardAllMenuDataType,
//   CardMenuByCategoryIdDataType,
//   FoodItem,
// } from "../../types/contentType";

// // interface FindOutDishesProps {
// //   dishIdName?: string;
// //   handlingCound: (index: string, dish: DishTypeProps) => void;
// //   isCount: number | string;
// //   setCount: (element: string) => void;
// //   selectedDish?: DishType;
// //   // setDish: () => void;
// //   setSelectedDishes: () => void;
// // }

// interface Dish {
//   name: string;
//   label: string;
//   image: string;
//   description: string;
//   ingredients: string[];
//   price: string;
//   restaurantName: string;
// }

// interface FindOutDishesProps {
//   dishIdName: string;
//   handleDishSelection: (dish: CardAllMenuDataType) => void;
//   selectedDishes: Dish[];
// }

// // const FindOutDishes: React.FC<FindOutDishesProps> = ({
// //   // dishIdName,
// //   // handlingCound,
// //   // isCount,
// //   // setCount,
// //   // selectedDish,
// //   // // setDish,
// //   // setSelectedDishes,
// // }) => {
// const FindOutDishes: React.FC<FindOutDishesProps> = ({
//   dishIdName,
//   handleDishSelection,
//   selectedDishes,
// }) => {
//   const selectedDishesList = [
//     { name: "idleDishItems", items: idleDishItems },
//     { name: "burgurItems", items: burgurItems },
//     { name: "doublePattiBurgurItems", items: doublePattiBurgurItems },
//     { name: "grilledTikkiBurgurItems", items: grilledTikkiBurgurItems },
//     { name: "highProteinDietItems", items: highProteinDietItems },
//     { name: "meatBowlWithVeggiesItems", items: meatBowlWithVeggiesItems },
//     { name: "subwaySandwitchItems", items: subwaySandwitchItems },
//     { name: "tacosItems", items: tacosItems },
//     { name: "spicyIdleDishItems", items: spicyIdleDishItems },
//     { name: "chickenBurgurItems", items: chickenBurgurItems },
//     { name: "triplePattiBurgurItems", items: triplePattiBurgurItems },
//     { name: "spicyTikkiBurgurItems", items: spicyTikkiBurgurItems },
//     { name: "veganProteinBowlItems", items: veganProteinBowlItems },
//     { name: "ketoMeatBowlItems", items: ketoMeatBowlItems },
//     { name: "clubSandwitchItems", items: clubSandwitchItems },
//     { name: "fishTacosItems", items: fishTacosItems },
//     { name: "idleRestaurantItems", items: idleRestaurantItems },
//     { name: "burgurHeavenItems", items: burgurHeavenItems },
//     { name: "bigBurgurJointItems", items: bigBurgurJointItems },
//     { name: "tikkiPalaceItems", items: tikkiPalaceItems },
//     { name: "proteinPowerhouseItems", items: proteinPowerhouseItems },
//     { name: "veggieMeatDelightItems", items: veggieMeatDelightItems },
//     { name: "sandwitchCentralItems", items: sandwitchCentralItems },
//     { name: "tacoFiestaItems", items: tacoFiestaItems },
//   ];

//   const restaurantWiseMenu = [
//     ...idleDishItems,
//     ...burgurItems,
//     ...doublePattiBurgurItems,
//     ...grilledTikkiBurgurItems,
//     ...highProteinDietItems,
//     ...meatBowlWithVeggiesItems,
//     ...subwaySandwitchItems,
//     ...tacosItems,
//     ...spicyIdleDishItems,
//     ...chickenBurgurItems,
//     ...triplePattiBurgurItems,
//     ...spicyTikkiBurgurItems,
//     ...veganProteinBowlItems,
//     ...ketoMeatBowlItems,
//     ...clubSandwitchItems,
//     ...fishTacosItems,
//     ...idleRestaurantItems,
//     ...burgurHeavenItems,
//     ...bigBurgurJointItems,
//     ...tikkiPalaceItems,
//     ...proteinPowerhouseItems,
//     ...veggieMeatDelightItems,
//     ...sandwitchCentralItems,
//     ...tacoFiestaItems,
//   ];

//   const dispatch = useDispatch();

//   const [quantity, setQuantity] = useState(1);

//   const increment = (dish: CardAllMenuDataType) => {
//     setQuantity(quantity + 1);
//     dispatch(increaseQunatity(dish));
//   };

//   const decrement = (dish: CardAllMenuDataType) => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//       dispatch(decreaseQuantity(dish));
//     } else if (quantity === 1 && handleDishSelection) {
//       // setCount("");
//       // setDish({});
//       handleDishSelection(dish);

//       // onClick();
//     }
//   };

//   // console.log(dishIdName, handlingCound, isCount);

//   if (!dishIdName) {
//     return null;
//   }

//   const initialDishes = selectedDishesList.find((dish) =>
//     dish.name.toLowerCase().includes(dishIdName?.toLowerCase())
//   );

//   // const findOutResturantMenu = resturantWiseMenu.filter(
//   //   // (dish, i) => {
//   //   //   //   console.log(dish);
//   //   //   return (
//   //   //     selectedDish &&
//   //   //     dish?.restaurantName?.toLowerCase() ===
//   //   //       selectedDish?.restaurantName?.toLowerCase() &&
//   //   //     dish?.name?.toLowerCase() !== selectedDish?.name?.toLowerCase()
//   //   //   );
//   //   // }

//   //   (dish) =>
//   //     selectedDishes.length &&
//   //     dish?.restaurantName?.toLowerCase() ===
//   //       selectedDishes[0]?.restaurantName?.toLowerCase() &&
//   //     !selectedDishes.some(
//   //       (selectedDish) =>
//   //         selectedDish.name.toLowerCase() === dish.name.toLowerCase()
//   //     )
//   //   //   selectedDish &&
//   //   //   dish.name.toLowerCase().includes(Object.values(selectedDish))
//   // );

//   const filteredDishes = restaurantWiseMenu.filter((dish) => {
//     return (
//       selectedDishes.length === 0 ||
//       (selectedDishes[0] &&
//         dish.restaurantName.toLowerCase() ===
//           selectedDishes[0].restaurantName.toLowerCase() &&
//         !selectedDishes.find((d) => d.name === dish.name))
//     );
//   });

//   // const dishvalues = selectedDish && Object.values(selectedDish);

//   // console.log(
//   //   selectedDish ? findOutResturantMenu : findOutDish?.items,
//   //   selectedDish
//   // );

//   const displayDishes =
//     selectedDishes?.length > 0
//       ? [...filteredDishes, ...selectedDishes]
//       : initialDishes;

//   // const condition = [...filteredDishes, ...selectedDishes]

//   console.log(displayDishes, selectedDishes);

//   return (
//     <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mx-auto mt-4 overflow-y-scroll scroll-smooth [&::-webkit-scrollbar]:hidden max-h-[540px]">
//       {/* {dishvalues?.length !== 0 && selectedDish && (
//         <FoodCard
//           // key={index}
//           label={selectedDish?.label}
//           imgSrc={selectedDish?.image}
//           name={selectedDish?.name}
//           description={selectedDish.description}
//           ingredients={selectedDish.ingredients}
//           price={selectedDish.price}
//           restaurantName={selectedDish.restaurantName}
//           onClick={() => handlingCound(selectedDish?.name, selectedDish)}
//           isCount={isCount === selectedDish?.name}
//           setCount={setCount}
//           // setDish={setDish}
//           setDish={setSelectedDishes}
//         />
//       )}

//       {(dishvalues?.length !== 0
//         ? findOutResturantMenu
//         : findOutDish?.items
//       )?.map((dish, index) => (
//         <FoodCard
//           key={index}
//           label={dish.label}
//           imgSrc={dish.image}
//           name={dish.name}
//           description={dish.description}
//           ingredients={dish.ingredients}
//           price={dish.price}
//           restaurantName={dish.restaurantName}
//           onClick={() => handlingCound(dish?.name, dish)}
//           isCount={isCount === dish?.name}
//           setCount={setCount}
//           setDish={() => ""}
//         />
//       ))} */}

//       {/* {selectedDishes.map((dish, index) => (
//         <FoodCard
//           key={index}
//           label={dish.label}
//           imgSrc={dish.image}
//           name={dish.name}
//           description={dish.description}
//           ingredients={dish.ingredients}
//           price={dish.price}
//           restaurantName={dish.restaurantName}
//           onClick={() => handleDishSelection(dish)}
//           isCount={true}
//         />
//       ))}
//       {filteredDishes.map((dish, index) => (
//         <FoodCard
//           key={index}
//           label={dish.label}
//           imgSrc={dish.image}
//           name={dish.name}
//           description={dish.description}
//           ingredients={dish.ingredients}
//           price={dish.price}
//           restaurantName={dish.restaurantName}
//           onClick={() => handleDishSelection(dish)}
//           isCount={false}
//         />
//       ))} */}

//       {(selectedDishes?.length > 0
//         ? [...selectedDishes, ...filteredDishes]
//         : initialDishes?.items
//       )?.map((dish, index) => (
//         <FoodCard
//           key={index}
//           label={dish.label}
//           imgSrc={dish.image}
//           name={dish.name}
//           description={dish.description}
//           ingredients={dish.ingredients}
//           price={dish.price}
//           restaurantName={dish.restaurantName}
//           onClick={() => handleDishSelection(dish)}
//           isCount={selectedDishes.some((selDish) => selDish.name === dish.name)} // Adjust based on your condition
//           increment={() => increment(dish)}
//           decrement={() => decrement(dish)}
//           quantity={quantity}
//         />
//       ))}
//     </div>
//   );
// };

// export default FindOutDishes;
