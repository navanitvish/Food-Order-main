// src/app/store.ts

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import wishlistReducer from "./wishlist";
import checkoutLoginReducer from "./checkoutLogin";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    checkout: checkoutLoginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
