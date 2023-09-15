import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

const Loading = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/logo_solo.png")}
        style={styles.image}
      />
      <Text style={styles.text}>Cargando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200, // Ajusta el ancho del GIF
    height: 200, // Ajusta la altura del GIF
  },
  text: {
    color: '#1B063E',
    textAlign: "right", // Alinea el texto a la derecha
    fontSize: 24, // Tamaño de la fuente más grande
    fontWeight: "bold", // Texto en negrita
    marginTop: 10, // Espacio arriba del texto para separarlo un poco de la imagen
    marginRight: -30, // Espacio a la derecha del texto
  },
});

export default Loading;