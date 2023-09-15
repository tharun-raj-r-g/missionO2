import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
  },
  reducers: {
    getProducts: (state, action) => {
      state.product.push({ ...action.payload });
    },
    incrementQuantity: (state, action) => {
      const itemPresent = state.product.find(
        (item) => item.id === action.payload.id
      );
      itemPresent.quantity++;
    },
    decrementQuantity: (state, action) => {
      const itemPresent = state.product.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent.quantity == 1) {
        itemPresent.quantity = 0;
        const removeFromCart = state.product.filter(
          (item) => item.id !== action.payload.id
        );
        state.cart = removeFromCart;
      } else {
        itemPresent.quantity--;
      }
    },
    setQuantity:(state,action)=>{
      const itemPresent = state.product.find(
        (item) => item.id === action.payload.id
      );
      if (action.payload.newquantity == 0 || action.payload.newquantity==null) {
        itemPresent.quantity = 0;
        const removeFromCart = state.product.filter(
          (item) => item.id !== action.payload.id
        );
        state.cart = removeFromCart;
      } else {
        itemPresent.quantity=action.payload.newquantity;
      }
    },
    zeroQuantity: (state, action) => {
      const itemPresent = state.product.find(
        (item) => item.id === action.payload.id
      );
      itemPresent.quantity = 0;
    },
    zeroQuantityAll: (state, action) => {
      state.product.forEach(item => {
        item.quantity = 0;
      });
    },
  },
});

export const {
  getProducts,
  incrementQuantity,
  decrementQuantity,
  zeroQuantity,
  setQuantity,
  zeroQuantityAll
} = productSlice.actions;

export default productSlice.reducer;
