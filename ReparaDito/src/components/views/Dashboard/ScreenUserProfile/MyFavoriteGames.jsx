import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Button, TouchableOpacity  } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorites } from "../../../../redux/favoriteActions";
import Card from "../../../utils/Card/Card";
import Loading from '../../../helpers/Loading'
import { ThemeContext } from "../../../utils/theme/ThemeProvider";
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

const MyFavoriteGames = () => {
  const isLogged = useSelector((state) => state.usersState.isLogged);
  const favorites = useSelector((state) => state.favoriteState.favorites);
  const videoGames = useSelector((state) => state.videogamesState.videoGames);
  const [isLoading, setIsLoading] = useState(true);
  const { StringsDark, isDarkMode } = useContext(ThemeContext);
  const navigation = useNavigation(); // Obtén el objeto de navegación

  const handleCardPress = (gameId) => {
    // Navega a la pantalla de detalles con los detalles del juego
    navigation.navigate('Detail', { gameId: gameId }); // Asegúrate de que 'Detail' sea el nombre correcto de la pantalla de detalles en tu configuración de navegación
  };


  const dispatch = useDispatch();


  const [reloadCount, setReloadCount] = useState(0);
  const handleReloadButton = () => {
    setReloadCount(prevCount => prevCount + 1);
  };

  console.log("Favorites:", favorites);
  console.log(
    "Videogame ID:",
    videoGames.map((e) => e.name)
  );
  console.log("user ID:", isLogged.id);

  useEffect(() => {
    if (isLogged.id) {
      setIsLoading(true);
      dispatch(fetchFavorites(isLogged.id))
        .then(() => {
          setIsLoading(false);
        });
    }
  }, [dispatch, isLogged.id, reloadCount]);

  // Calcula si hay favoritos o no basándote en el estado de Redux 'favorites'
  const showFavorites = favorites.length > 0;

  const favoriteGameIds = favorites
    .filter((favorite) => favorite.isFav)
    .map((favorite) => favorite.videogameId);

  const favoriteGames = videoGames.filter((game) =>
    favoriteGameIds.includes(game.id)
  );

  const favoriteGamesToShow = favoriteGames.filter((game) =>
  favorites.some((favorite) => favorite.videogameId === game.id && favorite.isFav)
);

  // Componente Card interno para reutilizar estilos
  const FavoriteCard = ({ videoG }) => {
    if (!videoG) {
      // Si el videojuego no existe, no renderizar nada
      return null;
    }

    if (!gameInfo) {
      (
        <View style={styles.cardContainer}>
          <Text>No data available.</Text>
        </View>
      );
    }

    return (
      <View style={[
        styles.container,
        { backgroundColor: StringsDark.Titulo_Screen_fondo },
      ]}>
        
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: videoG.image }} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{videoG.name}</Text>
          <Text style={styles.price}>$ {videoG.price}</Text>
          {/* Otros detalles que deseas mostrar del videojuego */}
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={[styles.scrollViewContent,
      { backgroundColor: StringsDark.Titulo_Screen_fondo },
    ]}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>My favourites</Text>
      </View>
      {isLoading ? (
        <Loading />
      ) : favoriteGamesToShow.length > 0 ? (
        
        <View style={styles.cardsContainer}>          
          {favoriteGamesToShow.map((game) => (
                <TouchableOpacity
                key={game.id}
                onPress={() => handleCardPress(game.id)} // Maneja la navegación en una función separada
              >
            <Card key={game.id} videoG={game} showButtons={true} handleReloadButton={handleReloadButton} />
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.noFavoritesContainer}>
          <Text style={styles.noFavoritesText}>No favorites found.</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#622EDA",
    borderRadius: 10,
    width: 200,
    height: 50,
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  noFavoritesContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 300,
    backgroundColor: '#622EDA',
    borderRadius: 10,
    textDecorationColor: '#FAFAFA',
  },
  noFavoritesText: {
    color: "#FFFFFF", 
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center", // Centra las tarjetas horizontalmente
    paddingTop: 16,
    paddingBottom: 32,
  },
  cardsContainer: {
    alignItems: "center", // Centra las tarjetas horizontalmente
  },
  container: {
    // Estilos del contenedor de la tarjeta
    marginVertical: 8,
    flexDirection: "row",
    width: 312,
    height: 138,
    borderRadius: 10,
    shadowOpacity: 0.23,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "#987BDC",
  },
  imageContainer: {
    // Estilos del contenedor de la imagen
    alignItems: "flex-start",
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
  },
  image: {
    // Estilos de la imagen
    borderRadius: 5,
    width: 92,
    height: 112,
    resizeMode: "cover",
  },
  detailsContainer: {
    // Estilos del contenedor de los detalles
    marginTop: 8,
    alignContent: "flex-start",
  },
  name: {
    // Estilos del nombre del videojuego
    fontSize: 16,
    marginTop: 4,
    textAlignVertical: "top",
    textAlign: "left",
    fontWeight: "bold",
    width: 120,
    height: 42,
    color: "#622EDA",
  },
  price: {
    // Estilos del precio del videojuego
    marginTop: 4,
    fontSize: 26,
    textAlign: "left",
    justifyContent: "flex-start",
    fontWeight: "bold",
    height: 28,
    color: "#FFFFFF",
  },
  
  // Otros estilos necesarios
});

export default MyFavoriteGames;