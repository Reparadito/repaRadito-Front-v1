import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import MenuBottonItem from "./MenuButton";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { LanguajeContext } from "../../utils/languaje/languajeProvider";
import { ThemeContext } from "../../utils/theme/ThemeProvider";
import { ChangeButtonContext } from "../../utils/changeContextButton/ChangeContextButton";
import { useContext, useEffect } from "react";
import MenuButtonSubItem from "./MenuButtonSubItem";
import { useSelector } from "react-redux";
import { obtenerPrimerNombre } from "../../helpers/Primernombre";

const MenuItems = ({ navigation }) => {
  //esta linea debo de llamar en cada componente
  const { StringsDark } = useContext(ThemeContext);
  const { StringsLanguaje } = useContext(LanguajeContext);
  const loged = useSelector((state) => state.usersState.isLogged);

 
  
  return (
    <DrawerContentScrollView
      style={{ backgroundColor: StringsDark.menuDrawner_f }}
    >
      <View style={{ backgroundColor: StringsDark.tabBarback }}>
        <View style={styles.cabeceraimg}>
          <TouchableOpacity
            onPress={
              loged.user
                ? () => navigation.navigate("UserProfile")
                : () => navigation.navigate("RenderLogin")
            }
            style={styles.container}
          >
            <View style={styles.cabeceraText}>
              <Text
                style={[
                  styles.textoFullname,
                  { color: StringsDark.menuDrawner_t },
                ]}
              >
                {loged.fullname
                  ? `Welcome ${obtenerPrimerNombre(loged.fullname)}`
                  : "Welcome User"}
              </Text>
              <Text
                style={ { color: StringsDark.menuDrawner_t }}
              >
                {loged.user ? loged.user : ""}
              </Text>
            </View>
            <View>
              <Image
                source={
                  loged.image
                    ? { uri: loged.image }
                    : require("../../../../assets/imageUser.png")
                }
                style={styles.imgmenu}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <MenuBottonItem
        nombre={StringsLanguaje.Home}
        // nombre={"Home"}
        onPress={() => navigation.navigate("Landing")}
        icon="home-circle-outline"
      />
      <MenuBottonItem
        nombre={StringsLanguaje.allVideoG}
        // nombre={"All Videogames"}
        onPress={() => navigation.navigate("HomeStack")}
        icon="toolbox-outline"
      />
      {/* <MenuBottonItem
        nombre={StringsLanguaje.Shopping_Car}
        // nombre={"Shopping Cart"}
        onPress={() => navigation.navigate("Cart")}
        icon="cart-variant"
      /> */}
      <MenuBottonItem
        // nombre={StringsLanguaje.Login}
        nombre={loged.user ? StringsLanguaje.Logout : StringsLanguaje.Login}
        onPress={() => navigation.navigate("RenderLogin")}
        icon={loged.user ? "logout" : "login"}
      />
      {/* {loged.user&&<MenuBottonItem
        // nombre={StringsLanguaje.Login}
        nombre={"DashBoard"}
        // onPress={() => navigation.navigate("Login")}
        icon="view-dashboard"
      />} */}
      {loged.user && (
        <MenuBottonItem
          nombre={StringsLanguaje.MyProfile}
          onPress={() => navigation.navigate("UserProfile")}
          icon="account-eye-outline"
        />
      )}
      {!loged.user && (
        <MenuBottonItem
          nombre={StringsLanguaje.Register}
          // nombre={"Register"}
          onPress={() => navigation.navigate("Register")}
          icon="account-plus"
        />
      )}
      {/* Botones para cambiar el modoDark o Idioma */}
      <ChangeButtonContext
        name={
          // "DarkMode"
          StringsLanguaje.DarkMode
        }
        tipo={"theme"}
      />
      <ChangeButtonContext
        name={
          // "Language Change"
          StringsLanguaje.Languaje
        }
        tipo={"Languaje"}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  cabeceraimg: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  imgmenu: {
    marginRight: 20,
    marginTop: 24,
    marginBottom: 20,
    width: 60,
    height: 60,
    justifyContent: "flex-end",
    resizeMode: "contain",
    borderRadius: 100,
  },
  icon: {
    marginLeft: 70,
    width: 50,
    height: 50,
    // alignContent: 'flex-end',
    // alignItems: '',
    resizeMode: "contain",
    borderRadius: 100,
  },
  cabeceraText: {
    alignContent: "flex-end",
    alignItems: "flex-end",

    marginRight: 16,
  },
  btnIngresa: {
    margin: 3,
    width: 150,
    height: 40,
    // backgroundColor: color_blanco,
    borderRadius: 10,
    // color: color_crema,
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
  },
  textoFullname: {
    fontSize: 20,
    justifyContent: "flex-end",
    fontWeight: "900",
  },
  textoUser: {
    fontSize: 20,
    justifyContent: "flex-end",
    fontWeight: "600",
  },

  separator: {
    // marginVertical: 30,
    // height: 0,
    width: "100%",
    marginTop: 5,
    //  borderColor:'red',
    borderWidth: 2,
    // color: color_negro,
  },
});
export default MenuItems;
