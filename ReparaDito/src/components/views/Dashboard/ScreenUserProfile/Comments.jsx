import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getAllReviews } from "../../../../redux/reviewActions";
import { convertirFecha } from "../../../helpers/InvertDate";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../../helpers/Loading";
import { ThemeContext } from "../../../utils/theme/ThemeProvider";

const Comments = () => {
  const navigation = useNavigation(); // Correctly using useNavigation hook

  //Estado donde traigo los juegos para sacar la info (Imagen, titulo)
  const videoGames = useSelector((state) => state.videogamesState.videoGames);
  //console.log('Toda la data devideoGames:',videoGames);
  //De aca me traigo TODAS las review
  const reviews = useSelector((state) => state.reviews.reviews);
  //De aca sacamos la informacion del usuario para hacer el filtro de comentarios por usuario
  const isLogged = useSelector((state) => state.usersState.isLogged);
  //Boludaso el que lee aca.
  const dispatch = useDispatch();
  const { StringsDark, isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    // Llamar a la función que obtiene todas las reviews
    //console.log('Toda la data de reviews:', reviews);
    dispatch(getAllReviews());
  }, [dispatch]);

  // Filtrar las reviews para mostrar solo las que coincidan con el usuario conectado
  const userReviews = reviews.filter((review) => review.user === isLogged.user);
  const showComments = userReviews.length > 0;

  // Crear un diccionario para buscar la información del juego por su id
  const videoGameDict = {};
  videoGames.forEach((game) => {
    videoGameDict[game.id] = {
      title: game.name,
      image: game.image, // Asumimos que el campo "image" contiene la URL de la imagen del juego
    };
  });

  const renderReviewCard = ({ item }) => {
    const gameInfo = videoGameDict[item.videogameId];

    const handleReviewPress = (videogameId) => {
      // Obtén el objeto de videojuego específico utilizando el videogameId
      const selectedGame = videoGames.find((game) => game.id === videogameId);
      if (selectedGame) {
        navigation.navigate("HomeStack", {
          screen: "Detail",
          params: { videoGames: selectedGame },
        });
      }
    };

    if (!gameInfo) {
      return (
        <TouchableOpacity onPress={() => handleReviewPress(item.videogameId)}>
          <View style={styles.reviewCard}>
            <Text style={styles.deletedGameText}>You cannot see the comment of a game that was deleted</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity onPress={() => handleReviewPress(item.videogameId)}>
        <View style={styles.reviewCard}>
          <Image source={{ uri: gameInfo.image }} style={styles.image} />
          <View style={styles.reviewInfoContainer}>
            <Text style={styles.gameTitle} numberOfLines={1}>
              Game Title: {gameInfo.title}
            </Text>
            <Text style={styles.user}>User: {item.user}</Text>
            <Text style={styles.reviewDate}>
              Review Date: {convertirFecha(item.reviewDate)}
            </Text>
            <Text style={styles.reviewComment} numberOfLines={2}>
              Comment: {item.comment}
            </Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>Rating: {item.rating}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: StringsDark.Titulo_Screen_fondo },
    ]}>
      <ScrollView>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>My reviews</Text>
      </View>
        {showComments ? (
          
          <FlatList
            data={userReviews}
            renderItem={renderReviewCard}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <View style={styles.noCommentsContainer}>
            <Text style={styles.noCommentsText}>No comments found.</Text>
          </View>
        )}
      </ScrollView>
    </View>
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
    marginLeft: 80,

  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  noCommentsContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 300,
    backgroundColor: '#622EDA',
    textDecorationColor: '#FAFAFA',
    borderRadius: 10,
    marginLeft: 35,
  },
  noCommentsText: {
    color: "#FFFFFF", 
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  reviewCard: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#987BDC", // Cambio del color de fondo
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 8,
  },
  reviewInfoContainer: {
    marginLeft: 10,
  },
  user: {
    fontSize: 16,
  },
  reviewDate: {
    fontSize: 14,
    color: "#4528F4",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    marginRight: 5,
    fontWeight: "bold",
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    flexWrap: "wrap",
    maxWidth: 200, // Establecemos un ancho máximo para el texto
  },
  reviewComment: {
    fontSize: 14,
    flexWrap: "wrap",
    maxWidth: 200, // Establecemos un ancho máximo para el texto
  },
  deletedGameText: {
    textAlign: "center",
    fontSize: 18,
    color: "#FAFAFA",
  }
});

export default Comments;
