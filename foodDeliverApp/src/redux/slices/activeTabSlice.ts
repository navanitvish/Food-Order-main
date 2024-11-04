import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BottomTabName } from '../../components/BottomNavigation';


interface ActiveTabState {
  activeTab: BottomTabName;
}

const initialState: ActiveTabState = {
  activeTab: 'Home',
};

const activeTabSlice = createSlice({
  name: 'activeTab',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<BottomTabName>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = activeTabSlice.actions;
export default activeTabSlice.reducer;