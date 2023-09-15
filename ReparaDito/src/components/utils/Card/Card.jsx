import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React from "react";
// import StarRating from "react-native-star-rating";
import { AirbnbRating } from "react-native-ratings";
import { InsertarItem } from "../../forms/Cart/CardCartController";
import { updateCart } from "../../../redux/cartSlice";
import { useDispatch, useSelector  } from "react-redux";
import GameRating from "../../views/Home/Detail/GameRating";
import { useState, useRef, useEffect ,useContext  } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable"; // Importamos la librería para las animaciones
import {
  color_blanco,
  color_gris_c,
  color_morado_o,
} from "../theme/stringsColors";
import { color } from "react-native-reanimated";
import { toggleFavorite } from "../../../redux/favoriteActions";
//linea para modificar el contexto de localizacion para el lenaguje
import { LanguajeContext } from "../../utils/languaje/languajeProvider";
const Card = (props) => {
  const { videoG, nav, showButtons = true } = props;



  {
    /* Botón de favoritos -> NO BORRAR COMENTARIOS POR EL AMOR DE DIOS. */
  }
  const favorites = useSelector((state) => state.favoriteState.favorites);
  const heartRef = useRef(null); // Referencia para la animación del corazón
  const cartRef = useRef(null); // Referencia para la animación del corazón
  const isLogged = useSelector((state) => state.usersState.isLogged);

 // Obtener la lista de favoritos del estado global
 // Verificar si el juego actual está en la lista de favoritos


 const [isCurrentlyFavorite, setIsCurrentlyFavorite] = useState(
  favorites.some((favorite) => favorite.videogameId === videoG.id && favorite.isFav)
);


const handleToggleFavorite = () => {
  if (!isLogged.id) {
    Alert.alert("Login Required", "Please log in to add this game to favorites.");
    return;
  }

  const newIsFav = !isCurrentlyFavorite;
  const favoriteData = {
    videogameId: videoG.id,
    userId: isLogged.id,
    isFav: newIsFav,
  };

  console.log("Dispatching toggleFavorite with data:", favoriteData);

  dispatch(toggleFavorite(favoriteData.userId, favoriteData.videogameId, favoriteData.isFav))
    .then(() => {
      setIsCurrentlyFavorite(!isCurrentlyFavorite); // Cambiamos el estado local directamente
      if (props.handleReloadButton) {
        props.handleReloadButton(); // Llama a la función handleReloadButton desde las props
      }
    })
    .catch((error) => {
      // Handle error if needed
      console.error("Error toggling favorite:", error);
    });
};


  const { StringsLanguaje, locale } = useContext(LanguajeContext);
  {
    /* Botón de favoritos -> NO BORRAR COMENTARIOS POR EL AMOR DE DIOS. */
  }

  const dispatch = useDispatch();
  // Función para actualizar el rating del videojuego en la tarjeta inicial (Home)
  const [videoGames, setVideoGames] = useState([]);
  //PARSEANDO OBJETO PARA AGREGAR AL CARRITO
  let objeto = {
    id: videoG.id,
    title: videoG.name,
    price: videoG.price,
    img: videoG.image,
    stock: videoG.stock,
    amount: Number(1),
  };
  const objString = JSON.stringify(objeto);

  const key = "cart" + videoG.id;
  // console.log("generado clave cart",key)

  // Función para actualizar el rating del videojuego en la tarjeta inicial (Home)
  const updateCardRating = (newRating) => {
    const updatedVideoGames = videoGames.map((videoGame) => {
      if (videoGame.id === videoG.id) {
        return { ...videoGame, rating: newRating };
      } else {
        return videoGame;
      }
    });
    setVideoGames(updatedVideoGames);
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.imageContainer}>
          {/* Imagen del videojuego */}
          <TouchableOpacity
            onPress={() => nav.navigate("Detail", { videoGames: videoG })}

>
            <Image
              style={styles.image}
              source={{ uri: videoG.image }}
              PlaceholderContent={
                <ActivityIndicator color={"#FFFFFF"} size={"large"} />
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          {/* Nombre del videojuego */}
          <Text style={styles.name}>{videoG.name}</Text>

          {/* Rating del videojuego */}
          <View style={styles.rating}>
            <AirbnbRating
              count={5}
              defaultRating={videoG.rating}
              size={20}
              showRating={false}
              selectedColor="gold"
              isDisabled={true}
            />
          </View>

        {/* Fila que contiene el precio y el corazón */}
        <View style={styles.priceAndFavoriteContainer}>
            {/* Precio del videojuego */}
            <Text style={styles.price}>{videoG.price}</Text>

            {/* Espacio entre el precio y el corazón */}
            <View style={styles.space} />

            {/* Botón de favoritos (si showButtons es verdadero) */}
            {showButtons && (
              <View style={styles.heart}>
                <TouchableOpacity onPress={handleToggleFavorite}>
                  <Animatable.View ref={heartRef}>
                  <MaterialCommunityIcons
                style={styles.heartIcon}
                name={isCurrentlyFavorite ? "heart" : "heart-outline"}
                size={28}
                color={isCurrentlyFavorite ? "#622EDA" : "#595959"}
              />
                  </Animatable.View>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Botón "Add to cart" (si showButtons es verdadero) */}
          {/* {showButtons && (
            <TouchableOpacity
            style={styles.AddCartContainer}
              onPress={() => {
                if(videoG.stock===0){
                  alert(StringsLanguaje.stockOut2)
                }else {
                InsertarItem(
                  key,
                  objString,
                  videoG.stock,
                  StringsLanguaje.AddingItem,
                  StringsLanguaje.Item_added,
                  StringsLanguaje.stockOut,
                  StringsLanguaje.warning,
                );
                dispatch(updateCart());
                }
              }}
            >
              <Animatable.View ref={cartRef}>
                <MaterialCommunityIcons
                  name={"cart-plus"}
                  size={28}
                  color={color_gris_c}
                />
              </Animatable.View>
            </TouchableOpacity>
          )} */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  priceAndFavoriteContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  container: {
    marginVertical: 8,
  },
  subContainer: {
    flexDirection: "row",

    width: 312,
    height: 138,
    // marginHorizontal: 10,
    borderRadius: 10,
    // shadowColor: 'black',
    shadowOpacity: 0.23,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "#987BDC",
  },

  imageContainer: {
    alignItems: "flex-start",
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
  },
  image: {
    borderRadius: 5,
    width: 95,
    height: 95,
    resizeMode: "cover",
  },
  detailsContainer: {
    marginTop: 8,
    alignContent: "flex-start",
  },
  name: {
    fontSize: 16,
    marginTop: 4,
    textAlignVertical: "top",
    textAlign: "left",
    fontWeight: "bold",
    width: 120,
    height: 42,
    color: color_morado_o,
  },
  rating: {
    fontSize: 16,
  },
  heart: {
    elevation:10,
    position: "absolute",
    left: 150,
    bottom: 68,
    color: color_blanco,
  },
  AddCartContainer: {
    elevation:999,
    position: "absolute",
    left: 150,
    bottom: 48,
  },
  price: {
    marginTop: 4,
    fontSize: 26,
    textAlign: "left",
    justifyContent: "flex-start",
    fontWeight: "bold",
    height: 28,
    color: color_blanco,
  },
  addItemCar: {
    margin: 5,
    // marginLeft:10,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 15,
    width: 110,
    // backgroundColor:'white'
  },
});

export default Card;