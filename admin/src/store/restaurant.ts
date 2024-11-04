import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface Owner {
//   _id: string;
//   name: string;
//   email: string;
//   password: string;
//   mobile: string;
//   isVerified: boolean;
//   otp: string;
//   role: string;
//   registrationDate: string;
//   resetPasswordLink: string;
// }
export interface RestaurantDataTypes {
  _id?: string;
  name?: string;
  address?: string;
  contact?: number;
  owner?: string;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
  openinghour?: string;
  cuisine?: string;
  menuitem?: number;
  description?: string;
  image: string;
}

interface RestaurantType {
  restaurantData: RestaurantDataTypes | null;
}

const initialState: RestaurantType = {
  restaurantData: null,
};

const resturantSlice = createSlice({
  name: "resturant",
  initialState,
  reducers: {
    addRestaurantData: (state, action: PayloadAction<RestaurantDataTypes>) => {
      state.restaurantData = action.payload;
    },
    clearData: (state) => {
      state.restaurantData = null;
    },
  },
});

export const { addRestaurantData, clearData } = resturantSlice.actions;
export default resturantSlice.reducer;
