import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";
import { useNavigate, useParams } from "react-router";
import { useCategories } from "../hooks/useCategories";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiError, ApiGetResponse, ApiResponse } from "../types/apiType";
import {
  CouponGetType,
  CouponPostDataType,
  MutationObjectCouponType,
  SinglCouponGetType,
} from "../types/contentType";
import { apiGetRequest } from "../api/adminGetApi";
import { toast } from "react-toastify";
import { apiRequest } from "../api/userApi";
import { useRestaurants } from "../api/query";
import uploadImage from "../components/firebase_image/image";

const CouponForm = () => {
  const [couponData, setRiderData] = useState({
    code: "",
    discount: 0,
    category: "",
    description: "",
    restaurantId: "",
    minOrderAmount: 0,
    maxDiscountAmount: 0,
    expiryDate: "",
    image: "",
    uptoCondition: false,
    upto: 0,
  });
  const [isOpen, setOpen] = useState({ category: false, restaurantId: false });
  const [progressStatus, setProgressStatus] = useState<number | null>(null);

  const navigate = useNavigate();

  const { id } = useParams();

  const {
    // isPending,
    // isError,
    data,
    // error,
    // refetch
  } = useCategories();

  const {
    // isError: resturantIsError,
    data: returant,
    error: restaurantError,
  } = useRestaurants();

  const restaurants = returant?.data?.data;

  console.log("from coupon", returant, restaurantError);

  const {
    // isPending: couponPending,
    // isError: couponIsError,
    isSuccess,
    data: couponApiData,
    // error: couponError,
  } = useQuery<ApiGetResponse<SinglCouponGetType>, ApiError>({
    queryKey: [`coupon/${id}`],
    queryFn: async () => {
      return await apiGetRequest<SinglCouponGetType>({
        url: `/coupon/${id}`,
      });
    },
  });
  const couponResponseData = couponApiData?.data;
  const isUpdate = Object.keys(couponResponseData ?? {})?.length !== 0;

  useEffect(() => {
    if (isUpdate && isSuccess) {
      setRiderData({
        code: couponResponseData?.couponcode || "",
        discount: couponResponseData?.percent || 0,
        category: couponResponseData?.category || "",
        description: couponResponseData?.description || "",
        restaurantId: couponResponseData?.restaurantId || "",
        minOrderAmount: couponResponseData?.minOrderAmount || 0,
        maxDiscountAmount: couponResponseData?.maxDiscountAmount || 0,
        expiryDate: couponResponseData?.expiryDate.split("T")[0] || "",
        image: couponResponseData?.image || "",
        upto: couponResponseData?.upto || 0,
        uptoCondition: couponResponseData?.upto ? true : false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate]);

  const categoryData = data?.data?.data;

  console.log(
    "category:",
    data,
    categoryData,
    "couponData:",
    couponApiData,
    isUpdate ? "put" : "post",
    isUpdate
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    let checked: boolean;

    if (e.target instanceof HTMLInputElement) {
      checked = e.target.checked;
    }

    if (name === "uptoCondition") {
      setRiderData((prev) => ({
        ...prev,
        uptoCondition: checked,
      }));
    } else if (couponData.uptoCondition && name === "upto") {
      const upto = parseFloat(value);

      setRiderData((prev) => ({
        ...prev,

        upto: upto,
        description: `${prev.discount}% oFF upto to ₹${upto}.<br>use code ${prev.code} | above ${prev.minOrderAmount}`,
      }));
    } else if (!couponData.uptoCondition && name === "minOrderAmount") {
      const minOrderAmount = parseFloat(value);
      const calulatedmaxDis = minOrderAmount * (couponData.discount / 100);
      setRiderData((prev) => ({
        ...prev,
        minOrderAmount,
        maxDiscountAmount: calulatedmaxDis,
        description: `Get ${prev.discount}% off on orders above ₹${minOrderAmount} Max discount ₹${calulatedmaxDis}.<br>use code ${prev.code}`,
      }));
    } else {
      setRiderData({
        ...couponData,
        [name]: name === "minOrderAmount" ? parseFloat(value) : value,
      });
    }
  };

  const handleSelectChange = (field: string, value: string) => {
    setRiderData({
      ...couponData,
      [field]: value,
    });
    setOpen((prev) => ({
      ...prev,
      [field]: false,
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
      setRiderData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    }
  };

  const mutation = useMutation<
    ApiResponse<CouponGetType>,
    ApiError,
    MutationObjectCouponType
  >({
    mutationFn: async ({ path, condition, data }) => {
      toast.loading("Checking Details");
      try {
        // console.log(path, method);
        const response = await apiRequest<CouponPostDataType, CouponGetType>({
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

    onSuccess: (data) => {
      console.log(data);
      //   refetch();
      toast.dismiss();

      toast.success(`${isUpdate ? "Update Successfull" : "Creat Successfull"}`);

      clearHandler();
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
      toast.error(`${error.message}`);
    },
  });

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    const payload: CouponPostDataType = {
      couponcode: couponData.code,
      percent: +couponData.discount,
      category: couponData.category,
      image: couponData.image,
      description: couponData?.description,
      restaurantId: couponData?.restaurantId,
      minOrderAmount: couponData?.minOrderAmount,
      maxDiscountAmount: couponData?.maxDiscountAmount,
      expiryDate: couponData?.expiryDate,
      upto: couponData?.uptoCondition ? couponData?.upto : 0,
    };

    console.log(payload, couponData);

    if (isUpdate) {
      mutation.mutate({
        path: `/coupon/${id}`,
        condition: "update",
        data: payload,
      });
    } else {
      mutation.mutate({
        path: "/coupon",
        condition: "creat",
        data: payload,
      });
    }
  };

  const clearHandler = () => {
    setRiderData({
      code: "",
      discount: 0,
      category: "",
      description: "",
      restaurantId: "",
      minOrderAmount: 0,
      maxDiscountAmount: 0,
      expiryDate: "",
      image: "",
      upto: 0,
      uptoCondition: false,
    });
    navigate("/coupons");
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
              Coupon Form
            </h2>
            <div onClick={clearHandler}>
              <TiArrowBackOutline className="w-10 h-10 ml-4 cursor-pointer hover:text-orange-600 text-sky-600" />
            </div>
          </div>
          <div className="h-[calc(100vh-12rem)] overflow-y-auto pr-4 md:pr-0">
            <div className="grid items-center grid-cols-1 gap-4 py-4 md:grid-cols-2">
              <input
                value={couponData.code}
                type="text"
                onChange={handleChange}
                name="code"
                className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                placeholder="Creat Code"
                required
              />
              <input
                value={couponData.discount || ""}
                type="number"
                onChange={handleChange}
                name="discount"
                className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                placeholder="Enter Discount"
                required
              />
              <div className="relative">
                <div
                  className="flex justify-between p-2 text-sm border border-gray-400 rounded-md cursor-pointer"
                  onClick={() =>
                    setOpen({ ...isOpen, restaurantId: !isOpen.restaurantId })
                  }
                >
                  {couponData.restaurantId !== ""
                    ? restaurants?.find(
                        (res) => res._id === couponData.restaurantId
                      )?.name
                    : "Select Restaurant"}
                  <FaCaretDown className="m-1" />
                </div>
                <ul
                  className={`mt-2 p-2 rounded-md overflow-y-auto w-40 bg-gray-600 shadow-lg absolute z-10 ${
                    isOpen.restaurantId ? "max-h-40" : "hidden"
                  } custom-scrollbar`}
                >
                  {(restaurants ?? []).map((rest, i) => (
                    <li
                      key={i}
                      className={`p-2 mb-2 text-sm text-white rounded-md cursor-pointer hover:bg-blue-200/60 ${
                        couponData.restaurantId === rest._id
                          ? "bg-rose-600"
                          : ""
                      }`}
                      onClick={() =>
                        handleSelectChange("restaurantId", rest._id)
                      }
                    >
                      <span>{rest.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
                  {couponData?.image.slice(
                    couponData?.image.lastIndexOf("/") + 1,
                    couponData?.image.indexOf("%2")
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

              <input
                value={couponData.minOrderAmount || ""}
                type="number"
                onChange={handleChange}
                name="minOrderAmount"
                className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                placeholder="Enter Min Order Amount"
                required
              />
              {!couponData.uptoCondition && (
                <input
                  value={couponData.maxDiscountAmount || ""}
                  type="number"
                  onChange={handleChange}
                  name="maxDiscountAmount"
                  className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none cursor-not-allowed focus-within:border-blue-400 disabled:bg-gray-200"
                  placeholder="Enter Max Discount Amount"
                  disabled
                  required
                />
              )}

              <input
                value={couponData.upto || ""}
                type="number"
                onChange={handleChange}
                name="upto"
                className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                placeholder="Enter Discount Amount"
                required
              />

              {/* <div className="relative">
                <div
                  className="flex justify-between p-2 text-sm border border-gray-400 rounded-md cursor-pointer"
                  onClick={() =>
                    setOpen({ ...isOpen, category: !isOpen.category })
                  }
                >
                  {couponData.category !== ""
                    ? couponData.category
                    : "Select Category"}
                  <FaCaretDown className="m-1" />
                </div>
                <ul
                  className={`mt-2 p-2 rounded-md overflow-y-auto w-28 bg-gray-600 shadow-lg absolute z-10 ${
                    isOpen.category ? "max-h-40" : "hidden"
                  } custom-scrollbar`}
                >
                  {[{ _id: 123, name: "all" }, ...(categoryData || [])].map(
                    (category, i) => (
                      <li
                        key={i}
                        className={`p-2 mb-2 text-sm text-white rounded-md cursor-pointer hover:bg-blue-200/60 ${
                          couponData.category === category.name
                            ? "bg-rose-600"
                            : ""
                        }`}
                        onClick={() =>
                          handleSelectChange("category", category.name)
                        }
                      >
                        <span>{category.name}</span>
                      </li>
                    )
                  )}
                </ul>
              </div> */}
              {/* <input
                value={couponData.city}
                type="text"
                onChange={handleChange}
                name="city"
                className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                placeholder="City"
                required
              />
              <input
                value={couponData.rating || ""}
                type="number"
                step="0.1"
                onChange={handleChange}
                name="rating"
                className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                placeholder="Rating"
                required
              />
              <input
                value={couponData.contactNumber}
                type="text"
                onChange={handleChange}
                name="contactNumber"
                className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                placeholder="Contact Number"
                required
              />
              <textarea
                value={couponData.description}
                onChange={handleChange}
                name="description"
                className="w-full h-24 py-4 pl-4 font-medium border border-gray-400 rounded-md outline-none md:col-span-2 focus-within:border-blue-400"
                placeholder="Description"
                required
              /> */}

              <input
                value={couponData.expiryDate || ""}
                type="date"
                onChange={handleChange}
                name="expiryDate"
                className="w-full h-10 pl-4 font-medium border border-gray-400 rounded-md outline-none focus-within:border-blue-400"
                placeholder="Enter expiryDate"
                required
              />
              <div className="flex items-center pl-1">
                <input
                  type="checkbox"
                  name="uptoCondition"
                  checked={couponData.uptoCondition}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <label
                  htmlFor="uptoCondition"
                  className="pl-4 text-sm text-gray-700"
                >
                  upto
                </label>
              </div>
              <textarea
                value={couponData.description || ""}
                onChange={handleChange}
                name="description"
                className="w-full h-24 py-4 pl-4 font-medium border border-gray-400 rounded-md outline-none md:col-span-2 focus-within:border-blue-400"
                placeholder="Description"
                required
              />
            </div>
            <div className="flex">
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-400 disabled:bg-gray-400"
                type="submit"
                disabled={
                  // !couponData.category ||
                  !couponData.code || !couponData.discount
                }
              >
                Submit
              </button>
              <button
                className="px-4 py-2 ml-8 text-white bg-red-500 rounded hover:bg-red-400"
                type="button"
                onClick={clearHandler}
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

export default CouponForm;
