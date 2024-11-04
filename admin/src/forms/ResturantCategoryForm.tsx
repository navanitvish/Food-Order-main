import React, { useState } from "react";

import { TiArrowBackOutline } from "react-icons/ti";

import { useMutation } from "@tanstack/react-query";
import { ApiError, ApiResponse } from "../types/apiType";
import { apiRequest } from "../api/userApi";
import { toast } from "react-toastify";

import uploadImage from "../components/firebase_image/image";
import {
  CategoryFormState,
  CategoryPostResponseDataType,
  CategorySendingPostType,
  FormCategoryStateType,
  MutationObjectCategoryType,
} from "../types/contentType";
import { getImageNameFromURL } from "../utils/getNameofImage";

// Define the types for the props
interface CreatCategoryProps {
  isCategoryForm: CategoryFormState;
  setCategoryForm: React.Dispatch<React.SetStateAction<CategoryFormState>>;
  refetch: () => void;
}

const ResturantCategoryForm: React.FC<CreatCategoryProps> = ({
  isCategoryForm,
  setCategoryForm,
  refetch,
}) => {
  console.log(isCategoryForm.updateData);

  const [categoryDataForm, setCategoryDataForm] =
    useState<FormCategoryStateType>({
      categoryName: isCategoryForm.updateData
        ? isCategoryForm.updateData?.name
        : "",
      image: isCategoryForm.updateData ? isCategoryForm.updateData?.image : "",
      imageSrc: isCategoryForm.updateData?.image
        ? getImageNameFromURL(isCategoryForm?.updateData?.image)
        : "",
      // error: "",
    });
  const [progressStatus, setProgressStatus] = useState<number | null>(null);

  const isUpdate = Object.keys(isCategoryForm.updateData ?? []).length !== 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let checked: boolean | undefined;

    if (e.target instanceof HTMLInputElement) {
      checked = e.target.checked;
    }
    setCategoryDataForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // const selectedFile = event.target.files[0];

    const selectedFile = event.target?.files?.[0];
    const folderName = event?.target?.files?.[0].name ?? "";

    if (selectedFile) {
      const imageUrl = await uploadImage(
        folderName,
        selectedFile,
        setProgressStatus
      );

      console.log(imageUrl, selectedFile, "<<frommodal?>>");
      setCategoryDataForm((prev) => ({
        ...prev,
        image: imageUrl,
        imageSrc: folderName,
      }));
    }
  };

  const mutation = useMutation<
    ApiResponse<CategoryPostResponseDataType>,
    ApiError,
    MutationObjectCategoryType
  >({
    mutationFn: async ({ path, condition, data }) => {
      toast.loading("Checking Details");
      try {
        // console.log(path, method);
        const response = await apiRequest<
          CategorySendingPostType,
          CategoryPostResponseDataType
        >({
          url: path,
          method: condition === "creat" ? "post" : "put",
          data: data,
        });

        // return { data: response.data };
        return response;
      } catch (error) {
        console.log(error);
        const apiError: ApiError = {
          message: (error as ApiError)?.message || "An error occurred",
          status: (error as ApiError)?.status || 500,
        };
        throw apiError;
      }
    },
    // onSuccess: (data: ApiResponse<DeletCategoryData>) => {
    onSuccess: (data) => {
      console.log(data);
      refetch();
      toast.dismiss();
      closeHandler();
      toast.success(`${isUpdate ? "Update Successfull" : "Creat Successfull"}`);

      setCategoryDataForm((prev) => ({
        ...prev,
        categoryName: "",
        image: "",
        imageSrc: "",
      }));
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
      toast.error(`${error.message}`);
    },
  });

  const submiteHandler = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(categoryDataForm);

    const categaryData: CategorySendingPostType = {
      name: categoryDataForm.categoryName,
      image: categoryDataForm.image,
    };

    if (categoryDataForm.categoryName !== "") {
      if (isCategoryForm.creat) {
        console.log("now creat");
        mutation.mutate({
          path: "/restcategory",
          condition: "creat",
          data: categaryData,
        });
      }

      if (isCategoryForm.updateId) {
        console.log("update Id");
        mutation.mutate({
          path: `/restcategory/${isCategoryForm.updateId}`,
          condition: "update",
          data: categaryData,
        });
      }
    }
  };

  const closeHandler = () => {
    if (isCategoryForm.creat) {
      setCategoryForm((prev) => ({
        ...prev,
        creat: !prev.creat,
      }));
    } else {
      setCategoryForm((prev) => ({
        ...prev,
        updateId: "",
      }));
    }
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center px-4 sm:px-0 bg-black/40"
      onClick={closeHandler}
    >
      <div
        className="bg-white rounded-md w-[500px]"
        onClick={(e) => e.stopPropagation()}
      >
        <form className="" onSubmit={submiteHandler}>
          {/* left section */}
          <div className="p-6 px-8 rounded font-montserrat">
            <div className="flex pb-2">
              <h2 className=" md:text-4xl text-[28px] font-bold text-gray-700">
                Rest_Category Form
              </h2>
              <button onClick={closeHandler}>
                <TiArrowBackOutline className="w-10 h-10 ml-4 hover:text-orange-600 text-sky-600" />
              </button>
            </div>
            <div className="grid items-center h-full gap-4 py-4 ">
              <input
                value={categoryDataForm?.categoryName}
                type="text"
                onChange={handleChange}
                name="categoryName"
                className={
                  " font-medium outline-none w-full  border h-10 border-gray-400 rounded-md pl-4 focus-within:border-blue-400  "
                }
                placeholder={"Category Name"}
                required
              />

              <div className="relative w-full h-full">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className={`px-4 py-2 pl-24 relative ${
                    progressStatus ? "pb-2" : ""
                  } w-full text-base bg-transparent focus:border-[#DEE1E2] border-gray-400 border rounded-md  cursor-pointer flex items-center justify-between`}
                >
                  {categoryDataForm.imageSrc || "Choose a file"}
                  <span className="text-gray-600 text-[15px] absolute top-0 h-full flex items-center left-0 rounded-tl-md rounded-bl-md px-3 border-r border-gray-400 font-medium bg-gray-50">
                    Browse
                  </span>
                </label>
                {progressStatus !== null && progressStatus !== 0 && (
                  <>
                    <div className="absolute inset-0 z-10 flex items-end">
                      <div
                        className="h-1 bg-blue-400 rounded-md mx-[1px] mb-[1px]"
                        style={{ width: `${progressStatus}%` }}
                        // style={{ width: `${100}%` }}
                      ></div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex ">
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded disabled:cursor-not-allowed hover:bg-blue-400 disabled:bg-gray-500"
                type="submit"
                disabled={
                  !categoryDataForm.image || !categoryDataForm.categoryName
                }
              >
                {/* Save Changes */}
                Submite
              </button>
              <button
                className="px-4 py-2 ml-8 text-white bg-red-500 rounded hover:bg-red-400"
                onClick={closeHandler}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResturantCategoryForm;
