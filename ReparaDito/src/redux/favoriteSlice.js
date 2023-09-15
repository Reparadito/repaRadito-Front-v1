import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {


    toggleFavoriteSuccess: (state, action) => {
      const { videogameId, isFav, userId } = action.payload;
      const index = state.favorites.findIndex((favorite) => favorite.videogameId === videogameId);
      if (index !== -1) {
        state.favorites[index].isFav = isFav;
      }
    },
    setFavorites: (state, action) => {
        state.favorites = action.payload;
      },


  },
});

export const { toggleFavoriteSuccess, setFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;