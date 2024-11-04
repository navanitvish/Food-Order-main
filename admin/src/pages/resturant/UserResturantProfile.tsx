/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */

import { useState } from "react";

import { TiArrowBackOutline } from "react-icons/ti";
import { Link, useNavigate, useParams } from "react-router-dom";
import { categorylistDishHeading } from "../../components/content_data/content_data";
import { RiRestaurantLine } from "react-icons/ri";

import Pagination from "../../components/pagination/Pagination";

import { IoIosSend } from "react-icons/io";
import {
  useResturantOwnerDetails,
  useResturantOwnerMenu,
  useResturantOwnerOrders,
} from "../../api/query";
import { MdDelete, MdEditDocument } from "react-icons/md";
import {
  DeletElementData,
  MutationObjectOrderUpdateType,
  OrderUpdateDataSend,
  SingleOrderResponseData,
  UniDelet,
} from "../../types/contentType";
import { ApiError, ApiResponse } from "../../types/apiType";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiRequest } from "../../api/userApi";
import ConfirmDeleteModal from "../../components/modal/ConfirmDeleteModal";
import { FaCaretDown } from "react-icons/fa";

export interface DeleteStateType {
  delet: boolean;
  deletElementId: string;
  condition: string;
}

const UserResturantProfile = () => {
  const { id } = useParams();

  const [currentPage, setCurrentPage] = useState({
    dishesPage: 1,
    orderPage: 1,
  });
  const [tab, setCurrentTab] = useState<string>("dishes");

  const [isDeletModal, setDeletModal] = useState<DeleteStateType>({
    delet: false,
    deletElementId: "",
    condition: "",
  });

  const navigate = useNavigate();

  const OrderlisHeading = [
    "User Name",
    "Dish Count",
    "Address",
    "TotalAmount",
    "Rating",
    "Status",
  ];

  const [openStatusId, setOpenStatusId] = useState("");

  const mutation = useMutation<
    ApiResponse<DeletElementData>,
    ApiError,
    UniDelet
  >({
    mutationFn: async (deletObj) => {
      toast.loading("Checking Details");
      try {
        // console.log(path, method);
        const response = await apiRequest<UniDelet, DeletElementData>({
          url: deletObj.path,
          method: "delete",
        });

        // return { data: response.data };
        return response as ApiResponse<DeletElementData>;
      } catch (error) {
        console.log(error);
        const apiError: ApiError = {
          message: (error as ApiError)?.message || "An error occurred",
          status: (error as ApiError)?.status || 500,
        };
        throw apiError;
      }
    },
    onSuccess: (data: ApiResponse<DeletElementData>) => {
      console.log(data);
      returantItemRefecth();
      setDeletModal((prev) => ({
        ...prev,
        delet: false,
        deletElementId: "",
      }));
      toast.dismiss();
      toast.success(`${data?.message}`);
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
      setDeletModal((prev) => ({
        ...prev,
        delet: false,
        deletElementId: "",
      }));
      toast.error(`${error.message}`);
    },
  });

  const UpdateOrderMutaion = useMutation<
    ApiResponse<SingleOrderResponseData>,
    ApiError,
    MutationObjectOrderUpdateType
  >({
    mutationFn: async ({ path, data }) => {
      toast.loading("Checking Details...");
      try {
        const response = await apiRequest<
          OrderUpdateDataSend,
          SingleOrderResponseData
        >({
          url: path,
          method: "patch",
          data: data,
        });

        return response;
      } catch (error) {
        const apiError: ApiError = {
          message: (error as ApiError)?.message || "An error occurred",
          status: (error as ApiError)?.status || 500,
        };
        throw apiError;
      }
    },
    onSuccess: (data) => {
      console.log(data);
      toast.dismiss();
      toast.success(`Update Successfull`);
      refetch();
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
      toast.error(`${error.message}`);
    },
  });

  const {
    data: resturantDetails,
    isError: resturantDetailsIsError,
    // error: resturantDetailsError,
    isPending: resturantDetailsIsPending,
  } = useResturantOwnerDetails(id ?? "");

  const {
    data: returantItems,
    isError: returantItemsIsError,
    refetch: returantItemRefecth,
    isPending: returantItemsIsPending,
  } = useResturantOwnerMenu(id ?? "", currentPage.dishesPage, 5);

  const {
    data: orderByResturant,
    isError: orderByResturantIsError,
    refetch,
    // error: orderByResturantError,
    // isPending: orderByResturantIsPending,
  } = useResturantOwnerOrders(id ?? "");

  const restaurantDetailsData = resturantDetails?.data?.data;
  const resturantMenueData = returantItems?.data?.data;
  const restMenuPagination = returantItems?.data?.pagination;
  const orderByresturantData = orderByResturant?.data?.data;
  const restOrderPagination = orderByResturant?.data?.pagination;

  console.log("restaurantDetails:", restaurantDetailsData);
  console.log("restaurantMenu:", resturantMenueData, returantItems);
  console.log("restaurantOrders:", orderByresturantData);

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

  const deletHandler = (condition: string, id: string) => {
    console.log(id, "delete");
    setDeletModal((prev) => ({
      ...prev,
      delet: true,
      deletElementId: id,
      condition: condition,
    }));
  };

  const closehandler = () => {
    setDeletModal((prev) => ({
      ...prev,
      delet: false,
      deletElementId: "",
    }));
  };

  const confirmhandler = () => {
    const deleteObj: UniDelet = {
      path:
        isDeletModal.condition === "menu"
          ? `restaurantowneruser/delete/menu/${isDeletModal?.deletElementId}`
          : `restaurantowneruser/order/${isDeletModal?.deletElementId}`,
    };

    // Proceed with the deletion
    mutation.mutate(deleteObj);
  };

  const updateMenue = (menuid: string) => {
    navigate(`/restaurants_owner/${id}/menu_form/${menuid}`);
  };
  const updateOrder = (orderStatus: string, id: string) => {
    const payloade = {
      orderStatus: orderStatus,
    };

    UpdateOrderMutaion.mutate({
      path: `restaurantowneruser/order/status/${id}`,
      data: payloade,
    });

    setOpenStatusId("");
  };

  const toggleStatusDropdown = (id: string) => {
    setOpenStatusId((prevId) => (prevId === id ? "" : id));
  };

  return (
    <>
      {isDeletModal?.delet && (
        <ConfirmDeleteModal onClose={closehandler} onConfirm={confirmhandler} />
      )}
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
            <Link to={"/restaurants_owner"}>
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
              {tab === "dishes" && (
                <div className="relative flex items-center justify-end w-full">
                  <button
                    className={` px-2 py-1 
                       bg-blue-400  hover:bg-cyan-400 text-white
                  }    rounded shadow-xl md:px-4 md:py-2  sm:self-center`}
                  >
                    <Link to={`/restaurants_owner/${id}/menu_form`}>
                      {/* <Link to={"/restaurants"}> */}
                      <span className="hidden md:inline-block">
                        {"Add Dishes"}
                      </span>
                      <IoIosSend className="w-6 h-6 md:hidden" />
                    </Link>
                  </button>
                </div>
              )}
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
                  <section className="grid grid-cols-customDishes pb-2 p-2  gap-4  border-gray-100 min-w-[1200px] font-medium md:font-semibold bg-sky-100">
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
                    {returantItemsIsError || currentRestMenu?.length == 0 ? (
                      <p className="flex items-center justify-center w-full h-full text-xl font-semibold text-rose-500">
                        Please Add Dishes for this Resturant
                      </p>
                    ) : (
                      currentRestMenu?.map((menue, i) => (
                        <section
                          key={i}
                          className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 border-gray-200 grid-cols-customDishes group hover:bg-gray-50"
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
                                className="w-24 h-16 rounded-lg"
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

                          <div className="grid justify-center gap-2">
                            <button
                              className="px-2 w-fit text-sm py-2 text-white bg-[#28a745] rounded-md hover:bg-green-700"
                              onClick={() => updateMenue(menue._id)}
                            >
                              <MdEditDocument className="w-4 h-5" />
                            </button>
                            <button
                              className="px-2 w-fit text-sm py-2 text-white rounded-md bg-[#FE5722] hover:bg-rose-700"
                              onClick={() => deletHandler("menu", menue._id)}
                            >
                              <MdDelete className="w-4 h-4" />
                            </button>
                          </div>
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
                        Please wait to get Order Assign
                      </p>
                    ) : (
                      currentOrderByresturant?.map((order, i) => (
                        <section
                          key={i}
                          className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 border-gray-200 grid-cols-customeOrderUserProfile group hover:bg-gray-50"
                        >
                          <span>{i + 1}</span>

                          <span className="text-sm font-semibold text-gray-600 md:text-base">
                            {order?.userId.name}
                          </span>

                          <span className="ml-2 text-sm font-semibold text-gray-600 ">
                            {order?.items.length}
                          </span>

                          <span className="flex justify-center ml-2 text-sm font-medium text-gray-600 md:text-base">
                            {order?.address}
                          </span>

                          <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                            {order?.totalAmount}
                          </span>
                          <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                            {order?.averageRating}
                          </span>
                          <div className="relative">
                            <div
                              className="flex justify-between p-2 text-sm border border-gray-400 rounded-md cursor-pointer"
                              onClick={() => toggleStatusDropdown(order?._id)}
                            >
                              {order.orderStatus !== ""
                                ? order.orderStatus
                                : "Select Status"}
                              <FaCaretDown className="m-1" />
                            </div>
                            <ul
                              className={`mt-2 p-2 rounded-md w-28 bg-gray-600 shadow-lg absolute z-10 ${
                                openStatusId === order?._id
                                  ? "max-h-60"
                                  : "hidden"
                              } custom-scrollbar`}
                            >
                              {["active", "complete", "cancel", "pending"].map(
                                (status, i) => (
                                  <li
                                    key={i}
                                    className={`p-2 mb-2 text-sm text-white rounded-md cursor-pointer hover:bg-blue-200/60 ${
                                      order.orderStatus === status
                                        ? "bg-rose-600"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      updateOrder(status, order?._id)
                                    }
                                  >
                                    <span>{status}</span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                          {/* <div className="grid justify-center gap-2">
                            <button
                              className="px-2 w-fit text-sm py-2 text-white bg-[#28a745] rounded-md hover:bg-green-700"
                              onClick={() => updateOrder(order._id)}
                            >
                              <MdEditDocument className="w-4 h-5" />
                            </button>
                            <button
                              className="px-2 w-fit text-sm py-2 text-white rounded-md bg-[#FE5722] hover:bg-rose-700"
                              onClick={() => deletHandler("order", order._id)}
                            >
                              <MdDelete className="w-4 h-4" />
                            </button>
                          </div> */}
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
    </>
  );
};

export default UserResturantProfile;
