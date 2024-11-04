import { CartItem } from "../../app-store/cart";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdDelete, MdOutlineDeleteOutline, MdRestaurant } from "react-icons/md";

import { PiBowlFoodDuotone } from "react-icons/pi";

interface CartItemProps {
  item: CartItem;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
  removeHandler: () => void;
  deletCart: boolean;
  id: CartItem | undefined;
  wishHandler: () => void;
}

const CartItems: React.FC<CartItemProps> = ({
  item,
  handleQuantityIncrease,
  handleQuantityDecrease,
  removeHandler,
  deletCart,
  id,
  wishHandler,
}) => {
  const isEmpty = id ? Object.keys(id).length !== 0 : false;

  return (
    <div className="flex items-center pb-2">
      <div className="flex items-center justify-center h-full w-44 ">
        {item.image ? (
          <img src={item?.image} alt="" className="w-full h-full rounded-md" />
        ) : (
          // <img src={burgure} alt="" />
          <PiBowlFoodDuotone className="w-3/4 h-3/4" />
        )}
      </div>

      <div className="flex justify-between w-full py-4 ml-6">
        <div className="w-[80%]">
          <div className="pb-3 ">
            <div className="flex items-center pb-1">
              <h3 className="text-xl font-medium text-[#4c2240]">
                {item?.name}
              </h3>
              <p className="px-2 py-1 font-semibold text-xs ml-4 border border-[#8D1A6C] rounded-md text-[#8D1A6C]">
                {item?.label}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* <h3 className="text-xl font-medium text-[#4c2240]">{item?.name}</h3>
            <p className="px-2 py-1 font-semibold text-xs ml-4 border border-[#8D1A6C] rounded-md text-[#8D1A6C]">
              {item?.label}
            </p> */}
              <MdRestaurant />
              <span className="text-sm font-semibold text-violet-600 font-montserrat">
                {item?.restaurantId?.name}
              </span>
            </div>
          </div>

          {/* <p className="inline-block pr-2 border-r">{`₹ ${item?.price?.toFixed(
            2
          )}`}</p> */}
          <p className="inline-block pr-2 border-r">₹ {`${item?.price}`}</p>
          <p className="inline-block pl-2">{` ${item?.label}`}</p>
          <div className="mt-4 border rounded-lg w-fit">
            <button
              className={`px-2 ${
                item.quantity > 1 ? "" : "text-gray-400 cursor-not-allowed"
              }`}
              onClick={handleQuantityDecrease}
            >
              -
            </button>
            <span className="px-4">{item.quantity}</span>
            <button className="px-2" onClick={handleQuantityIncrease}>
              +
            </button>
          </div>
        </div>
        <div className="grid items-center grid-col-2">
          <p className="col-span-2 text-lg font-semibold text-right">{`₹ ${(
            item.quantity * (item?.price ?? 0)
          )?.toFixed(2)}`}</p>
          <div
            className="flex items-center gap-2 pr-2 border-r cursor-pointer"
            role="button"
            onClick={wishHandler}
          >
            <div className="flex items-center justify-end ">
              {isEmpty ? (
                <FaHeart className="w-5 h-5 text-[#BE007D]" />
              ) : (
                <FaRegHeart className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <span className={`${isEmpty ? "text-[#BE007D]" : "text-gray-400"}`}>
              Save
            </span>
          </div>
          <div
            className="flex gap-2 pl-2 cursor-pointer"
            role="button"
            onClick={removeHandler}
          >
            <div className="flex justify-end ">
              {deletCart ? (
                <MdDelete className="w-6 h-6 text-[#BE007D]" />
              ) : (
                <MdOutlineDeleteOutline className="w-6 h-6 text-gray-400" />
              )}
            </div>
            <span
              className={`${deletCart ? "text-[#BE007D]" : "text-gray-400"}`}
            >
              Delete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
