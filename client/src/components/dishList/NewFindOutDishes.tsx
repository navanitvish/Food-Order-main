import React, { useState } from "react";

import FoodCard from "../card/FoodCard";
import {
  CardAllMenuDataType,
  CardAllMenuResponseType,
  CardMenuByCategoryIdDataType,
} from "../../types/contentType";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQunatity } from "../../app-store/cart";
import { useQuery } from "@tanstack/react-query";
import { ApiError, ApiGetResponse } from "../../types/apiType";
import { apiGetRequest } from "../../api/userGetApi";

interface FindOutDishesProps {
  dishIdName: string;
  handleDishSelection: (dish: CardMenuByCategoryIdDataType) => void;
  selectedDishes: CardMenuByCategoryIdDataType[];
  categoryWiseMenu: CardMenuByCategoryIdDataType[];
  currentResturant: CardAllMenuDataType;
}

const NewFindOutDishes: React.FC<FindOutDishesProps> = ({
  dishIdName,
  handleDishSelection,
  selectedDishes,
  categoryWiseMenu,
  currentResturant,
}) => {
  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const increment = (dish: CardMenuByCategoryIdDataType) => {
    // setQuantity((prev) => ({
    //   ...prev,
    //   number: quantity.number + 1,
    //   id: [...prev.id, dish._id],
    // }));

    setQuantities((prev) => ({
      ...prev,
      [dish?._id ?? ""]: (prev[dish?._id ?? ""] || 1) + 1,
    }));
    dispatch(increaseQunatity(dish));
  };

  const decrement = (dish: CardMenuByCategoryIdDataType) => {
    const currentQuantity = quantities[dish._id ?? ""] || 0;
    if (currentQuantity > 1) {
      setQuantities((prev) => ({
        ...prev,
        [dish._id ?? ""]: currentQuantity - 1,
      }));
      dispatch(decreaseQuantity(dish));
    }

    const availabeObject = { ...quantities };

    if (
      !Object.prototype.hasOwnProperty.call(availabeObject, dish?._id ?? "")
    ) {
      handleDishSelection(dish);
    }
  };

  // console.log(quantities, quantity, "increment");

  const { data: resturantWiseMenu } = useQuery<
    ApiGetResponse<CardAllMenuResponseType>,
    ApiError
  >({
    queryKey: [`returantWiseMenu/${currentResturant?._id}`],
    queryFn: async () => {
      return await apiGetRequest<CardAllMenuResponseType>({
        url: `menus/restaurant/${currentResturant?._id}`,
      });
    },
  });
  //   667418e947af0a1a300755d5

  const resturantWiseMenuData = resturantWiseMenu?.data?.data ?? [];

  // console.log(dishIdName, handlingCound, isCount);

  if (!dishIdName) {
    return null;
  }

  const filteredDishes = resturantWiseMenuData?.filter((dish) => {
    return (
      selectedDishes.length === 0 ||
      (selectedDishes[0] &&
        (dish?.restaurantId?.name ?? "").toLowerCase() ===
          selectedDishes[0]?.restaurantId?.name?.toLowerCase() &&
        !selectedDishes.find((d) => d.name === dish.name))
    );
  });

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mx-auto mt-4 overflow-y-scroll scroll-smooth [&::-webkit-scrollbar]:hidden max-h-[540px]">
      {(selectedDishes?.length > 0 && resturantWiseMenuData.length > 0
        ? [...selectedDishes, ...filteredDishes]
        : categoryWiseMenu
      )?.map((dish, index) => (
        <FoodCard
          key={index}
          label={dish?.label ?? ""}
          imgSrc={dish?.image ?? ""}
          name={dish?.name ?? ""}
          description={dish?.description ?? ""}
          ingredients={dish?.ingredients ?? []}
          price={dish?.price}
          restaurantName={dish?.restaurantId?.name ?? ""}
          onClick={() => handleDishSelection(dish)}
          isCount={selectedDishes?.some(
            (selDish) => selDish?.name === dish?.name
          )} // Adjust based on your condition
          increment={() => increment(dish)}
          decrement={() => decrement(dish)}
          //   quantity={
          //     quantity.id.some((dishid) => dishid === dish?._id) &&
          //     quantity.number
          //   }
          quantity={quantities[dish?._id ?? ""] || 1}
        />
      ))}
    </div>
  );
};

export default NewFindOutDishes;
