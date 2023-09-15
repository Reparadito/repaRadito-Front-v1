import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  dataUser: "",
  allUsers: [],
  gamesUser: [],
  usrMsgErr: "",
  userLoged:false,
  userToken:"",
  isLogged:""

};
export const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsrByID: (state, action) => {
      state.dataUser = action.payload;
    },
    getUsrByName: (state, action) => {
        state.dataUser = action.payload;
      },
    getAllUsr: (state, action) => {
      state.allUsers = action.payload;
    },
    updateUsr: (state, action) =>{
        state.dataUser = action.payload
    },
    gamesUsr: (state,action) =>{
        state.dataUser = action.payload 
    },
    usrMsgErr: (state,action) =>{
        state.dataUser = action.payload 
    },
    setUserLoged:(state,action)=>{
      console.log("user-------->", action.payload)
      state.isLogged = action.payload
    },
    setUserToken:(state,action)=>{
      console.log("token------->", action.payload)
      state.userToken = `Bearer ${action.payload}`
    },


  },
});
export const { getUsrByID, getUsrByName, getAllUsr, updateUsr, gamesUsr , usrMsgErr ,setUserLoged,setUserToken} = UsersSlice.actions;
export default UsersSlice.reducer;