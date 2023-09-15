import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Modal,
} from "react-native";
import { Formik } from "formik";
import Checkbox from "expo-checkbox";
import { uploadImageAsync } from "../../helpers/uploadImage";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { convertirFecha } from "../../helpers/InvertDate";
import imageUser from "../../../../assets/imageUser.png";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import validate from "./validate.js"

import {
  color_gris_c,
  color_morado_o,
  color_celeste,
  color_morado_c2,
  color_gris_595959,
  color_gris_dadada,
  color_morado_sc1,
  color_rojo,
  color_gris_cdcdcd,
} from "../../utils/theme/stringsColors";
import * as Google from 'expo-auth-session/providers/google'
import axios from "axios";
import Purchase from "../Purchase/Purchase"; // Aca se importa el componente Purchase

const Register = ({ navigation }) => {

  //AUTH GOOGLE// 

  const [accessToken, setAccessToken] = useState()
  const [userInfo, setUserInfo] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [request,response,promptAsync] = Google.useAuthRequest({
    androidClientId:"773926364501-fq5kfunp4htpqdjcbfrfik8rf678iduv.apps.googleusercontent.com",
    iosClientId:"773926364501-evt29v0h0hqnbusmv6f9ducdsa2iau2i.apps.googleusercontent.com",
    expoClientId:"773926364501-cpg99vce43nipc1t2kn36u3l03r58ppd.apps.googleusercontent.com",
  })

  useEffect(()=>{
    if(response?.type === "success"){
      setAccessToken(response.authentication.accessToken)

     }
  },[response])

  useEffect(() => {
    if (accessToken) {
      getUserData();
    }
  }, [accessToken]);


  const getUserData = async  () => {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me",
    { headers: {Authorization: `Bearer ${accessToken}`}})

      await userInfoResponse.json().then(data => {
      setUserInfo(data)
    })

  }


  const showUserData = () => {

    if(userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{ uri: userInfo.picture}} style ={styles.profilePic}/>
          <Text>welcome {userInfo.name}</Text>
          <Text> {userInfo.email}</Text>

        </View>
      )
    }
  }

  // ----------- FIN AUTH GOOGLE ------



  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [acceptTac, setAcceptTac] = useState(false);
  const [receibenewsLetter, setReceivenewsLetter] = useState(false);
  const [image, setImage] = useState('https://res.cloudinary.com/reparadito/image/upload/v1692410327/ubgnb0arjppbiq3scce7.png');
  const [showPurchase, setShowPurchase] = useState(false); // Variable de estado para mostrar el componente Purchase
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    convertirFecha();
  }, [date]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
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

      setImage(arrLks[0]);
      console.log(`4-----${image}`);
      console.log(`46-----${arrLks}`);
      return arrLks;
    }
  };



  const onSubmit = async (values) => {
    const userData = {
      ...values,
      tac: acceptTac,
      newsLetter: receibenewsLetter,
      id: 1 + Math.floor(Math.random() * 999),
      userAdmin: true,
      image: image,
      date: date,
    };



    console.log(`Antes del try ${userData}`);

    try {
      console.log(`Después del try ${userData}`);

      const response = await axios.post(
        "http://192.168.0.85:3001/user",
        {
          user: userData.user,
          password: userData.password,
          fullname: userData.fullname,
          email: userData.email,
          date: userData.date,
          phone: userData.phone,
          tac: userData.tac,
          newsLetter: userData.newsLetter,
          id: userData.id,
          userAdmin: userData.userAdmin,
          image: userData.image,
        }
      );
      console.log(`Respuesta del servidor:`, response.data);
      
      
      const emailResponse = await axios.post(
        "http://192.168.0.85:3001/correo-registro",

        {
          correo: userData.email,
          user: userData.user,
          fullname: userData.fullname,
        }
      );
      console.log(`Respuesta del servidor:`, emailResponse.data);

      Alert.alert("User Created!", "", [
        {
          text: "Go to login",
          onPress: () => navigation.navigate("RenderLogin", { name: "RenderLogin" }),
        },
      ]);

      // Mostrar el componente Purchase después de un registro exitoso
      setShowPurchase(true);
    } catch (error) {
      console.log("Error en el backend:", error.response.data.message);
      Alert.alert("Auch...Something went wrong", error.response.data.message);
    }
  };

  // const onSubmit = async (values) => {
  //   const userData = {
  //     ...values,
  //     tac: acceptTac,
  //     newsLetter: receibenewsLetter,
  //     id: 1 + Math.floor(Math.random() * 999),
  //     userAdmin: false,
  //     image: image,
  //     date: date,
  //   };
  
  //   console.log(`Antes del try ${userData}`);
  
  //   try {
  //     console.log(`Después del try ${userData}`);
  
  //     const response = await axios.post(
  //       "https://pfvideojuegos-back-production.up.railway.app/user",
  //       {
  //         user: userData.user,
  //         password: userData.password,
  //         fullname: userData.fullname,
  //         email: userData.email,
  //         date: userData.date,
  //         phone: userData.phone,
  //         tac: userData.tac,
  //         newsLetter: userData.newsLetter,
  //         id: userData.id,
  //         userAdmin: userData.userAdmin,
  //         image: userData.image,
  //       }
  //     );
  
  //     console.log(`Respuesta del servidor:`, response.data);
  
  //     let emailAlertMessage = "Confirmation email has been sent successfully.";
      
  //     try {
  //       // Intentar enviar el correo solo si el primer POST fue exitoso
  //       const emailResponse = await axios.post(
  //         "https://pfvideojuegos-back-production.up.railway.app/correo-registro",
  //         {
  //           correo: userData.email,
  //           user: userData.user,
  //           fullname: userData.fullname,
  //         }
  //       );
  
  //       console.log(`Respuesta del servidor (correo):`, emailResponse.data);
  //     } catch (emailError) {
  //       console.log("Error en el envío del correo:", emailError);
  //       emailAlertMessage = "Confirmation email could not be sent.";
  //     }
  
  //     Alert.alert("User Created!", "", [
  //       {
  //         text: "Go to login",
  //         onPress: () => navigation.navigate("RenderLogin", { name: "RenderLogin" }),
  //       },
  //     ]);
  
  //     Alert.alert("User Created!", emailAlertMessage);
  
  //     // Mostrar el componente Purchase después de un registro exitoso
  //     setShowPurchase(true);
  //   } catch (error) {
  //     console.log("Error en el backend:", error.response.data.message);
  //     Alert.alert("Auch...Something went wrong", error.response.data.message);
  //   }
  // };

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  return (
    <ScrollView>
      <View style={[styles.bgCont]}>
        <TouchableOpacity onPress={pickImage} style={[styles.ImageButton]}>
          <Image
            source={{  uri: image}}
            style={{ margin: 5, width: 200, height: 200, borderRadius:125}}
          />
        </TouchableOpacity>
      </View>

      <Formik
        initialValues={{
          user: "",
          password: "",
          fullname: "",
          email: "",
          phone: "",
        }}
        validate={(values) => {
          let errors = {};
          if (!values.user) {
            errors.user = "Please enter a user";
          }
          if (!values.password) {
            errors.password = "Please enter a password";
          }
          if (!values.fullname) {
            errors.fullname = "Please enter your full name";
          }
          if (!values.email) {
            errors.email = "Please enter your email address";
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = "Please enter a valid email address";
          }
          if (!values.phone) {
            errors.phone = "Please enter your phone number";
          } else if (!/^\d{10}$/.test(values.phone)) {
            errors.phone = "Please enter a valid 10-digit phone number";
          }

          return errors;
        }}
        image={image}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          image,
        }) => (
          <View style={[]}>
            <View style={[styles.container]}>
              <View style={[styles.containerLogin]}>
                <View>
                  <Text style={styles.title}>User</Text>
                  <TextInput
                    style={[styles.input, ,]}
                    value={values.user}
                    placeholder="User"
                    onChangeText={handleChange("user")}
                    onBlur={handleBlur("user")}
                  />
                  {errors.user && touched.user && (
                    <Text style={styles.error}>{errors.user}</Text>
                  )}
                </View>
                    {showUserData()}
                <View>
                  <Text style={styles.title}>Password</Text>
                  <TextInput
                    style={styles.input}
                    value={values.password}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                  />
                                  <TouchableOpacity
                  style={styles.button}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <MaterialCommunityIcons
                    name={showPassword ? "eye" : "eye-off"}
                    size={20}
                    color="#000"
                    style={{marginTop:-40, left:260, padding:10}}
                  />
                </TouchableOpacity>
                  {errors.password && touched.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}
                </View>

                <View>
                  <Text style={styles.title}>Fullname</Text>
                  <TextInput
                    style={[styles.input]}
                    value={values.fullname}
                    placeholder="Full Name"
                    onChangeText={handleChange("fullname")}
                    onBlur={handleBlur("fullname")}
                  />
                  {errors.fullname && touched.fullname && (
                    <Text style={styles.error}>{errors.fullname}</Text>
                  )}
                </View>

                <View>
                  <Text style={styles.title}>Email</Text>
                  <TextInput
                    style={[styles.input]}
                    value={values.email}
                    placeholder="Email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}
                </View>

                <View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Birthdate</Text>
                    <View style={{ flex: 1 }}>
                      <TouchableOpacity
                        onPress={showDatePicker}
                        style={[styles.dateButton]}
                      >
                        <Text style={styles.buttonTextDate}>
                          {!date
                            ? "Insert date of birth "
                            : convertirFecha(date)}
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
                  </View>
                </View>

                <View>
                  <Text style={styles.title}>Phone</Text>
                  <TextInput
                    style={[styles.input]}
                    value={values.phone}
                    placeholder="Phone"
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                  />
                  {errors.phone && touched.phone && (
                    <Text style={styles.error}>{errors.phone}</Text>
                  )}
                </View>

                <View style={styles.boxcontainercheckbox}>
                 <View style={styles.checkboxSection}>
                    <Checkbox
                      style={styles.checkbox}
                      value={acceptTac}
                      onValueChange={setAcceptTac}
                    />
                    <View style={styles.boxcontainercheckbox}>
                      <TouchableOpacity
                        onPress={() => setModalVisible(true)} // Abrir el modal al presionar el texto
                      >
                        <Text style={[styles.checkboxParagraph]}>
                          I accept the Terms and Conditions
                        </Text>
                      </TouchableOpacity>
                      {!errors.acceptTac === true && (
                    <Text style={styles.error}>{errors.acceptTac}</Text>
                  )}
                    </View>
                  </View>

                  <View style={styles.checkboxSection}>
                    <Checkbox
                      style={[styles.checkbox]}
                      value={receibenewsLetter}
                      onValueChange={setReceivenewsLetter}
                    />
                    <Text style={[styles.checkboxParagraph]}>
                      I want to receive the newsLetter
                    </Text>
                  </View>
                </View>
              </View>

              <View>
                <TouchableOpacity
                  style={[styles.miniButton]}
                  onPress={handleSubmit}
                >
                  <Text style={[styles.buttonText]}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Formik>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContentContainer}>
            <View style={styles.modalContent}>
              {/* Título del modal */}
              <Text style={styles.modalTitle}>
                User Registration Terms and Conditions - GameStack
              </Text>

              {/* Subtítulo del modal */}
              <Text style={styles.modalSubtitle}>
                Welcome to GameStack. Before using our services, we kindly ask
                you to read these User Registration Terms and Conditions
                carefully. By registering on GameStack, you agree to comply with
                the following terms and conditions that govern our relationship
                with users:
              </Text>

              {/* Lista enumerada */}
              <View style={styles.listContainer}>
                <Text style={styles.listItem}>
                  1- Acceptance of Terms and Conditions:
                </Text>
                <Text style={styles.listDescription}>
                  By creating an account on GameStack, you accept these terms
                  and conditions in full. If you do not agree with any part of
                  these terms, we recommend that you do not use our services.
                </Text>

                <Text style={styles.listItem}>
                  2- User Registration and Account:
                </Text>
                <Text style={styles.listDescription}>
                  a. To register on GameStack, you must be of legal age in your
                  country of residence or have the consent of your parents or
                  legal guardians. b. The information provided during
                  registration must be accurate, up-to-date, and complete. It is
                  the user's responsibility to keep this information updated at
                  all times. c. The user is solely responsible for maintaining
                  the confidentiality of their account and password. Any
                  activity performed from their account will be their sole
                  responsibility.
                </Text>

                <Text style={styles.listItem}>3- Acceptable Use:</Text>
                <Text style={styles.listDescription}>
                  a. By using GameStack, you agree not to violate any applicable
                  laws or infringe on the rights of third parties. b. You will
                  not use GameStack for illegal, fraudulent, or unauthorized
                  purposes, including, but not limited to, sending offensive,
                  defamatory, or inappropriate content.
                </Text>

                <Text style={styles.listItem}>4- Intellectual Property:</Text>
                <Text style={styles.listDescription}>
                  a. GameStack and all its content (logos, designs, text,
                  graphics, images, software, etc.) are the exclusive property
                  of GameStack or their respective licensed owners. b.
                  Unauthorized reproduction, distribution, modification, public
                  display, or any other unauthorized use of GameStack's content
                  is not permitted without prior written consent from the
                  owners.
                </Text>

                <Text style={styles.listItem}>
                  5- Purchases and Transactions:
                </Text>
                <Text style={styles.listDescription}>
                  a. By making purchases on GameStack, you acknowledge that you
                  are responsible for providing accurate and valid payment
                  information. b. All purchases are subject to product
                  availability and applicable terms and conditions of sale.
                </Text>

                <Text style={styles.listItem}>
                  6- Account Cancellation and Suspension:
                </Text>
                <Text style={styles.listDescription}>
                  a. GameStack reserves the right to cancel or suspend user
                  accounts that violate these terms and conditions or engage in
                  fraudulent or malicious activities.
                </Text>

                <Text style={styles.listItem}>
                  7- Modifications to Terms and Conditions:
                </Text>
                <Text style={styles.listDescription}>
                  a. GameStack may modify these terms and conditions at any time
                  without prior notice. Updated versions will be posted on our
                  website. b. It is the user's responsibility to regularly
                  review the updated terms and conditions.
                </Text>

                <Text style={styles.listItem}>8- Privacy Policy:</Text>
                <Text style={styles.listDescription}>
                  a. The collection and use of personal data are governed by our
                  Privacy Policy, which is available on the GameStack website.
                </Text>

                <Text style={styles.listItem}>9- Applicable Law:</Text>
                <Text style={styles.listDescription}>
                  These terms and conditions shall be governed and interpreted
                  in accordance with the laws of [Argentina]. Any dispute
                  arising from these terms and conditions shall be subject to
                  the exclusive jurisdiction of the courts of [Argentina].
                </Text>

                {/* Resto de los elementos de la lista enumerada */}
              </View>

              {/* Subtítulo final del modal */}
              <Text style={styles.modalSubtitle}>
                If you have any questions or concerns about these terms and
                conditions, please contact us through the customer support
                channels provided on our website.
              </Text>

              <TouchableOpacity
                onPress={() => setModalVisible(false)} // Cerrar el modal al presionar el texto
                style={styles.modalClose}
              >
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
      {/* Mostrar el componente Purchase si showPurchase es true */}
      {showPurchase && <Purchase />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  /////
  header: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color_gris_c,
    width: "100%",
  },

  title: {
    marginTop:16,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    color: color_morado_o,
    width: "100%",
  },

  bgCont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color_gris_c,
  },

  container: {
    marginTop: 0,
    backgroundColor: color_gris_c,
    alignItems: "center",
    padding: 8,
  },

  containerLogin: {
    width: 340,
    padding: 10,
  },

  input: {
    textAlign: "center",
    height: 42,
    width: 315,
    borderColor: color_gris_c,
    backgroundColor: color_gris_dadada,
    borderRadius: 8,
  },

  ImageButton: {
    marginTop: 16,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
    backgroundColor: color_morado_o,
    borderRadius: 125,
  },
  miniButton: {
    marginTop: 15,
    marginBottom: 32,
    height: 42,
    width: 315,
    padding: 0,
    backgroundColor: color_morado_sc1,
    borderRadius: 5,
  },
  dateButton: {
    height: 42,
    width: 315,
    padding: 0,
    backgroundColor: color_gris_dadada,
    borderRadius: 5,
  },
  buttonTextDate: {
    textAlign: "center",
    padding: 10,
    fontSize: 14,
    fontWeight: "600",
    color: color_gris_cdcdcd,
  },
  error: {
    textAlign: "center",
    fontSize: 14,
    color: color_rojo,
    fontWeight: "bold",
  },
  buttonText: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: color_gris_c,
  },

  boxcontainercheckbox: {
    flex: 1,
    marginTop: 16,
    alignItems: "flex-start",
  },

  checkboxSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxParagraph: {
    color: color_gris_595959,
    fontSize: 14,
  },
  checkbox: {
    margin: 8,
  },

  // Estilos para el Modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Color de fondo semitransparente
  },
  modalContentContainer: {
    flexGrow: 1, // Permitir que el contenido del ScrollView crezca
    justifyContent: "center", // Centrar verticalmente el contenido del ScrollView
    paddingHorizontal: 20,
  },

  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3F16A7",
    textAlign: "center",
  },

  modalSubtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },

  listContainer: {
    marginLeft: 15,
  },

  listItem: {
    fontWeight: "bold",
  },

  listDescription: {
    marginLeft: 15,
  },
  modalClose: {
    backgroundColor: "#622EDA", // Fondo de color #622EDA
    fontWeight: "bold", // Negrita
    paddingHorizontal: 10, // Agregar espaciado horizontal
    paddingVertical: 5, // Agregar espaciado vertical
    borderRadius: 8, // Agregar bordes redondeados
    alignSelf: "center", // Centrar el botón horizontalmente dentro del modal
    marginTop: 10, // Agregar margen superior
  },
  modalCloseText: {
    color: "#FFF", // Letra blanca
    fontSize: 18, // Aumentar el tamaño de la fuente
  },
});


export default Register;
