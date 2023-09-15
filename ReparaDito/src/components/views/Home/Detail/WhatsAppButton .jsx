import React from "react";
import { View, TouchableOpacity, Image, Text, Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Asegúrate de instalar el paquete @expo/vector-icons


const WhatsAppButton = ({ phoneNumber }) => {
  const handleWhatsAppPress = () => {
    const message = "Hola, estoy interesado en tus servicios. Te contacto a traves de ReparaDito"; // Mensaje inicial
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("WhatsApp no está instalado");
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error("Error al abrir WhatsApp", err));
  };

  return (
    <TouchableOpacity onPress={handleWhatsAppPress} style={styles.buttonContainer}>
      <View style={styles.iconContainer}>
        <FontAwesome name="whatsapp" size={24} color="white" />
      </View>  
      <Text style={styles.buttonText}>Enviar WhatsApp</Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#25D366",
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
  logoImage: {
    width: 24, // Ajusta el ancho de la imagen según tus necesidades
    height: 24, // Ajusta la altura de la imagen según tus necesidades
    marginRight: 10, // Margen derecho para separar la imagen del texto
  },
};

export default WhatsAppButton;
