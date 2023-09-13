import { configureStore } from "@reduxjs/toolkit";
import cartReducers from "./reducers/cartReducers";
import productReducer from "./reducers/productReducer";

export default configureStore({
  reducer: {
    cart: cartReducers,
    product: productReducer,
  },
});
