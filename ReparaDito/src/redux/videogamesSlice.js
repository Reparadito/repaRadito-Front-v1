import { createSlice } from "@reduxjs/toolkit";

const initialState={
    videoGames: [],
    filteredVideoGames: [],
    videoGames_Prev:[],
    videoGame:[],
    msgerror:"NULL",
    flag_prev:false,
    allGenres: [],
    vGameId:[],
    notFoundGames: false,
    pagina:1,
    porPagina:12,
    input:1,
    maximo:0,
    gameToken:"",
    isLogged:""
}
export const videogamesSlice = createSlice({
    name: "videogames",
    initialState,
    reducers: {//noc xq pero aqui es plural
        getAllVideogames: (state,action)=>{
            state.videoGames= action.payload;
        },
        getVideogamesbyName: (state,action)=>{
            state.filteredVideoGames= action.payload;
            state.notFoundGames = false           
        },
        setPrevVideoGame: (state,action)=>{
            state.videoGames_Prev= action.payload;
        },
        getVideogamebyId: (state,action)=>{
            state.vGameId=action.payload
            state.videoGame=action.payload
        },
        setNextPage: (state,action)=>{
            state.pagina=state.pagina +1 
        },
        setPrevPage: (state,action)=>{
            state.pagina=state.pagina -1
        },
        setMaxPage : (state,action)=>{
            state.pagina=action.payload
        },
        setFirstPage : (state,action)=>{
            state.pagina=1
        },
        setFlaPrev: (state,action)=>{
            state.flag_prev=action.payload
        },
        setPrevVideoGame:(state,action)=>{
            state.videoGames_Prev=action.payload
        },
        updateVideogames:(state,action)=>{
            state.videoGames=action.payload
        },
        setErrorMsg:(state,action)=>{
            state.msgerror= action.payload
        },

        AllGenresVideoGame:(state,action)=>{
            state.allGenres=action.payload
        },

        notFoundGamesError: (state,action) => {
          state.notFoundGames = true
        },

        setGameLoged:(state,action)=>{
          console.log("game-------->", action.payload)
          state.isLogged = action.payload
        },
        setGameToken:(state,action)=>{
          console.log("token------->", action.payload)
          state.gameToken = `Bearer ${action.payload}`
        },

        //////Filtros ------- Adrián
        filterByPlatform: (state, action) => {
            const platform = action.payload;
            state.filteredVideoGames = state.videoGames.filter(
              (game) => game.platforms.includes(platform)
            );
          },
      
          filterByGenre: (state, action) => {
            const genre = action.payload;
            state.filteredVideoGames = state.videoGames.filter(
              (game) => game.genre.includes(genre)
            );
          },
      
          filterByPriceRange: (state, action) => {
            const { minPrice, maxPrice } = action.payload;
            state.filteredVideoGames = state.videoGames.filter(
              (game) => game.price >= minPrice && game.price <= maxPrice
            );
          },
      
          filterByRating: (state, action) => {
            const rating = action.payload;
            state.filteredVideoGames = state.videoGames.filter(
              (game) => game.rating >= rating
            );
          },
      
          filterByReleaseDate: (state, action) => {
            const releaseDate = action.payload;
            state.filteredVideoGames = state.videoGames.filter(
              (game) => game.releaseDate === releaseDate
            );
          },
      
          sortByRatingAsc: (state) => {
            state.filteredVideoGames.sort((a, b) => a.rating - b.rating);
            state.videoGames.sort((a, b) => a.rating - b.rating);
          },
      
          sortByRatingDesc: (state) => {
            state.filteredVideoGames.sort((a, b) => b.rating - a.rating);
            state.videoGames.sort((a, b) => b.rating - a.rating);
          },
      
          sortByPriceAsc: (state) => {
            state.filteredVideoGames.sort((a, b) => a.price - b.price);
            state.videoGames.sort((a, b) => a.price - b.price);
          },
      
          sortByPriceDesc: (state) => {
            state.filteredVideoGames.sort((a, b) => b.price - a.price);
            state.videoGames.sort((a, b) => b.price - a.price);
          },
      
          sortByReleaseDateAsc: (state) => {
            state.filteredVideoGames.sort(
              (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
            );
            state.videoGames.sort(
              (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
            );
          },
      
          sortByReleaseDateDesc: (state) => {
            state.filteredVideoGames.sort(
              (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
            );
            state.videoGames.sort(
              (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
            );
          },

          sortByAlphabeticalAsc: (state) => {
            state.filteredVideoGames.sort((a, b) => a.name.localeCompare(b.name));
            state.videoGames.sort((a, b) => a.name.localeCompare(b.name));
          },
      
          sortByAlphabeticalDesc: (state) => {
            state.filteredVideoGames.sort((a, b) => b.name.localeCompare(a.name));
            state.videoGames.sort((a, b) => b.name.localeCompare(a.name));
          },



          clearFilters: (state) => {
            state.filteredVideoGames = [];
          },
        //////Filtros ------- Adrián
    }
})

export const {getAllVideogames,getVideogamebyId,addUser,setNextPage,setFirstPage,setFlaPrev,setErrorMsg,
              setPrevPage,setMaxPage,getVideogamesbyName,setPrevVideoGame,updateVideogames,
              filterByPlatform,
  filterByGenre,
  filterByPriceRange,
  filterByRating,
  filterByReleaseDate,
  sortByRatingAsc,
  sortByRatingDesc,
  sortByPriceAsc,
  sortByPriceDesc,
  sortByReleaseDateAsc,
  sortByReleaseDateDesc,
  clearFilters,
  sortByAlphabeticalAsc, sortByAlphabeticalDesc,
  notFoundGamesError, setGameLoged, setGameToken
            }=videogamesSlice.actions
export default videogamesSlice.reducer