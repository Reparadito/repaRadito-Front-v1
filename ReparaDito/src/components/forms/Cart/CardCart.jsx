import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import React, { useContext } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { amountAdd, amountSub, removeItem } from "./CardCartController";
import { updateCart } from "../../../redux/cartSlice";
//linea para llamar a modo DARK
import { ThemeContext } from "../../utils/theme/ThemeProvider";
// //linea para modificar el contexto de localizacion para el lenguaje
import { LanguajeContext } from "../../utils/languaje/languajeProvider";

const CartItems = (props) => {
  if (!props.item) {
    console.log("No hay Items del carrito");
    return null; // O muestra un mensaje de error, devuelve un componente vacío, o realiza alguna otra acción en caso de que el item sea nulo.
  }

  const { id, img, price, amount, title, stock } = props.item;
  const cartKEy = props.llave;
  // console.log("el stock es: ",stock)
  const { StringsDark, isDarkMode } = useContext(ThemeContext);
  const { StringsLanguaje, locale } = useContext(LanguajeContext);
  const dispatch = useDispatch();

  if (typeof cartKEy === undefined) {
    console.log("capturando id undefined");
    return;
  }
  const handlePress = () => {
    // console.log()
    removeItem(cartKEy);
    dispatch(updateCart());
  };

  return (
    <View
      key={id}
      style={[
        styles.cartItem,
        {
          backgroundColor: StringsDark.cart_c_f,
          shadowColor: StringsDark.text,
        },
      ]}
    >
      <Image
        source={{ uri: `${img}` }}
        style={styles.cartItemImg}
        PlaceholderContent={
          <ActivityIndicator color={StringsDark.bkContesp} size={"large"} />
        }
      />
      <View style={styles.carDet}>
        <Text style={[styles.cartItemTitle, { color: StringsDark.text }]}>
          {title}
        </Text>
        <Text style={[styles.cartItemPrice, { color: StringsDark.price }]}>
          ${price}
        </Text>
        <View style={styles.cartItemAmount}>
          <TouchableOpacity
            onPress={() => {
              if (amount === 1) {
                Alert.alert(
                  "",
                  `${StringsLanguaje.delItemCart}`,
                  [
                    {
                      text: `${StringsLanguaje.optCancel}`,
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => handlePress(),
                    },
                  ],
                  { cancelable: false }
                );
              } else amountSub(cartKEy, amount);
              dispatch(updateCart());
            }}
          >
            <Ionicons name="md-remove" size={24} color={StringsDark.text} />
          </TouchableOpacity>
          <Text
            style={[styles.cartItemAmountText, { color: StringsDark.text }]}
          >
            {amount}
          </Text>
          <TouchableOpacity
            onPress={() => {
              amountAdd(
                cartKEy,
                amount,
                stock,
                StringsLanguaje.stockOut,
                StringsLanguaje.warning
              );
              dispatch(updateCart());
            }}
          >
            <Ionicons name="md-add" size={24} color={StringsDark.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.cartItemRemove}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "",
                `${StringsLanguaje.delItemCart}`,
                [
                  {
                    text: `${StringsLanguaje.optCancel}`,
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => handlePress(),
                  },
                ],
                { cancelable: false }
              );
            }}
            style={styles.cartItemRemoveButton}
          >
            <Ionicons name="md-trash" size={15} color={StringsDark.text} />
            <Text style={{ color: StringsDark.text }}>
              {StringsLanguaje.remove}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.cartItemStock, { color: StringsDark.text }]}>
            Stock ({stock})
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CartItems;

const styles = StyleSheet.create({
  cartItem: {
    padding: 15,
    // backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    // shadowColor: "#ff2301",
    shadowOpacity: 0.23,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    // left: -4,
    // margin: 5,
    // borderRadius:8,
  },
  cartItemImg: {
    width: "40%",
    height: "105%",
    borderRadius: 8,
    resizeMode: "cover",
    // backgroundColor: "white",
  },
  carDet: {
    width: "58%",
    height: "105%",
    borderRadius: 8,
    // backgroundColor: "red",
  },
  cartItemTitle: {
    fontSize: 18,
    marginVertical: 5,
    textAlign: "center",
  },
  cartItemPrice: {
    textAlign: "center",
    fontSize: 20,
    color: "coral",
    fontWeight: "bold",
  },
  cartItemAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartItemAmountText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  cartItemRemove: {
    alignItems: "center",
    justifyContent: "center",
  },
  cartItemRemoveButton: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartItemStock: {
    textAlign: "center",
    fontSize: 13,
    color: "coral",
    fontWeight: "bold",
  },
});
