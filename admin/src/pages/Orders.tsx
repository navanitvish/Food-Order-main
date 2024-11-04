import { useState } from "react";

import {
  orderHeading,
  orderItemHeading,
} from "../components/content_data/content_data";
import { RiArrowDropDownLine } from "react-icons/ri";
import { OrderResponseData } from "../types/contentType";
import { ApiError, ApiGetResponse } from "../types/apiType";
import { useQuery } from "@tanstack/react-query";

import Pagination from "../components/pagination/Pagination";
import { apiGetRequest } from "../api/adminGetApi";
import { useNavigate } from "react-router";

const Orders = () => {
  const [isItem, setItem] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();

  const handlingOrderItem = (index: string) => {
    console.log(isItem === index, isItem, index);
    if (isItem) {
      setItem("");
    } else {
      setItem(index);
    }
  };

  const { isPending, isError, data, error } = useQuery<
    ApiGetResponse<OrderResponseData>,
    ApiError
  >({
    queryKey: [`order/${currentPage}`],
    queryFn: async () => {
      return await apiGetRequest<OrderResponseData>({
        url: `/order/pag?page=${currentPage}&limit=${5}`,
      });
    },
  });
  // const { isPending, isError, data, error } = useQuery<
  //   ApiGetResponse<OrderResponseData>,
  //   ApiError
  // >({
  //   queryKey: [`order`],
  //   queryFn: async () => {
  //     return await apiGetRequest<OrderResponseData>({
  //       url: "/order/all-orders",
  //     });
  //   },
  // });

  console.log(data, error, "order");

  const currentOrder = data?.data?.data;
  const pagination = data?.data?.pagination;

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const navigateHandler = (id: string) => {
    navigate(`/orders/${id}`);
  };

  // console.log(isItem);
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
          <h1 className=" text-[28px] font-bold md:text-4xl font-montserrat">
            Orders
          </h1>
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
          <section className="grid grid-cols-customOrder pb-2 p-2  gap-4  border-gray-100 min-w-[1180px] font-medium md:font-semibold bg-sky-100">
            <p className="pl-2 text-gray-600 md:text-lg">SrNo.</p>
            {/* <p className="pl-10 text-gray-600 md:text-lg">Logo</p> */}

            {orderHeading?.map((heading, index) => (
              <p
                key={index}
                className={`  text-gray-600 md:text-lg ${
                  index !== 0 ? "justify-self-center" : "ml-6"
                }`}
              >
                {heading.charAt(0).toUpperCase() + heading.slice(1)}
              </p>
            ))}
          </section>
          <div className=" h-[370px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[1180px] ">
            {isPending ? (
              <p>Loading...</p>
            ) : isError ? (
              <p>contact admin</p>
            ) : (
              currentOrder?.map((order, i) => (
                <>
                  <section
                    key={i}
                    className="grid items-center gap-4 py-2 pl-6 pr-4 border-t-2 border-gray-200 grid-cols-customOrder group hover:bg-gray-50"
                  >
                    <span>{i + 1}</span>

                    <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      {order?.restaurant?.name
                        ? order?.restaurant?.name
                        : order.items[0].menuItemId.restaurantId.name}
                    </span>
                    {/* <span className="w-4 ml-2 text-sm font-semibold rounded-full ">
                  {}
                </span> */}
                    <div className="grid pl-4">
                      <span
                        className="text-sm font-semibold text-gray-600 cursor-pointer md:text-base hover:text-orange-400"
                        onClick={() => navigateHandler(order?._id)}
                      >
                        {order?.userId?.name}
                      </span>
                      <span className="text-xs font-semibold text-gray-600 ">
                        {order?.userId?.email}
                      </span>
                    </div>
                    {/* <div className="flex flex-wrap ml-2 text-sm font-semibold text-gray-600 md:text-base">
                  {order.ingredients.map((ing) => (
                    <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      {ing},
                    </span>
                  ))}
                </div> */}
                    <span className="flex justify-center text-sm font-semibold text-gray-600 md:text-base">
                      {order?.address ? order?.address : "--"}
                    </span>
                    <span className="flex justify-center text-sm font-semibold text-gray-600 md:text-base">
                      --
                    </span>
                    <span className="flex justify-center text-sm font-semibold text-gray-600 md:text-base">
                      {order?.items?.length}
                    </span>
                    <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      {order?.totalAmount}
                    </span>
                    <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      {order?.orderStatus ? order?.orderStatus : "----"}
                    </span>
                    <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      {order.createdAt
                        ? order.createdAt.split("T")[0]
                        : "--/--/--"}
                    </span>
                    <span
                      className="flex justify-center w-full ml-2 text-sm font-semibold text-gray-600 md:text-base"
                      onClick={() => handlingOrderItem(order?._id)}
                    >
                      <RiArrowDropDownLine
                        className={`${
                          isItem === order?._id ? "rotate-180" : ""
                        } transition-all duration-300 w-6 h-6 cursor-pointer`}
                      />
                    </span>
                  </section>
                  {isItem === order?._id && (
                    <section className="flex justify-center w-full p-4 bg-sky-100">
                      <section
                        className={` w-[800px]      border-2 [&::-webkit-scrollbar]:hidden rounded-lg  shadow-md  bg-white`}
                      >
                        <section className="grid grid-cols-customeOrderItem pb-2 p-2  gap-4  border-gray-100 min-w-[800px] font-medium md:font-semibold bg-rose-100">
                          <p className="pl-2 text-gray-600 md:text-lg">SrNo.</p>
                          {/* <p className="pl-10 text-gray-600 md:text-lg">Logo</p> */}

                          {orderItemHeading.map((heading, index) => (
                            <p
                              key={index}
                              className={`  text-gray-600 md:text-lg ${
                                index !== 0 ? "justify-self-center" : "ml-6"
                              }`}
                            >
                              {heading.charAt(0).toUpperCase() +
                                heading.slice(1)}
                            </p>
                          ))}
                        </section>
                        <div className=" h-fit overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[800px] ">
                          {order?.items?.map((item, i) => (
                            <section
                              key={i}
                              className="grid items-center gap-4 py-2 pl-6 pr-4 border-t-2 border-gray-200 grid-cols-customeOrderItem group hover:bg-gray-50"
                            >
                              <span>{i + 1}</span>

                              {/* <div className="flex items-center justify-center">
                      <img
                        src={order.imageSrc}
                        alt="user Image"
                        className="w-24 h-10 rounded-lg"
                      />
                    </div> */}
                              <span className="ml-2 text-sm font-semibold text-gray-600 md:text-base">
                                {item?.menuItemId?.name}
                              </span>

                              <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                                {item.quantity}
                              </span>

                              <span className="flex justify-center text-sm font-semibold text-gray-600 md:text-base">
                                {item?.menuItemId?.price}
                              </span>
                            </section>
                          ))}
                        </div>
                      </section>
                    </section>
                  )}
                </>
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

export default Orders;
