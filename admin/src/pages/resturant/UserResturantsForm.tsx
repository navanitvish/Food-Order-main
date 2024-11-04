import React, { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiRequest } from "../../api/userApi";
import { ApiError, ApiGetResponse, ApiResponse } from "../../types/apiType";

import {
  MutationObjectResturantType,
  Restaurant,
  RestaurantResponseSingleData,
  ResturantPostResponseType,
  ResturantSendingPostType,
} from "../../types/contentType";
import { apiGetRequest } from "../../api/adminGetApi";
import uploadImage from "../../components/firebase_image/image";
import { useResturantCategories, useUserDetails } from "../../api/query";
import { BiSolidMapPin } from "react-icons/bi";
import MapModel from "../../components/modal/MapModal";
import MultiImageUploader from "../../components/MultiImageUploader";

export interface DropDown {
  [key: string]: boolean;
}

const UserRestaurantForm: React.FC = () => {
  const { id } = useParams();
  const [isMap, setMap] = useState(false);
  // const [resturantAddres, setAddress] = useState({
  //   address: "",
  //   location: [0, 0],
  // });
  const { data, isSuccess } = useQuery<
    ApiGetResponse<RestaurantResponseSingleData>,
    ApiError
  >({
    queryKey: [`restaurantowneruser/${id}`],
    queryFn: async () => {
      return await apiGetRequest<RestaurantResponseSingleData>({
        url: `restaurantowneruser/get/rest/${id}`,
      });
    },
  });

  const restaurantUpdateData = data?.data?.data;

  console.log(restaurantUpdateData, "update");

  const [restaurantData, setRestaurantData] = useState<Restaurant>({
    name: "",
    address: "",
    rating: 0,
    openingHours: "",
    contact: 0,
    cuisineType: "",
    menuItems: 0,
    description: "",
    owner: "",
    image: "",
    closingTime: "",
    openingTime: "",
    recomended: false,
    selfPickup: false,
    multiImage: [],
    resturantCategory: {
      name: "",
      id: "",
    },
    location: {
      type: "Point",
      coordinates: [19.24316, 73.12256], //  latitude, longitude
    },
    type: "",
  });

  const [isCheck, setChecked] = useState(false);

  const [progressStatus, setProgressStatus] = useState<number | null>(null);

  const [isOpen, setOpen] = useState<DropDown>({
    cuisineType: false,
    owner: false,
    category: false,
  });

  const isUpdate = Object.keys(restaurantUpdateData || [])?.length !== 0;

  const navigate = useNavigate();

  const mutation = useMutation<
    ApiResponse<ResturantPostResponseType>,
    ApiError,
    MutationObjectResturantType
  >({
    mutationFn: async ({ path, condition, data }) => {
      toast.loading("Checking Details");
      try {
        const response = await apiRequest<
          ResturantSendingPostType,
          ResturantPostResponseType
        >({
          url: path,
          method: condition === "creat" ? "post" : "put",
          data: data,
        });

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

    onSuccess: (data) => {
      console.log(data);
      toast.dismiss();
      toast.success(`${isUpdate ? "Update Successfull" : "Creat Successfull"}`);
      clearhandler();
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
      toast.error(`${error.message}`);
    },
  });

  useEffect(() => {
    if (isUpdate && isSuccess) {
      console.log("Fetched data:", data?.data?.data);
      setRestaurantData((prevData) => ({
        ...prevData,
        name: data?.data?.data?.name || "",
        address: data?.data?.data?.address || "",
        rating: data?.data?.data?.rating || 0,
        openingHours: data?.data?.data?.openinghour || "",
        contact: data?.data?.data?.contact || 0,
        cuisineType: data?.data?.data?.cuisine || "",
        menuItems: data?.data?.data?.menuitem || 0,
        description: data?.data?.data?.description || "",
        owner: data?.data?.data?.owner || "",
        image:
          data?.data?.data?.type === "restaurant"
            ? data?.data?.data?.image[0]
            : "",
        recomended: data?.data?.data?.recomended || false,
        selfPickup: data?.data?.data?.selfPickup || false,
        openingTime: data?.data?.data?.openingTime || "",
        closingTime: data?.data?.data?.closingTime || "",
        resturantCategory: {
          name: data?.data?.data?.resturantCategory?.name || "",
          id: data?.data?.data?.resturantCategory?._id || "",
        },
        multiImage:
          data?.data?.data?.type === "other"
            ? [...(data?.data?.data?.image ?? [])]
            : [],
        location: data?.data?.data?.location
          ? {
              type: "Point",
              coordinates: [
                data?.data?.data?.location.coordinates[1],
                data?.data?.data?.location.coordinates[0],
              ], //  latitude, longitude
            }
          : {
              type: "Point",
              coordinates: [19.24316, 73.12256], //  latitude, longitude
            },
        type: data?.data?.data?.type || "",
      }));
    }
  }, [isUpdate, data, isSuccess]);

  console.log(restaurantData, isUpdate, isSuccess);

  const cuisineTypes = ["Italian", "Chinese", "Mexican", "Indian", "American"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRestaurantData((prev) => ({
      ...prev,
      [name]: name === "rating" || name === "menuItems" ? Number(value) : value,
    }));
  };

  const { data: ownerData } = useUserDetails();

  const userDataByApi = ownerData?.data?.data;

  console.log(userDataByApi, "user data");

  const {
    isError: categoryIsError,
    data: category,
    error: categoryReturnError,
  } = useResturantCategories();

  const categories = category?.data?.data;

  const selectOption = (
    field: string,
    value: string | { name: string; id: string }
  ) => {
    setRestaurantData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setOpen((prev) => ({
      ...prev,
      [field]: false,
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
      setRestaurantData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    }
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(restaurantData); // Handle form submission

    const restaurantPostObject: ResturantSendingPostType = {
      name: restaurantData.name,
      address: restaurantData.address,
      location: {
        type: "Point",
        coordinates: [
          restaurantData.location.coordinates[1],
          restaurantData.location.coordinates[0],
        ],
      },
      type: restaurantData.type.toLowerCase(),
      rating: restaurantData.rating,
      openinghour: restaurantData.openingHours,
      contact: restaurantData.contact,
      cuisine: restaurantData.cuisineType,
      menuitem: restaurantData.menuItems,
      description: restaurantData.description,
      owner: userDataByApi?._id ?? "",
      image:
        restaurantData.type.toLowerCase() === "other"
          ? [...restaurantData.multiImage]
          : [restaurantData.image],
      recomended: restaurantData.recomended,
      selfPickup: restaurantData.selfPickup,
      openingTime: restaurantData.openingTime,
      closingTime: restaurantData.closingTime,
      resturantCategory: restaurantData.resturantCategory.id,
    };

    console.log(restaurantPostObject, isUpdate);

    if (!isUpdate) {
      console.log("now creat");
      mutation.mutate({
        path: "restaurantowneruser/create/rest",
        condition: "creat",
        data: restaurantPostObject,
      });
    } else {
      console.log("update Id");
      mutation.mutate({
        path: `restaurantowneruser/update/rest/${restaurantUpdateData?._id}`,
        condition: "update",
        data: restaurantPostObject,
      });
    }
  };

  const clearhandler = () => {
    setRestaurantData({
      name: "",
      address: "",
      location: {
        type: "Point",
        coordinates: [19.24316, 73.12256], //latitude, longitude ,
      },
      type: "",
      rating: 0,
      openingHours: "",
      contact: 0,
      cuisineType: "",
      menuItems: 0,
      description: "",
      owner: "",
      image: "",
      multiImage: [],
      closingTime: "",
      openingTime: "",
      recomended: false,
      selfPickup: false,
      resturantCategory: {
        name: "",
        id: "",
      },
    });

    navigate("/restaurants_owner");
  };

  const maphandler = () => {
    setMap((prev: boolean) => !prev);
  };

  const handlingData = (imageData: string[]) => {
    setRestaurantData((prev) => ({
      ...prev,
      multiImage: [...imageData],
    }));
  };

  return (
    <>
      {isMap && (
        <MapModel
          datahandler={setRestaurantData}
          updatevalue={restaurantData}
          closeModal={maphandler}
        />
      )}

      <div className="px-4 pt-4 md:pl-0">
        <form
          className="w-full h-[calc(100vh-6rem)] bg-white rounded-md"
          onSubmit={submitHandler}
        >
          <div className="flex-1 p-6 rounded font-montserrat">
            <div className="flex pb-2">
              <h2 className="md:text-4xl text-[28px] font-bold text-gray-700">
                Restaurant Form
              </h2>
              <Link to={`/restaurants`} onClick={clearhandler}>
                <TiArrowBackOutline className="w-10 h-10 ml-4 hover:text-orange-600 text-sky-600" />
              </Link>
            </div>
            <div className="h-[calc(100vh-12rem)] overflow-y-auto pr-4 md:pr-0">
              <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
                <input
                  value={restaurantData.name}
                  type="text"
                  onChange={handleChange}
                  name="name"
                  className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                  placeholder="Restaurant Name"
                  required
                />
                <input
                  value={restaurantData.address}
                  type="text"
                  onChange={handleChange}
                  name="address"
                  className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                  placeholder="Address: Street City State Postal-Code"
                  required
                />

                <input
                  value={restaurantData.rating || ""}
                  type="number"
                  onChange={handleChange}
                  name="rating"
                  className="w-full h-10 pl-4 pr-2 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                  placeholder="Rating"
                  required
                />
                <input
                  value={restaurantData.openingHours}
                  type="text"
                  onChange={handleChange}
                  name="openingHours"
                  className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                  placeholder="Opening Hours like 9am to 5pm"
                  required
                />
                <input
                  value={restaurantData.contact || ""}
                  type="number"
                  onChange={handleChange}
                  name="contact"
                  className="w-full h-10 pl-4 pr-2 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                  placeholder="Contact"
                  required
                />
                <input
                  value={restaurantData.menuItems || ""}
                  type="number"
                  onChange={handleChange}
                  name="menuItems"
                  className="w-full h-10 pl-4 pr-2 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                  placeholder="Menu Items"
                  required
                />

                {/* Cuisine Type Dropdown */}
                <div className="relative">
                  <div
                    className="flex justify-between p-2 text-sm border border-gray-400 rounded-md cursor-pointer"
                    onClick={() =>
                      setOpen({ ...isOpen, cuisineType: !isOpen.cuisineType })
                    }
                  >
                    {restaurantData.cuisineType !== ""
                      ? restaurantData.cuisineType
                      : "Select Cuisine Type"}
                    <FaCaretDown className="m-1" />
                  </div>
                  <ul
                    className={`mt-2 p-2 rounded-md w-48 bg-gray-600 shadow-lg overflow-y-auto absolute z-10 ${
                      isOpen.cuisineType ? "max-h-40" : "hidden"
                    } custom-scrollbar`}
                  >
                    {cuisineTypes.map((cuisine, i) => (
                      <li
                        key={i}
                        className={`p-2 mb-2 text-sm text-white rounded-md cursor-pointer hover:bg-blue-200/60 ${
                          restaurantData.cuisineType === cuisine
                            ? "bg-rose-600"
                            : ""
                        }`}
                        onClick={() => selectOption("cuisineType", cuisine)}
                      >
                        <span>{cuisine}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Category Dropdown */}
                <div className="relative">
                  <div
                    className="flex justify-between p-2 text-sm border border-gray-400 rounded-md cursor-pointer"
                    onClick={() =>
                      setOpen({ ...isOpen, category: !isOpen.category })
                    }
                  >
                    {restaurantData.resturantCategory.name !== ""
                      ? restaurantData.resturantCategory.name
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
                            restaurantData.resturantCategory.name ===
                            category?.name
                              ? "bg-rose-600"
                              : ""
                          }`}
                          onClick={() =>
                            selectOption("category", {
                              name: category?.name,
                              id: category?._id,
                            })
                          }
                        >
                          <span>{category?.name}</span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>

                <div className="relative w-full h-full">
                  <label
                    htmlFor="openingTime"
                    className="text-sm font-medium text-gray-700 "
                  >
                    Opening Time
                  </label>
                  <input
                    value={restaurantData.openingTime || ""}
                    type="time"
                    onChange={handleChange}
                    name="openingTime"
                    className="w-full h-10 pl-4 pr-2 mt-2 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                    placeholder=""
                    required
                  />
                </div>
                <div className="relative w-full h-full">
                  <label
                    htmlFor="closingTime"
                    className="text-sm font-medium text-gray-700 "
                  >
                    Closing Time
                  </label>
                  <input
                    value={restaurantData.closingTime || ""}
                    type="time"
                    onChange={handleChange}
                    name="closingTime"
                    className="w-full h-10 pl-4 pr-2 mt-2 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                    placeholder=""
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="use-url"
                    name="useImageUrl"
                    onChange={(e) => setChecked(e.target.checked)} // Toggle between file upload and URL input
                  />
                  <label htmlFor="use-url" className="ml-2 text-gray-700">
                    For Image URL
                  </label>
                </div>

                {/* type */}
                <div className="relative">
                  <div
                    className="flex justify-between p-2 text-sm border border-gray-400 rounded-md cursor-pointer"
                    onClick={() => setOpen({ ...isOpen, type: !isOpen.type })}
                  >
                    {restaurantData.type !== ""
                      ? restaurantData.type
                      : "Select Type"}
                    <FaCaretDown className="m-1" />
                  </div>
                  <ul
                    className={`mt-2 p-2 rounded-md w-48 bg-gray-600 shadow-lg overflow-y-auto absolute z-10 ${
                      isOpen.type ? "max-h-40" : "hidden"
                    } custom-scrollbar`}
                  >
                    {["Restaurant", "Other"].map((type, i) => (
                      <li
                        key={i}
                        className={`p-2 mb-2 text-sm text-white rounded-md cursor-pointer hover:bg-blue-200/60 ${
                          restaurantData.type === type ? "bg-rose-600" : ""
                        }`}
                        onClick={() => selectOption("type", type)}
                      >
                        <span>{type}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {restaurantData.type === "Other" && (
                  <div className="col-span-2">
                    <MultiImageUploader
                      handlingMultiple={(imageurls: string[]) =>
                        handlingData(imageurls)
                      }
                    />
                  </div>
                )}
                {restaurantData.type === "Restaurant" &&
                  (!isCheck ? (
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
                        {restaurantData?.image.slice(
                          restaurantData?.image.lastIndexOf("/") + 1,
                          restaurantData?.image.indexOf("%2")
                        ) || "Choose a file"}
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
                  ) : (
                    <input
                      type="text"
                      name="image"
                      value={restaurantData.image || ""}
                      onChange={handleChange}
                      className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                      placeholder="Enter Image URL"
                      required
                    />
                  ))}

                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600">
                    Select Address From map
                  </p>

                  <BiSolidMapPin
                    onClick={maphandler}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>

                <textarea
                  value={restaurantData.description || ""}
                  onChange={handleChange}
                  name="description"
                  className="w-full h-24 py-4 pl-4 font-medium border border-gray-400 rounded-md outline-none md:col-span-2 focus-within:border-blue-400"
                  placeholder="Description"
                  required
                />

                <div className="flex items-center pl-1">
                  <input
                    type="checkbox"
                    name="selfPickup"
                    checked={restaurantData.selfPickup}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="selfPickup"
                    className="pl-4 text-sm text-gray-700"
                  >
                    Self Pickup
                  </label>
                </div>
              </div>

              <div className="flex">
                <button
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-400"
                  type="submit"
                  disabled={
                    !restaurantData.name ||
                    !restaurantData.address ||
                    !restaurantData.cuisineType ||
                    !restaurantData.contact ||
                    !restaurantData.description ||
                    !restaurantData.image ||
                    !restaurantData.menuItems ||
                    !restaurantData.openingTime ||
                    !restaurantData.closingTime ||
                    !restaurantData.rating ||
                    !userDataByApi?._id
                  }
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
    </>
  );
};

export default UserRestaurantForm;
