import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bannerData } from "../types/contentType";

interface BannerType {
  bannerdata: bannerData | null;
}

const initialState: BannerType = {
  bannerdata: null,
};

const dishSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    addBannerData: (state, action: PayloadAction<bannerData>) => {
      state.bannerdata = action.payload;
    },
    clearBannerData: (state) => {
      state.bannerdata = null;
    },
  },
});

export const { addBannerData, clearBannerData } = dishSlice.actions;
export default dishSlice.reducer;
