import { useNavigation } from "@react-navigation/native";
import { Login } from "./Login";
import { StartedSession } from "./SessionInitGame";
import { View, StyleSheet } from "react-native";
import Register from "../Create/RegisterUser";
import { ForgotPassword } from "../ForgotPasword/ForgotPassword";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadItemAsyncStorage } from "../../helpers/functionsAsyncStorage";

export const RenderLogin = ({ navigation }) => {

  
  const loged = useSelector((state) => state.videogamesState.isLogged);
  const token = useSelector((state) => state.videogamesState.gameToken);
  console.log('RenderLogin Game - Loged:------------------------------->',loged)
  console.log('RenderLogin Game - token:------------------------------->',token)


  
  return (
    <ScrollView>
      {!loged.name ? 
      <Login navigation={navigation}/> :
       <StartedSession navigation={navigation}/>}
    </ScrollView>
    )


const styles = StyleSheet.create({

});
}