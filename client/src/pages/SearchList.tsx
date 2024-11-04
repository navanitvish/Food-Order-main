// import React from 'react'

// const SearchList = () => {

//     const handlingNavigate = (id: number) => {
//         navigate(`/search/${id}`);
//       };
//   return (
//     <div className="max-w-[900px] mx-auto px-4 mt-4 overflow-y-scroll [&::-webkit-scrollbar]:hidden max-h-[500px] ">
//           {filterDishes.map((dish, index) => (
//             <div key={index} onClick={() => handlingNavigate(dish.id)}>
//               <div className="flex w-full p-2 px-0 my-2 border-gray-400 rounded-md md:pl-4 md:p-6 group hover:bg-gray-100">
//                 <div className="">
//                   <img
//                     src={dish.imageSrc}
//                     alt={dish.dishName}
//                     className="w-20 h-16 md:h-20 md:w-28"
//                   />
//                 </div>
//                 <div className="items-center justify-between inline-block w-full ml-4 mr-4 sm:flex">
//                   <div className="flex flex-col justify-center pb-2 ">
//                     <h4 className="mb-1 text-lg font-semibold text-gray-700">
//                       {dish.dishName}
//                     </h4>
//                     <p className="text-sm text-gray-400">Dish</p>
//                   </div>
//                   <button
//                     className="items-center py-1 hidden px-4 sm:py-2 rounded-md  bg-[#f79577] text-white group-hover:flex"
//                     type="submit"
//                   >
//                     <span className="mr-2 text-[0.8rem] font-semibold hidden md:inline-block">
//                       KNOW MORE
//                     </span>
//                     <FaLongArrowAltLeft className="w-4 h-4 rotate-180 " />
//                   </button>
//                 </div>
//               </div>
//               <div className="border-b-2"></div>
//             </div>
//           ))}
//         </div>
//   )
// }

// export default SearchList
