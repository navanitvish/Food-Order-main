import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  carItemtHelper,
  CartItem,
  decreaseQuantity,
  increaseQunatity,
  removeItem,
} from "../app-store/cart";

import ConfirmDeleteModal from "../components/modal/ConfirmDeleteModal";

import { NavLink } from "react-router-dom";
import {
  addWishItem,
  removeWishItem,
  wishListHelper,
} from "../app-store/wishlist";
import CartItems from "../components/cart/CardItems";

import emptyCard from "../assets/Add_to_Cart.svg";
import { RiShoppingCart2Line } from "react-icons/ri";
import { moveToLogin } from "../app-store/checkoutLogin";
import { userProfileType } from "../types/authType";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiError, ApiGetResponse, ApiResponse } from "../types/apiType";
import { apiGetRequest } from "../api/userGetApi";
import { apiRequest } from "../api/userApi";
import { toast } from "react-toastify";
import FloatingLabelInput from "../components/inputField/FloatingLabelInput";
import {
  CardMenuByCategoryIdDataType,
  MutationOrderPostType,
  OrderResponse,
  OrderSendingPostType,
} from "../types/contentType";

const NewCart: React.FC = () => {
  const items = useSelector(carItemtHelper);
  const dispatch = useDispatch();

  console.log(items, "from cart");

  const wishItems = useSelector(wishListHelper);
  const [deletCart, setCartDelete] = useState<string>("");
  const [onConfirm, setConfirm] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const { data, error } = useQuery<ApiGetResponse<userProfileType>, ApiError>({
    queryKey: [`user Profile`],
    queryFn: async () => {
      return await apiGetRequest<userProfileType>({
        url: `user/profile`,
      });
    },
  });

  const userProfile = data?.data?.data;

  console.log(data, error, userProfile);

  const deliveryCharge = 50; // Example delivery charge
  const taxPercentage = 5; // Example tax percentage

  const discountCodes: { [key: string]: number } = {
    mansoor20: 20,
    swiggy40: 40,
    free80: 80,
  };

  const calculateSubtotal = () => {
    return items.reduce(
      (acc, cur) => acc + (cur?.price ?? 0) * cur.quantity,
      0
    );
  };

  const calculateFinalPrice = () => {
    let total = calculateSubtotal();

    // Apply discount based on promoCode
    if (appliedDiscount > 0) {
      const discountPercentage = appliedDiscount / 100;
      total *= 1 - discountPercentage;
    }

    // Add delivery charge
    total += deliveryCharge;

    // Add tax
    const taxAmount = (total * taxPercentage) / 100;
    total += taxAmount;

    return total;
  };

  const formatingDishArray = items.map((item) => {
    return {
      menuItemId: item?._id,
      price: item.price,
      quantity: item.quantity,
    };
  });

  const handleApplyDiscount = () => {
    const foundCode = Object.keys(discountCodes).find((key) =>
      promoCode.includes(key)
    );

    if (foundCode) {
      setAppliedDiscount(discountCodes[foundCode]);
    } else {
      setAppliedDiscount(0);
    }
  };

  const clearDiscountCode = () => {
    setPromoCode("");
    setAppliedDiscount(0);
  };

  const deleteHandler = () => {
    dispatch(removeItem(deletCart));
    setConfirm((prev) => !prev);
  };

  const addToWishList = (wishItem: CartItem) => {
    const wishExist = wishItems.find((item) => item._id === wishItem._id);

    if (wishExist) {
      dispatch(removeWishItem(wishItem._id ?? ""));
    } else {
      dispatch(addWishItem(wishItem));
    }
  };

  const mutation = useMutation<
    ApiResponse<OrderResponse>,
    ApiError,
    MutationOrderPostType
  >({
    mutationFn: async ({ path, method, data }) => {
      toast.loading("Checking Details");
      try {
        const response = await apiRequest<OrderSendingPostType, OrderResponse>({
          url: path,
          method: method,
          data: data,
        });

        console.log(response);
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

      toast.success(`${"Order Created"}`);
    },
    onError: (error: ApiError) => {
      console.log(error);
      toast.dismiss();
      toast.error(error.message);
    },
  });

  const dateGenerate = () => {
    const date = new Date();

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const invokeDeletModal = (dish: CardMenuByCategoryIdDataType) => {
    setConfirm((prev) => !prev);
    setCartDelete(dish?._id ?? "");
  };

  const closehandler = () => {
    setConfirm((prev) => !prev);
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // console.log(subTotal, "calculation");

  const checkouthandler = () => {
    const userToken = localStorage.getItem("userInfo");

    if (userToken) {
      console.log("good to go");
      const finalObject: OrderSendingPostType = {
        userId: userProfile?._id,
        resturent: items?.[0]?.restaurantId?._id,
        items: formatingDishArray,
        address: `${address?.street}, ${address?.city}, ${address?.state} ${address?.postalCode}`,
        totalAmount: +calculateFinalPrice().toFixed(2),
        status: "pending",
      };
      mutation.mutate({
        path: "order",
        method: "post",
        data: finalObject,
      });
    } else {
      dispatch(moveToLogin());
    }
  };

  console.log(address);

  return (
    <>
      {onConfirm && (
        <ConfirmDeleteModal onClose={closehandler} onConfirm={deleteHandler} />
      )}
      <section className=" max-w-[1200px] mx-auto h-fit flex flex-col md:flex-row gap-6 px-4  overflow-auto ">
        <section
          className={`bg-white rounded-md md:w-[70%]  py-4 px-4 ${
            items.length > 0 ? "h-full" : "h-[620px]"
          } overflow-clip border-gray-200 border-2`}
        >
          <h4 className="flex items-center gap-2 pb-6 text-2xl font-semibold border-b border-gray-200">
            <RiShoppingCart2Line className="w-8 h-8 text-[#8D1A6C]" />
            <span className="text-[#8D1A6C]">Cart</span>
          </h4>
          <section
            className={` ${"h-[calc(100vh-14rem)]"} mt-4 overflow-y-auto [&::-webkit-scrollbar]:hidden scroll-smooth`}
          >
            {items.length > 0 ? (
              items.map((item) => (
                <CartItems
                  key={item._id}
                  item={item}
                  handleQuantityIncrease={() =>
                    dispatch(increaseQunatity(item))
                  }
                  handleQuantityDecrease={() =>
                    dispatch(decreaseQuantity(item))
                  }
                  // removeHandler={() => deleteHandler(item)}
                  removeHandler={() => invokeDeletModal(item)}
                  deletCart={deletCart === item._id}
                  id={wishItems.find((wishItem) => wishItem._id === item._id)}
                  wishHandler={() => addToWishList(item)}
                />
              ))
            ) : (
              <img src={emptyCard} alt="empty card" className="w-full h-full" />
            )}
          </section>
        </section>
        <section className="flex-grow p-4 bg-white border-2 border-gray-200 rounded-md h-fit">
          <section>
            <p>Delivery</p>
            <p className="mb-4 text-sm text-gray-400">
              {`Delivery date: ${dateGenerate()}`}
            </p>

            <div className="relative flex py-4 border-dashed border-y">
              <input
                type="text"
                className="w-full px-2 py-1 border border-gray-400 rounded-md outline-none"
                placeholder="Promocode"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              {appliedDiscount ? (
                <button
                  className="absolute right-0 px-2 border border-gray-400 py-[6px] top-1/2 -translate-y-1/2  text-sm bg-red-200 rounded-md "
                  onClick={clearDiscountCode}
                >
                  Clear
                </button>
              ) : (
                <button
                  className="absolute right-0 px-2 border border-gray-400 py-[6px] top-1/2 -translate-y-1/2  text-sm bg-gray-100 rounded-md "
                  onClick={handleApplyDiscount}
                >
                  Apply
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 col-span-2 gap-4 pt-2 pb-4 border-b border-dashed">
              <h4 className="col-span-2">Address</h4>
              <FloatingLabelInput
                label="Street"
                value={address.street}
                name="street"
                onChange={handleAddressChange}
              />
              <FloatingLabelInput
                label="City"
                value={address.city}
                name="city"
                onChange={handleAddressChange}
              />
              <FloatingLabelInput
                label="State"
                value={address.state}
                name="state"
                onChange={handleAddressChange}
              />
              <FloatingLabelInput
                label="Postal Code"
                value={address.postalCode}
                name="postalCode"
                onChange={handleAddressChange}
              />
            </div>

            <div className="relative grid grid-cols-2 py-4 border-b border-dashed">
              <div>
                <h4 className="pb-2">Subtotal</h4>
                <p className="text-sm text-gray-400">Discount</p>
                <p className="text-sm text-gray-400">Delivery</p>
                <p className="text-sm text-gray-400">Tax</p>
              </div>
              <div className="justify-self-end">
                <p className="pb-2">₹ {calculateSubtotal().toFixed(2)}</p>
                <p className="text-sm text-gray-400">
                  {appliedDiscount > 0 ? `-${appliedDiscount}%` : "--"}
                </p>
                <p className="text-sm text-gray-400">
                  ₹ {deliveryCharge.toFixed(2)}
                </p>
                <p className="text-sm text-gray-400">{taxPercentage}%</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 ">
              <h4 className="">Total</h4>

              <p className="justify-self-end">
                ₹ {calculateFinalPrice().toFixed(2)}
              </p>

              <button
                className="col-span-2 px-4 py-2 text-white bg-[#8D1A6C] hover:bg-[#703F78] rounded-md"
                onClick={checkouthandler}
              >
                Proceed to checkout
              </button>
              <button className="col-span-2 px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-50">
                <NavLink to={"/search"}>Missing Something</NavLink>
              </button>
            </div>
          </section>
        </section>
      </section>
    </>
  );
};

export default NewCart;
