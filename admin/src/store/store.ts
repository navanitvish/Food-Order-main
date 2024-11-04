import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../store/foodCategory";
import restaurantReducer from "../store/restaurant";
import disheReducer from "../store/dish";
import bannerReducer from "../store/banner"
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import userReducer from "../store/user";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    restaurant: restaurantReducer,
    dish: disheReducer,
    banner:bannerReducer
    // user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
