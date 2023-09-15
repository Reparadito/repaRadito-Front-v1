import {configureStore} from "@reduxjs/toolkit";
import videogamesReducer from "./videogamesSlice";
import userReducer from "./userSlices"
import cartReducer from "./cartSlice"
import salesReducer from "./salesSlice"
import reviewsReducer from './reviewSlice';
import favoriteReducer from "./favoriteSlice";
import stockReducer from './stockSlice';

export default configureStore({
    reducer:{
        videogamesState: videogamesReducer,
        usersState: userReducer,
        cartState: cartReducer,
        salesState: salesReducer,
        reviews: reviewsReducer,
        favoriteState: favoriteReducer,
        stockState: stockReducer
    }
})