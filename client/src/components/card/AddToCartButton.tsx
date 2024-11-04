import React from "react";
import { RiShoppingCart2Line } from "react-icons/ri";

interface AddToCartButtonProps {
  onClick?: () => void;
  quantity: number;
  increment: () => void;
  decrement: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  onClick,
  quantity,
  increment,
  decrement,
}) => {
  return (
    <div className="flex items-center justify-between bg-white border rounded-l rounded-r shadow-md">
      <button
        onClick={decrement}
        className="px-3 py-1 text-gray-600 rounded-l "
        // disabled={quantity === 1}
      >
        -
      </button>
      <span className="px-4">{quantity}</span>
      <button onClick={increment} className="px-3 py-1 text-gray-600 rounded-r">
        +
      </button>
      {onClick && (
        <button className="px-4 py-1 ml-4 text-white bg-blue-500 rounded hover:bg-blue-600">
          <RiShoppingCart2Line className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
