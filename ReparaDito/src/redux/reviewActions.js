import axios from "axios";
import { setLoading, setReviews, setError } from "./reviewSlice";

// Función para enviar comentarios a la base de datos
export const sendReview = (newComment) => {
  return async (dispatch) => {
    try {
      // Obtén el último ID de la ruta GET de reviews
      const response = await axios.get(
        "http://192.168.0.85:3001/reviews"
      );

      // Encuentra el máximo ID en los comentarios recibidos desde el servidor
      const maxId = response.data.reduce(
        (max, comment) => (comment.id > max ? comment.id : max),
        0
      );

      // Asigna el nuevo ID al comentario sumando 1 al máximo ID
      newComment.id = maxId + 1;

      // Envía el nuevo comentario al servidor
      const sendResponse = await axios.post(
        "http://192.168.0.85:3001/reviews",
        newComment
      );

      // Si el comentario se ha creado correctamente en el servidor, la respuesta contendrá el nuevo comentario con el ID asignado
      const createdComment = sendResponse.data;

      // Actualiza el estado "comments" con el nuevo comentario
      dispatch({ type: "ADD_COMMENT", comment: createdComment });



      // Manejo de éxito: muestra un mensaje de éxito en la consola o realiza cualquier otra acción que desees
      console.log("Comentario enviado exitosamente:", createdComment);
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    }
  };
};

// Función para obtener comentarios por videogameId desde la base de datos
export const getReviewsByVideogameId = (videogameId) => {
  return async (dispatch) => {
    try {
      console.log("Obteniendo comentarios por videogameId:", videogameId);

      dispatch(setLoading(true));

      const response = await axios.get(
        "http://192.168.0.85:3001/reviews"
      );

      const reviewsByVideogameId = response.data.filter(
        (comment) => comment.videogameId === videogameId
      );

      console.log(
        "Comentarios recibidos desde el servidor:",
        reviewsByVideogameId
      );

      dispatch(setReviews(reviewsByVideogameId));
      dispatch(setLoading(false));
    } catch (error) {
      console.log("Error al obtener comentarios:", error.message);
      dispatch(setError("Error al obtener comentarios"));
      dispatch(setLoading(false));
    }
  };
};

export const getReviewsByUserId = (userId) => {
  return async (dispatch) => {
    try {
      console.log("Obteniendo comentarios por userId:", userId);

      dispatch(setLoading(true));

      // Obtener todas las reviews desde la URL
      const response = await axios.get(
        "http://192.168.0.85:3001/reviews"
      );

      // Filtrar las reviews según el userId
      const allReviews = response.data;
      const reviewsByUserId = allReviews.filter(
        (comment) => comment.userId === userId
      );

      console.log("Comentarios recibidos desde el servidor:", reviewsByUserId);

      dispatch(setReviews(reviewsByUserId));
      dispatch(setLoading(false));
    } catch (error) {
      console.log("Error al obtener comentarios:", error.message);
      dispatch(setError("Error al obtener comentarios"));
      dispatch(setLoading(false));
    }
  };
};

export const getAllReviews = () => {
  return async (dispatch) => {
    try {
      //console.log("Obteniendo todas las reviews");

      dispatch(setLoading(true));

      const response = await axios.get(
        "http://192.168.0.85:3001/reviews"
      );

      const allReviews = response.data;

      //console.log("Todas las reviews recibidas desde el servidor:", allReviews);

      dispatch(setReviews(allReviews));
      dispatch(setLoading(false));
    } catch (error) {
      console.log("Error al obtener todas las reviews:", error.message);
      dispatch(setError("Error al obtener todas las reviews"));
      dispatch(setLoading(false));
    }
  };
};