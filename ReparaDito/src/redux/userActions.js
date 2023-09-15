import { Alert } from "react-native";
import {
  getAllUsr,
  getUsrByID,
  getUsrByName,
  gamesUsr,
  updateUsr,
  usrMsgErr,
  setUserLoged,
  setUserToken,
} from "./userSlices";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadItemAsyncStorage, saveItemAsyncStorage, updateAsyncStorage } from "../components/helpers/functionsAsyncStorage";
import AlertDialog from "../components/helpers/Alert"





export const getUserByID = (id) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(
          `http://192.168.0.85:3001/user/${id}`
        );
  
        const dataUser = response.data;
  
        if (dataUser) {
          dispatch(getUsrByID(dataUser));
        } else {
          dispatch(usrMsgErr("No user registration"));
        }
      } catch (err) {
        console.log(`Error: ${err}`);
        dispatch(usrMsgErr(err));
      }
    };
  };

  export const getUserByName = (name) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(
          `http://192.168.0.85:3001/user?user=${name}`
        );
  
        const dataUser = response.data;
  
        if (dataUser) {
          dispatch(getUsrByName(dataUser));
        } else {
          dispatch(usrMsgErr("No user registration"));
        }
      } catch (err) {
        console.log(`Error: ${err}`);
        dispatch(usrMsgErr(err));
      }
    };
  };

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://192.168.0.85:3001/user`
      );

      const dataUsers = response.data;

      if (dataUsers) {
        dispatch(getAllUsr(dataUsers));
      } else {
        dispatch(usrMsgErr("No user registration"));
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      dispatch(usrMsgErr(error));
    }
  };
};

export const postUser = (data) => {
  if(data.user,data.password,data.fullname,data.email,data.date,data.image,data.number,data.tac === true,data.newsLetter)
  axios.post("http://192.168.0.85:3001/user", 
  {
   id: 1 + Math.floor(Math.random() * 999),
   user: data.user,
   password: data.password,
   fullname: data.fullname,
   userAdmin: false,
   email: data.email,
   date:data.date,
   image: data.image,
   phone:data.number,
   tac:data.tac,
   tac:data.newsLetter, 

  });
};




export const updateUser = async (newData) => {
  
    const response = await axios.put(
      'http://192.168.0.85:3001/user/update',newData
      );

      
      const actualizacion = await saveItemAsyncStorage('logedGameStack',response.data)




};


  export const checkLogedUser  = () => async (dispatch) => {
    try {
      const data = await loadItemAsyncStorage('logedGameStack');
      const user = data ? data : {};
      console.log("data userActions:----->",user);

      dispatch(setUserLoged(user));
      dispatch(setUserToken(user.token));
      
    } catch (error) {
      console.error('Error al obtener los datos desde AsyncStorage checkLogedUser:', error);
    }
  };


