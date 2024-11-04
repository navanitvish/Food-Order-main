import { createSlice } from "@reduxjs/toolkit";

interface category {
  name: string;
  type: string;
}

interface categoryType {
  categoryData: category[];
}

const initialState: categoryType = {
  categoryData: [],
};

const foodCategory = createSlice({
  name: "category",
  initialState,
  reducers: {
    addData: (state, { payload }) => {
      state.categoryData.push(payload);
    },
  },
});

export const { addData } = foodCategory.actions;
export default foodCategory.reducer;
