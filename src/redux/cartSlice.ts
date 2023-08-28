import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { cartItem, cartState } from '@types';
const content = JSON.stringify({
  cart: [],
  fullname: 'Name Surname',
  phone: 'Phone',
  subtotal: 0,
});
const initialState: cartState = JSON.parse(localStorage.getItem('cart') || content);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addElemCart: (state, action: PayloadAction<cartItem>) => {
      state.cart.push(action.payload);
      state.subtotal += action.payload.price;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeElemCart: (state, action: PayloadAction<number>) => {
      state.subtotal -= state.cart[action.payload].price;
      state.cart = state.cart.filter((el, i) => i !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    editFullName: (state, action: PayloadAction<string>) => {
      state.fullname = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    editPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addElemCart, removeElemCart, editFullName, editPhone } = cartSlice.actions;

export default cartSlice.reducer;
