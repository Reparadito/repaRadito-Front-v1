import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import { AirbnbRating } from "react-native-ratings";
import GameRating from "./GameRating";
import { useDispatch, useSelector } from "react-redux"; // Importamos useDispatch y useSelector
import {
  sendReview,
  getReviewsByVideogameId,
} from "../../../../redux/reviewActions"; // Importamos la acción creada anteriormente
import { convertirFecha } from "../../../helpers/InvertDate";
import { InsertarItem } from "../../../forms/Cart/CardCartController";
import { updateCart } from "../../../../redux/cartSlice";
import { ThemeContext } from "../../../utils/theme/ThemeProvider";
import { LanguajeContext } from "../../../utils/languaje/languajeProvider";
import WhatsAppButton from "./WhatsAppButton ";
import FacebookButton from "./FacebookButton ";
import InstagramButton from "./InstagramButton";

const DetailInfo = (props) => {
  //linea para setear el modo dark
  const { isDarkMode, StringsDark } = useContext(ThemeContext);
  //linea para setear el lenguaje /obtener palabras de lenguaje
  const { locale, StringsLanguaje } = useContext(LanguajeContext);

  const [ratingV, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [reviewDate, setReviewDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [recommendation, setRecommendation] = useState(true);
  // const [hashtags, setHashtags] = useState([""]);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorComment, setErrorComment] = useState(false);
  // const [errorHashtag, setErrorHashtag] = useState(false);
  const [comments, setComments] = useState([]);

  // Obtenemos el estado isLogged para verificar si el usuario está logueado
  const isLogged = useSelector((state) => state.usersState.isLogged);
  const token = useSelector((state) => state.usersState.userToken);
  const username = isLogged.user;

  // Estado para indicar si se debe cargar los comentarios o no
  const [shouldLoadComments, setShouldLoadComments] = useState(false);

  // Función para cargar los comentarios cuando se presione el botón
  const handleLoadComments = () => {
    setShouldLoadComments(true);
  };
  // Efecto para cargar los comentarios del juego actual desde Redux cuando cambie de juego
  useEffect(() => {
    // Solo solicitamos los comentarios si se presionó el botón "Cargar comentarios"
    if (shouldLoadComments) {
      //console.log("Obteniendo comentarios para el juego:", props.propInfo.name);
      dispatch(getReviewsByVideogameId(currentVideogameId));
      setShouldLoadComments(false); // Reiniciamos el estado para futuras actualizaciones
    }
  }, [dispatch, currentVideogameId, shouldLoadComments]);

  const { name, description, price, rating, image } = props.propInfo;
  const [showFullDescription, setShowFullDescription] = useState(false);
  // Nuevo estado local para almacenar los comentarios del juego actual
  const [currentGameComments, setCurrentGameComments] = useState([]);
  // Efecto para cargar los comentarios del juego actual desde Redux cuando cambie de juego
  useEffect(() => {
    // Solo solicitamos los comentarios si no hay comentarios cargados previamente o si cambia el videogameId
    if (
      currentGameComments.length === 0 ||
      currentGameComments[0]?.videogameId !== currentVideogameId
    ) {
      //console.log("Getting feedback for the game:", props.propInfo.name);
      dispatch(getReviewsByVideogameId(currentVideogameId));
    }
  }, [dispatch, currentVideogameId, currentGameComments]);

  // Actualiza el estado "currentGameComments" con los comentarios obtenidos desde Redux
  useEffect(() => {
    setCurrentGameComments(commentsForCurrentVideogame);
  }, [commentsForCurrentVideogame]);

  // Obtenemos el estado de carga desde Redux
  const loading = useSelector((state) => state.reviews.loading);
  // Obtenemos el videogameId del juego actual
  const currentVideogameId = props.propInfo.id;

  // Filtrar los comentarios por el videogameId del juego actual
  const commentsForCurrentVideogame = comments.filter(
    (comment) => comment.videogameId === currentVideogameId
  );

  // Aquí obtenemos el estado de las revisiones (reviews) desde Redux
  const reviews = useSelector((state) => state.reviews.reviews);

  useEffect(() => {
    setComments(reviews); // Actualiza el estado "comments" con los comentarios
  }, [reviews]);

  useEffect(() => {
    //console.log("Comentarios recibidos desde Redux:", reviews);
    // Aquí, los comentarios recibidos desde Redux se mostrarán correctamente en la vista.
  }, [reviews]);

  useEffect(() => {
    // Solo solicitamos los comentarios si no hay comentarios cargados previamente
    if (reviews.length === 0) {
      //console.log("videogameId:", props.propInfo.id);
      dispatch(getReviewsByVideogameId(props.propInfo.id));
    }
  }, [dispatch, props.propInfo.id, reviews.length]);

  // Aquí obtenemos el dispatch desde Redux para poder utilizar la acción sendReview
  const dispatch = useDispatch();

  const handleRating = (value) => {
    setRating(value);
  };

  const putRating = () => {
    alert(`Score ${ratingV} has been set successfully`);
  };

  // Función para actualizar el rating en la tarjeta inicial
  //const updateCardRating = (newRating) => {
  // Puedes utilizar el estado local o Redux para mantener los datos de los videojuegos mostrados en la vista inicial y actualizar el rating del videojuego correspondiente.
  // ver si la información de los videojuegos se encuentra en el estado local o viene de Redux
  //   const setRating = videoGames.map((videoGame) => {
  //     if (videoGame.id === gameId) {
  //       return { ...videoGame, rating: newRating };
  //     } else {
  //       return videoGame;
  //     }
  //   });

  //   // Actualizar el estado local con los videojuegos actualizados

  //   setRating(newRating); // Actualizar el rating en la vista de detalle

  // };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleTitleChange = (text) => {
    setTitle(text);
    setErrorTitle(false);
  };

  const handleCommentChange = (text) => {
    setComment(text);
    setErrorComment(false);
  };

  const handleRecommendationChange = () => {
    setRecommendation((prevRecommendation) => !prevRecommendation);
  };

  // const isValidHashtag = (text) => {
  //   // Expresión regular para validar el hashtag
  //   const hashtagRegex = /^#[A-Za-z]+$/;
  //   return hashtagRegex.test(text);
  // };

  // const handleHashtagChange = (index, text) => {
  //   if (text === "" || /^#[A-Za-z]*$/.test(text)) {
  //     setHashtags((prevHashtags) => {
  //       const updatedHashtags = [...prevHashtags];
  //       updatedHashtags[index] = text;
  //       return updatedHashtags;
  //     });
  //     setErrorHashtag(false);
  //   } else {
  //     setErrorHashtag(true);
  //   }
  // };

  // const addHashtagInput = () => {
  //   setHashtags([...hashtags, ""]);
  // };

  // const removeHashtagInput = (index) => {
  //   setHashtags((prevHashtags) => {
  //     const updatedHashtags = [...prevHashtags];
  //     updatedHashtags.splice(index, 1);
  //     return updatedHashtags;
  //   });
  //   setErrorHashtag(false);
  // };

  const validateForm = () => {
    let valid = true;
    if (!title.trim()) {
      setErrorTitle(true);
      valid = false;
    }
    if (!comment.trim()) {
      setErrorComment(true);
      valid = false;
    }
    return valid;
  };

  const submitComment = () => {
    if (isLogged && token) {
      if (validateForm()) {
        // Generate a random playtime between 1 and 3000 hours
        const randomPlaytime = Math.floor(Math.random() * 3000) + 1;
        // // Modify this line to remove double hashtags
        // const formattedHashtags = hashtags
        //   .filter((tag) => tag.trim().startsWith("#"))
        //   .map((tag) => tag.trim());

        const generateRandomToken = (length) => {
          const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          let token = "";
          for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            token += characters[randomIndex];
          }
          return token;
        };

        const randomUserId = Math.floor(Math.random() * 3000) + 1;

        const randomToken = generateRandomToken(10); // Puedes ajustar la longitud según tus necesidades
        const videogameId = props.propInfo.id;

        // Create the new comment object
        const newComment = {
          id: reviews.length + 1, // Modificamos para usar el estado de Redux
          userId: randomUserId, // Agregar el userId aleatorio aquí
          videogameId: videogameId, // Agregar el videogameId aquí
          title: title,
          rating: ratingV,
          comment: comment,
          reviewDate: reviewDate,
          recommendation: recommendation,
          // hashtags: formattedHashtags,
          playtime: randomPlaytime,
          token: generateRandomToken(10), // Puedes ajustar la longitud según tus necesidades
          user: isLogged.user, // Agrega el nombre de usuario al objeto del comentario
        };

        // Actualiza el array de comentarios con el nuevo comentario
        dispatch(sendReview(newComment));
        // Llama a la función después de enviar el comentario

        // Reset the rating, title, comment, and hashtags state for the next comment
        setRating(0);
        setTitle("");
        setComment("");
        setReviewDate(new Date().toISOString().slice(0, 10));
        setRecommendation(true);
        // setHashtags([""]);
        setErrorTitle(false);
        setErrorComment(false);
        // setErrorHashtag(false);
        setTimeout(afterSubmitComment, 1000);
      }
      //  else {
      //   setErrorHashtag(true);
      // }
    } else {
      console.log("User not logged in. Unable to submit review.");
    }
  };

  const afterSubmitComment = () => {
    handleLoadComments();
  };

  let objeto = {
    id: props.propInfo.id,
    title: props.propInfo.name,
    price: props.propInfo.price,
    img: props.propInfo.image,
    stock: props.propInfo.stock,
    amount: Number(1),
  };
  const objString = JSON.stringify(objeto);

  const key = "cart" + props.propInfo.id;

  const processUsername = (username) => {
    if (username && username.includes('@')) {
      const processedUsername = username.replace(/@.*$/, ''); // Elimina todo después del símbolo @
      return processedUsername;
    }
    return username;
  };



  // console.log("esto es lo q tengo en OBJ",objeto)
  // console.log("esto es lo q tengo en key",key)
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: StringsDark.Titulo_Screen_fondo },
      ]}
    >
      <View style={styles.infoContainer}>
        
      <View style={styles.imageContainer}>
      <Image style={styles.image} source={{ uri: image }} />
      </View>
      

        <View style={styles.infoSubContainer}>
        <Text style={[styles.gameName, { color: StringsDark.tit_det_extra }]}>
          {name}
        </Text>
        {/* Aquí pasamos la función updateCardRating como una prop a GameRating */}
        <GameRating
          rating={rating}
          gameId={props.propInfo.id}
          // updateCardRating={updateCardRating}
        />

        <Text style={[styles.gamePrice, { color: StringsDark.price }]}>
          {price}
        </Text>
        </View>

        <TouchableOpacity>
          <View
            style={[
              styles.button,
              { backgroundColor: StringsDark.boton_fondo },
            ]}
          >
            <WhatsAppButton phoneNumber={price} />
          </View>
        </TouchableOpacity>
        
        {!showFullDescription && (
          <TouchableOpacity onPress={toggleDescription}>
            <View
              style={[
                styles.button,
                { backgroundColor: StringsDark.boton_fondo },
              ]}
            >
              <FacebookButton facebookUsername={DetailInfo.facebookUsername} />
            </View>
          </TouchableOpacity>
        )}
        {!showFullDescription && (
          
          <TouchableOpacity onPress={toggleDescription}>
            <View
              style={[
                styles.button,
                { backgroundColor: StringsDark.boton_fondo },
              ]}
            >
              <InstagramButton instagramUsername={DetailInfo.instagramUsername} />
                {/* <Image style={styles.image} source={{ uri: image }}/> */}
            </View>
          </TouchableOpacity>
        )}

        {/* Comentarios */}
        <View
          style={[
            styles.commentsContainer,
            { backgroundColor: StringsDark.fondo_comments },
          ]}
        >
          <Text
            style={[styles.commentsHeaderText, { color: StringsDark.text }]}
          >
            Comments
          </Text>
          {/* Botón para cargar los comentarios */}
          {/* <TouchableOpacity onPress={handleLoadComments}>
            <View
              style={[
                styles.button,
                { backgroundColor: StringsDark.boton_fondo },
              ]}
            >
              <Text
                style={[styles.buttonText, { color: StringsDark.boton_texto }]}
              >
                Add a comment to this game
              </Text>
            </View>
          </TouchableOpacity> */}
          <View style={styles.commentsListContainer}>
            {commentsForCurrentVideogame.length > 0 ? (
              commentsForCurrentVideogame.map((comment) => {
                if(!comment.deleted){
                  return(
                    <View
                      key={comment.id}
                      style={[styles.comment, styles.commentsContainer]}
                    >
                      <View style={styles.commentTitleContainer}>
                        <Text style={styles.commentTitle}>{comment.title}</Text>
                      </View>
                      <Text style={styles.commentDetails}>
                        <Text style={styles.commentDetailsBold}>By:</Text>{" "}
                        <Text style={styles.commentUser}>{processUsername(comment.user)}</Text>
                      </Text>
                      <Text style={styles.commentDate}>
                        {convertirFecha(comment.reviewDate)}
                      </Text>
                      <Text style={styles.commentDetailsBoldComment}>Comment:</Text>
                      <Text style={styles.commentText}>{comment.comment}</Text>
                      <Text style={styles.commentDetails}>
                        {/* <Text style={styles.commentDetailsBold}>Playtime:</Text>{" "}
                        {comment.playtime} hours - */}
                        <Text style={styles.commentDetailsBold}>
                          {" "}
                          Recommendation:
                        </Text>{" "}
                        {comment.recommendation ? "👍" : "👎"}
                      </Text>
                      {/* <Text style={styles.commentDetails}>
                        <Text style={styles.commentDetailsBold}>Rating:</Text>{" "}
                        {comment.rating}
                      </Text> */}
                      {/* <Text style={styles.commentDetails}>
                         <Text style={styles.commentDetailsBold}>Hashtags:</Text>{" "} 
                        {comment.hashtags.map((tag) => `${tag}`).join(", ")}
                      </Text> */}
                    </View>
              )
                }else null
              })
            ) : (
              <Text>There are no comments available.</Text>
            )}
          </View>
          <View style={styles.separator} />
          <View style={styles.recommendationContainer}>
            <Text
              style={[styles.recommendationText, { color: StringsDark.text }]}
            >
              ¿Do you recommend this Profesional?
            </Text>
            <TouchableOpacity onPress={handleRecommendationChange}>
              <Text style={styles.recommendationIcon}>
                {recommendation ? "👍" : "👎"}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Las estrellas papurri */}
          {/* <Text
            style={[styles.textRating, { color: StringsDark.text }]}
            onPress={putRating}
          >
            Add your rating
          </Text>
          <View
            style={[
              styles.ratingContainer,
              { backgroundColor: StringsDark.fondo_stars },
            ]}
          >
            <AirbnbRating
              count={5}
              defaultRating={ratingV}
              size={20}
              showRating={false}
              selectedColor="gold"
              onFinishRating={handleRating}
            />
          </View> */}
          <TextInput
            style={[styles.commentInput, errorTitle ? styles.errorInput : null]}
            placeholder="*Title"
            value={title}
            onChangeText={handleTitleChange}
          />
          {errorTitle && (
            <Text style={styles.errorText}>Complete the title</Text>
          )}
          <TextInput
            style={[
              styles.commentInput,
              styles.wideInput,
              errorComment ? styles.errorInput : null,
            ]}
            placeholder="*Comment"
            value={comment}
            onChangeText={handleCommentChange}
            multiline={true}
          />
          {errorComment && (
            <Text style={styles.errorText}>Complete the comment</Text>
          )}
          {/* {hashtags.map((tag, index) => (
            <View key={index} style={styles.hashtagContainer}>
              <TextInput
                style={[
                  styles.hashtagInput,
                  errorHashtag ? styles.errorInput : null,
                ]}
                placeholder="Add a hashtag"
                value={tag}
                onChangeText={(text) => handleHashtagChange(index, text)}
              />

              <TouchableOpacity onPress={() => removeHashtagInput(index)}>
                <View style={[styles.button, styles.removeHashtagButton]}>
                  <Text style={[styles.buttonText, { color: "red" }]}>
                    Remove
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))} */}
          {/* {errorHashtag && (
            <Text style={styles.errorText}>
              Hashtag is not valid. It should start with # and contain only
              letters (A/a-Z/z).
            </Text>
          )} */}
          {/* <TouchableOpacity onPress={addHashtagInput}>
            <View
              style={[
                styles.button,
                styles.addHashtagButton,
                { backgroundColor: StringsDark.boton_fondo },
              ]}
            >
              <Text
                style={[styles.buttonText, { color: StringsDark.boton_texto }]}
              >
                Add a hashtag
              </Text>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={submitComment}>
            <View
              style={[
                styles.button,
                { backgroundColor: StringsDark.boton_fondo },
              ]}
            >
              <Text
                style={[styles.buttonText, { color: StringsDark.boton_texto }]}
              >
                Submit
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#ACA9A9",
    padding: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    alignSelf: 'flex-start', // Cambia la alineación para que la imagen quede a la izquierda
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    width: "90%",
    alignContent: "center",
  },
  infoSubContainer: {
    alignSelf: 'flex-end',
    marginTop: -150,
  },
  image: {
    width: 180,
    height: 180,
    marginLeft: -20,
    position: "relative",
    alignContent: "center",
    resizeMode: "cover",
    alignSelf: "center",
  },
  gameName: {
    // color: "#1B063E",
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: 48,
    marginBottom: 10,
    alignSelf: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 5,
    padding: 5,
    borderRadius: 8,
  },
  gamePrice: {
    color: "#1B063E",
    fontStyle: "normal",
    fontSize: 32,
    fontWeight: 400,
    marginBottom: 80,
    textAlign: "center",
  },
  gameDescription: {
    fontSize: 15,
    fontWeight: "normal",
    textAlign: "justify",
    marginBottom: 10,
  },
  comment: {
    backgroundColor: "#ACA9A9",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderTopWidth: 2, // Añadimos el borde superior
    borderBottomWidth: 2, // Añadimos el borde inferior
    borderColor: "#987BDC", // Color del borde
  },
  commentsContainer: {
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ACA9A9", // Cambia el fondo blanco por el color deseado
    borderTopColor: "#ACA9A9",
    borderTopWidth: 2,
  },
  commentsListContainer: {
    marginTop: 15, // Agregamos un margen superior para separar el primer comentario del borde superior
  },
  commentTitleContainer: {
    flexDirection: "row",
    justifyContent: "center", // Centramos horizontalmente
    alignItems: "center", // Centramos verticalmente
    marginBottom: 5,
  },
  commentTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#3F16A7",
  },
  commentText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center", // Centramos el texto del comentario
    top: -20,
  },
  commentDetails: {
    flexDirection: "row", // Alineamos los elementos en una fila
    justifyContent: "space-between", // Espacio entre los elementos
    alignItems: "center", // Centramos verticalmente
    fontSize: 16,
    marginBottom: 2,
  },
  commentDetailsBold: {
    fontWeight: "bold",
    color: "#3F16A7",
    fontSize: 16,
  },
  commentDetailsBoldComment: {
    fontWeight: "bold",
    color: "#3F16A7",
    alignItems: "center", // Centramos verticalmente
    textAlign: "center", // Centramos el texto del comentario
    fontSize: 16,
    top: -20,
  },
  commentUser: {
    textAlign: "left", // Alineamos el usuario a la izquierda
    flex: 1, // Se expande para ocupar el espacio disponible
  },
  commentDate: {
    textAlign: "right", // Alineamos la fecha a la derecha
    flexDirection: "row",
    top: -26,
  },
  textRating: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#622EDA",
    paddingLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 93,
  },
  button: {
    width: "100%", // Cambia el ancho fijo a ancho completo
    height: 41.945,
    alignSelf: "stretch",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  comment: {
    backgroundColor: "#ACA9A9",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#987BDC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  recommendationContainer: {
    flexDirection: "row",
    justifyContent: "center", // Centramos horizontalmente
    alignItems: "center", // Centramos verticalmente
    marginVertical: 10,
  },
  recommendationText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center", // Centramos el texto de recomendación
  },
  recommendationIcon: {
    fontSize: 24,
  },
  // hashtagContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between", // Alineación horizontal con espacio entre los elementos
  // },
  // hashtagInput: {
  //   borderWidth: 1,
  //   borderColor: "#999",
  //   borderRadius: 5,
  //   padding: 10,
  //   marginBottom: 5,
  //   flex: 1,
  // },
  // removeHashtagText: {
  //   color: "red",
  //   textAlign: "center",
  // },
  // removeHashtagButton: {
  //   color: "red",
  //   textAlign: "center",
  // },
  // addHashtagButton: {
  //   // backgroundColor: "#622EDA",
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginTop: 5,
  //   marginBottom: 15,
  // },
  wideInput: {
    width: "100%",
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
  commentsContainer: {
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ACA9A9", // Fondo blanco para el contenedor de comentarios
    borderTopColor: "#987BDC", // Color de la línea superior
    borderTopWidth: 2, // Grosor de la línea superior
  },
  commentsHeaderText: {
    fontSize: 24, // Tamaño de fuente aumentado
    fontWeight: "bold", // Texto en negrita
    // color: "#1B063E", // Color de texto de los comentarios
    paddingLeft: 5, // Espaciado izquierdo para el texto "Comments"
  },
  separator: {
    height: 1,
    backgroundColor: "#ACA9A9",
    marginVertical: 10,
  },
});

export default DetailInfo;
