import { createSlice } from '@reduxjs/toolkit';

const initialState = true;

export const stockSlice = createSlice({
  name: 'stockChange',
  initialState,
  reducers: {
    updateStock: (state) => {
       console.log("cambiando estado ----> redux para actualizar");
      return !state; // Alternar el valor booleano entre true y false
    },
  },
});

export const { updateStock } = stockSlice.actions;
export default stockSlice.reducer;