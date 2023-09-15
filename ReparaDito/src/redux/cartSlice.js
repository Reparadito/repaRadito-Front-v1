import { createSlice } from '@reduxjs/toolkit';

const initialState = true;

export const cartSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    updateCart: (state) => {
      // console.log("cambiando estado ----> redux");
      return !state; // Alternar el valor booleano entre true y false
    },
  },
});

export const { updateCart } = cartSlice.actions;
export default cartSlice.reducer;
