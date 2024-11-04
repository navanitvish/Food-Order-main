import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { CartItem } from "./cart";

interface WishlistState {
  items: CartItem[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishItem(state, action: PayloadAction<CartItem>) {
      console.log(action, "from wishslice");
      state.items.push(action.payload);
    },
    removeWishItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
  },
});

export const wishListHelper = (state: RootState): CartItem[] =>
  state.wishlist.items;

export const { addWishItem, removeWishItem } = wishlistSlice.actions;

export default wishlistSlice.reducer;
