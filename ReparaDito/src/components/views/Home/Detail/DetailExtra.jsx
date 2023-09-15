import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  Button,
  Linking
} from 'react-native';

import HTML from 'react-native-render-html';
// import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useContext, useState } from 'react';
import * as React from "react";
import * as Location from "expo-location"
import { ThemeContext } from '../../../utils/theme/ThemeProvider';
import { LanguajeContext } from '../../../utils/languaje/languajeProvider';
import MapView, { Marker, Polyline }from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_KEY } from "@env";
// import { Linking } from 'expo';

const carImage = require("../../../../../assets/car.png")

const CardExtra = (videogame) => {

  const [origin, setOrigin] = useState({
    latitude: -33.745356,
    longitude: -61.968120,
  });

  const [destination, setDestination] = useState({
    latitude: -34.6325612,
    longitude: -58.7488204,
  });

  const openGoogleMapsNavigation = () => {
    const { latitude, longitude } = destination;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
    Linking.openURL(url);
  };

  useEffect(() => {
    getLocationPermission();
  }, [origin])

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted') {
      alert('Permission denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
    setOrigin(current);
  }



  // const {requeriments_en}=videogame.propExtra;
  const windowWidth = useWindowDimensions().width;

  //linea para setear el modo dark
  const {isDarkMode, StringsDark } = useContext(ThemeContext);
  //linea para setear el lenguaje /obtener palabras de lenguaje
  const { locale,StringsLanguaje } = useContext(LanguajeContext);

  let Req = videogame.propExtra.requeriments_en;
  
  const tagsStyles = {
    p: { color: StringsDark.text, fontSize: 30 },
    strong: { fontWeight: 'bold', color: StringsDark.tit_det_extra },
    a: {
      color: StringsDark.link,
      fontSize: 15,
      textDecorationLine: 'underline',
    },
    li: { color: StringsDark.text, fontSize: 13 }, //textp viñeta
    ul: { color: StringsDark.viñeta, fontSize: 20 }, //viñeta
  };

  const getIconName = (item) => {
    let iconName = 'help-circle-outline'; // Icono por defecto

    if (item.length >= 2) {
      const platformPrefix = item.substring(0, 2).toLowerCase();
      console.log("platformPrefix",item)
      // Asigna el nombre del icono en función de las tres primeras letras
      if (platformPrefix === 'pl') {
        iconName = 'sony-playstation';
      } else if (platformPrefix === 'xb') {
        iconName = 'microsoft-xbox';
      } else if (platformPrefix === 'ni') {
        iconName = 'nintendo-switch';
      } else if (platformPrefix === 'pc') {
        iconName = 'microsoft-windows';
      } else if (platformPrefix === 'ma') {
        iconName = 'apple-ios';
      } else if (platformPrefix === 'an') {
        iconName = 'android';
      } else if (platformPrefix === 'li') {
        iconName = 'penguin';
      }
    }

    return iconName;
  };

  return (
    <View style={[styles.Container,
            { backgroundColor: StringsDark.Titulo_Screen_fondo },
          ]}>
      <MapView 
        style={styles.map} 
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04
        }}
      >
        <Marker 
          draggable
          coordinate={origin}
          image={carImage}
          onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
        />
        <Marker 
          draggable
          coordinate={destination}
          onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
        />
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_KEY}
          strokeColor="blue"
          strokeWidth={5}
        />

        {/* <Polyline
          coordinates={[ origin, destination ]}
          strokeColor="pink"
          strokeWidth={8}
        /> */}
      </MapView>

      {/* <View origin={origin} >       */}
        {/* <Marker coordinate={destination} title="Destino" /> */}
      
    {/* </View> */}
      <Button title="Viajar con Google Maps" onPress={openGoogleMapsNavigation} />

    </View>
    // <ScrollView contentContainerStyle={styles.containerS}>
    //   <View
    //     style={[
    //       styles.Container,
    //       { backgroundColor: StringsDark.Titulo_Screen_fondo },
    //     ]}
    //   >

    //     {Req.length > 0 && (
    //       <Text style={[styles.reqtitle, { color: StringsDark.tit_det_extra }]}>
    //         {StringsLanguaje.systemRequeriments}
          
    //       </Text>
    //     )}
    //   {typeof(Req)==='string' &&
    //     <View style={styles.htmlContainer}>
    //     <HTML
    //       source={{ html: Req }}
    //       contentWidth={windowWidth}
    //       tagsStyles={tagsStyles}
    //     />
    //   </View>
    //   }
    //     {Req.length > 0 && typeof(Req)==='object' && (
    //       <View>
    //         {Req.map((item, index) => (
    //           <View key={index} style={styles.htmlContainer}>
    //             <HTML
    //               source={{ html: item.minimum }}
    //               contentWidth={windowWidth}
    //               tagsStyles={tagsStyles}
    //             />

    //             {item.recommended && (
    //               <HTML
    //                 source={{ html: item.recommended }}
    //                 contentWidth={windowWidth}
    //                 tagsStyles={tagsStyles}
    //               />
    //             )}
    //           </View>
    //         ))}
    //       </View>
    //     )}
    //     <View>
    //       {videogame.propExtra.platforms.length > 0 && (
    //         <Text
    //           style={[styles.reqtitle, { color: StringsDark.tit_det_extra }]}
    //         >
    //           {StringsLanguaje.Plataformas}
    //           {/* {"Platforms"} */}
    //         </Text>
    //       )}

    //       {videogame.propExtra.platforms.length > 0 &&
    //         videogame.propExtra.platforms.map((item, index) => (
    //           <View key={index}>
    //             <Text style={[styles.text, { color: StringsDark.text }]}>
    //               <MaterialCommunityIcons
    //                 name={getIconName(item)}
    //                 size={20}
    //                 color={StringsDark.cartButton}
    //               />
    //               &nbsp;{item}
    //             </Text>
    //           </View>
    //         ))}
    //       {videogame.propExtra.genre.length > 0 && (
    //         <Text
    //           style={[styles.reqtitle, { color: StringsDark.tit_det_extra }]}
    //         >
    //           {StringsLanguaje.Genres}
    //           {/* {"Genres"} */}
    //         </Text>
    //       )}
    //       {videogame.propExtra.genre.length > 0 &&
    //         videogame.propExtra.genre.map((item, index) => (
    //           <View key={index}>
    //             <Text style={[styles.text, { color: StringsDark.text }]}>
    //               <MaterialCommunityIcons
    //                 name="tag-text"
    //                 size={20}
    //                 color={StringsDark.cartButton}
    //               />
    //               &nbsp;{item}
    //             </Text>
    //           </View>
    //         ))}
    //     </View>
    //   </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerS: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Container: {
    // margin: 40,
    marginLeft:1,
    marginRight: 1,
    // flex: 1,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    width: '100%',
    height:"50%",
    borderRadius: 8,
  },
  title: {
    marginLeft: 15,
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'left',
    fontWeight: '800',
  },
  text: {
    marginLeft: 15,
    fontSize: 18,
    marginTop: 8,
    fontWeight: '800',
  },
  reqtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  req: {
    fontSize: 20,
  },
  htmlContainer: {
    
    marginLeft: 10,
    textAlign: 'right',
  },
  iconos: {
    flexDirection: 'row',
  },
  map:{
    width: "100%",
    height: "100%"
  },

  map: {
    flex: 1,
  },
});

export default CardExtra;