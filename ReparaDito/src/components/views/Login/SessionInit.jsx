import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Alert,
  } from "react-native";
import {
    color_gris_c,
    color_morado_o,
    color_celeste,
    color_morado_c2,
    color_gris_595959,
    color_gris_dadada,
    color_morado_sc1,
    color_rojo,
    color_gris_cdcdcd,
  } from "../../utils/theme/stringsColors";



  import imageUser from "../../../../assets/imageUser.png";
  import {
    saveItemAsyncStorage,
    loadItemAsyncStorage,
    removeItemAsyncStorage,
    showAsyncStorageData,
  } from "../../helpers/functionsAsyncStorage";
import { useDispatch, useSelector } from "react-redux";
import { checkLogedUser } from "../../../redux/userActions";
import { checkLogedGame } from "../../../redux/videogamesActions";


export const StartedSession = () => {
  const isUserLogged = useSelector((state) => state.usersState.isLogged);
  const isGameLogged = useSelector((state) => state.videogamesState.isLogged);
  
  
  const dispatch = useDispatch();

  const handleUnlogin = () => {
    removeItemAsyncStorage("logedGameStack");
    dispatch(checkLogedUser());
    showAsyncStorageData()
  };

  return(
    
  <View>
    <View style={[styles.header]}>
      <Image
        style={styles.logo}
        source={require("../../../../assets/logo_experto_app.png")}
      ></Image>
    </View>
    <View style={[styles.bgCont]}>
      <TouchableOpacity style={[styles.ImageButton]}>
        <Image
          source={isUserLogged.image ?  {uri: isUserLogged.image} : imageUser}
          style={{ margin: 5, width: 200, height: 200 , borderRadius:125}}
        />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.miniButton]} onPress={handleUnlogin}>
        <Text style={[styles.buttonText]}>Logout</Text>
      </TouchableOpacity>
    </View>
    
  </View>
  )
};

const styles = StyleSheet.create({
  ImageButton: {
      marginTop: 100,
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
      width: 200,
      height: 200,
      backgroundColor: color_morado_o,
      borderRadius: 125,
    },
  miniButton: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 56,
    height: 42,
    width: 315,
    padding: 0,
    backgroundColor: "#EA5B31",
    borderRadius: 8,
  },

  buttonText: {
    textAlign: "center",
    padding: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: color_gris_c,
  },

  logo: {
    marginTop: 92,
    marginBottom: 22,
    marginLeft: -30,
    height: 140,
  },
  header: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color_gris_c,
    width: "100%",
  },
  bgCont: {
    flex: 1,
    marginTop: -20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color_gris_c,
  },

});
