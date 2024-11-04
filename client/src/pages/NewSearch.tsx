import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

import { ApiError, ApiGetResponse } from "../types/apiType";
import {
  CategoryAllDataType,
  CategoryAllResponseType,
} from "../types/contentType";
import { useQuery } from "@tanstack/react-query";
import { apiGetRequest } from "../api/userGetApi";
import { PiBowlFoodDuotone } from "react-icons/pi";

const NewSearch: React.FC = () => {
  const [searchKey, setSearchKey] = useState<string>("");

  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery<
    ApiGetResponse<CategoryAllResponseType>,
    ApiError
  >({
    queryKey: [`All Categorys`],
    queryFn: async () => {
      return await apiGetRequest<CategoryAllResponseType>({
        url: `/categories`,
      });
    },
  });

  const menuesData: CategoryAllDataType[] = data?.data?.data || [];

  console.log(data, menuesData, error, isLoading);

  //   const filterDishes = (searchKey ? dishesWithResturant : dishes).filter(
  //     (dishe) =>
  //   const filterDishes = (searchKey ? menuesData : dishes).filter((dishe) =>
  const filterDishes = menuesData.filter((dishe) =>
    dishe?.name?.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase())
  );

  const handlingNavigate = (id: number | string) => {
    navigate(`/search/${id}`);
  };

  return (
    <React.Fragment>
      <section className="mx-auto max-w-[1200px] px-4 xl:px-0 ">
        <div className="relative flex items-center justify-center mx-auto transition-all duration-500 border border-gray-100 rounded-md focus-within:ring-1">
          <div className="absolute left-0 pl-2 text-gray-400 group-focus-within:text-black ">
            <IoSearch className="w-4 h-4 " />
          </div>
          <input
            type="text"
            name="searchKey"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="Search for resturants and food"
            className=" w-full px-2 py-2 pl-[2rem] rounded-tl-md rounded-bl-md outline-none md:inline-block  rounded-tr-md rounded-br-md placeholder:text-slate-400"
          />
        </div>
        <div className=" mx-auto  mt-4 overflow-y-scroll [&::-webkit-scrollbar]:hidden max-h-[500px]  ">
          {filterDishes.map((dish, index) => (
            <div
              key={index}
              onClick={() =>
                handlingNavigate(dish?._id ? `${dish?._id}/${dish.name}` : "")
              }
            >
              <div className="flex w-full p-2 px-0 my-2 border-gray-400 rounded-md md:pl-4 md:p-6 group hover:bg-gray-100">
                <div className="">
                  {dish?.image ? (
                    <img
                      src={dish?.image}
                      alt={dish.name}
                      className="w-20 h-16 md:h-20 md:w-28"
                    />
                  ) : (
                    <PiBowlFoodDuotone className="w-20 h-16 md:h-20 md:w-28" />
                  )}
                </div>
                <div className="items-center justify-between inline-block w-full ml-4 mr-4 sm:flex">
                  <div className="flex flex-col justify-center pb-2 ">
                    <h4 className="mb-1 text-lg font-semibold text-gray-700">
                      {dish.name}
                    </h4>
                    <p className="text-sm text-gray-400">{"Dish"}</p>
                  </div>
                  <button
                    className="items-center py-1 hidden px-4 sm:py-2 rounded-md  bg-[#f79577] text-white group-hover:flex"
                    type="submit"
                  >
                    <span className="mr-2 text-[0.8rem] font-semibold hidden md:inline-block">
                      KNOW MORE
                    </span>
                    <FaLongArrowAltLeft className="w-4 h-4 rotate-180 " />
                  </button>
                </div>
              </div>
              <div className="border-b-2"></div>
            </div>
          ))}
        </div>
      </section>
    </React.Fragment>
  );
};

export default NewSearch;
