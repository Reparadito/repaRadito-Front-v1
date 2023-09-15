import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch } from "react-redux";
import {
  applyPlatformFilter,
  applyGenreFilter,
  applyPriceRangeFilter,
  applyRatingFilter,
  applyReleaseDateFilter,
  applyRatingSortAsc,
  applyRatingSortDesc,
  applyPriceSortAsc,
  applyPriceSortDesc,
  applyReleaseDateSortAsc,
  applyReleaseDateSortDesc,
  applyAlphabeticalSortAsc,
  applyAlphabeticalSortDesc,
} from "../../../redux/videogamesActions";
import { clearFilters } from "../../../redux/videogamesSlice";

const Filter = ({ handleResetFilter, handleCloseFilter }) => {
  const dispatch = useDispatch();
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedReleaseDate, setSelectedReleaseDate] = useState(null);

  const handleFilter = () => {
    if (selectedPlatform) {
      dispatch(applyPlatformFilter(selectedPlatform));
    }
    if (selectedGenre) {
      dispatch(applyGenreFilter(selectedGenre));
    }
    if (minPrice !== "" || maxPrice !== "") {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      if (!isNaN(min) || !isNaN(max)) {
        dispatch(applyPriceRangeFilter(min, max));
      }
    }
    if (selectedRating) {
      dispatch(applyRatingFilter(selectedRating));
    }
    if (selectedReleaseDate) {
      dispatch(applyReleaseDateFilter(selectedReleaseDate));
    }
  };

  const handleSortOnly = (sortType) => {
    switch (sortType) {
      case "ratingAsc":
        dispatch(applyRatingSortAsc());
        break;
      case "ratingDesc":
        dispatch(applyRatingSortDesc());
        break;
      case "priceAsc":
        dispatch(applyPriceSortAsc());
        break;
      case "priceDesc":
        dispatch(applyPriceSortDesc());
        break;
      case "releaseDateAsc":
        dispatch(applyReleaseDateSortAsc());
        break;
      case "releaseDateDesc":
        dispatch(applyReleaseDateSortDesc());
        break;
      case "az":
        dispatch(applyAlphabeticalSortAsc());
        break;
      case "za":
        dispatch(applyAlphabeticalSortDesc());
        break;
      default:
        break;
    }
  };

  const handleClearFilters = () => {
    setSelectedPlatform(null);
    setSelectedGenre(null);
    setMinPrice("");
    setMaxPrice("");
    setSelectedRating(null);
    setSelectedReleaseDate(null);
    dispatch(clearFilters());
    handleResetFilter();
  };

  const genres = [
    "Action",
    "Adventure",
    "Arcade",
    "Casual",
    "Family",
    "Fighting",
    "Indie",
    "Massively Multiplayer",
    "Platformer",
    "Puzzle",
    "RPG",
    "Shooter",
    "Simulation",
    "Sports",
    "Strategy",
  ];

  genres.sort();

  const platforms = [
    "Nintendo Switch",
    "PC",
    "PlayStation 4",
    "PlayStation 5",
    "Xbox Series S/X",
  ];

  platforms.sort();

  {
    /* const ratingOptions = [
    { value: "1-1.99", label: "De 1 estrella" },
    { value: "2-2.99", label: "De 2 estrellas" },
    { value: "3-3.99", label: "De 3 estrellas" },
    { value: "4-4.99", label: "De 4 estrellas" },
    { value: "5-5.99", label: "De 5 estrellas" },
  ];

  const handleRatingFilter = (value) => {
    const [min, max] = value.split("-");
    dispatch(applyRatingFilter(parseFloat(min), parseFloat(max)));
    setSelectedRating(value);
  }; */
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Select Filters</Text>
        <View style={styles.filterSection}>
          <Text style={styles.subtitle}>Platform:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedPlatform}
              onValueChange={(itemValue) => setSelectedPlatform(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select platform" value={null} />
              {platforms.map((platform) => (
                <Picker.Item label={platform} value={platform} key={platform} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.filterSection}>
          <Text style={styles.subtitle}>Genre:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedGenre}
              onValueChange={(itemValue) => setSelectedGenre(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select genre" value={null} />
              {genres.map((genre) => (
                <Picker.Item label={genre} value={genre} key={genre} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.filterSection}>
          <Text style={styles.subtitle}>Price range:</Text>
          <View style={styles.priceRange}>
            <TextInput
              style={styles.priceInput}
              placeholder="Min"
              value={minPrice}
              onChangeText={(text) => setMinPrice(text)}
              keyboardType="numeric"
              maxLength={5}
              placeholderTextColor="black" // Color del texto de marcador de posición
            />
            <TextInput
              style={styles.priceInput}
              placeholder="Max"
              value={maxPrice}
              onChangeText={(text) => setMaxPrice(text)}
              keyboardType="numeric"
              maxLength={5}
              placeholderTextColor="black" // Color del texto de marcador de posición
            />
          </View>
        </View>
        {/* <View style={styles.filterSection}>
          <Text style={styles.subtitle}>Rating:</Text>
          {ratingOptions.map((option) => (
            <TouchableOpacity
              onPress={() => handleRatingFilter(option.value)}
              key={option.value}
            >
              <Text
                style={[
                  styles.filterOption,
                  selectedRating === option.value && styles.selectedFilterOption,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))} 
           Agregar más opciones de rating aquí 
        </View>*/}
        {/*  <View style={styles.filterSection}>
          <Text style={styles.subtitle}>Fecha de lanzamiento:</Text>
          <TouchableOpacity onPress={() => setSelectedReleaseDate("2022")}>
            <Text
              style={[
                styles.filterOption,
                selectedReleaseDate === "2022" && styles.selectedFilterOption,
              ]}
            >
              2022 o posterior
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedReleaseDate("2021")}>
            <Text
              style={[
                styles.filterOption,
                selectedReleaseDate === "2021" && styles.selectedFilterOption,
              ]}
            >
              2021 o posterior
            </Text>
          </TouchableOpacity>
          Agregar más opciones de fecha de lanzamiento aquí 
        </View>*/}
        <Text style={styles.title}>Order by:</Text>
        <View style={styles.sortSection}>
          <TouchableOpacity
            onPress={() => handleSortOnly("az")}
            style={styles.sortButton}
          >
            <Text style={styles.sortButtonText}>Sort from A to Z</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSortOnly("za")}
            style={styles.sortButton}
          >
            <Text style={styles.sortButtonText}>Sort from Z to A</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSortOnly("ratingAsc")}
            style={styles.sortButton}
          >
            <Text style={styles.sortButtonText}>Ascending Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSortOnly("ratingDesc")}
            style={styles.sortButton}
          >
            <Text style={styles.sortButtonText}>Descending Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSortOnly("priceAsc")}
            style={styles.sortButton}
          >
            <Text style={styles.sortButtonText}>Rising Price</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSortOnly("priceDesc")}
            style={styles.sortButton}
          >
            <Text style={styles.sortButtonText}>Descending Price</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSortOnly("releaseDateAsc")}
            style={styles.sortButton}
          >
            <Text style={styles.sortButtonText}>
            Release Date Ascending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSortOnly("releaseDateDesc")}
            style={styles.sortButton}
          >
            <Text style={styles.sortButtonText}>
            Descending Release Date
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsSection}>
          <TouchableOpacity onPress={handleClearFilters} style={styles.button}>
            <Text style={styles.buttonText}>Clear filters</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFilter} style={styles.button}>
            <Text style={styles.buttonText}>Apply filters</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={handleCloseFilter} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#987BDC", // Color de fondo: #987BDC
    borderRadius: 10, // Bordes redondeados
    margin: 10, // Margen opcional
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1B063E",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    marginBottom: 1,
  },
  filterSection: {
    marginBottom: 20,
  },
  sortSection: {
    marginBottom: 20,
  },
  buttonsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterOption: {
    fontSize: 16,
    marginBottom: 5,
  },
  selectedFilterOption: {
    fontWeight: "bold",
    color: "blue",
  },
  sortOption: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    padding: 10,
    backgroundColor: "#622EDA", // Cambia el color de fondo del botón a #622EDA
    borderRadius: 5,
  },
  buttonText: {
    color: "white", // Cambia el color de la letra a blanco
    fontWeight: "bold", // Aplica el estilo de letra negrita
    textAlign: "center",
  },
  priceRange: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceInput: {
    flex: 1,
    borderColor: "black", // Color de los bordes (negro)
    borderRadius: 5, // Bordes redondeados
    padding: 10, // Espacio interno
    backgroundColor: "white", // Fondo blanco
    fontWeight: "bold", // Texto en negrita
    marginRight: 3, // Ajusta el margen derecho para separar los campos
    marginLeft: 3, // Ajusta el margen izquierdo para separar los campos
    fontSize: 16, // Ajusta el tamaño de la fuente para hacerla más grande
    textAlign: "center", // Ajusta la alineación del texto para que esté centrado verticalmente
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#622EDA",
    borderRadius: 5,
    marginBottom: 10, // Ajusta el margen inferior si es necesario
    marginTop: 10, // Ajusta el margen superior según tus necesidades
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  sortButton: {
    padding: 10,
    backgroundColor: "#622EDA",
    borderRadius: 5,
    marginBottom: 10,
  },
  sortButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Filter;
