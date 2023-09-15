import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const InstagramButton = ({ instagramUsername }) => {
  const handleOpenInstagram = () => {
    const url = `https://www.instagram.com/${instagramUsername}/`;
    Linking.openURL(url)
      .catch((err) => console.error("Error al abrir Instagram", err));
  };

  return (
    <TouchableOpacity onPress={handleOpenInstagram} style={styles.buttonContainer}>
      <View style={styles.iconContainer}>
        <FontAwesome name="instagram" size={24} color="white" />
        <Text style={styles.buttonText}>Enviar mensaje en Instagram</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#1877F2", // Color de Instagram
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

export default InstagramButton;
