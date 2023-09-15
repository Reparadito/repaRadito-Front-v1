import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  loading: false,
  error: null,
  userId: null, // Agrega el campo userId al estado inicial
};

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addComment: (state, action) => {
      state.reviews.push(action.payload); // Agregar la nueva revisión al array de revisiones
    },

    
  },
});

export const { setReviews, setLoading, setError } = reviewsSlice.actions;
export default reviewsSlice.reducer;
