import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Location = {
  id: string;
  name: string;
  address: string;
};

interface LocationsState {
  locations: Location[];
  selectedLocationId: string | null;
}

const initialState: LocationsState = {
  locations: [
    { id: '1', name: 'Home', address: 'Khajoori khas, delhi 100053' },
    { id: '2', name: 'Company', address: '1A Baker Street, Delhi.' },
  ],
  selectedLocationId: '2',
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setSelectedLocation: (state, action: PayloadAction<string>) => {
      state.selectedLocationId = action.payload;
    },
    addLocation: (state, action: PayloadAction<Location>) => {
      state.locations.push(action.payload);
    },
    clearSelectedLocation: (state) => {
      state.selectedLocationId = null;
    },
  },
});

export const { setSelectedLocation, addLocation, clearSelectedLocation } = locationsSlice.actions;
export default locationsSlice.reducer;