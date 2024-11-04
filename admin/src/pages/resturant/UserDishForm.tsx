import React, { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";
import { useNavigate, useParams } from "react-router-dom";
import {
  dietaryRestrictions,
  ingredientsOptions,
  labels,
} from "../../components/content_data/content_data";
import {
  DishPostResponseType,
  DishSendingPostType,
  DishUni,
  FormDishArrayFields,
  FormDishType,
  MutationObjectDishType,
} from "../../types/contentType";

import uploadImage from "../../components/firebase_image/image.js";
import { toast } from "react-toastify";

import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../api/userApi.js";
import { ApiError, ApiResponse } from "../../types/apiType.js";

import { MdDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import {
  useResturantOwnerCategory,
  useResturantOwnerDetails,
  useResturantOwnerMenuById,
} from "../../api/query.js";

const UserDishForm: React.FC = () => {
  //   const dishUpdateData = useAppSelector((state) => state.dish.dishData);

  const getImageNameFromURL = (url: string) => {
    const imageName = url?.substring(
      url?.lastIndexOf("/") + 1,
      url?.indexOf("%")
    );
    return imageName;
  };

  const param = useParams();

  const [dishData, setDishData] = useState<FormDishType>({
    description: "",
    imageSrc: "",
    image: "",
    ingredients: [],
    label: "",
    dietaryRestriction: "",
    name: "",
    price: 0,
    restaurant: {
      name: "",
      id: "",
    },
    category: {
      name: "",
      id: "",
    },
    available: false,
    specialOffer: false,
    recommended: false,
    specialOfferPrice: 0,
    additionalOption: [
      {
        name: "",
        price: 0,
      },
    ],
  });

  console.log(dishData, "from update");

  const [isOpen, setOpen] = useState({
    label: false,
    dietaryRestriction: false,
    ingredients: false,
    // restaurant: false,
    category: false,
  });

  const {
    // isError: categoryIsError,
    isSuccess,
    data: singleMenu,
    // error: categoryReturnError,
  } = useResturantOwnerMenuById(param.menuid ?? "");

  const dishUpdateData = singleMenu?.data?.data;

  const isUpdate = Object.keys(dishUpdateData ?? [])?.length !== 0;
  console.log(param, singleMenu, dishUpdateData, isUpdate ? "put" : "post");
  useEffect(() => {
    if (isUpdate && isSuccess) {
      setDishData((prev) => ({
        ...prev,
        description: singleMenu?.data?.data?.description || "",
        imageSrc:
          getImageNameFromURL(
            singleMenu?.data?.data?.image ? singleMenu?.data?.data?.image : ""
          ) || "",
        image: singleMenu?.data?.data?.image || "",
        ingredients: singleMenu?.data?.data?.ingredient?.split(",") || [],
        label: singleMenu?.data?.data?.label || "",
        dietaryRestriction: singleMenu?.data?.data?.dietry || "",
        name: singleMenu?.data?.data?.name || "",
        price: singleMenu?.data?.data?.price || 0,
        restaurant: {
          name: singleMenu?.data?.data?.restaurantId?.name || "",
          id: singleMenu?.data?.data?.restaurantId?._id || "",
        },
        category: {
          name: singleMenu?.data?.data?.category?.name || "",
          id: singleMenu?.data?.data?.category?._id || "",
        },
        available: singleMenu?.data?.data?.available || false,
        recommended: singleMenu?.data?.data?.recommended || false,
        specialOffer: singleMenu?.data?.data?.specialOffer || false,
        specialOfferPrice:
          +(singleMenu?.data?.data?.specialOfferPrice ?? 0) || 0,
        additionalOption:
          singleMenu?.data?.data?.additionalOption.length === 0
            ? [
                {
                  name: "",
                  price: 0,
                },
              ]
            : [...(singleMenu?.data?.data?.additionalOption ?? [])],
      }));
    }
  }, [isUpdate, singleMenu, isSuccess]);

  const mutation = useMutation<
    ApiResponse<DishPostResponseType>,
    ApiError,
    MutationObjectDishType
  >({
    mutationFn: async ({ path, condition, data }) => {
      toast.loading("Checking Details");
      try {
        // console.log(path, method);
        const response = await apiRequest<
          DishSendingPostType,
          DishPostResponseType
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

  const {
    isError: categoryIsError,
    data: category,
    error: categoryReturnError,
  } = useResturantOwnerCategory();
  const {
    // isError: resturantIsError,
    data: returant,
    // error: restaurantError,
  } = useResturantOwnerDetails(param?.id ?? "");

  const categories = category?.data?.data;
  const restaurants = returant?.data?.data;

  console.log(categories, restaurants, "details");

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

  console.log(
    dishData.specialOfferPrice,
    typeof dishData.specialOfferPrice,
    "from form"
  );

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

  const selectOption = (field: string, value: DishUni | string) => {
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

  const selectMultipleOption = (field: FormDishArrayFields, value: string) => {
    setDishData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item: string) => item !== value)
        : [...prev[field], value],
    }));
    setOpen((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const aditionOpt = dishData.additionalOption.map((item) => ({
      name: item.name,
      price: Number(item.price),
    }));

    const restId = restaurants?._id;

    const dishPostObject = {
      restaurantId: restId ?? "",
      name: dishData.name,
      image: dishData.image,
      description: dishData.description,
      price: Number(dishData.price),
      category: dishData.category.id,
      label: dishData.label,
      dietry: dishData.dietaryRestriction,
      ingredient: dishData.ingredients.join(","),
      available: dishData.available,
      specialOffer: dishData.specialOffer,
      recommended: dishData.recommended,
      specialOfferPrice: dishData.specialOffer
        ? +dishData.specialOfferPrice
        : +0,
      additionalOption: aditionOpt,
    };

    console.log(dishPostObject, dishData);

    if (!isUpdate) {
      console.log("now creat");
      mutation.mutate({
        path: "restaurantowneruser/create/menu",
        condition: "creat",
        data: dishPostObject,
      });
    } else {
      console.log("update Id");
      mutation.mutate({
        path: `restaurantowneruser/update/menu/${param.menuid}`,
        condition: "update",
        data: dishPostObject,
      });
    }
  };

  const clearhandler = () => {
    setDishData({
      description: "",
      imageSrc: "",
      image: "",
      ingredients: [],
      label: "",
      dietaryRestriction: "",
      name: "",
      price: 0,
      restaurant: {
        name: "",
        id: "",
      },
      category: {
        name: "",
        id: "",
      },
      available: false,
      specialOffer: false,
      recommended: false,
      specialOfferPrice: 0,
      additionalOption: [
        {
          name: "",
          price: 0,
        },
      ],
    });

    navigate(`/restaurants_owner/${param.id}`);
  };

  const addnewField = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDishData((prev) => ({
      ...prev,
      additionalOption: [...prev.additionalOption, { name: "", price: 0 }],
    }));
  };

  const removeField = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    setDishData((prev) => ({
      ...prev,
      additionalOption: prev.additionalOption.filter((_, i) => i !== index),
    }));
  };

  const handleOpetionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedOptions = [...dishData.additionalOption];
    updatedOptions[index] = { ...updatedOptions[index], [name]: value };
    setDishData((prev) => ({ ...prev, additionalOption: updatedOptions }));
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
              Dish Form
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
                placeholder="Dish Name"
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
                  {dishData?.imageSrc || "Choose a file"}
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

              <input
                value={dishData.price || ""}
                type="number"
                onChange={handleChange}
                name="price"
                className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                placeholder="Price"
                required
              />

              {/* Label Dropdown */}
              <div className="relative">
                <div
                  className="flex justify-between p-2 text-sm border border-gray-400 rounded-md cursor-pointer"
                  onClick={() => setOpen({ ...isOpen, label: !isOpen.label })}
                >
                  {dishData.label !== "" ? dishData.label : "Select Label"}
                  <FaCaretDown className="m-1" />
                </div>
                <ul
                  className={`mt-2 p-2 rounded-md w-28 bg-gray-600 shadow-lg absolute z-10 ${
                    isOpen.label ? "max-h-60" : "hidden"
                  } custom-scrollbar`}
                >
                  {labels.map((label, i) => (
                    <li
                      key={i}
                      className={`p-2 mb-2 text-sm text-white rounded-md cursor-pointer hover:bg-blue-200/60 ${
                        dishData.label === label ? "bg-rose-600" : ""
                      }`}
                      onClick={() => selectOption("label", label)}
                    >
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dietary Restriction Dropdown */}
              <div className="relative">
                <div
                  className="flex justify-between p-2 text-sm border border-gray-400 rounded-md cursor-pointer"
                  onClick={() =>
                    setOpen({
                      ...isOpen,
                      dietaryRestriction: !isOpen.dietaryRestriction,
                    })
                  }
                >
                  {dishData.dietaryRestriction !== ""
                    ? dishData.dietaryRestriction
                    : "Select Dietary Restriction"}
                  <FaCaretDown className="m-1" />
                </div>
                <ul
                  className={`mt-2 p-2 rounded-md w-36 bg-gray-600 shadow-lg absolute z-10 ${
                    isOpen.dietaryRestriction ? "max-h-40" : "hidden"
                  } custom-scrollbar`}
                >
                  {dietaryRestrictions.map((restriction, i) => (
                    <li
                      key={i}
                      className={`p-2 mb-2 text-sm text-white rounded-md cursor-pointer hover:bg-blue-200/60 ${
                        dishData.dietaryRestriction === restriction
                          ? "bg-rose-600"
                          : ""
                      }`}
                      onClick={() =>
                        selectOption("dietaryRestriction", restriction)
                      }
                    >
                      <span>{restriction}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ingredients Dropdown */}
              <div className="relative">
                <div
                  className="flex justify-between p-2 text-sm border border-gray-400 rounded-md cursor-pointer"
                  onClick={() =>
                    setOpen({ ...isOpen, ingredients: !isOpen.ingredients })
                  }
                >
                  {dishData.ingredients.length > 0
                    ? dishData.ingredients.join(", ")
                    : "Select Ingredients"}
                  <FaCaretDown className="m-1" />
                </div>
                <ul
                  className={`mt-2 p-2 rounded-md w-36 overflow-y-scroll bg-gray-600 shadow-lg absolute z-10 ${
                    isOpen.ingredients ? "max-h-40" : "hidden"
                  } custom-scrollbar`}
                >
                  {ingredientsOptions.map((ingredient, i) => (
                    <li
                      key={i}
                      className={`p-2 mb-2 text-sm text-white rounded-md cursor-pointer hover:bg-blue-200/60 ${
                        dishData.ingredients.includes(ingredient)
                          ? "bg-rose-600"
                          : ""
                      }`}
                      onClick={() =>
                        selectMultipleOption("ingredients", ingredient)
                      }
                    >
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Restaurant Dropdown */}
              {/* <div className="relative">
                <div
                  className="flex justify-between p-2 text-sm border border-gray-400 rounded-md cursor-pointer"
                  onClick={() =>
                    setOpen({
                      ...isOpen,
                      restaurant: !isOpen.restaurant,
                    })
                  }
                >
                  {dishData.restaurant.name !== ""
                    ? dishData.restaurant.name
                    : "Select Restaurant"}
                  <FaCaretDown className="m-1" />
                </div>
                <ul
                  className={`mt-2 p-2 rounded-md w-48 overflow-y-scroll bg-gray-600 shadow-lg absolute z-10 ${
                    isOpen.restaurant ? "max-h-40" : "hidden"
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
                          dishData.restaurant.name === restaurant?.name
                            ? "bg-rose-600"
                            : ""
                        }`}
                        onClick={() =>
                          selectOption("restaurant", {
                            name: restaurant.name,
                            id: restaurant._id,
                          })
                        }
                      >
                        <span>{restaurant?.name}</span>
                      </li>
                    ))
                  )}
                </ul>
              </div> */}

              {/* Category Dropdown */}
              <div className="relative">
                <div
                  className="flex justify-between p-2 text-sm border border-gray-400 rounded-md cursor-pointer"
                  onClick={() =>
                    setOpen({ ...isOpen, category: !isOpen.category })
                  }
                >
                  {dishData.category.name !== ""
                    ? dishData.category.name
                    : "Select Category"}
                  <FaCaretDown className="m-1" />
                </div>
                <ul
                  className={`mt-2 p-2 rounded-md w-48 overflow-y-scroll bg-gray-600 shadow-lg absolute z-10 ${
                    isOpen.category ? "max-h-40" : "hidden"
                  } custom-scrollbar`}
                >
                  {categoryIsError ? (
                    <p className="text-sm font-semibold text-rose-600">
                      {categoryReturnError.message}
                    </p>
                  ) : (
                    categories?.map((category, i) => (
                      <li
                        key={i}
                        className={`p-2 mb-2 text-sm text-white rounded-md cursor-pointer hover:bg-blue-200/60 ${
                          dishData.category.name === category?.name
                            ? "bg-rose-600"
                            : ""
                        }`}
                        onClick={() =>
                          selectOption("category", {
                            name: category.name,
                            id: category._id,
                          })
                        }
                      >
                        <span>{category?.name}</span>
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

              {dishData.additionalOption.map((option, index: number) => (
                <div className="grid gap-3 pl-1 md:col-span-2">
                  <div className="grid items-start gap-4 md:flex">
                    <input
                      type="text"
                      name={`name`}
                      placeholder="Enter Name"
                      className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                      value={option.name}
                      onChange={(e) => handleOpetionChange(e, index)}
                    />
                    <input
                      type="number"
                      name={`price`}
                      placeholder="Enter Price"
                      className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                      value={option.price || ""}
                      onChange={(e) => handleOpetionChange(e, index)}
                    />

                    <button
                      type="button"
                      className="px-1 py-1 text-white bg-orange-600 rounded cursor-pointer justify-self-start disabled:bg-black/60"
                      onClick={(e) => removeField(e, index)}
                      disabled={dishData.additionalOption.length === 1}
                    >
                      <MdDeleteOutline className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="flex items-center p-2 text-sm text-white bg-teal-600 rounded cursor-pointer justify-self-start"
                    onClick={addnewField}
                  >
                    <IoMdAdd className="w-4 h-4 mr-1" /> Add
                  </button>
                </div>
              ))}

              {dishData.specialOffer && (
                <input
                  value={dishData.specialOfferPrice || ""}
                  name={`specialOfferPrice`}
                  type="number"
                  placeholder="Enter Special Offer Price"
                  className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                  onChange={handleChange}
                />
              )}
              <div className="grid gap-2 md:col-span-2 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex items-center pl-1">
                  <input
                    type="checkbox"
                    name="available"
                    checked={dishData.available}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="available"
                    className="pl-4 text-sm text-gray-700"
                  >
                    Available Dish
                  </label>
                </div>
                <div className="flex items-center pl-1">
                  <input
                    type="checkbox"
                    name="specialOffer"
                    checked={dishData.specialOffer}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="specialOffer"
                    className="pl-4 text-sm text-gray-700"
                  >
                    Special Offer Dish
                  </label>
                </div>
              </div>
            </div>

            <div className="flex">
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-400"
                type="submit"
              >
                {isUpdate ? "Update" : "Submit"}
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

export default UserDishForm;
