import { useState } from "react";
import { lisReviewHeading } from "../components/content_data/content_data";
import {
  ApiPaginationValues,
  DeletElementData,
  DeleteStateType,
  ReviewData,
  UniDelet,
} from "../types/contentType";
import { ApiError, ApiGetResponse, ApiResponse } from "../types/apiType";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "../api/userApi";
import { toast } from "react-toastify";
import Pagination from "../components/pagination/Pagination";
import ConfirmDeleteModal from "../components/modal/ConfirmDeleteModal";
import { apiGetRequest } from "../api/adminGetApi";
import { MdDelete } from "react-icons/md";

export interface ReviewDataType {
  data: ReviewData[];
  pagination: ApiPaginationValues;
}

const Review = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDeletModal, setDeletModal] = useState<DeleteStateType>({
    delet: false,
    deletElementId: "",
  });

  const { isPending, isError, data, error, refetch } = useQuery<
    ApiGetResponse<ReviewDataType>,
    ApiError
  >({
    queryKey: [`reviews/${currentPage}`],
    queryFn: async () => {
      return await apiGetRequest<ReviewDataType>({
        url: `/review/get/pag?page=${currentPage}&limit=5`,
      });
    },
  });

  const mutation = useMutation<
    ApiResponse<DeletElementData>,
    ApiError,
    UniDelet
  >({
    mutationFn: async (deletObj) => {
      console.log("Data response review Data>>>", deletObj);
      toast.loading("Checking Details");
      try {
        // console.log(path, method);
        const response = await apiRequest<UniDelet, DeletElementData>({
          url: deletObj.path,
          method: "delete",
        });

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
      refetch();
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

  const deletMenue = (id: string) => {
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
      path: `/review/${isDeletModal?.deletElementId}`,
    };
    mutation.mutate(deleteObj);
  };

  const reviewData = data?.data?.data ?? [];
  const currentReview = Array.isArray(reviewData) ? reviewData : [];
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
            <h1 className=" text-[28px] font-bold md:text-4xl ">Reviews</h1>
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
            <section className="grid grid-cols-customReview pb-2 p-2  gap-4  border-gray-100 min-w-[1200px] font-medium md:font-semibold bg-sky-100">
              <p className="pl-2 text-gray-600 md:text-lg">SrNo.</p>

              {lisReviewHeading?.map((heading, index) => (
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
            <div className=" h-[370px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[1200px] ">
              {isPending ? (
                <p>Loading...</p>
              ) : isError ? (
                <p>{error.message}</p>
              ) : (
                currentReview?.map((item, i) => (
                  <section
                    key={i}
                    className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 border-gray-200 grid-cols-customReview group hover:bg-gray-50"
                  >
                    <span>{i + 1}</span>

                    <span
                      className={` text-xs font-bold  text-center rounded-full                     }`}
                    >
                      {item?.userId?.name}
                    </span>

                    <div className="flex items-center justify-center">
                      {item?.menuId?.image ? (
                        <img
                          src={item?.menuId?.image}
                          alt="user Image"
                          className="w-24 h-16 rounded-lg"
                        />
                      ) : (
                        <span className="text-sm font-bold text-gray-400">
                          No Image
                        </span>
                      )}
                    </div>
                    <span
                      className={` text-sm font-semibold text-center  rounded-full p-2  `}
                    >
                      {item?.userId?.email}
                    </span>
                    <span className="text-sm font-semibold text-gray-600 md:text-base">
                      {item?.menuId?.name}
                    </span>

                    <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 ">
                      {item?.comment}
                    </span>
                    <span className="flex justify-center ml-2 text-sm font-semibold text-gray-600 ">
                      {item?.star}
                    </span>

                    <div className="grid justify-center gap-2">
                      <button
                        className="px-2 w-fit text-sm py-2 text-white rounded-md bg-[#FE5722] hover:bg-rose-700"
                        onClick={() => deletMenue(item?._id)}
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

export default Review;
