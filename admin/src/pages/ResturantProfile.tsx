/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */

import { useState } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import { categorylistDishHeading } from "../components/content_data/content_data";
import { RiRestaurantLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import {
  MenuDataResponse,
  OrderResponseData,
  RestaurantResponseDataProfile,
} from "../types/contentType";
import { ApiError, ApiGetResponse } from "../types/apiType";
import Pagination from "../components/pagination/Pagination";
import { apiGetRequest } from "../api/adminGetApi";

const ResturantProfile = () => {
  const { id } = useParams();

  const [currentPage, setCurrentPage] = useState({
    dishesPage: 1,
    orderPage: 1,
  });
  const [tab, setCurrentTab] = useState<string>("dishes");

  const OrderlisHeading = [
    "User Name",
    "Dish Count",
    "Address",
    "TotalAmount",
    "Rating",
    "Status",
  ];

  //resturant details
  const {
    data: resturantDetails,
    isError: resturantDetailsIsError,
    // error: resturantDetailsError,
    isPending: resturantDetailsIsPending,
  } = useQuery<ApiGetResponse<RestaurantResponseDataProfile>, ApiError>({
    queryKey: [`restaurant/${id}/profile`],

    queryFn: async () => {
      return await apiGetRequest<RestaurantResponseDataProfile>({
        url: `restaurant/${id}`,
      });
    },
  });

  //dish items by resturant
  const {
    data: returantItems,
    isError: returantItemsIsError,

    isPending: returantItemsIsPending,
  } = useQuery<ApiGetResponse<MenuDataResponse>, ApiError>({
    queryKey: [`restaurant/${id}?page=${currentPage.dishesPage}`],
    queryFn: async () => {
      return await apiGetRequest<MenuDataResponse>({
        url: `menus/restaurant/pag/${id}?page=${currentPage.dishesPage}&limit=10`,
      });
    },
  });

  //order by resturant
  const {
    data: orderByResturant,
    isError: orderByResturantIsError,
    // error: orderByResturantError,
    isPending: orderByResturantIsPending,
  } = useQuery<ApiGetResponse<OrderResponseData>, ApiError>({
    queryKey: [`order/byresturant/${id}?page=${currentPage.orderPage}`],

    queryFn: async () => {
      return await apiGetRequest<OrderResponseData>({
        url: `order/by-resturant/${id}?page=${currentPage.orderPage}&limit=10`,
      });
    },
  });

  const restaurantDetailsData = resturantDetails?.data?.data;
  const resturantMenueData = returantItems?.data?.data;
  const restMenuPagination = returantItems?.data?.pagination;
  const orderByresturantData = orderByResturant?.data?.data;
  const restOrderPagination = orderByResturant?.data?.pagination;

  console.log(restaurantDetailsData, "Resturant profile");
  console.log(resturantMenueData, returantItemsIsError, "Resturant Items");
  console.log(
    id,
    orderByresturantData,
    orderByResturantIsError,
    orderByResturantIsPending,
    "Orders by Resturant Items"
  );

  if (resturantDetailsIsPending && returantItemsIsPending) {
    return "Loading...";
  }
  if (returantItemsIsError && resturantDetailsIsError) {
    return "Error";
  }

  const currentRestMenu = resturantMenueData;
  const currentOrderByresturant = orderByresturantData;

  const handleClick = (pageNumber: number) => {
    if (tab === "dishes") {
      setCurrentPage((prev) => ({
        ...prev,
        dishesPage: pageNumber,
      }));
    } else {
      setCurrentPage((prev) => ({
        ...prev,
        orderPage: pageNumber,
      }));
    }
  };

  const tabhandler = (value: string) => {
    setCurrentTab(value);
  };

  return (
    <section
      className={` mx-auto px-4 pt-4 md:pl-0 md:pr-4  text-gray-600 border-gray-200   rounded-md `}
    >
      <section
        className={`  bg-white h-fit p-6 text-gray-600 border-gray-200  rounded-md md:p-8`}
      >
        <div className="flex items-center">
          <RiRestaurantLine className=" w-9 h-9" />
          <h1 className="  text-[28px] font-bold  md:text-4xl ml-2">
            Resturant Profile
          </h1>
          <Link to={"/restaurants"}>
            <TiArrowBackOutline className="w-10 h-10 ml-4 hover:text-orange-600 text-sky-600" />
          </Link>
        </div>
        <div className="pt-4 border-b border-gray-200"></div>
        <div className="h-[500px] pt-4 mt-4 overflow-y-auto [&::-webkit-scrollbar]:hidden md:pl-4 font-montserrat">
          <section className="mb-8 ">
            <div className="">
              <div className="relative flex items-center justify-between w-full mb-8">
                <div className="flex items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-orange-500 md:text-2xl">
                      {restaurantDetailsData?.name}
                    </h2>
                    <p className="text-sm font-semibold text-gray-400"></p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 ">
                <div className="grid grid-cols-1 col-span-3 gap-6 md:grid-cols-3">
                  <p className="text-sm font-semibold md:text-base ">
                    <span className="pr-2 text-sm font-medium text-gray-400 ">
                      Opening Hours:
                    </span>
                    {restaurantDetailsData?.openinghour
                      ? restaurantDetailsData?.openinghour
                      : "9:00 AM - 10:00 PM"}
                  </p>
                  <p className="text-sm font-semibold md:text-base">
                    <span className="pr-2 text-sm font-medium text-gray-400 ">
                      contact:
                    </span>
                    {restaurantDetailsData?.contact
                      ? restaurantDetailsData?.contact
                      : "----"}
                  </p>
                  <p className="text-sm font-semibold md:text-base">
                    <span className="pr-2 text-sm font-medium text-gray-400 ">
                      Cuisine Type:
                    </span>
                    {restaurantDetailsData?.cuisine
                      ? restaurantDetailsData?.cuisine
                      : "Indian"}
                  </p>

                  <p className="text-sm font-semibold md:text-base">
                    <span className="pr-2 text-sm font-medium text-gray-400 ">
                      Menu Items:
                    </span>
                    {restaurantDetailsData?.menuitem}
                  </p>
                  <p className="text-sm font-semibold md:text-base">
                    <span className="pr-2 text-sm font-medium text-gray-400 ">
                      Address:
                    </span>
                    123 Main St, Cityville
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <ul className={`flex pb-4`}>
              <li
                onClick={() => tabhandler("dishes")}
                className={`p-2 px-4 border-2    font-medium cursor-pointer  ${
                  tab === "dishes"
                    ? "border-blue-400  border-2 border-b-0 text-blue-600  rounded-tl-md rounded-tr-md  bg-blue-100"
                    : "bg-transparent  border-transparent border-b-blue-400  rounded-tl-none rounded-tr-none border-l-0 border-r-0 border-b-2"
                }`}
              >
                Dishes
              </li>
              <li
                onClick={() => tabhandler("orders")}
                className={`p-2 px-4 border-2    font-medium cursor-pointer  ${
                  tab === "orders"
                    ? "border-blue-400  border-2 border-b-0 text-blue-600  rounded-tl-md rounded-tr-md  bg-blue-100"
                    : "bg-transparent  border-transparent border-b-blue-400  rounded-tl-none rounded-tr-none border-l-0 border-r-0  border-b-2"
                }`}
              >
                Orders
              </li>

              {/* {condition === "attendance" && ( */}
              {/* <li
                  // onClick={() => tabHandler("All")}
                  className={`p-2 px-4 border-2    font-medium cursor-pointer  ${
                    tabView === "All"
                      ? "border-blue-400  border-2 border-b-0 text-blue-600  rounded-tl-md rounded-tr-md  bg-blue-100"
                      : "bg-transparent  border-transparent border-b-blue-400  rounded-tl-none rounded-tr-none border-l-0 border-r-0 border-b-2"
                  }`}
                >
                  All
                </li> */}
              {/* )} */}
              <li className="flex-1 w-full border-b-2 border-blue-400"></li>
            </ul>
            {tab === "dishes" ? (
              <section
                className={`w-full overflow-auto   border-2 [&::-webkit-scrollbar]:hidden rounded-lg  shadow-md bg-white`}
              >
                <section className="grid grid-cols-customCategoryDishes pb-2 p-2  gap-4  border-gray-100 min-w-[1200px] font-medium md:font-semibold bg-sky-100">
                  <p className="pl-2 text-gray-600 md:text-lg">SrNo.</p>
                  {/* <p className="pl-10 text-gray-600 md:text-lg">Logo</p> */}

                  {categorylistDishHeading.map((heading, index) => (
                    <p
                      key={index}
                      className={`  text-gray-600 md:text-lg ${
                        index !== 0 ? "justify-self-center" : "ml-10"
                      }`}
                    >
                      {heading.charAt(0).toUpperCase() + heading.slice(1)}
                    </p>
                  ))}
                </section>

                <div className=" h-[370px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[1200px] ">
                  {returantItemsIsError || currentRestMenu?.length === 0 ? (
                    <p className="flex items-center justify-center w-full h-full text-xl font-semibold text-rose-500">
                      Please Add Dishes for this Resturant
                    </p>
                  ) : (
                    currentRestMenu?.map((menue, i) => (
                      <section
                        key={i}
                        className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 border-gray-200 grid-cols-customCategoryDishes group hover:bg-gray-50"
                      >
                        <span>{i + 1}</span>
                        <span
                          className={` text-xs font-bold   rounded-full   ${
                            menue?.dietry?.toLowerCase() === "veg"
                              ? "text-green-600 bg-green-100 p-2 text-center"
                              : menue?.dietry?.toLowerCase() === "non-veg"
                              ? "text-rose-500 bg-rose-100 p-2 text-center"
                              : "ml-5"
                          }`}
                        >
                          {menue?.dietry ? menue?.dietry : "-- --"}
                        </span>

                        <span className="text-sm font-semibold text-gray-600 md:text-base">
                          {menue?.label}
                        </span>
                        <div className="flex items-center justify-center">
                          {menue?.image ? (
                            <img
                              src={menue?.image}
                              alt="user Image"
                              className="w-24 h-10 rounded-lg"
                            />
                          ) : (
                            <span className="text-sm font-bold text-gray-400">
                              No Image
                            </span>
                          )}
                        </div>
                        <span className="ml-2 text-sm font-semibold text-gray-600 ">
                          {menue?.name}
                        </span>

                        <span className="flex justify-center ml-2 text-sm font-medium text-gray-600 md:text-base">
                          {menue?.description}
                        </span>
                        <div className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                          {menue?.ingredient ? (
                            <span className="flex text-xs font-semibold text-gray-600 break-words break-all text-ellipsis md:text-sm">
                              {menue?.ingredient},
                            </span>
                          ) : (
                            <span className="flex justify-center text-sm font-bold text-gray-400">
                              Empty
                            </span>
                          )}
                        </div>
                        <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                          {menue?.price}
                        </span>
                        <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                          {menue?.restaurantId
                            ? menue?.restaurantId.name
                            : "---"}
                        </span>
                      </section>
                    ))
                  )}
                </div>
              </section>
            ) : (
              <section
                className={`w-full overflow-auto   border-2 [&::-webkit-scrollbar]:hidden rounded-lg  shadow-md bg-white`}
              >
                <section className="grid grid-cols-customeOrderUserProfile pb-2 p-2  gap-4  border-gray-100 min-w-[1200px] font-medium md:font-semibold bg-sky-100">
                  <p className="pl-2 text-gray-600 md:text-lg">SrNo.</p>
                  {/* <p className="pl-10 text-gray-600 md:text-lg">Logo</p> */}

                  {OrderlisHeading.map((heading, index) => (
                    <p
                      key={index}
                      className={`  text-gray-600 md:text-lg ${
                        index !== 0 ? "justify-self-center" : "ml-10"
                      }`}
                    >
                      {heading.charAt(0).toUpperCase() + heading.slice(1)}
                    </p>
                  ))}
                </section>

                <div className=" h-[370px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[1200px] ">
                  {orderByResturantIsError ||
                  currentOrderByresturant?.length === 0 ? (
                    <p className="flex items-center justify-center w-full h-full text-xl font-semibold text-rose-500">
                      Please Add Order for this Resturant
                    </p>
                  ) : (
                    currentOrderByresturant?.map((menue, i) => (
                      <section
                        key={i}
                        className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 border-gray-200 grid-cols-customeOrderUserProfile group hover:bg-gray-50"
                      >
                        <span>{i + 1}</span>

                        <span className="text-sm font-semibold text-gray-600 md:text-base">
                          {menue?.userId.name}
                        </span>

                        <span className="ml-2 text-sm font-semibold text-center text-gray-600 ">
                          {menue?.items.length}
                        </span>

                        <span className="flex justify-center ml-2 text-sm font-medium text-gray-600 md:text-base">
                          {menue?.address}
                        </span>

                        <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                          {menue?.totalAmount}
                        </span>
                        <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                          {menue?.averageRating}
                        </span>
                        <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                          {menue?.orderStatus}
                        </span>
                      </section>
                    ))
                  )}
                </div>
              </section>
            )}
            <Pagination
              currentPage={
                tab === "dishes"
                  ? currentPage.dishesPage
                  : currentPage.orderPage
              }
              tabletotalPages={
                (tab === "dishes"
                  ? restMenuPagination?.totalPages
                  : restOrderPagination?.totalPages) || 0
              }
              totalItems={
                (tab === "dishes"
                  ? restMenuPagination?.totalItems
                  : restOrderPagination?.totalItems) || 0
              }
              handleClick={handleClick}
            />
          </section>
        </div>
      </section>
    </section>
  );
};

export default ResturantProfile;
