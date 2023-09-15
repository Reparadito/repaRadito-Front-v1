import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getvideoGames } from "../../../redux/videogamesActions";

import Card from "../../utils/Card/Card";
import { color_blanco, color_gris_c } from "../../utils/theme/stringsColors";
import { ThemeContext } from "../../utils/theme/ThemeProvider";


const VideoGames = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const videoGames = useSelector((state) => state.videogamesState.videoGames);
  const stockFlag = useSelector((state) => state.stockState);
  const filteredVideoGames = useSelector(
    (state) => state.videogamesState.filteredVideoGames
  );
  const notFoundGames = useSelector(
    (state) => state.videogamesState.notFoundGames
  );

  useEffect(() => {
    console.log("Rellamando a getVidegames x cambios en stock")
    dispatch(getvideoGames());
  }, [stockFlag]);

  // Función para cargar más videojuegos
  const fetchMoreVideoGames = () => {
    // implementar la lógica para obtener más videojuegos desde API o fuente de datos
  };
  const { StringsDark, isDarkMode } = useContext(ThemeContext);

  return (
    <View style={[styles.container,
      { backgroundColor: StringsDark.Titulo_Screen_fondo },
    ]}>
      <View style={[styles.subContainer,
      { backgroundColor: StringsDark.Titulo_Screen_fondo },
    ]}>
        {console.log("notFoundGames",notFoundGames)}
        {notFoundGames ? (
          <View style={[styles.notFoundContainer,
            { backgroundColor: StringsDark.Titulo_Screen_fondo },
          ]}>
            <Text style={styles.notFoundText1}>Lo lamentamos !</Text>
            <Text style={styles.notFoundText}>
              No se encontraron Profesionales con ese nombre.
            </Text>
          </View>
        ) : (
          <FlatList 
            data={
              filteredVideoGames.length > 0 ? filteredVideoGames : videoGames
            }
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Card key={item.id} videoG={item} nav={navigation} />
            )}
            onEndReached={fetchMoreVideoGames} // Función a llamar cuando se alcanza el final de la lista
            onEndReachedThreshold={0.1} // Umbral para activar la carga de más videojuegos (valor entre 0 y 1)
            // ListFooterComponent={<Text>Loading...</Text>} // Componente de carga mientras se obtienen más videojuegos
          />
        )}

        {/* <TouchableOpacity onPress={() =>navigation.navigate('Detail', {props: videogames[0]  })}> 
          <Text style={styles.enlace2}>Enlace a ScreenDetalle</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    backgroundColor:color_blanco
  },
  subContainer: {
    backgroundColor: color_gris_c,
    width: 315,
    marginVertical: 16,
    backgroundColor:color_gris_c,
  },
  enlace2: {
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 25,
  },
  notFoundContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText1: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#987BDC",
  },
  notFoundText: {
    fontSize: 21,
    fontWeight: "bold",
  },
});

export default VideoGames;
