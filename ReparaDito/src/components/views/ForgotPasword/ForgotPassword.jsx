import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";
import queryString from 'query-string';
import {
  color_gris_c,
  color_morado_o,
  color_celeste,
  color_morado_c2,
  color_gris_595959,
  color_gris_cdcdcd,
  color_gris_dadada,
} from "../../utils/theme/stringsColors";

// import { persons } from "../../../utils/arrayPersons";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import axios from "axios";
// import { logService } from "../../../services/ServiceLogin";
// import {getItemAsyncStorage,InsertUserAsynStorage,removeItem} from '../Forms/Cart/CardCartController'
// import { useFocusEffect } from '@react-navigation/native';
import { setUserLogging } from "../../../redux/userSlices";
import { useDispatch } from "react-redux";
export const ForgotPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState();

  const [session, setSession] = useState(null);
  const [user, setUser] = useState("");
  const [logginUser, setLoggingUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const handdleForgot = async (values) => {
    console.log("asdkasldasklnmdklasdasklmdakslmdasklmdaskldmaslkmaslkdmaslñmdasldmas----->",values.email)
    const email = JSON.stringify(values.email)
    console.log(email)
    console.log(values.email)
    const encodedEmail = encodeURIComponent(values.email);
    console.log(encodedEmail)
    console.log(`http://192.168.0.85:3001/forgotPassword/${values.email}`)
    try {
      // Envolvemos la petición en un bloque try-catch para capturar errores
      const res = await axios.put(`http://192.168.0.85:3001/forgotPassword/${encodedEmail}`);
    
      console.log("asdkasldasklnmdklasdasklmdakslmdasklmdaskldmaslkmaslkdmaslñmdasldmas----->",values.email)
      Alert.alert("We sent your new password!", "", [
        {
          onPress: () => {
            // Reseteamos el valor del email después de mostrar la alerta
            values.email = "";
          },
          text: "Close",
        },
        {
          text: "Go to login",
          onPress: () =>
            navigation.navigate("RenderLogin", { name: "RenderLogin" }),
        },
      ]);
    } catch (error) {
      // Si ocurre un error, significa que el usuario no está registrado
      console.log(error)
      Alert.alert("You are not registered", "", [
        {
          onPress: () => {
            // Reseteamos el valor del email después de mostrar la alerta
            values.email = "";
          },
          text: "Close",
        },
      ]);
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <Formik
      initialValues={{
        email: "", // Should be "user" instead of "email" based on the input field below
      }}
      validate={(values) => {
        let errors = {};

        if (!values.email) {
          errors.email = "Please enter your email address"; // Should be "Please enter your username"
        }

        return errors;
      }}
      onSubmit={handdleForgot}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              style={styles.logo}
              source={require('../../../../assets/logo_experto_app.png')}
            />
          </View>
          <View style={styles.containerLogin}>
            <Text style={styles.title1} >Recuperar contraseña</Text>
            <Text>Por favor ingrese su email</Text>

            <View>
              <TextInput
                placeholder="    Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                style={styles.input}
              />
              {errors.email && touched.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.miniButton}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Recuperar mi contraseña</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  header: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ACA9A9",
    width: "100%",
  },

  title1:{
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "#EA5B31",
    fontSize:24,
    fontWeight:"900",
    marginBottom: 16,
  },

  title: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    color: color_morado_o,
    width: "100%",
  },


  logo: {
    marginTop: 92,
    marginBottom: 22,
    marginLeft: -30,
    height: 140,
    width: "105%",
  },
  perfil: {
    margin: 10,
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  container: {
    backgroundColor: "#ACA9A9",
    height: "100%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    padding: 8,
  },

  containerLogin: {
    margin: "auto",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: 315,
    height: "85%",
    backgroundColor: "#ACA9A9",
    alignItems: "center",
    padding: 10,
  },
  input: {
    textAlign:"left",
    height: 42,
    width: 315,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    marginTop:16
  },
  miniButton: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 24,
    height: 42,
    width: 315,
    padding: 0,
    backgroundColor: "#EA5B31",
    borderRadius: 8,
  },

  miniButtonRegister: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 8,
    height: 42,
    width: 315,
    padding: 0,
    backgroundColor: color_gris_c,
    borderRadius: 8,
  },
  
  miniButtonLogout: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginTop: "50%",
    height: "10%",
    width: "50%",
    padding: 0,
    backgroundColor: color_gris_cdcdcd,
    borderRadius: 8,
  },
  error: {
    textAlign: "center",

    fontSize: 14,
    color: "red",
    fontWeight: "bold",
  },
  buttonText: {
    textAlign: "center",
    padding: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: color_gris_c,
  },

  buttonTextRegister: {
    textAlign: "center",
    padding: 10,
    fontSize: 15,
    fontWeight: 'normal',
    color: color_celeste,
  },
  buttonGoogle: {
    marginTop: 16,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 20,
    color: color_morado_c2,
  },
  imageGoogle: {
    height: 40,
    width: 250,
  },
});
