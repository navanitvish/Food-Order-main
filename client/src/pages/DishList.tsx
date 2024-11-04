// import React, { useState } from "react";
// // import FoodCard from "../components/card/FoodCard";

// import { IoClose, IoSearch } from "react-icons/io5";

// import { useParams } from "react-router";
// import {
//   CardMenuByCategoryIdDataType,
//   CardMenuByCategoryIdResponseType,
//   DishType,
// } from "../types/contentType";

// import { TiArrowBack } from "react-icons/ti";
// // import { IoMdCut } from "react-icons/io";
// import { Link } from "react-router-dom";
// import FindOutDishes from "../components/dishList/FindOutDishes";
// import { useQuery } from "@tanstack/react-query";
// import { ApiError, ApiGetResponse } from "../types/apiType";
// import { apiGetRequest } from "../api/userGetApi";
// import { useDispatch } from "react-redux";
// import { addItem } from "../app-store/cart";

// const DishList: React.FC = () => {
//   // const navigate = useNavigate();

//   const { id } = useParams();
//   // console.log(id, "from dishes");

//   const { data } = useQuery<
//     ApiGetResponse<CardMenuByCategoryIdResponseType>,
//     ApiError
//   >({
//     queryKey: [`MenuesByCategory`],
//     queryFn: async () => {
//       return await apiGetRequest<CardMenuByCategoryIdResponseType>({
//         url: `menus/categories/${id}`,
//       });
//     },
//   });

//   const menuesData: CardMenuByCategoryIdDataType[] = data?.data?.data || [];

//   // console.log(data, menuesData, error, isLoading);

//   const dishIdName = id?.replace(/\d+/g, "");

//   const [searchKey, setSearchKey] = useState(dishIdName || "");

//   // const [isCount, setCount] = useState("");
//   // const [selectedDish, setDish] = useState({});
//   const [selectedDishes, setSelectedDishes] = useState<DishType[]>([]);
//   const [currentRestaurant, setCurrentRestaurant] = useState<string | null>(
//     null
//   );

//   const dispatch = useDispatch();

//   // console.log(selectedDish);

//   // const handlingCound = (id, dish) => {
//   //   console.log(id, dish, "hi");
//   //   if (id === isCount) {
//   //     setCount("");
//   //     // setDish((prev) => ({
//   //     //   ...prev,
//   //     //   dish,
//   //     // }));
//   //     setDish({});
//   //   } else {
//   //     setCount(dish.name);
//   //     if (dish) {
//   //       // setDish((prev) => ({
//   //       //   ...prev,
//   //       //   ...dish,
//   //       //   index: id,
//   //       // }));

//   //       setSelectedDishes((prev) => [...prev, { ...dish, index: id }]);
//   //     }
//   //   }
//   // };

//   // const handleDishSelection = (dish) => {
//   //   if (!currentRestaurant) {
//   //     setCurrentRestaurant(dish.restaurantName);
//   //   }
//   //   if (currentRestaurant === dish.restaurantName) {
//   //     setSelectedDishes((prev) => {
//   //       const isSelected = prev.find((d) => d.name === dish.name);
//   //       if (isSelected) {
//   //         return prev.filter((d) => d.name !== dish.name);
//   //       } else {
//   //         return [...prev, dish];
//   //       }
//   //     });
//   //   }
//   // };

//   // const handleDishSelection = (dish) => {
//   //   console.log(dish, "hello iam here");
//   //   if (!currentRestaurant) {
//   //     setCurrentRestaurant(dish.restaurantName);
//   //     setSelectedDishes((prev) => [...prev, dish]);
//   //   }
//   //   console.log(currentRestaurant === dish.restaurantName);
//   //   if (currentRestaurant === dish.restaurantName) {
//   //     setSelectedDishes((prev) => {
//   //       const isSelected = prev.find((d) => d.name === dish.name);
//   //       if (isSelected) {
//   //         return prev.filter((d) => d.name !== dish.name);
//   //       } else {
//   //         return [...prev, dish];
//   //       }
//   //     });
//   //   }
//   // };

//   // const mutation = useMutation<
//   //   ApiResponse<CompanyPostResponseType>,
//   //   ApiError,
//   //   MutationObjectCompanyType
//   // >({
//   //   mutationFn: async ({ path, condition, data }) => {
//   //     toast.loading("Checking Details");
//   //     try {
//   //       // console.log(path, method);
//   //       const response = await apiRequest<
//   //         CompanySendingPostTyp,
//   //         CompanyPostResponseType
//   //       >({
//   //         url: path,
//   //         method: condition === "creat" ? "post" : "put",
//   //         data: data,
//   //       });

//   //       // return { data: response.data };
//   //       return response;
//   //     } catch (error) {
//   //       console.log(error);
//   //       const apiError: ApiError = {
//   //         message: (error as ApiError)?.message || "An error occurred",
//   //         status: (error as ApiError)?.status || 500,
//   //       };
//   //       throw apiError;
//   //     }
//   //   },
//   //   // onSuccess: (data: ApiResponse<DeletCategoryData>) => {
//   //   onSuccess: (data) => {
//   //     console.log(data);
//   //     toast.dismiss();
//   //     clearhandler();
//   //     toast.success(`${isUpdate ? "Update Successfull" : "Creat Successfull"}`);
//   //   },
//   //   onError: (error: ApiError) => {
//   //     console.log(error);
//   //     toast.dismiss();
//   //     toast.error(error.message);
//   //   },
//   // });

//   const generateUniqueId = (dishName: string) => {
//     const timestamp = Date.now();
//     const randomNum = Math.floor(Math.random() * 1000);
//     return `${dishName}-${timestamp}-${randomNum}`;
//   };

//   // Example usage:
//   // const uniqueId = generateUniqueId("Burger");

//   const handleDishSelection = (dish) => {
//     console.log(dish, "hello iam here");

//     const id = generateUniqueId(dish.name);
//     const dishWithId = { ...dish, id };
//     if (!currentRestaurant) {
//       setCurrentRestaurant(dish.restaurantName);
//       setSelectedDishes([dishWithId]); // Set initial selected dish
//     } else if (currentRestaurant === dish.restaurantName) {
//       setSelectedDishes((prev) => {
//         const isSelected = prev.find((d) => d.name === dish.name);
//         if (isSelected) {
//           return prev.filter((d) => d.name !== dish.name);
//         } else {
//           return [...prev, dishWithId];
//         }
//       });
//     } else {
//       // Switching to a dish from a different restaurant
//       setCurrentRestaurant(dish.restaurantName);
//       setSelectedDishes([dish]); // Select the new restaurant's dish
//     }

//     dispatch(addItem(dish));
//   };

//   // const sendindCardData =async()=>{

//   //   const dishPayloade = {

//   //   }
//   //   mutation.mutate({
//   //     path: "api/company/create",
//   //     condition: "creat",
//   //     data: companyPostObject,
//   //   });
//   // }

//   console.log(currentRestaurant, selectedDishes, "from dishList");

//   //for api
//   // const filteredDishes = menuesData.filter((dish) => dish.restaurantName === currentRestaurant);

//   // console.log(isCount);

//   return (
//     <React.Fragment>
//       <section className="mx-auto max-w-[1200px] px-4  xl:px-0 ">
//         <div className="relative flex items-center justify-center mx-auto border border-gray-100 rounded-md focus-within:ring-1 ">
//           <div className="absolute left-0 pl-2 text-gray-400 group-focus-within:text-black ">
//             {dishIdName ? (
//               <Link to={"/search"}>
//                 <TiArrowBack className="w-5 h-5 " />
//               </Link>
//             ) : (
//               ""
//             )}
//             {/* <IoSearch className="w-4 h-4 " /> */}
//           </div>
//           <input
//             type="text"
//             name="searchKey"
//             value={searchKey}
//             onChange={(e) => setSearchKey(e.target.value)}
//             placeholder="Search user / chat"
//             className=" w-full px-2 py-2 pl-[2rem]  rounded-tl-md rounded-bl-md outline-none md:inline-block focus:border-blue-500 rounded-tr-md rounded-br-md placeholder:text-slate-400"
//           />
//           <div className="absolute pl-2 text-gray-400 right-2 group-focus-within:text-black ">
//             {searchKey ? (
//               <IoClose className="w-5 h-5 " />
//             ) : (
//               <IoSearch className="w-4 h-4 " />
//             )}
//           </div>
//         </div>
//         {/* <FindOutDishes
//           dishIdName={dishIdName}
//           handlingCound={handlingCound}
//           isCount={isCount}
//           setCount={setCount}
//           selectedDish={selectedDishes}
//           // setDish={setDish}
//           setSelectedDishes={setSelectedDishes}
//         /> */}

//         <FindOutDishes
//           dishIdName={dishIdName || ""}
//           handleDishSelection={handleDishSelection}
//           selectedDishes={selectedDishes}
//         />
//       </section>
//     </React.Fragment>
//   );
// };

// export default DishList;

// {
//   /* <div className=" grid md:grid-cols-2 grid-cols-1 gap-4 mx-auto  mt-4 overflow-y-scroll scroll-smooth [&::-webkit-scrollbar]:hidden max-h-[540px] ">
//           {foodItems.map((dish, index) => (
//             <FoodCard
//               key={index}
//               label={dish.label}
//               imgSrc={dish.image}
//               name={dish.name}
//               description={dish.description}
//               ingredients={dish.ingredients}
//               price={dish.price}
//             />
//           ))}
//         </div> */
// }
