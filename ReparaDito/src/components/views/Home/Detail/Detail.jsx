import { View, Text } from "react-native";
import React, { useEffect, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";
import DetailExtra from "./DetailExtra";
import DetailInfo from "./DetailInfo";
import DetailScreenHots from "./DetailScreenHots";

//linea para llamar a modo DARK
import { ThemeContext } from "../../../utils/theme/ThemeProvider";
//linea para modificar el contexto de localizacion para el lenaguje
import { LanguajeContext } from "../../../utils/languaje/languajeProvider";
const TabInfo = (props) => {
  // console.log("q recibo por props tab info", props.parametro1)
  return (
    <>
      <DetailInfo propInfo={props.parametro1} />
    </>
  );
};
const TabCarrousel = (props) => {
  // console.log("screnshoots", props.screenShots)
  return (
    <>
      <DetailScreenHots propCarrousel={props.screenShots} />
    </>
  );
};
const TabExtra = (props) => {
  //  console.log("props TabExtra", props.parametro3)
  return (
    <>
      <DetailExtra propExtra={props.parametro3} />
    </>
  );
};
const Detail = ({ route, navigation }) => {
  const Tab = createBottomTabNavigator();
  //linea para setear el modo dark
  const { isDarkMode, StringsDark } = useContext(ThemeContext);
  //linea para setear el lenguaje /obtener palabras de lenguaje
  const { StringsLanguaje, locale } = useContext(LanguajeContext);

  useEffect(() => {
    navigation.setOptions({
      // headerTitle: `Back`,
      headerTitle: `${StringsLanguaje.back}`,
      headerTintColor: StringsDark.Titulo_Screen,
      headerStyle: {
        backgroundColor: StringsDark.Titulo_Screen_fondo,
      },
    });
  }, [isDarkMode, locale]);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: `${StringsDark.tabBarback}`,
        },
        tabBarStyle: {
          backgroundColor: `${StringsDark.tabBarback}`,
        },
        tabBarLabelStyle: {
          color: `${StringsDark.tabBarbackText}`,
        },
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 25,
          color: `${StringsDark.tabBarbackText}`,
        },
      })}
    >
      <Tab.Screen
        name={`information`} //detalle de CARD
        options={({ route }) => ({
          title: `${StringsLanguaje.Information}`,
          // title: `Information`,
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons
              name="information-circle-outline"
              color={`${StringsDark.tabBarIcono}`}
              // backgroundColor={StringsDark.Titulo_Screen_fondo}
              size={size}
            />
          ),
        })}
      >
        {(props) => <TabInfo {...props} parametro1={route.params.videoGames} />}
      </Tab.Screen>

      <Tab.Screen
        name="Capturas de Pantalla"
        options={{
          title: `${StringsLanguaje.Screenshot}`,
          // title: `Screenshot`,
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons
              name="images-outline"
              color={`${StringsDark.tabBarIcono}`}
              // backgroundColor={StringsDark.Titulo_Screen_fondo}
              size={size}
            />
          ),
        }}
      >
        {(props) => (
          <TabCarrousel
            {...props}
            screenShots={route.params.videoGames.screenShots}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Extra"
        options={{
          title: `${StringsLanguaje.Extra}`,
          // title: `Extra`,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="file-tray-stacked-outline"
              color={`${StringsDark.tabBarIcono}`}
              // backgroundColor={StringsDark.Titulo_Screen_fondo}
              size={size}
            />
          ),
        }}
      >
        {(props) => (
          <TabExtra {...props} parametro3={route.params.videoGames} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default Detail;
