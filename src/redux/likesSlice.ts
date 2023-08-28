import { PayloadAction, createSlice } from '@reduxjs/toolkit';
const content = JSON.stringify({
  items: [],
});
const initialState: { items: number[] } = JSON.parse(localStorage.getItem('likes') || content);

export const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    addElem: (state, action: PayloadAction<number>) => {
      state.items.push(action.payload);
      localStorage.setItem('likes', JSON.stringify(state));
    },
    removeElem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((el) => el !== action.payload);
      localStorage.setItem('likes', JSON.stringify(state));
    },
  },
});

export const { addElem, removeElem } = likesSlice.actions;

export default likesSlice.reducer;
