import React from "react";
import { FaRegHeart } from "react-icons/fa";
import AddToCartButton from "./AddToCartButton";
// import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { RiShoppingCart2Line } from "react-icons/ri";
import { MdRestaurant } from "react-icons/md";
import { PiBowlFoodDuotone } from "react-icons/pi";

interface NewFoodCardProps {
  label: string;
  imgSrc: string;
  name: string;
  description: string;
  ingredients: string[];
  price?: number;
  restaurantName: string;
  onClick: () => void;
  isCount: boolean;
  quantity: number;
  increment: () => void;
  decrement: () => void;
}

const FoodCard: React.FC<NewFoodCardProps> = ({
  label,
  imgSrc,
  name,
  description,
  ingredients,
  price,
  restaurantName,
  onClick,
  isCount,
  quantity,
  increment,
  decrement,
}) => {
  console.log(quantity);
  return (
    <div className="relative flex flex-wrap md:flex-nowrap h-[400px] w-full overflow-hidden bg-white rounded-lg border sm:h-[260px]">
      <div className="flex items-center justify-center w-full h-2/5 sm:h-full sm:w-2/5">
        {imgSrc ? (
          <img
            className="object-contain w-full h-full pl-4 rounded-lg sm:rounded-tl-lg sm:rounded-bl-lg sm:w-full sm:h-full"
            src={imgSrc}
            alt="The Big League Burger"
          />
        ) : (
          <PiBowlFoodDuotone className="w-3/4 h-3/4" />
        )}
      </div>

      <div className="grid p-2 pl-4 h-3/5 sm:h-full sm:w-3/5">
        <div className="flex items-center gap-2 mb-2 border-b ">
          <MdRestaurant />
          <span className="text-sm font-semibold text-violet-600 font-montserrat">
            {restaurantName}
          </span>
        </div>
        <div className="flex items-center justify-between mb-2 sm:pr-2">
          <span
            className={`px-1 sm:px-2 py-1 font-sans text-[8px] sm:text-[10px] font-bold tracking-wide  uppercase ${
              label === "Veg"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }  rounded-full`}
          >
            {label}
          </span>
          <span className="flex items-center text-red-500 cursor-pointer hover:text-red-600">
            <FaRegHeart className="text-rose-400" />
          </span>
        </div>
        <div>
          <h2 className="font-semibold sm:text-lg font-montserrat">{name}</h2>
          {/* <h3 className="text-sm font-semibold text-violet-600 font-montserrat">
            {restaurantName}
          </h3> */}
        </div>
        <p className="text-sm font-bold text-gray-700">{description}</p>
        {/* Ingredient options */}
        <div className="flex flex-wrap items-center gap-2 mt-2 ">
          {ingredients?.map((ing, index) => (
            <span
              key={index}
              className="px-2 py-1 mr-1 text-xs text-gray-600 bg-gray-200 border rounded-full"
            >
              {ing}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between w-full justify-self-end">
          <span className="font-medium text-gray-900 sm:text-lg">
            ₹ {price}
          </span>
          {!isCount ? (
            <button
              className="px-4 py-1 text-sm text-white bg-orange-500 rounded sm:text-base hover:bg-orange-600 focus:outline-none focus:shadow-outline"
              onClick={onClick}
            >
              {/* Add to Cart */}
              <RiShoppingCart2Line className="w-6 h-6" />
            </button>
          ) : (
            <AddToCartButton
              onClick={onClick}
              quantity={quantity}
              increment={increment}
              decrement={decrement}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
