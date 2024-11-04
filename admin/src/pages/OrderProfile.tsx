/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */

import { TiArrowBackOutline } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";

import { RiRestaurantLine } from "react-icons/ri";

import { useQuery } from "@tanstack/react-query";

import { ApiError, ApiGetResponse } from "../types/apiType";

import { apiGetRequest } from "../api/adminGetApi";

export interface MenuType {
  _id: string;
  name: string;
  price: number;
}

export interface OrderItemType {
  menuItemId: MenuType;
  price: number;
  totalprice: number;
  quantity: number;
  _id: string;
}

export interface CouponType {
  couponcode: string;
  percent: number;
  category: string;
}
export interface UserIdType {
  _id: string;
  name: string;
  email: string;
}
export interface OrderDataTYpe {
  coupon: CouponType;
  _id: string;
  userId: UserIdType;
  items: OrderItemType[];
  address: string;
  totalAmount: number;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderResponseDataProfile {
  data: OrderDataTYpe;
}

const OrderProfile = () => {
  const { id } = useParams();

  const {
    data: orderDetails,
    isError: orderDetailsIsError,
    isSuccess,
    // error: orderDetailsError,
    isPending: orderDetailsIsPending,
  } = useQuery<ApiGetResponse<OrderResponseDataProfile>, ApiError>({
    queryKey: [`order/${id}/profile`],

    queryFn: async () => {
      return await apiGetRequest<OrderResponseDataProfile>({
        url: `order/single/${id}`,
      });
    },
  });

  const orderDetailsData = orderDetails?.data?.data;
  //   const resturantMenueData = returantItems?.data?.data;

  console.log(orderDetailsData, orderDetails, isSuccess, "Resturant profile");
  //   console.log(resturantMenueData, returantItemsIsError, "Resturant Items");

  if (orderDetailsIsPending) {
    return "Loading...";
  }
  if (orderDetailsIsError) {
    return "Error";
  }

  const currentRestMenu = orderDetailsData?.items;

  const orderHeading = ["Dish Name", "Qty", "Price", "Total Price"];

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
            Order Profile
          </h1>
          <Link to={"/orders"}>
            <TiArrowBackOutline className="w-10 h-10 ml-4 hover:text-orange-600 text-sky-600" />
          </Link>
        </div>
        <div className="pt-4 border-b border-gray-200"></div>
        {
          <div className="h-[500px] pt-4 mt-4 overflow-y-auto [&::-webkit-scrollbar]:hidden md:pl-4 font-montserrat">
            <section className="mb-8 ">
              <div className="">
                <div className="relative flex items-center justify-between w-full mb-8">
                  <div className="flex items-center">
                    <div>
                      <h2 className="text-xl font-semibold text-orange-500 md:text-2xl">
                        {orderDetailsData?.userId?.name}
                      </h2>
                      <p className="text-sm font-semibold text-gray-400"></p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 ">
                  <div className="grid grid-cols-1 col-span-3 gap-6 md:grid-cols-3">
                    <p className="text-sm font-semibold md:text-base ">
                      <span className="pr-2 text-sm font-medium text-gray-400 ">
                        Order Total Amount:
                      </span>
                      {orderDetailsData?.totalAmount || 0}
                    </p>
                    <p className="text-sm font-semibold md:text-base">
                      <span className="pr-2 text-sm font-medium text-gray-400 ">
                        Order Status:
                      </span>
                      {orderDetailsData?.orderStatus}
                    </p>
                    <p className="text-sm font-semibold md:text-base">
                      <span className="pr-2 text-sm font-medium text-gray-400 ">
                        Coupon Discount
                      </span>
                      {orderDetailsData?.coupon?.percent}
                    </p>

                    <p className="text-sm font-semibold md:text-base">
                      <span className="pr-2 text-sm font-medium text-gray-400 ">
                        Coupon Code
                      </span>
                      {orderDetailsData?.coupon?.couponcode}
                    </p>
                    <p className="text-sm font-semibold md:text-base">
                      <span className="pr-2 text-sm font-medium text-gray-400 ">
                        Address:
                      </span>
                      {orderDetailsData?.address}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <section
                className={`w-full overflow-auto   border-2 [&::-webkit-scrollbar]:hidden rounded-lg  shadow-md bg-white`}
              >
                <section className="grid grid-cols-customeUserOrder pb-2 p-2  gap-4  border-gray-100 min-w-[800px] font-medium md:font-semibold bg-sky-100">
                  <p className="pl-2 text-gray-600 md:text-lg">SrNo.</p>

                  {orderHeading.map((heading, index) => (
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
                <div className=" h-[300px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[800px] ">
                  {orderDetailsData?.items?.length === 0 ? (
                    <p className="flex items-center justify-center w-full h-full text-xl font-semibold text-rose-500">
                      Please Add Order for this User
                    </p>
                  ) : (
                    currentRestMenu?.map((menue, i) => (
                      <section
                        key={i}
                        className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 border-gray-200 grid-cols-customeUserOrder group hover:bg-gray-50"
                      >
                        <span>{i + 1}</span>

                        <span className="text-sm font-semibold text-gray-600 md:text-base">
                          {menue?.menuItemId?.name}
                        </span>

                        <span className="flex justify-center text-sm font-semibold text-gray-600 ">
                          {menue?.quantity}
                        </span>

                        <span className="flex justify-center ml-2 text-sm font-medium text-gray-600 md:text-base">
                          {menue?.price}
                        </span>

                        <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                          {menue?.totalprice}
                        </span>
                      </section>
                    ))
                  )}
                </div>
              </section>
            </section>
          </div>
        }
      </section>
    </section>
  );
};

export default OrderProfile;
