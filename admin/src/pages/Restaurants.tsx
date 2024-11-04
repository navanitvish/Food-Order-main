import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { resturantHeading } from "../components/content_data/content_data";
import { FiEye } from "react-icons/fi";
import {
  DeletElementData,
  DeleteStateType,
  UniDelet,
} from "../types/contentType";
import { ApiError, ApiResponse } from "../types/apiType";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../api/userApi";

import { toast } from "react-toastify";

import { RestaurantDataTypes } from "../store/restaurant";
import Pagination from "../components/pagination/Pagination";
import ConfirmDeleteModal from "../components/modal/ConfirmDeleteModal";
import { MdDelete, MdEditDocument } from "react-icons/md";
import { FaRegImage } from "react-icons/fa";
import { useRestaurantsPagination } from "../api/query";
import { convertTo12HourFormat } from "../utils/getNameofImage";

const Restaurants = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDeletModal, setDeletModal] = useState<DeleteStateType>({
    delet: false,
    deletElementId: "",
  });

  const { isPending, isError, data, error, refetch } = useRestaurantsPagination(
    currentPage,
    5
  );

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
      refetch();
      setDeletModal((prev) => ({
        ...prev,
        delet: false,
        deletElementId: "",
      }));
      toast.dismiss();
      toast.success(`${data?.data?.message}`);
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

  //delete
  const deletRestaurant = (id: string) => {
    setDeletModal((prev) => ({
      ...prev,
      delet: true,
      deletElementId: id,
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
      path: `/restaurant/${isDeletModal?.deletElementId}`,
    };

    // Proceed with the deletion
    mutation.mutate(deleteObj);
  };

  const navigate = useNavigate();

  const navigatehandler = (index: string) => {
    navigate(`/restaurants/${index}`);
    // console.log(index);
  };

  console.log(data, error, "restaurant");

  const currentResturant = data?.data?.data;
  const pagination = data?.data?.pagination;

  //update
  const updateRestaurant = (resturantData: RestaurantDataTypes) => {
    // dispatch(addRestaurantData(resturantData));
    navigate(`/restaurants/update/${resturantData?._id}`);
  };

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {isDeletModal?.delet && (
        <ConfirmDeleteModal onClose={closehandler} onConfirm={confirmhandler} />
      )}
      <section
        className={`  md:pl-0 p-4  rounded-md font-philosopher  mx-auto [&::-webkit-scrollbar]:hidden`}
      >
        <section
          className={` md:p-8 p-6 h-screen bg-white text-gray-600 border-gray-200 rounded-md  font-philosopher max-w-full w-full shadow-md`}
        >
          <div className="flex items-center mb-2 md:mb-6">
            <h1 className=" text-[28px] font-bold md:text-4xl font-montserrat">
              Restaurants
            </h1>
          </div>
          {/* <LeafLeatMap /> */}
          <div className="flex justify-between mb-4">
            <div className={`flex items-center   `}>
              <input
                type="search"
                placeholder={` Search
              `}
                className="p-3 bg-gray-50 rounded-lg border focus:ring-2  outline-none"
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                // onFocus={() => setCurrentPage(1)}
              />
            </div>
            <div className="relative flex items-center self-end ">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Link to={"/restaurants/restaurantForm"}>
                  {/* <Link to={"/restaurants"}> */}
                  <span className="hidden md:inline-block">Add Restaurant</span>

                  <IoIosSend className="w-6 h-6 md:hidden" />
                </Link>
              </button>
            </div>
          </div>
          <section
            className={`w-full overflow-auto  [&::-webkit-scrollbar]:hidden rounded-lg  shadow-md bg-white`}
          >
            <section className="grid grid-cols-customRestaurant pb-2 p-2   gap-4   min-w-[1800px] font-medium md:font-semibold ">
              <p className="pl-2 text-gray-600 md:text-lg">SrNo.</p>
              {/* <p className="pl-10 text-gray-600 md:text-lg">Logo</p> */}

              {resturantHeading?.map((heading, index) => (
                <p
                  key={index}
                  className={`${index !== 0 ? "text-center" : "pl-6"} capitalize`}
                >
                  {heading.charAt(0).toUpperCase() + heading.slice(1)}
                </p>
              ))}
            </section>
            <div className=" h-[370px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[1800px] ">
              {isError ? (
                <p>Contact admin</p>
              ) : isPending ? (
                <p>Loading...</p>
              ) : (
                currentResturant?.map((restaurant, i) => (
                  <section
                    key={i}
                    className={`grid items-center gap-4 py-2 pl-6 pr-4  border-gray-200 grid-cols-customRestaurant group hover:bg-gray-50 ${
                    i % 2 === 0 ? 'bg-blue-50' : 'bg-white'} `}
                  >
                    <span className={`pl-2 font-semibold ${i % 2 === 0 ? 'text-blue-600' : 'text-red-600'}`}>{i + 1}</span>

                    <span className="text-sm font-semibold text-gray-600 md:text-base">
                      {restaurant?.name}
                    </span>
                    <span className="ml-2 text-sm font-semibold text-center text-gray-600 md:text-base">
                      {restaurant?.address ? restaurant?.address : "No address"}
                    </span>
                    <span className="ml-2 text-sm font-semibold text-center text-gray-600 md:text-base">
                      {restaurant?.rating ? restaurant?.rating : 0}
                    </span>
                    {restaurant.image ? (
                      <div className="flex items-center justify-center">
                        <img
                          src={restaurant.image}
                          alt="user Image"
                          className="w-24 h-16 rounded-lg"
                        />
                      </div>
                    ) : (
                      <span className="flex items-center gap-2 ml-2 text-sm font-semibold text-center text-gray-600 md:text-base">
                        <FaRegImage className="w-5 h-5" /> No Image
                      </span>
                    )}

                    <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      {restaurant.openingTime
                        ? convertTo12HourFormat(restaurant.openingTime)
                        : "00:00"}
                    </span>
                    <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      {restaurant.closingTime
                        ? convertTo12HourFormat(restaurant.closingTime)
                        : "00:00"}
                    </span>

                    <span className="flex justify-center text-sm font-semibold text-gray-600 ">
                      {restaurant.contact ? restaurant.contact : "----"}
                    </span>

                    <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      {restaurant.cuisine ? restaurant.cuisine : "--"}
                    </span>
                    <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {restaurant.menuitem ? restaurant.menuitem : "--"}
                    </span>
                    <div className="flex justify-center ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      <button
                        className="px-3 py-2 text-white bg-blue-400 rounded-md hover:bg-cyan-400 "
                        onClick={() => navigatehandler(restaurant?._id)}
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex justify-center gap-4">
                      <button
                        className="px-3 w-fit text-sm py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700"
                        onClick={() => updateRestaurant(restaurant)}
                      >
                        <MdEditDocument className="w-4 h-5" />
                      </button>
                      <button
                        className="px-3 w-fit text-sm py-2 text-white rounded-md bg-[#FE5722] hover:bg-rose-700"
                        onClick={() => deletRestaurant(restaurant._id)}
                      >
                        <MdDelete className="w-4 h-4" />
                      </button>
                    </div>
                  </section>
                ))
              )}
            </div>
          </section>
          <Pagination
            currentPage={currentPage}
            handleClick={handleClick}
            tabletotalPages={pagination?.totalPages ?? 0}
            totalItems={pagination?.totalItems ?? 0}
          />
        </section>
      </section>
    </>
  );
};

export default Restaurants;
