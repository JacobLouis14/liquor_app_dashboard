import { configureStore } from "@reduxjs/toolkit";
import shopSclice from "./slices/shopSclice";
import userSlice from "./slices/userSlice";
import productSlice from "./slices/productSlice";
import categoriesSlice from "./slices/categoriesSlice";
import stateSlice from "./slices/stateSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    shopReducer: shopSclice,
    userReducer: userSlice,
    productReducer: productSlice,
    categoryReducer: categoriesSlice,
    stateReducer: stateSlice,
    authReducer: authSlice,
  },
});

export default store;
