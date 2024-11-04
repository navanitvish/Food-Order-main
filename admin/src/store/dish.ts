import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuData } from "../types/contentType";

// interface Dish {
//   _id: string;
//   restaurantId: ;
//   image: string;
//   name: string;
//   description: string;
//   price: number;
//   category: string;

//   label: string;
//   dietry: string;
//   ingredient: string;
//   available: boolean;
// }

interface DishType {
  dishData: MenuData | null;
}

const initialState: DishType = {
  dishData: null,
};

const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {
    addDishData: (state, action: PayloadAction<MenuData>) => {
      state.dishData = action.payload;
    },
    clearDishData: (state) => {
      state.dishData = null;
    },
  },
});

export const { addDishData, clearDishData } = dishSlice.actions;
export default dishSlice.reducer;
