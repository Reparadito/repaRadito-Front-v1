import React from "react";
import { View, TouchableOpacity, Text, Linking, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Asegúrate de instalar el paquete @expo/vector-icons

const FacebookButton = ({ facebookUsername }) => {
  const handleFacebookPress = () => {
    const url = `https://www.facebook.com/messages/t/${facebookUsername}`;

    Linking.openURL(url)
      .catch((err) => console.error("Error al abrir Facebook Messenger", err));
  };

  return (
    <TouchableOpacity onPress={handleFacebookPress} style={styles.buttonContainer}>
      <View style={styles.iconContainer}>
        <FontAwesome name="facebook" size={24} color="white" />
      </View>
      <Text style={styles.buttonText}>Enviar Mensaje en Facebook</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1877F2", // Color de Facebook
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  iconContainer: {
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default FacebookButton;
