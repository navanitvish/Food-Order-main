import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import cartReducer from './slices/cartSlice';
import activeTabReducer from './slices/activeTabSlice';
import selectedFoodReducer from './slices/selectedFoodSlice';

import locationsReducer from './slices/locationSlice';
import paymentMethodsReducer from './slices/paymentMethodSlice';

export const store = configureStore({
  reducer: {
    activeTab: activeTabReducer,
    cart: cartReducer,
    selectedFood: selectedFoodReducer,
    locations: locationsReducer,
    paymentMethods: paymentMethodsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;