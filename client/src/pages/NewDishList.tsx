import React, { useState } from "react";

import { IoClose, IoSearch } from "react-icons/io5";

import { useParams } from "react-router";
import {
  CardMenuByCategoryIdDataType,
  CardMenuByCategoryIdResponseType,
  CardMenuResturantDataType,
} from "../types/contentType";

import { TiArrowBack } from "react-icons/ti";
// import { IoMdCut } from "react-icons/io";
import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { ApiError, ApiGetResponse } from "../types/apiType";
import { apiGetRequest } from "../api/userGetApi";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  carConditiontHelper,
  clearCart,
  closeCondition,
} from "../app-store/cart";
import NewFindOutDishes from "../components/dishList/NewFindOutDishes";

import AlertModal from "../components/modal/AlertModal";

const NewDishList: React.FC = () => {
  const { id, name } = useParams();

  const { data } = useQuery<
    ApiGetResponse<CardMenuByCategoryIdResponseType>,
    ApiError
  >({
    queryKey: [`MenuesByCategory/${id}`],
    queryFn: async () => {
      return await apiGetRequest<CardMenuByCategoryIdResponseType>({
        url: `menus/categories/${id}`,
      });
    },
  });

  const categoryMenuesData: CardMenuByCategoryIdDataType[] =
    data?.data?.data || [];

  const [searchKey, setSearchKey] = useState(name || "");

  const [selectedDishes, setSelectedDishes] = useState<
    CardMenuByCategoryIdDataType[]
  >([]);
  const [currentRestaurant, setCurrentRestaurant] =
    useState<CardMenuResturantDataType | null>(null);

  const dispatch = useDispatch();

  const condition = useSelector(carConditiontHelper);

  const handleDishSelection = (dish: CardMenuByCategoryIdDataType) => {
    if (condition) {
      setCurrentRestaurant(null);
      setSelectedDishes([]);
      return;
    } else if (!currentRestaurant) {
      setCurrentRestaurant(dish?.restaurantId ?? null);
      setSelectedDishes([dish]); // Set initial selected dish
    } else if (currentRestaurant.name === dish?.restaurantId?.name) {
      setSelectedDishes((prev) => {
        const isSelected = prev.find((d) => d.name === dish.name);
        if (isSelected) {
          return prev.filter((d) => d.name !== dish.name);
        } else {
          return [...prev, dish];
        }
      });
    } else {
      // Switching to a dish from a different restaurant
      setCurrentRestaurant(dish?.restaurantId ?? null);
      setSelectedDishes([dish]); // Select the new restaurant's dish
    }

    // dispatch(addItem(dish));
    if (!condition) {
      dispatch(addItem(dish));
    }
  };

  console.log(currentRestaurant);

  const closeAleartModal = () => {
    dispatch(closeCondition());
  };

  const confirmhandler = () => {
    setCurrentRestaurant(null);
    setSelectedDishes([]);
    dispatch(clearCart());
  };
  return (
    <React.Fragment>
      {condition && (
        <AlertModal onClose={closeAleartModal} onConfirm={confirmhandler} />
      )}
      <section className="mx-auto max-w-[1200px] px-4  xl:px-0 ">
        <div className="relative flex items-center justify-center mx-auto border border-gray-100 rounded-md focus-within:ring-1 ">
          <div className="absolute left-0 pl-2 text-gray-400 group-focus-within:text-black ">
            {name ? (
              <Link to={"/search"}>
                <TiArrowBack className="w-5 h-5 " />
              </Link>
            ) : (
              ""
            )}
          </div>
          <input
            type="text"
            name="searchKey"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="Search user / chat"
            className=" w-full px-2 py-2 pl-[2rem]  rounded-tl-md rounded-bl-md outline-none md:inline-block focus:border-blue-500 rounded-tr-md rounded-br-md placeholder:text-slate-400"
          />
          <div className="absolute pl-2 text-gray-400 right-2 group-focus-within:text-black ">
            {searchKey ? (
              <IoClose className="w-5 h-5 " />
            ) : (
              <IoSearch className="w-4 h-4 " />
            )}
          </div>
        </div>
        {/* <FindOutDishes
          dishIdName={dishIdName}
          handlingCound={handlingCound}
          isCount={isCount}
          setCount={setCount}
          selectedDish={selectedDishes}
          // setDish={setDish}
          setSelectedDishes={setSelectedDishes}
        /> */}

        <NewFindOutDishes
          dishIdName={name || ""}
          handleDishSelection={handleDishSelection}
          selectedDishes={selectedDishes}
          categoryWiseMenu={categoryMenuesData}
          currentResturant={currentRestaurant ?? {}}
        />
      </section>
    </React.Fragment>
  );
};

export default NewDishList;
