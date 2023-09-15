import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import GameRating from "./GameRating";
import { useDispatch, useSelector } from "react-redux"; // Importamos useDispatch y useSelector
import {
  sendReview,
  getReviewsByVideogameId,
} from "../../../../redux/reviewActions"; // Importamos la acción creada anteriormente
import {convertirFecha} from "../../../helpers/InvertDate"


const DetailInfo = (props) => {
  const [ratingV, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [reviewDate, setReviewDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [recommendation, setRecommendation] = useState(true);
  const [hashtags, setHashtags] = useState([""]);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorComment, setErrorComment] = useState(false);
  const [errorHashtag, setErrorHashtag] = useState(false);
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
      console.log("Getting feedback for the game...:", props.propInfo.name);
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
      //console.log("Obteniendo comentarios para el juego:", props.propInfo.name);
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

  const isValidHashtag = (text) => {
    // Expresión regular para validar el hashtag
    const hashtagRegex = /^#[A-Za-z]+$/;
    return hashtagRegex.test(text);
  };

  const handleHashtagChange = (index, text) => {
    if (text === "" || /^#[A-Za-z]*$/.test(text)) {
      setHashtags((prevHashtags) => {
        const updatedHashtags = [...prevHashtags];
        updatedHashtags[index] = text;
        return updatedHashtags;
      });
      setErrorHashtag(false);
    } else {
      setErrorHashtag(true);
    }
  };

  const addHashtagInput = () => {
    setHashtags([...hashtags, ""]);
  };

  const removeHashtagInput = (index) => {
    setHashtags((prevHashtags) => {
      const updatedHashtags = [...prevHashtags];
      updatedHashtags.splice(index, 1);
      return updatedHashtags;
    });
    setErrorHashtag(false);
  };

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
    if (validateForm() && !errorHashtag) {
      // Generate a random playtime between 1 and 3000 hours
      const randomPlaytime = Math.floor(Math.random() * 3000) + 1;
      // Modify this line to remove double hashtags
      const formattedHashtags = hashtags
        .filter((tag) => tag.trim().startsWith("#"))
        .map((tag) => tag.trim());

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
        hashtags: formattedHashtags,
        playtime: randomPlaytime,
        token: generateRandomToken(10), // Puedes ajustar la longitud según tus necesidades
        username: username, // Agrega el nombre de usuario al objeto del comentario

      };

      // Update the comments array with the new comment
      dispatch(sendReview(newComment));

      // Reset the rating, title, comment, and hashtags state for the next comment
      setRating(0);
      setTitle("");
      setComment("");
      setReviewDate(new Date().toISOString().slice(0, 10));
      setRecommendation(true);
      setHashtags([""]);
      setErrorTitle(false);
      setErrorComment(false);
      setErrorHashtag(false);
    } else {
      setErrorHashtag(true);
    }
  } else {
    console.log("User not logged in. Unable to submit review.");
  }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.gameName}>{name}</Text>
        <GameRating rating={rating} />
        <View style={styles.ratingContainer}>
          <AirbnbRating
            count={5}
            defaultRating={ratingV}
            size={20}
            showRating={false}
            selectedColor="gold"
            onFinishRating={handleRating}
          />
          <Text style={styles.textRating} onPress={putRating}>
            Add your rating
          </Text>
          <Text> Score: {ratingV}</Text>
        </View>
        <Text style={[styles.gamePrice, { color: "#1B063E" }]}>$ {price}</Text>
        <TouchableOpacity onPress={() => console.log("Añadir al carrito")}>
          <View style={[styles.button, { backgroundColor: "#622EDA" }]}>
            <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>
              Add to Cart
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.gameDescription}>
          {showFullDescription
            ? description
            : `${description.substring(0, 300)}...`}
        </Text>
        {!showFullDescription && (
          <TouchableOpacity onPress={toggleDescription}>
            <View style={[styles.button, { backgroundColor: "#622EDA" }]}>
              <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>
                Read More
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {showFullDescription && (
          <TouchableOpacity onPress={toggleDescription}>
            <View style={[styles.button, { backgroundColor: "#622EDA" }]}>
              <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>
                Retract
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Comentarios */}
        <View style={styles.commentsContainer}>
          <Text style={styles.commentsHeaderText}>Comments</Text>
          {/* Botón para cargar los comentarios */}
      <TouchableOpacity onPress={handleLoadComments}>
        <View style={[styles.button, { backgroundColor: "#622EDA" }]}>
          <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>
            Add a comment to this game
          </Text>
        </View>
      </TouchableOpacity>
          <View style={styles.commentsListContainer}>
            {commentsForCurrentVideogame.length > 0 ? (
              commentsForCurrentVideogame.map((comment) => (
                <View
                  key={comment.id}
                  style={[styles.comment, styles.commentContainer]}
                >
                  <View style={styles.commentTitleContainer}>
                    <Text style={styles.commentTitle}>{comment.title}</Text>
                    <Text style={styles.commentDate}>{convertirFecha(comment.reviewDate)}</Text>
                  </View>
                  <Text style={styles.commentDetails}>
                    <Text style={styles.commentDetailsBold}>By:</Text>{" "}
                    {username}
                  </Text>
                  <Text style={styles.commentText}>Comment: {comment.comment}</Text>
                  <Text style={styles.commentDetails}>
                    <Text style={styles.commentDetailsBold}>Playtime:</Text>{" "}
                    {comment.playtime} hours -
                    <Text style={styles.commentDetailsBold}>
                      {" "}
                      Recommendation:
                    </Text>{" "}
                    {comment.recommendation ? "👍" : "👎"}
                  </Text>
                  <Text style={styles.commentDetails}>
                    <Text style={styles.commentDetailsBold}>Rating:</Text>{" "}
                    {comment.rating}
                  </Text>
                  <Text style={styles.commentDetails}>
                    <Text style={styles.commentDetailsBold}>Hashtags:</Text>{" "}
                    {comment.hashtags.map((tag) => `${tag}`).join(", ")}
                  </Text>
                </View>
              ))
            ) : (
              <Text>There are no comments available.</Text>
            )}
          </View>
          <View style={styles.recommendationContainer}>
            <Text style={styles.recommendationText}>
              ¿Do you recommend this game?
            </Text>
            <TouchableOpacity onPress={handleRecommendationChange}>
              <Text style={styles.recommendationIcon}>
                {recommendation ? "👍" : "👎"}
              </Text>
            </TouchableOpacity>
          </View>
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
          {hashtags.map((tag, index) => (
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
          ))}
          {errorHashtag && (
            <Text style={styles.errorText}>
              Hashtag is not valid. It should start with # and contain only
              letters (A/a-Z/z).
            </Text>
          )}
          <TouchableOpacity onPress={addHashtagInput}>
            <View style={[styles.button, styles.addHashtagButton]}>
              <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>Add a hashtag</Text>
            </View>
          </TouchableOpacity>

          <Button title="Submit" onPress={submitComment} />
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
    backgroundColor: "#fff",
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
  infoContainer: {
    width: "90%",
    alignContent: "center",
  },
  image: {
    width: 375,
    height: 361,
    marginLeft: -7,
    position: "relative",
    alignContent: "center",
    resizeMode: "cover",
    alignSelf: "center",
  },
  gameName: {
    color: "#1B063E",
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
  },
  gamePrice: {
    color: "#1B063E",
    fontStyle: "normal",
    fontSize: 32,
    fontWeight: 400,
    marginBottom: 10,
  },
  gameDescription: {
    fontSize: 15,
    fontWeight: "normal",
    textAlign: "justify",
    marginBottom: 10,
  },
  comment: {
    backgroundColor: "#EEE",
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
    backgroundColor: "#FFF", // Cambia el fondo blanco por el color deseado
    borderTopColor: "#987BDC",
    borderTopWidth: 2,
  },
  commentsListContainer: {
    marginTop: 15, // Agregamos un margen superior para separar el primer comentario del borde superior
  },
  commentTitleContainer: {
    flexDirection: "row", // Alineamos el título y la fecha en una fila
    justifyContent: "space-between", // Espacio entre los elementos de la fila
    alignItems: "center", // Alineamos verticalmente los elementos en el centro
    marginBottom: 5,
  },
  commentTitle: {
    color: "#1B063E",
    fontWeight: "bold",
    fontSize: 16,
  },
  commentDate: {
    color: "#1B063E",
  },
  commentText: {
    fontSize: 14,
    marginBottom: 5,
  },
  commentDetails: {
    fontSize: 14,
    marginBottom: 2,
  },
  commentDetailsBold: {
    fontWeight: "bold",
  },
  textRating: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#496BFF",
    paddingLeft: 20,
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
    backgroundColor: "#EEE",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  commentTitle: {
    color: "#1B063E",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    marginBottom: 5,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  recommendationContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
    alignItems: "center",
  },
  recommendationText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  recommendationIcon: {
    fontSize: 24,
  },
  hashtagContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Alineación horizontal con espacio entre los elementos
  },
  hashtagInput: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    flex: 1,
  },
  removeHashtagText: {
    color: "red",
    textAlign: "center",
  },
  removeHashtagButton: {
    color: "red",
    textAlign: "center",
  },
  addHashtagButton: {
    backgroundColor: "#622EDA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 15,
  },
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
    backgroundColor: "#FFF", // Fondo blanco para el contenedor de comentarios
    borderTopColor: "#987BDC", // Color de la línea superior
    borderTopWidth: 2, // Grosor de la línea superior
  },
  commentsHeaderText: {
    fontSize: 24, // Tamaño de fuente aumentado
    fontWeight: "bold", // Texto en negrita
    color: "#1B063E", // Color de texto de los comentarios
    paddingLeft: 5, // Espaciado izquierdo para el texto "Comments"
  },
});

export default DetailInfo;
