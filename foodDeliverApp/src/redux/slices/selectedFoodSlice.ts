import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedFoodState {
  food: any | null;
}

const initialState: SelectedFoodState = {
  food: null,
};

const selectedFoodSlice = createSlice({
  name: 'selectedFood',
  initialState,
  reducers: {
    setSelectedFood: (state, action: PayloadAction<any>) => {
      state.food = action.payload;
    },
    clearSelectedFood: (state) => {
      state.food = null;
    },
    
  },
});

export const { setSelectedFood, clearSelectedFood } = selectedFoodSlice.actions;
export default selectedFoodSlice.reducer;