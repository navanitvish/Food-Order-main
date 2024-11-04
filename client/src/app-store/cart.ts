// src/features/cart/cartSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store.ts";
import {
  CardAllMenuDataType,
  CardMenuCategoryDataType,
  CardMenuResturantDataType,
} from "../types/contentType.ts";

//for dummy data slice type
// export interface CartItem {
//   description: string;
//   image: string;
//   ingredients: string[];
//   label: string;
//   name: string;
//   price: string;
//   restaurantName: string;
//   quantity: number;
//   id: string;
// }

// export interface ConditionItem {
//   id: string;
// }

//for dummy dish data slice

// interface CartState {
//   items: CartItem[];
// }

export interface CartItem {
  _id?: string;
  restaurantId?: CardMenuResturantDataType;
  name?: string;
  description?: string;
  price?: number;
  category?: CardMenuCategoryDataType;
  available?: boolean;
  createdAt?: string;
  updatedAt?: string;
  label?: string;
  image?: string;
  ingredients?: string[];
  quantity: number;
}
interface CartState {
  condition: boolean;
  items: CartItem[];
}

const initialState: CartState = {
  condition: false,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CardAllMenuDataType>) {
      console.log(action, "from cartSlice");
      const item = action.payload;
      const existingItem = state.items.find((i) => i._id === item._id);
      const diffrentResturant = state.items.every(
        (i) => i.restaurantId?.name !== item?.restaurantId?.name
      );
      if (existingItem) {
        console.log("already assign to cart");
      } else if (diffrentResturant && state.items.length > 0) {
        console.log("Resturant is different");
        state.condition = true;
      } else {
        state.items.push({ ...item, quantity: 1 });
        state.condition = false;
      }
    },
    increaseQunatity(state, action: PayloadAction<CardAllMenuDataType>) {
      const item = action.payload;

      const existingItem = state.items.find((i) => i._id === item._id);
      if (existingItem) {
        existingItem.quantity++;
      }
      state.condition = false;
    },
    //this for all old with dummy data type defination
    // decreaseQuantity(state, action: PayloadAction<CartItem>) {
    decreaseQuantity(state, action: PayloadAction<CardAllMenuDataType>) {
      const item = action.payload;
      const existingItem = state.items.find((i) => i._id === item._id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          existingItem.quantity;
        } else {
          existingItem.quantity--;
        }
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item._id !== itemId);
      state.condition = false;
    },
    clearCart(state) {
      state.items = [];
      state.condition = false;
    },
    closeCondition(state) {
      state.condition = false;
    },
  },
});

console.log(initialState);

export const carItemtHelper = (state: RootState): CartItem[] =>
  state.cart.items;
export const carConditiontHelper = (state: RootState): boolean =>
  state.cart.condition;

export const {
  addItem,
  removeItem,
  increaseQunatity,
  decreaseQuantity,
  clearCart,
  closeCondition,
} = cartSlice.actions;

export default cartSlice.reducer;
