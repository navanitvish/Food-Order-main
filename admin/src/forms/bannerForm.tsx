import React, { useState } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import {
  BannerPostResponseType,
  FormBanner,
  MutationObjectBannerType,
} from "../types/contentType";

import uploadImage from "../components/firebase_image/image.js";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../api/userApi.js";
import { ApiError, ApiResponse } from "../types/apiType.js";

import { clearDishData } from "../store/dish.js";
import { useAppSelector } from "../store/store.js";
import { useRestaurants } from "../api/query.js";
import { FaCaretDown } from "react-icons/fa";

const DishForm: React.FC = () => {
  const dishUpdateData = useAppSelector((state) => state.banner.bannerdata);
  console.log(dishUpdateData);
  const [dishData, setDishData] = useState<FormBanner>({
    description: dishUpdateData?.description || "",
    image: dishUpdateData?.image || "",
    name: dishUpdateData?.name || "",
    restaurantId: dishUpdateData?.restaurantId || "",
  });
  const isUpdate = Object.keys(dishUpdateData ?? [])?.length !== 0;
  const mutation = useMutation<
    ApiResponse<BannerPostResponseType>,
    ApiError,
    MutationObjectBannerType
  >({
    mutationFn: async ({ path, condition, data }) => {
      toast.loading("Checking Details");
      try {
        // console.log(path, method);
        const response = await apiRequest<FormBanner, BannerPostResponseType>({
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

    onSuccess: () => {
      toast.dismiss();
      clearhandler();
      toast.success(`${isUpdate ? "Update Successfull" : "Creat Successfull"}`);
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
      toast.error(`${error.message}`);
    },
  });

  const [progressStatus, setProgressStatus] = useState<number | null>(null);

  const [isOpen, setOpen] = useState({
    restaurantId: false,
  });

  const {
    isError: resturantIsError,
    data: returant,
    error: restaurantError,
  } = useRestaurants();

  const restaurants = returant?.data?.data;

  const selectOption = (field: string, value: string) => {
    console.log(value);
    setDishData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setOpen((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  //for text Data
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    let checked: boolean | undefined;

    if (e.target instanceof HTMLInputElement) {
      checked = e.target.checked;
    }
    setDishData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //for Image Data

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
      setDishData((prev) => ({
        ...prev,
        image: imageUrl,
        imageSrc: folderName,
      }));
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const dishPostObject = {
      name: dishData.name,
      image: dishData.image,
      description: dishData.description,
      restaurantId: dishData.restaurantId,
    };

    console.log(dishPostObject);

    if (!isUpdate) {
      console.log("now creat");
      mutation.mutate({
        path: "/banner",
        condition: "creat",
        data: dishPostObject,
      });
    } else {
      console.log("update Id>>>>", dishUpdateData, dishPostObject);
      mutation.mutate({
        path: `/banner/${dishUpdateData?._id}`,
        condition: "update",
        data: dishPostObject,
      });
    }
  };

  const clearhandler = () => {
    dispatch(clearDishData());
    setDishData({
      description: "",
      image: "",
      name: "",
      restaurantId: "",
    });

    navigate("/banner");
  };

  return (
    <div className="px-4 pt-4 md:pl-0">
      <form
        className="w-full h-[calc(100vh-6rem)] overflow-hidden bg-white rounded-md"
        onSubmit={submitHandler}
      >
        <div className="flex-1 h-full p-6 rounded font-montserrat">
          <div className="flex pb-2">
            <h2 className="md:text-4xl text-[28px] font-bold text-gray-700">
              Bannere
            </h2>
            <div onClick={clearhandler}>
              <TiArrowBackOutline className="w-10 h-10 ml-4 hover:text-orange-600 text-sky-600" />
            </div>
          </div>
          <div className="h-[calc(100vh-12rem)] overflow-y-auto pr-4 md:pr-0">
            <div className="grid items-center grid-cols-1 gap-4 py-4 md:grid-cols-2">
              <input
                value={dishData.name}
                type="text"
                onChange={handleChange}
                name="name"
                className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                placeholder="banner Name"
                required
              />

              <div className="relative w-full h-full">
                <input
                  type="file"
                  name="image"
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
                  {dishData?.image
                    ? dishData?.image.slice(
                        dishData?.image.indexOf("o/") + 2,
                        dishData?.image.indexOf("%2F")
                      )
                    : "Choose a file"}
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

              {/* Restaurant Dropdown */}
              <div className="relative">
                <div
                  className="flex justify-between p-2 text-sm border border-gray-400 rounded-md cursor-pointer"
                  onClick={() =>
                    setOpen({
                      ...isOpen,
                      restaurantId: !isOpen.restaurantId,
                    })
                  }
                >
                  {dishData?.restaurantId
                    ? restaurants?.find(
                        (restu) => restu?._id === dishData?.restaurantId
                      )?.name
                    : "Select Restaurant"}
                  <FaCaretDown className="m-1" />
                </div>
                <ul
                  className={`mt-2 p-2 rounded-md w-48 overflow-y-scroll bg-gray-600 shadow-lg absolute z-10 ${
                    isOpen.restaurantId ? "max-h-40" : "hidden"
                  } custom-scrollbar`}
                >
                  {resturantIsError ? (
                    <p className="text-sm font-semibold text-rose-600">
                      {restaurantError.message}
                    </p>
                  ) : (
                    restaurants?.map((restaurant, i) => (
                      <li
                        key={i}
                        className={`p-2 mb-2 text-sm text-white rounded-md cursor-pointer hover:bg-blue-200/60 ${
                          dishData.restaurantId === restaurant._id
                            ? "bg-rose-600"
                            : ""
                        }`}
                        onClick={() =>
                          selectOption("restaurantId", restaurant._id)
                        }
                      >
                        <span>{restaurant?.name}</span>
                      </li>
                    ))
                  )}
                </ul>
              </div>

              <textarea
                value={dishData.description}
                onChange={handleChange}
                name="description"
                className="w-full h-24 py-4 pl-4 font-medium border border-gray-400 rounded-md outline-none md:col-span-2 focus-within:border-blue-400"
                placeholder="Description"
                required
              />
            </div>

            <div className="flex">
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-400"
                type="submit"
              >
                Submit
              </button>
              <button
                className="px-4 py-2 ml-8 text-white bg-red-500 rounded hover:bg-red-400"
                type="button"
                onClick={clearhandler}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DishForm;
