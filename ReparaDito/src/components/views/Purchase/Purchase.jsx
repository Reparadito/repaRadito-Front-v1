import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { AirbnbRating } from "react-native-ratings";

const Purchase = ({ navigation }) => {
  const [amount, setAmount] = useState("");
  const [videoGame, setVideoGame] = useState("");
  const [rating, setRating] = useState(0);

  const onSubmit = async () => {
    try {
      const response = await axios.post("http://192.168.0.85:3001/compra", {
        amount,
        videoGame,
      });

      console.log("Respuesta del servidor:", response.data);

      const ratingResponse = await axios.put(
        "http://192.168.0.85:3001/games/update-rating", // Cambiar "videoGame" por el ID único del videojuego
        {
          rating: rating, // Utilizamos el rating del estado local
        }
      );

      console.log(
        "Respuesta del servidor de calificación:",
        ratingResponse.data
      );

      Alert.alert("Purchase Completed!", "Email confirmation sent.");
    } catch (error) {
      console.log("Error en el backend:", error);
      Alert.alert("Oops! Something went wrong");
    }
  };

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Purchase Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Video Game"
        value={videoGame}
        onChangeText={setVideoGame}
      />

      <AirbnbRating
        count={5}
        defaultRating={rating}
        size={20}
        showRating={false}
        selectedColor="gold"
        onFinishRating={handleRating}
      />

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Make Purchase</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Purchase;
