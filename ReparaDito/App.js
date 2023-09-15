import "react-native-gesture-handler";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Drawer = createDrawerNavigator();
// variables proveedoras del tema y cambiode lenguaje
import { ThemeProvider } from "./src/components/utils/theme/ThemeProvider";
import { LanguajeProvider } from "./src/components/utils/languaje/languajeProvider";
import {
  color_morado_o,
  color_morado_c,
  color_blanco,
  color_naranja,
} from "./src/components/utils/theme/stringsColors";
//Pantallas a Importar
import Landing from "./src/components/views/Landing/Landing";
import Home from "./src/components/views/Home/HomeD";
import MenuItems from "./src/components/views/MenuApp/MenuItems";
import Cart from "./src/components/forms/Cart/Cart";
import Pasarella from "./src/components/forms/Cart/Pasarella";
import UserProfile from "./src/components/views/Dashboard/UserProfile.jsx";
// import { StripeProvider } from "@stripe/stripe-react-native";
import { Provider, useDispatch } from "react-redux";
import store from "./src/redux/store";
import CreateVideogame from "./src/components/views/Create/CreateVideoGame";
import Register from "./src/components/views/Create/RegisterUser";
import { Login } from "./src/components/views/Login/Login";
import { ForgotPassword } from "./src/components/views/ForgotPasword/ForgotPassword";
import { StartedSession } from "./src/components/views/Login/SessionInit";
import { RenderLogin } from "./src/components/views/Login/RenderingLogin";
import { loadItemAsyncStorage } from "./src/components/helpers/functionsAsyncStorage";
import { checkLogedUser } from "./src/redux/userActions";
import { useEffect, useState } from "react";

export default function App() {


  const dispatch = useDispatch;
  useEffect(() => {
    async function fetchData() {
      const logedData = await loadItemAsyncStorage("logedGameStack");
      if (logedData.user && logedData.deleted=== false) dispatch(checkLogedUser());
    }
    fetchData();
  }, []);

  return (
    <>
      <LanguajeProvider>
        <ThemeProvider>
          {/* <StripeProvider publishableKey="pk_test_51N7eXtIEe9GBUqtLHqAuwlTor3giWSzd60ooicGwoYQysemKeOM288y3908V2pTq2KCwBkYotvhMnRRPQ2WStRLZ00SfULJJhC" /> */}
          <Provider store={store}>
            <NavigationContainer>
              <Drawer.Navigator
                drawerContent={(props) => <MenuItems {...props} />}
              >
                <Drawer.Screen
                  name="Landing"
                  component={Landing}
                  options={{
                    title: ``,
                    headerStyle: {
                      backgroundColor: color_blanco,
                    },
                    headerTintColor: color_morado_o,
                    headerTitleStyle: {
                      fontWeight: "bold",
                      fontSize: 25,
                    },
                  }}
                />
                <Drawer.Screen
                  name="HomeStack"
                  component={Home}
                  initialParams={{ fromChild: "Initial" }}
                  options={{
                    title: "",
                    headerStyle: {
                      backgroundColor: color_blanco,
                    },
                    headerTintColor: color_morado_o,
                    headerTitleStyle: {
                      fontWeight: "bold",
                      fontSize: 25,
                    },
                  }}
                />

                <Drawer.Screen
                  name="Cart"
                  component={Cart}
                  options={{
                    title: "",
                    headerStyle: {
                      backgroundColor: color_blanco,
                    },
                    headerTintColor: color_morado_o,
                    headerTitleStyle: { fontWeight: "bold", fontSize: 25 },
                  }}
                />

                <Drawer.Screen
                  name="CreateVideogame"
                  component={CreateVideogame}
                  options={{
                    title: "",
                    headerStyle: {
                      backgroundColor: color_blanco,
                    },
                    headerTintColor: color_morado_o,
                    headerTitleStyle: { fontWeight: "bold", fontSize: 25 },
                  }}
                />

                <Drawer.Screen
                  name="Login"
                  component={Login}
                  options={{
                    title: "",
                    headerStyle: {
                      backgroundColor: color_blanco,
                    },
                    headerTintColor: color_morado_o,
                    headerTitleStyle: { fontWeight: "bold", fontSize: 25 },
                  }}
                />

                <Drawer.Screen
                  name="Register"
                  component={Register}
                  options={{
                    title: "",
                    headerStyle: {
                      backgroundColor: color_blanco,
                    },
                    headerTintColor: color_morado_o,
                    headerTitleStyle: { fontWeight: "bold", fontSize: 25 },
                  }}
                />

                <Drawer.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}
                  options={{
                    title: "",
                    headerStyle: {
                      backgroundColor: color_blanco,
                    },
                    headerTintColor: color_morado_o,
                    headerTitleStyle: { fontWeight: "bold", fontSize: 25 },
                  }}
                />
                <Drawer.Screen
                  name="Pasarella"
                  component={Pasarella}
                  options={{
                    title: "",
                    headerStyle: {
                      backgroundColor: color_blanco,
                    },
                    headerTintColor: color_morado_o,
                    headerTitleStyle: {
                      fontWeight: "bold",
                      fontSize: 25,
                    },
                  }}
                />

                <Drawer.Screen
                  name="UserProfile" //aqui va el nombre con el q lo vas a llamar dese el menu items
                  component={UserProfile}
                  options={{
                    title: "",
                    headerStyle: {
                      backgroundColor: color_blanco,
                    },
                    headerTintColor: color_morado_o,
                    headerTitleStyle: {
                      fontWeight: "bold",
                      fontSize: 25,
                    },
                  }}
                />

                <Drawer.Screen
                  name="StartedSession" //aqui va el nombre con el q lo vas a llamar dese el menu items
                  component={StartedSession}
                  options={{
                    title: "StartedSession",
                    headerStyle: {
                      backgroundColor: color_blanco,
                    },
                    headerTintColor: color_morado_o,
                    headerTitleStyle: {
                      fontWeight: "bold",
                      fontSize: 25,
                    },
                  }}
                />

                <Drawer.Screen
                  name="RenderLogin" //aqui va el nombre con el q lo vas a llamar dese el menu items
                  component={RenderLogin}
                  options={{
                    title: "",
                    headerStyle: {
                      backgroundColor: color_blanco,
                    },
                    headerTintColor: color_morado_o,
                    headerTitleStyle: {
                      fontWeight: "bold",
                      fontSize: 25,
                    },
                  }}
                />
                {/*
                <Drawer.Screen
                  name="Dashboard"
                  component={Dashboard}
                  options={{
                    title: "Dashboard",
                    headerStyle: {
                      backgroundColor: color_azul,
                    },
                    headerTintColor: color_blanco,
                    headerTitleStyle: {
                      fontWeight: "bold",
                      fontSize: 25,
                    },
                  }}
                />

              
                /> */}
              </Drawer.Navigator>
            </NavigationContainer>
          </Provider>
        </ThemeProvider>
      </LanguajeProvider>
    </>
  );
}
