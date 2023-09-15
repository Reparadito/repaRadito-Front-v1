import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../../utils/Card/Card";
import { getAllSlsUser, setLoading } from "../../../../redux/salesSlice";
import { getAllSalesUser } from "../../../../redux/salesActions";

import PurchaseCard from "./PurchaseCard"; // Importa el nuevo componente
import PurchaseDetails from "./PurchaseDetails"; // Importa el nuevo componente
import Loading from "../../../helpers/Loading";
import { ThemeContext } from "../../../utils/theme/ThemeProvider";
import { LanguajeContext } from "../../../utils/languaje/languajeProvider";

const Shoppings = () => {
  const dispatch = useDispatch();
  const loged = useSelector((state) => state.usersState.isLogged);
  const userSales = useSelector((state) => state.salesState.allSlsUsr);
  const isLoading = useSelector((state) => state.salesState.loading);
  const { StringsDark, isDarkMode } = useContext(ThemeContext);
  const { StringsLanguaje, locale } = useContext(LanguajeContext);

  useEffect(() => {
    dispatch(getAllSalesUser(loged.id));

    return ()=>{
      dispatch(getAllSlsUser(''))
    }
  }, []);

  const [showPurchaseDetails, setShowPurchaseDetails] = useState(false);
  const [selectedPurchaseDetails, setSelectedPurchaseDetails] = useState({});

  const handleShowDetails = (purchase) => {
    // purchase es el objeto de la compra
    setShowPurchaseDetails(true);
    setSelectedPurchaseDetails(purchase);
  };
  // Este ordena las compras por fecha
  let sortedUserSales = [];

  if (userSales && userSales.length > 0) {
    sortedUserSales = userSales
      .filter((item) => item.date) // Filtra elementos con fecha válida
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
  }


  return (
    <View style={[
      styles.container,
      { backgroundColor: StringsDark.Titulo_Screen_fondo },
    ]}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>{StringsLanguaje.MyShoppings}</Text>
      </View>
      {isLoading ? (
        // Render the loading indicator if isLoading is true
        <Loading />
      ) : (
        // Render your content once data is fetched
        <>
          {!userSales && (
            <View style={styles.noFavoritesContainer}>
              <Text style={styles.noFavoritesText}>{StringsLanguaje.msgNpPurchaseFoun}</Text>
            </View>
          )}

          {sortedUserSales && (
            <FlatList
              data={sortedUserSales}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleShowDetails(item)}>
                  <PurchaseCard videoG={item} />
                </TouchableOpacity>
              )}
            />
          )}

          {selectedPurchaseDetails && (
            <PurchaseDetails
              visible={showPurchaseDetails}
              closeModal={() => setShowPurchaseDetails(false)}
              purchaseDetails={selectedPurchaseDetails}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  noFavoritesContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 300,
    backgroundColor: '#622EDA',
    borderRadius: 10,
    textDecorationColor: '#FAFAFA',
    marginLeft: 35,

  },
  noFavoritesText: {
    color: "#FFFFFF", 
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F5F5F5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headingContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#622EDA",
    borderRadius: 10,
    width: 200,
    height: 50,
    marginLeft: 80,
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default Shoppings;
