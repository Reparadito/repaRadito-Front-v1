import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { uploadImageAsync } from '../../helpers/uploadImage';

import  {validate}  from './components/Validate/CreateGameValidate';

import { SelectList } from "react-native-dropdown-select-list";

import { convertirFecha, convertirFechaDiasCruzados } from "../../helpers/InvertDate";

import DateTimePicker from '@react-native-community/datetimepicker';

import {color_gris_c, color_morado_o, color_celeste, color_morado_c2, color_gris_595959, color_gris_cdcdcd, color_gris_dadada} from '../../utils/theme/stringsColors'

import { PhoneInput, getCountryByCca2 } from "react-native-international-phone-number";

import {
  allGenres,
  allPlatforms,
} from "./components/dataFilteredgames";
import React, { useState, useRef, useEffect, useContext } from "react";

import axios from "axios";

import { useSelector } from "react-redux";



const CreateVideogame = ({ navigation, route }) => {
  const [image, setImage] = useState([]);
  const token = useSelector((state) => state.usersState.userToken);
  console.log("elTokendeRegisteeeer",token)
  const [imageScreen, setImageScreen] = useState([]);

  const [date, setDate] = useState(new Date());

  console.log(`-------------------->>-->>>> ${date}`)
  const [inputFocusedName, setInputFocusedName] = useState(true);
  const [inputFocusedDesc, setInputFocusedDesc] = useState(true);
  const [inputFocusedDate, setInputFocusedDate] = useState(true);
  const [inputFocusedPrice, setInputFocusedPrice] = useState(true);
  const [inputFocusedstock, setInputFocusedstock] = useState(true);
  const [validateSubmit, setValidateSubmit] = useState(true);
  const [showPicker, setShowPicker] = useState(false);


  const [selectedCountry, setSelectedCountry] = useState({});
  const [inputValue, setInputValue] = useState('+54');

  const handleInputValue = (phoneNumber) => {
    console.log('Nuevo número de teléfono--->:', phoneNumber);
    setInputValue(phoneNumber)
  };
  const handleSelectedCountry = (country) => {
    console.log('Pais--->:', country);
    setSelectedCountry(country);
    setInputValue(`+${country.callingCode} `)
  };

  const [stackData, setStackData] = useState({
    platforms: allPlatforms,
  });
  const [newVideoGame, setNewVideoGame] = useState({
    id: 1 + Math.floor(Math.random() * 999),
    name: "",
    description: "",
    image: "",
    screenShots: [],
    platforms: [],
    genre: "",
    price: "",
    stock: "",
    releaseDate: "10-12-2022",
    tags: "",
    requeriments_en: "",
  });


  console.log(`------------------------------------------ ${newVideoGame}`)

  useEffect(() => {
    validate(newVideoGame);
  }, [newVideoGame]);

  const validateNvg = validate(newVideoGame);

  console.log(validateNvg.name);

  const showDatePicker = () => {
    setShowPicker(true);
  };

  ///////

  const inputStyle = {
    height: Math.max(40, newVideoGame.description.length * 1.2), // Ajusta el tamaño en base a la longitud del texto
  };

  const inputStyleVar = {
    height: Math.max(40, newVideoGame.stock.length * 1.2), // Ajusta el tamaño en base a la longitud del texto
  };

  const handleTextChange = (text) => {
    setNewVideoGame((prevVideoGame) => ({
      ...prevVideoGame,
      stock: text,
    }));
  };

  const handleTextChange2 = (text) => {
    setNewVideoGame((prevVideoGame) => ({
      ...prevVideoGame,
      description: text,
    }));
  };
  const handleTextChange3 = (text) => {
    setNewVideoGame((prevVideoGame) => ({
      ...prevVideoGame,
      tags: text,
    }));
  };
  const handleTextChange4 = (text) => {
    setNewVideoGame((prevVideoGame) => ({
      ...prevVideoGame,
      requeriments_en: text,
    }));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const Submit = async () => {
    const config= {Authorization: token}
    try {
      console.log("Submit de new Videogame--->",newVideoGame);
      if (
        newVideoGame.name === "" ||
        newVideoGame.description === "" ||
        date === "" ||
        !newVideoGame.platforms.length ||
        !newVideoGame.genre.length ||
        newVideoGame.image === "" ||
        !newVideoGame.screenShots.length ||
        newVideoGame.price === "" ||
        newVideoGame.stock === ""
      ) {
        setValidateSubmit(false);
      } else {
        const res = await axios.post(
          "http://192.168.0.85:3001/games",
          {
            id: newVideoGame.id,
            name: newVideoGame.name,
            releaseDate: newVideoGame.releaseDate ,
            description: newVideoGame.description,
            image: newVideoGame.image,
            screenShots: newVideoGame.screenShots,
            platforms: newVideoGame.platforms,
            genre: newVideoGame.genre,
            price: newVideoGame.price,
            stock: newVideoGame.stock,
            tags: newVideoGame.tags,
            requeriments_en: newVideoGame.requeriments_en,
          },config
          );
        Alert.alert("Profesional Creado con Exito!", "", [
          {
            onPress: () =>
              setNewVideoGame({
                id: 1 + Math.floor(Math.random() * 999),
                name: "",
                description: "",
                releaseDate: "",
                image: "",
                screenShots: [],
                platforms: [],
                genre: "",
                price: "",
                stock: "",
                tags: "",
                requeriments_en: "",
              }),
          },
          {
            text: "Volver al Panel",
            onPress: () =>
              navigation.navigate("Landing", { name: "RenderLogin" }),
          },
        ]);

      }
    } catch (error) {
      Alert.alert("Auch... Algo salio mal", "");
      console.log("Error en el backend:", error);
    }
  };

  const CancelSubmit = () => {
    Alert.alert(
      "Cancelar Registro",
      "Estas por Cancelar tu Registro",
      [
        {
          text: "Cancelar",
          onPress: () =>
            Alert.alert(
              "Volver al Inicio",
              "Estas seguro que quieres volver al Inicio?",
              [
                {
                  text: "Si",
                  onPress: () =>
                    navigation.navigate("HomeStack", { name: "Home" }),
                },
                { text: "No", onPress: () => console.log("No pressed") },
              ]
            ),
          style: "cancel",
        },
        {
          text: "Continuar editando",
          onPress: () => console.log("Continue edit pressed"),
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "Esta alerta se descartó al tocar fuera del cuadro de diálogo de alerta.."
          ),
      }
    );
  };

  ///////

  const pushItemgenre = (value) => {
    setTimeout(() => {
      setNewVideoGame((prevState) => ({
        ...prevState,
        genre: [...prevState.genre, value],
      }));

      setStackData((prevState) => ({
        ...prevState,
        genre: prevState.genre.filter((p) => p !== value),
      }));
    }, 1200);
  };

  const removeItemgenre = (value) => {
    setTimeout(() => {
      setNewVideoGame((prevState) => ({
        ...prevState,
        genre: prevState.genre.filter((p) => p !== value),
      }));

      setStackData((prevState) => ({
        ...prevState,
        genre: [...prevState.genre, value],
      }));
    }, 1200);
  };

  ///////

  const pushItemplatforms = (value) => {
    setTimeout(() => {
      setNewVideoGame((prevState) => ({
        ...prevState,
        platforms: [...prevState.platforms, value],
      }));

      setStackData((prevState) => ({
        ...prevState,
        platforms: prevState.platforms.filter((p) => p !== value),
      }));
    }, 1200);
  };

  const removeItemplatforms = (value) => {
    setTimeout(() => {
      setNewVideoGame((prevState) => ({
        ...prevState,
        platforms: prevState.platforms.filter((p) => p !== value),
      }));

      setStackData((prevState) => ({
        ...prevState,
        platforms: [...prevState.platforms, value],
      }));
    }, 1200);
  };



  ///////

  const handleInputChange = (inputName, inputValue) => {
    setNewVideoGame({
      ...newVideoGame,
      [inputName]: inputValue,
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const arrLks = [];
      // const arrView = []
      const uploadedImages = await Promise.all(
        result.assets.map(async (image) => {
          let imageUrl = await uploadImageAsync(image.uri);

          // arrView.push(image.uri)
          arrLks.push(imageUrl);

          console.log(`3-----${arrLks}`);
          // return arrImg
        })
      );

      setNewVideoGame((newVideoGame) => ({
        ...newVideoGame,
        image: arrLks[0],
      }));

      console.log(`4-----${newVideoGame}`);
      return arrLks;
    }
  };

  const deleteImage = () => {
    setNewVideoGame((newVideoGame) => ({
      ...newVideoGame,
      image: "",
    }));
  };

  const deleteScreen = (image) => {
    setNewVideoGame((newVideoGame) => ({
      ...newVideoGame,
      screenShots: newVideoGame.screenShots.filter((i) => !image),
    }));
  };

  const pickImageScreen = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.8,
    });

    console.log(result);

    if (!result.canceled) {
      const arrLks = [];
      // const arrView = []
      const uploadedImages = await Promise.all(
        result.assets.map(async (image) => {
          let imageUrl = await uploadImageAsync(image.uri);

          // arrView.push(image.uri)
          arrLks.push(imageUrl);

          console.log(`3-----${arrLks}`);
          // return arrImg
        })
      );

      setNewVideoGame((newVideoGame) => ({
        ...newVideoGame,
        screenShots: [...newVideoGame.screenShots, ...arrLks],
      }));
      console.log(`4-----${newVideoGame}`);
      return arrLks;
    }
  };

  console.log(newVideoGame);

  return (
    <ScrollView>
      <View
        style={[
          styles.bgCont]}
      />
      <View
        style={[styles.container]}
      >
        <View
          style={[
            styles.containerLogin]}
        >
          <Text style={
            styles.TitlePage
          }>Registro de Profesionales</Text>

          <View
            style={[
              styles.containerInput
            ]}
          >
            <Text
              style={[styles.title]}
            >Foto de Perfil
            </Text>

            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={pickImage}
                style={[
                  styles.miniButton
                  
                ]}
              >
                <Text
                  style={[styles.buttonText]}
                >Cargar Imagen
                </Text>
              </TouchableOpacity>
              {validateNvg.image !== "" && !validateSubmit && (
                <Text style={styles.error}>{validateNvg.image}</Text>
              )}
              {console.log(`5454--------------${newVideoGame.image}`)}
              {newVideoGame.image && (
                <View>
                  <TouchableOpacity
                    onPress={() => deleteImage(newVideoGame.image)}
                  >
                    <Image
                      key={newVideoGame.image}
                      source={{ uri: `${newVideoGame.image}` }}
                      style={{ margin: 5, width: 200, height: 200 }}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>


          <View
            style={[
              styles.containerInput]}
          >
            <Text
              style={[styles.title]}>
                Usuario
            </Text>
            <TextInput
              style={[styles.input]}
              placeholder="Ingrese su Usuario"
              value={newVideoGame.name}
              onBlur={() => setInputFocusedName(false)}
              keyboardAppearance="light"
              onChangeText={(text) => handleInputChange("name", text)}
            />
            {validateNvg.name !== "" && !inputFocusedName && (
              <Text style={styles.error}>{validateNvg.name}</Text>
            )}
          </View>


          <View
            style={[
              styles.containerInput]}
          >
            <Text
              style={[styles.title]}>
                Ingrese una Contraseña
            </Text>
            <TextInput
              style={[styles.input]}
              placeholder="Ingrese una Contraseña"
              value={newVideoGame.stock}
              onBlur={() => setInputFocusedName(false)}
              keyboardAppearance="light"
              onChangeText={(text) => handleInputChange("stock", text)}
            />
            {validateNvg.stock !== "" && !inputFocusedName && (
              <Text style={styles.error}>{validateNvg.stock}</Text>
            )}
          </View>


          <View
            style={[
              styles.containerInput]}
          >
            <Text
              style={[styles.title]}>
                Nombre Completo
            </Text>
            <TextInput
              style={[styles.input]}
              placeholder="Nombre Completo"
              value={newVideoGame.genre}
              onBlur={() => setInputFocusedName(false)}
              keyboardAppearance="light"
              onChangeText={(text) => handleInputChange("genre", text)}
            />
            {validateNvg.genre !== "" && !inputFocusedName && (
              <Text style={styles.error}>{validateNvg.genre}</Text>
            )}
          </View>


          <View
            style={[
              styles.containerInput
            ]}
          >
            <Text
              style={[styles.title]}
            >Fecha de Nacimiento
            </Text>
            <View>
              <View>
                <TouchableOpacity
                  onPress={showDatePicker}
                  style={[styles.dateButton]}
                >
                  <Text style={styles.buttonTextDate}>
                    {!date ? "Ingrese Fecha de Nacimiento " : convertirFecha(date) }                    
                  </Text>
                </TouchableOpacity>
                {showPicker && (
                  <DateTimePicker
                    value={date}
                    onChange={handleDateChange}
                    mode="date"
                    display="spinner"
                    textColor="red"
                    style={{ flex: 1 }}
                  />
                )}
              </View>
              {validateNvg.releaseDate !== "" && !inputFocusedDate && (
              <Text style={styles.error}>{validateNvg.releaseDate}</Text>
            )}
            </View>
            {validateNvg.releaseDate !== "" && !inputFocusedDate && (
              <Text style={styles.error}>{validateNvg.releaseDate}</Text>
            )}
          </View>


          <View
            style={[
              styles.containerInput]}
          >
            <Text
              style={[styles.title]}
            >
              Email
            </Text>
            <TextInput
              style={[styles.inputStyle2, inputStyle]}
              placeholder="Ingrese su Email"
              onBlur={() => setInputFocusedDesc(false)}
              value={newVideoGame.description}
              onChangeText={handleTextChange2}
              multiline
            />
            {validateNvg.description !== "" && !inputFocusedDesc && (
              <Text style={styles.error}>{validateNvg.description}</Text>
            )}
          </View>


          <View
            style={[
              styles.containerInput]}
          >
            <Text
              style={[styles.title]}
            >
              Domicilio
            </Text>
            <TextInput
              style={[styles.inputStyle2, inputStyle]}
              placeholder="Ingrese su Domicilio"
              onBlur={() => setInputFocusedDesc(false)}
              value={newVideoGame.tags}
              onChangeText={handleTextChange3}
            />
            {validateNvg.tags !== "" && !inputFocusedDesc && (
              <Text style={styles.error}>{validateNvg.tags}</Text>
            )}
          </View>


          <View
            style={[
              styles.containerInput]}
          >
            <Text
              style={[styles.title]}
            >
              Localidad
            </Text>
            <TextInput
              style={[styles.inputStyle2, inputStyle]}
              placeholder="Ingrese su Localidad"
              onBlur={() => setInputFocusedDesc(false)}
              value={newVideoGame.requeriments_en}
              onChangeText={handleTextChange4}
            />
            {validateNvg.requeriments_en !== "" && !inputFocusedDesc && (
              <Text style={styles.error}>{validateNvg.requeriments_en}</Text>
            )}
          </View>




      <View style={[
              styles.containerInputPhone]}>
        <Text style={[styles.title]}>
          Telefono:{' '}
          {`${selectedCountry?.callingCode} ${inputValue}`} - Pais:{' '}
          {`${selectedCountry?.name} (${selectedCountry?.cca2})`}
        </Text>
      <PhoneInput style={[styles.input]}
        defaultValue="+54"
        value={newVideoGame.price.inputValue}
        onChangePhoneNumber={handleInputValue}
        selectedCountry={selectedCountry}
        onChangeSelectedCountry={handleSelectedCountry}
      />     
      {validateNvg.price !== "" && !inputFocusedPrice && (
              <Text style={styles.error}>{validateNvg.price}</Text>
            )}
    </View>



          <View
            style={[
              styles.containerInput]}
          >
            <Text
              style={[styles.title]}
            >Profesion / es
            </Text>
            <View>
              <SelectList
                data={stackData.platforms}
                placeholder="Agregar Profesion "
                setSelected={(val) => pushItemplatforms(val)}
                search={false}
              />
            </View>
            <View>
              <SelectList
                placeholder="Eliminar Profesion"
                setSelected={(val) => removeItemplatforms(val)}
                data={newVideoGame.platforms}
                search={false}
              />
            </View>
            {validateNvg.platforms !== "" && !validateSubmit && (
              <Text style={styles.error}>{validateNvg.platforms}</Text>
            )}
          </View>


          <View
            style={[styles.containerInput
            ]}
          >
            <Text
              style={[styles.title]}
            >Imagenes de Trabajos Realizados
            </Text>
            <View
              style={
                styles.viewContx1}
            >
              <TouchableOpacity
                onPress={pickImageScreen}
                style={[
                  styles.miniButton]}
              >
                <Text
                  style={styles.buttonText}
                >Cargar Imagenes</Text>
              </TouchableOpacity>
              {validateNvg.screenShots !== "" && !validateSubmit && (
                <Text style={styles.error}>{validateNvg.screenShots}</Text>
              )}



              {newVideoGame.screenShots[0] &&
                newVideoGame.screenShots.map((i) => {
                  return (
                    <View>
                      <TouchableOpacity onPress={() => deleteScreen(`${i}`)}>
                        <Image
                          key={i}
                          source={{ uri: `${i}` }}
                          style={{ margin: 5, width: 200, height: 200 }}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })}
            </View>
          </View>


          <View></View>
          <View
            style={[
              styles.submit
            ]}
          >
            <TouchableOpacity
              style={[
                styles.miniButtonSubmit]}
              onPress={() => Submit()}
            >
              <Text
                style={[
                  styles.buttonTextSubmit]}
              >Cargar Datos
              </Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={[
                styles.miniButtonCancel
              ]}
              onPress={() => CancelSubmit()}
            >
              <Text style={styles.buttonTextCancel}>
              Cancel
                </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",

  },
  TitlePage: {
    fontSize: 24,
    fontWeight: "900", 
    color: color_morado_o

  },


  dateButton: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor:  color_gris_dadada,
    height: 42,
    width: 315,
    padding: 0,
    // backgroundColor: color_azul,
    borderRadius: 8,
  },
  buttonTextDate: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  title: {
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",

  },

  boxButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  miniButton: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",

    marginTop: 8,
    height: 42,
    width: 315,
    backgroundColor: color_celeste,
    borderRadius: 5,

  },
  buttonText: {
    textAlign: "center",
    padding: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: color_gris_c
  },
  miniButtonSubmit: {
    marginTop: 5,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: "8%",
    height: 42,
    width: 315,
    padding: 0,
    backgroundColor: color_morado_c2,
    borderRadius: 8,
  },
  miniButtonCancel: {

    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: "8%",
    height: 20,
    width: 315,

    borderRadius: 5,
  },
  buttonTextSubmit: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: color_gris_c,
  },

  buttonTextCancel:{
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: color_gris_595959,
  },
  error: {
    margin: 8,
    fontSize: 14,
    // color: "red",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 10,
    fontSize: 16,
    textAlign: "center",
    height: 50,
    marginHorizontal: "auto",
    backgroundColor: color_gris_dadada,
    borderRadius: 8,
  },

  select: {
    marginHorizontal: 50,
    justifyContent: "center",
    alignContent: "center",
    marginBottom: 10,
  },

  submit: {
    marginTop: 30,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },

  containerInput: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  containerInputPhone: {
    flex: 1,
    width:"56%",
    justifyContent: "center",
    padding: 5,
  },

  inputStyle2: {
    width: 315,
    padding: 10,
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: "auto",
    backgroundColor: color_gris_dadada,
    borderRadius: 5,
  },

  viewContx1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  bgCont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: color_azul,
  },
});

export default CreateVideogame


