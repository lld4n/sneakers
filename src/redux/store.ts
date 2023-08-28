import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import likesSlice from './likesSlice';

export const store = configureStore({
  reducer: {
    cartSlice,
    likesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
