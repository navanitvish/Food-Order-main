import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface CheckoutLogin {
  condition: boolean;
}

const initialState: CheckoutLogin = {
  condition: false,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    moveToLogin(state) {
      console.log("from checkout to login");
      state.condition = true;
    },
    returnfromLogin(state) {
      console.log("from checkout to login");
      state.condition = false;
    },
    // removeWishItem(state, action: PayloadAction<string>) {
    //   state.items = state.items.filter((item) => item.id !== action.payload);
    // },
  },
});

export const checkoutHelper = (state: RootState): boolean =>
  state.checkout.condition;

export const { moveToLogin, returnfromLogin } = checkoutSlice.actions;

export default checkoutSlice.reducer;
