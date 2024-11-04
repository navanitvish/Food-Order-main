import { useState } from "react";

import { IoIosSend } from "react-icons/io";
import CreatCategory from "../forms/CreatCategory";

import { ApiError, ApiResponse } from "../types/apiType";
import { apiRequest } from "../api/userApi";
import { useMutation } from "@tanstack/react-query";
import {
  CategoryData,
  CategoryFormState,
  DeletElementData,
  DeleteStateType,
  UniDelet,
} from "../types/contentType";

import { toast } from "react-toastify";
import Pagination from "../components/pagination/Pagination";
import ConfirmDeleteModal from "../components/modal/ConfirmDeleteModal";
import { MdDelete, MdEditDocument } from "react-icons/md";
import { useNavigate } from "react-router";
import { useCategoriesPagination } from "../api/query";

const Category = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [isDeletModal, setDeletModal] = useState<DeleteStateType>({
    delet: false,
    deletElementId: "",
  });

  const [isCategoryForm, setCategoryForm] = useState<CategoryFormState>({
    creat: false,
    updateId: "",
    updateData: null,
  });

  const navigate = useNavigate();

  const categoryHeading = ["Category Name", "Setting"];

  const handlingCategory = () => {
    setCategoryForm((prev) => ({
      ...prev,
      creat: !prev.creat,
    }));
  };

  const { isPending, isError, data, error, refetch } = useCategoriesPagination(
    currentPage,
    10
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

  const deletCategory = (id: string) => {
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
      path: `/categories/${isDeletModal?.deletElementId}`,
    };

    // Proceed with the deletion
    mutation.mutate(deleteObj);
  };

  const updateCategory = (category: CategoryData) => {
    setCategoryForm((prev) => ({
      ...prev,
      updateId: category._id,
      updateData: category,
    }));
  };

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const currentCategory = data?.data?.data;

  const pagination = data?.data?.pagination;

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const navigatehandler = (id: string) => {
    navigate(`/category/${id}`);
  };

  return (
    <>
      {(isCategoryForm.creat || isCategoryForm.updateId) && (
        <CreatCategory
          // singleCategory={updateData}
          isCategoryForm={isCategoryForm}
          setCategoryForm={setCategoryForm}
          refetch={refetch}
        />
      )}
      {isDeletModal?.delet && (
        <ConfirmDeleteModal onClose={closehandler} onConfirm={confirmhandler} />
      )}
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
            <h1 className=" text-[28px] font-bold md:text-4xl ">Category</h1>
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
                onClick={handlingCategory}
              >
                <span className="hidden md:inline-block">Creat Category</span>

                <IoIosSend className="w-6 h-6 md:hidden" />
              </button>
            </div>
          </div>
          <section
            className={`w-full overflow-auto   border-2 [&::-webkit-scrollbar]:hidden rounded-lg  shadow-md bg-white`}
          >
            {/* min-w-[900px] */}
            <section className="grid gap-4 p-2 pb-2 min-w-[600px] font-medium border-gray-100 grid-cols-customeCategory md:font-semibold bg-sky-100">
              <p className="pl-2 text-gray-600 md:text-lg">SrNo.</p>
              {/* <p className="pl-10 text-gray-600 md:text-lg">Logo</p> */}

              {categoryHeading.map((heading, index) => (
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
            {/* min-w-[900px] */}
            <div className=" h-[370px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[600px] ">
              {isPending ? (
                <p>Data is fetching...</p>
              ) : (
                currentCategory?.map((category, i) => (
                  <section
                    key={i}
                    className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 border-gray-200 grid-cols-customeCategory group hover:bg-gray-50"
                  >
                    <span>{i + 1}</span>

                    <span
                      className="ml-2 text-sm font-semibold text-gray-600 cursor-pointer md:text-base hover:text-green-600"
                      onClick={() => navigatehandler(category._id)}
                    >
                      {category?.name}
                    </span>

                    <div className="flex justify-center gap-4">
                      <button
                        className="px-2 w-fit text-sm py-2 text-white bg-[#28a745] rounded-md hover:bg-green-700"
                        onClick={() => updateCategory(category)}
                      >
                        <MdEditDocument className="w-4 h-5" />
                      </button>
                      <button
                        className="px-2 w-fit text-sm py-2 text-white rounded-md bg-[#FE5722] hover:bg-rose-700"
                        onClick={() => deletCategory(category._id)}
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
export default Category;
