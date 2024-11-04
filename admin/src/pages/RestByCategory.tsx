import { useState } from "react";
import { categorylistDishHeading } from "../components/content_data/content_data";
import { useParams } from "react-router";

import {
  MenuDataResponse,
  SingleCategoryResponseData,
} from "../types/contentType";
import { ApiError, ApiGetResponse } from "../types/apiType";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../components/pagination/Pagination";
import { apiGetRequest } from "../api/adminGetApi";
import { TiArrowBackOutline } from "react-icons/ti";
import { Link } from "react-router-dom";

const RestByCategory = () => {
  const { id } = useParams();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const { isPending, isError, data, error } = useQuery<
    ApiGetResponse<SingleCategoryResponseData>,
    ApiError
  >({
    queryKey: [`restcategory-single-${id}`],
    queryFn: async () => {
      return await apiGetRequest<SingleCategoryResponseData>({
        url: `/restcategory/${id}`,
      });
    },
  });

  const {
    // isPending: categoryIsPending,
    // isError: categoryIsError,
    data: categoryMenu,
    // error: categoryError,
  } = useQuery<ApiGetResponse<MenuDataResponse>, ApiError>({
    queryKey: [`resturantCategory-${id}-resturant`],
    queryFn: async () => {
      return await apiGetRequest<MenuDataResponse>({
        url: `restaurant/category/pag/${id}`,
      });
    },
  });

  console.log(categoryMenu, data, "category Menue");

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const singlecategoryDataByApi = data?.data?.data;
  const singleCategoryDishData = categoryMenu
    ? categoryMenu?.data?.data
    : "Add Some Category";

  const currentDishCategory = categoryMenu?.data?.data;
  const pagination = categoryMenu?.data?.pagination;

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section
      className={`  md:pl-0 p-4 h-full rounded-md font-philosopher  mx-auto [&::-webkit-scrollbar]:hidden`}
    >
      <section
        className={` md:p-8 p-6
      
    h-full
           bg-white text-gray-600 border-gray-200 
        rounded-md  font-philosopher max-w-full w-full shadow-md`}
      >
        <div className="flex items-center mb-2 md:mb-6">
          <h1 className=" text-[28px] font-bold md:text-4xl ">
            {singlecategoryDataByApi?.name}
          </h1>
          <Link to={"/resturant_category"}>
            <TiArrowBackOutline className="w-10 h-10 ml-4 hover:text-orange-600 text-sky-600" />
          </Link>
        </div>
        <div className="flex justify-between mb-4">
          <div className={`flex items-center   `}>
            <input
              type="search"
              placeholder={` Search
              `}
              className={` p-2 text-sm md:text-base  sm:px-4 py-1 border-[2px] border-transparent 
               bg-slate-50 focus:border-gray-100
            shadow-inner rounded-[0.26rem] outline-none `}
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              // onFocus={() => setCurrentPage(1)}
            />
          </div>
        </div>
        <section
          className={`w-full overflow-auto   border-2 [&::-webkit-scrollbar]:hidden rounded-lg  shadow-md bg-white`}
        >
          <section className="grid grid-cols-customCategoryDishes pb-2 p-2  gap-4  border-gray-100 min-w-[1200px] font-medium md:font-semibold bg-sky-100">
            <p className="pl-2 text-gray-600 md:text-lg">SrNo.</p>
            {/* <p className="pl-10 text-gray-600 md:text-lg">Logo</p> */}

            {categorylistDishHeading?.map((heading, index) => (
              <p
                key={index}
                className={`  text-gray-600 md:text-lg ${
                  index !== 0 ? "justify-self-center" : "ml-8"
                }`}
              >
                {heading.charAt(0).toUpperCase() + heading.slice(1)}
              </p>
            ))}
          </section>
          <div className=" h-[370px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[1200px] ">
            {typeof singleCategoryDishData === "string" ? (
              <p className="flex items-center justify-center h-full font-bold text-center text-gray-400">
                {singleCategoryDishData}
              </p>
            ) : (
              currentDishCategory?.map((menu, i) => (
                <section
                  key={i}
                  className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 border-gray-200 grid-cols-customCategoryDishes group hover:bg-gray-50"
                >
                  <span>{i + 1}</span>
                  <span
                    className={` text-xs font-bold   rounded-full   ${
                      menu?.dietry?.toLowerCase() === "veg"
                        ? "text-green-600 bg-green-100 p-2 text-center"
                        : menu?.dietry?.toLowerCase() === "non-veg"
                        ? "text-rose-500 bg-rose-100 p-2 text-center"
                        : "ml-4"
                    }`}
                  >
                    {menu?.dietry ? menu?.dietry : "-- --"}
                  </span>
                  <span className="text-sm font-semibold text-gray-600 md:text-base">
                    {menu?.label ? menu?.label : "Nothing"}
                  </span>
                  <div className="flex items-center justify-center">
                    {menu?.image ? (
                      <img
                        src={menu?.image}
                        alt="user Image"
                        className="w-24 h-10 rounded-lg"
                      />
                    ) : (
                      <span className="text-sm font-bold text-gray-400">
                        No Image
                      </span>
                    )}
                  </div>
                  <span className="ml-2 text-sm font-semibold text-gray-600 md:text-base">
                    {menu?.name}
                  </span>
                  <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                    {menu?.description}
                  </span>
                  <div className="flex justify-center w-full text-sm font-semibold text-gray-600 md:text-base">
                    {menu?.ingredient ? (
                      <span className="flex justify-center w-full text-xs font-semibold text-gray-600 break-all text-ellipsis md:text-sm">
                        {menu?.ingredient},
                      </span>
                    ) : (
                      <span className="flex justify-center text-sm font-bold text-gray-400">
                        Empty
                      </span>
                    )}
                  </div>
                  <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                    ₹ {menu?.price}
                  </span>
                  <span className="flex ml-4 text-sm font-semibold text-gray-600 ">
                    {menu?.restaurantId ? menu?.restaurantId.name : "---"}
                  </span>
                </section>
              ))
            )}
          </div>
        </section>
        <Pagination
          currentPage={currentPage}
          tabletotalPages={pagination?.totalPages ?? 0}
          totalItems={pagination?.totalItems ?? 0}
          handleClick={handleClick}
        />
      </section>
    </section>
  );
};

export default RestByCategory;
