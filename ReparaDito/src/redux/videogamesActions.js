import {getAllVideogames, getVideogamebyId, addUser,setNextPage,setPrevPage,setMaxPage,setErrorMsg,
        setFlaPrev,setFirstPage,getVideogamesbyName,setPrevVideoGame,updateVideogames,
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
  sortByAlphabeticalAsc,
  sortByAlphabeticalDesc,
  notFoundGamesError,
  setGameLoged,
  setGameToken
     } from "./videogamesSlice";
import { loadItemAsyncStorage, saveItemAsyncStorage } from "../components/helpers/functionsAsyncStorage";
import axios from "axios";
import {videogames} from '../components/utils/dataVideojuegos'
import { createAsyncThunk } from "@reduxjs/toolkit";

let estado=0

export const  getvideoGames = () =>{
  return async (dispatch) => {
    try {
      const response = await axios.get("http://192.168.0.85:3001/games");

      const dataUsers = response.data;

      if(dataUsers) {
        dispatch(getAllVideogames(dataUsers));
      } else {
        dispatch(setErrorMsg("Profesional no registrado"))
      }      
    } catch (error) {
      console.log(`Error: ${error}`);
      dispatch(setErrorMsg(error));
    }

    
    
}
}
export const getvGamebyName =(name)=> {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://192.168.0.85:3001/games?name=${name}`)
      
      const dataUser = response.data
      console.log("esto me llega de videogameActions/getGamebyName", dataUser)
      
      if(dataUser) {
        dispatch(getVideogamesbyName(dataUser));
      } else {
        dispatch(setErrorMsg("Profesional no registrado"))
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      dispatch(setErrorMsg(error));
    }
}
}


export const setNxtPage=()=>{
    return  function(dispatch){
           dispatch(setNextPage())
    }
}

export const setPrvPage=()=>{
    return  function(dispatch){
           dispatch(setPrevPage())
    }
}

export const setMxPage=(maximo)=>{
    
    return  function(dispatch){
           dispatch(setMaxPage(maximo))
    }
}
export const set1rsPage=()=>{
    return function(dispatch){
        dispatch(setFirstPage())
    }
}
export const setflgPrev=(value)=>{
    return function(dispatch){
        dispatch(setFlaPrev(value))
    }    
}

export const setPrvVideogame=()=>{
    return function(dispatch){
        dispatch(setPrevVideoGame())
}
}

export const updateVgames=(data)=>{
    return function(dispatch){
        dispatch(updateVideogames(data))
    }
}

export const getVGameByID = (id) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(
          `http://192.168.0.85:3001/games/${id}`
        );
  
        const dataVg = response.data;
  
        if (dataVg) {
          dispatch(getVideogamebyId(dataVg)); // Asegúrate de importar y definir esta acción correctamente
        } else {
          dispatch(setErrorMsg("Profesional no registrado")); // Asegúrate de importar y definir esta acción correctamente
        }
      } catch (err) {
        console.log(`Error: ${err}`);
        dispatch(setErrorMsg(err)); // Asegúrate de importar y definir esta acción correctamente
      }
    };
  };

  export const postGame = (data) => {
    if(data.name,data.stock,data.genre,data.description,data.releaseDate,data.image,data.price,data.screenShots,data.platforms)
    axios.post("http://192.168.0.85:3001/games", 
    {
     id: 1 + Math.floor(Math.random() * 999),
     name: data.name,
     stock: data.stock,
     genre: data.genre,
     description: data.description,
     releaseDate:data.releaseDate,
     image: data.image,
     price:data.price,
     screenShots:data.screenShots,
     platforms:data.platforms, 
  
    });
  };

  
  export const updateUser = async (newData) => {
  
    const response = await axios.put(
      'http://192.168.0.85:3001/games/update',newData
      );      
      const actualizacion = await saveItemAsyncStorage('logedGameStack',response.data)
};


// Acciones para filtros y ordenamientos ----> Adrián
export const applyPlatformFilter = (platform) => (dispatch) => {
    dispatch(filterByPlatform(platform));
  };
  
  export const applyGenreFilter = (genre) => (dispatch) => {
    dispatch(filterByGenre(genre));
  };
  
  export const applyPriceRangeFilter = (minPrice, maxPrice) => (dispatch) => {
    dispatch(filterByPriceRange({ minPrice, maxPrice }));
  };
  
  export const applyRatingFilter = (rating) => (dispatch) => {
    dispatch(filterByRating(rating));
  };
  
  export const applyReleaseDateFilter = (releaseDate) => (dispatch) => {
    dispatch(filterByReleaseDate(releaseDate));
  };
  
  export const applyRatingSortAsc = () => (dispatch) => {
    dispatch(sortByRatingAsc());
  };
  
  export const applyRatingSortDesc = () => (dispatch) => {
    dispatch(sortByRatingDesc());
  };
  
  export const applyPriceSortAsc = () => (dispatch) => {
    dispatch(sortByPriceAsc());
  };
  
  export const applyPriceSortDesc = () => (dispatch) => {
    dispatch(sortByPriceDesc());
  };
  
  export const applyReleaseDateSortAsc = () => (dispatch) => {
    dispatch(sortByReleaseDateAsc());
  };
  
  export const applyReleaseDateSortDesc = () => (dispatch) => {
    dispatch(sortByReleaseDateDesc());
  };
  
  export const clearAllFilters = () => (dispatch) => {
    dispatch(clearFilters());
  };

  export const applyAlphabeticalSortAsc = createAsyncThunk(
    "videogames/applyAlphabeticalSortAsc",
    async (_, { dispatch }) => {
      dispatch(sortByAlphabeticalAsc());
    }
  );
  
  export const applyAlphabeticalSortDesc = createAsyncThunk(
    "videogames/applyAlphabeticalSortDesc",
    async (_, { dispatch }) => {
      dispatch(sortByAlphabeticalDesc());
    }
  );

  export const checkLogedGame  = () => async (dispatch) => {
    try {
      const data = await loadItemAsyncStorage('logedGameStack');
      const videogames = data ? data : {};
      console.log("data videogamesActions:----->",videogames);

      dispatch(setGameLoged(videogames));
      dispatch(setGameToken(videogames.token));
      
    } catch (error) {
      console.error('Error al obtener los datos desde AsyncStorage, checkLogedGame:', error);
    }
  };


  