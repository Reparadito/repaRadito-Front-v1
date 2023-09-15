
import { useNavigation } from "@react-navigation/native";
import { Login } from "./Login";
import { StartedSession } from "./SessionInit";
import { View, StyleSheet } from "react-native";
import Register from "../Create/RegisterUser";
import { ForgotPassword } from "../ForgotPasword/ForgotPassword";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadItemAsyncStorage } from "../../helpers/functionsAsyncStorage";

export const RenderLogin = ({ navigation }) => {

  
  const loged = useSelector((state) => state.usersState.isLogged);
  const token = useSelector((state) => state.usersState.userToken);
  console.log('------------------------------->',loged)
  console.log('------------------------------->',token)


  return (
    <ScrollView>
      {!loged.user ? 
      <Login navigation={navigation}/> :
       <StartedSession navigation={navigation}/>}
    </ScrollView>
    )


const styles = StyleSheet.create({

});
}
