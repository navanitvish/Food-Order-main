import { useState } from "react";

import { IoIosSend } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { couponheading } from "../components/content_data/content_data";
import {
  ApiPaginationValues,
  CouponGetType,
  DeletElementData,
  DeleteStateType,
  UniDelet,
} from "../types/contentType";
import { ApiError, ApiGetResponse, ApiResponse } from "../types/apiType";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../api/userApi";
import { toast } from "react-toastify";

import Pagination from "../components/pagination/Pagination";
import ConfirmDeleteModal from "../components/modal/ConfirmDeleteModal";
import { apiGetRequest } from "../api/adminGetApi";
import { MdDelete, MdEditDocument } from "react-icons/md";

export interface CouponeType {
  data: CouponGetType[];
  pagination: ApiPaginationValues;
}

const Coupon = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDeletModal, setDeletModal] = useState<DeleteStateType>({
    delet: false,
    deletElementId: "",
  });

  const { isPending, isError, data, error, refetch } = useQuery<
    ApiGetResponse<CouponeType>,
    ApiError
  >({
    queryKey: [`coupon/${currentPage}`],
    queryFn: async () => {
      return await apiGetRequest<CouponeType>({
        url: `/coupon/pag?page=${currentPage}&limit=${5}`,
      });
    },
  });

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

  const delethandler = (id: string) => {
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
      path: `/coupon/${isDeletModal?.deletElementId}`,
    };

    // Proceed with the deletion
    mutation.mutate(deleteObj);
  };

  const updatehandler = (id: string) => {
    navigate(`/coupons/form/${id}`);
  };

  const currentMenu = data?.data?.data;
  const pagination = data?.data?.pagination;

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {isDeletModal?.delet && (
        <ConfirmDeleteModal onClose={closehandler} onConfirm={confirmhandler} />
      )}
      <section
        className={`  md:pl-0 p-4 h-full rounded-md font-philosopher  mx-auto [&::-webkit-scrollbar]:hidden`}
      >
        <section
          className={` md:p-8 p-6 h-full  bg-white text-gray-600 border-gray-200 
    rounded-md  font-philosopher max-w-full w-full shadow-md`}
        >
          <div className="flex items-center mb-2 md:mb-6">
            <h1 className=" text-[28px] font-bold md:text-4xl">Coupons</h1>
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
            <div className="relative flex items-center self-end ">
              <button
                className={` px-2 py-1 
                   bg-blue-400  hover:bg-cyan-400 text-white
              }    rounded shadow-xl md:px-4 md:py-2  sm:self-center`}
              >
                <Link to={"/coupons/form"}>
                  <span className="hidden md:inline-block">Creat Coupon</span>

                  <IoIosSend className="w-6 h-6 md:hidden" />
                </Link>
              </button>
            </div>
          </div>
          <section
            className={`w-full overflow-auto   border-2 [&::-webkit-scrollbar]:hidden rounded-lg  shadow-md bg-white`}
          >
            <section className="grid grid-cols-customeCoupon pb-2 p-2  gap-4  border-gray-100 min-w-[600px] font-medium md:font-semibold bg-sky-100">
              <p className="pl-2 text-gray-600 md:text-lg">SrNo.</p>

              {couponheading.map((heading, index) => (
                <p
                  key={index}
                  className={`  text-gray-600 md:text-lg ${
                    index !== 0 && index !== 1 ? "justify-self-center" : "ml-10"
                  }`}
                >
                  {heading.charAt(0).toUpperCase() + heading.slice(1)}
                </p>
              ))}
            </section>
            <div className=" h-[370px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[600px] ">
              {isPending ? (
                <p>Loading...</p>
              ) : isError ? (
                <p>{error.message}</p>
              ) : (
                currentMenu?.map((coupon, i) => (
                  <section
                    key={i}
                    className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 border-gray-200 grid-cols-customeCoupon group hover:bg-gray-50"
                  >
                    <span>{i + 1}</span>

                    <span
                      className={` text-sm font-semibold ml-4 rounded-full  `}
                    >
                      {coupon?.couponcode}
                    </span>

                    <span className="ml-8 text-sm font-semibold text-gray-600 md:text-base">
                      {coupon?.percent} %
                    </span>

                    <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 ">
                      {coupon?.restaurantId?.name}
                    </span>

                    <div className="grid justify-center gap-2">
                      <button
                        className="px-2 w-fit text-sm py-2 text-white bg-[#28a745] rounded-md hover:bg-green-700"
                        onClick={() => updatehandler(coupon._id)}
                      >
                        <MdEditDocument className="w-4 h-5" />
                      </button>
                      <button
                        className="px-2 w-fit text-sm py-2 text-white rounded-md bg-[#FE5722] hover:bg-rose-700"
                        onClick={() => delethandler(coupon._id)}
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
            tabletotalPages={pagination?.totalPages ?? 0}
            totalItems={pagination?.totalItems ?? 0}
            handleClick={handleClick}
          />
        </section>
      </section>
    </>
  );
};

export default Coupon;
