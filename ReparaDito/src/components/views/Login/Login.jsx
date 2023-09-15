import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Button
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import * as Google from 'expo-auth-session/providers/google'



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
import loginService from "../../../services/login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import {
  saveItemAsyncStorage,
  loadItemAsyncStorage,
  removeItemAsyncStorage,
  showAsyncStorageData,
} from "../../helpers/functionsAsyncStorage";
import imageUser from "../../../../assets/imageUser.png";
import { checkLogedUser } from "../../../redux/userActions";
import { checkLogedGame } from "../../../redux/videogamesActions";

export const Login = ({navigation}) => {


//AUTH GOOGLE
const [accessToken, setAccessToken] = useState()
const [userInfo, setUserInfo] = useState();
const [loginUser, setLogingUser] = useState(null);
const [loginGame, setLoginGame] = useState(null);
// const [password, setPassword] = useState("");
const [errorMsg, setErrorMsg] = useState(false);
const [errorMessage, setErrorMessage] = useState("");
const [showPassword, setShowPassword] = useState(false);

// AUTH CON GOOGLE

// const [request,response,promptAsync] = Google.useAuthRequest({
//   androidClientId:"773926364501-fq5kfunp4htpqdjcbfrfik8rf678iduv.apps.googleusercontent.com",
//   iosClientId:"773926364501-evt29v0h0hqnbusmv6f9ducdsa2iau2i.apps.googleusercontent.com",
//   expoClientId:"773926364501-cpg99vce43nipc1t2kn36u3l03r58ppd.apps.googleusercontent.com",
// })

//FIN AUTH GOOGLE



  const loged = useSelector((state) => state.videogamesState.isLogged);
  const token = useSelector((state) => state.videogamesState.Token);

  const dispatch = useDispatch();
  // const navigation = useNavigation();

  useEffect(() => {
    const loadUserFromAsyncStorage = async () => {

      const loggedUser = await loadItemAsyncStorage("logedGameStack");
        try {
          if (loggedUser) {
            const dataUser = JSON.parse(loggedUser);
            console.log("dataUser Login.jsx: --->",dataUser);
        if (dataUser.user) {
          // Si es un usuario
        setLoginGame(dataUser);
        dispatch(checkLogedGame());
        setTimeout(() => {
        console.log("dataUser------------------------->", token);
        console.log("dataUser------------------------->", loged);
        }, 5000);
      } else {
        // Si es un videojuego
        setLoginGame(dataUser)
        dispatch(checkLogedGame());
        setTimeout(() => {
          console.log("dataUserGame.token:------------------------->", token);
          console.log("dataUserGame.loged:------------------------->", loged);
          }, 5000);
      }

      // ... (código de manejo de logeo)
    }
  } catch (error) {
    console.error("Error al cargar los datos desde AsyncStorage:", error);
  }
};

loadUserFromAsyncStorage();
}, [loginUser,loginGame,handleUnlogin]);
// }, [loginUser,handleUnlogin]);




  const handleLogin = async (values) => {
    try {
        // Autenticación de usuario
          const user = await loginService.login({
            user: values.user, // Usamos el nombre para autenticar usuarios
            password: values.password, // Usamos el password como contraseña temporal
          });
          console.log("ACA ESTA LO QUE DEVUELVE LA PROMESA USER", user);
    
          if(user.deleted === true) return setErrorMessage('Banned Account')
        
        if (user.success) {
          setLogingUser(user);
          saveItemAsyncStorage("logedGameStack", user);
          showAsyncStorageData();
          dispatch(checkLogedUser());              
            } else {
            setErrorMessage("Credenciales inválidas");
            const user = await loginService.login({
              user: values.user,
              password: values.password,
            });
            console.log("ACA ESTA LO QUE DEVUELVE LA PROMESA VIDEOGAME", user);
            // if (user) {
              // Autenticación de videojuego
                if (user) {
                  setLoginGame(user);
                  saveItemAsyncStorage("logedGameStack", user);
                  showAsyncStorageData();
                  dispatch(checkLogedGame());
            } else {
              setErrorMessage("Credenciales inválidas");
            }
          }
        // } else {
        //   setErrorMessage("Credenciales inválidas");
        // }
      } catch (error) {
        console.log(error);
        setErrorMessage("Credenciales inválidas");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    };



  const handleUnlogin = () => {
    removeItemAsyncStorage("logedGameStack");
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <Formik
      initialValues={{
        user: "",
        password: "",
      }}
      validate={(val) => {
        let errors = {};

        if (!val.user) {
          errors.user = "Ingresar Usuario";
        }
        // else if (!persons.some((e) => e.user.includes(val.user))) {
        //   errors.user = "Username invalid";
        // }

        if (!val.password) {
          errors.password = "Ingresar Contraseña";
        }
        // else if (user ? ){ errors.user = "Username invalid"}

        return errors;
      }}
      onSubmit={handleLogin}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        handdleLogin,
        values,
        errors,
        touched,
        onSubmit,
      }) => {
        return (
          <View style={[styles.container]}>
            <View style={[styles.header]}>
              <Image
                style={styles.logo}
                source={require("../../../../assets/logo_experto_app.png")}
              ></Image>
            </View>

            <View style={[styles.containerLogin]}>
              {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
              <View>
                <TextInput
                  placeholder="Usuario"
                  value={values.user}
                  onChangeText={handleChange("user")}
                  onBlur={handleBlur("user")}
                  style={styles.input}
                />
                {errors.user && touched.user && (
                  <Text style={styles.error}>{errors.user}</Text>
                )}
              </View>

              <View>
                <TextInput
                  placeholder="Contraseña"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  secureTextEntry={!showPassword}
                  onBlur={handleBlur("password")}
                  style={styles.input}
                />
                {/* <TouchableOpacity title={isPasswordVisible ? 'Hide Password' : 'Show Password'} onPress={() => setIsPasswordVisible(!isPasswordVisible)} /> */}
                {errors.password && touched.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <MaterialCommunityIcons
                    name={showPassword ? "eye" : "eye-off"}
                    size={20}
                    color="#000"
                    style={{marginTop:-53, left:260, padding:10,elevation:10}}
                  />
                </TouchableOpacity>
              </View>

              {errorMsg && <Text>Incorrect user or password</Text>}

              <TouchableOpacity
                style={[styles.miniButton]}
                onPress={handleSubmit}
              >
                <Text style={[styles.buttonText]}>Ingresar</Text>
              </TouchableOpacity>

              <Text style={[styles.buttonTextRegister]}>
                  Olvidaste tu Contraseña?
                </Text>
              <TouchableOpacity
                style={[styles.miniButtonRegister]}
                onPress={() =>
                  navigation.navigate("ForgotPassword", {
                    name: "ForgotPassword",
                  })
                }
              >
                <Text style={[styles.buttonTextRegister]}>
                  RECUPERAR CONTRASEÑA
                </Text>
              </TouchableOpacity>

              {/* <View>
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      marginTop: 8,
                      color: color_morado_c2,
                      fontWeight: "bold",
                    }}
                  >
                    or
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      marginTop: 8,
                      color: color_morado_c2,
                      fontWeight: "bold",
                    }}
                  >
                    -------- sing in --------
                  </Text>
                </View>
                <TouchableOpacity style={styles.buttonGoogle}
                onPress={ ()=> promptAsync({
                  useProxy:true, showInRecents: true
                })}
                >
                  <Image
                    style={styles.imageGoogle}
                    source={require("../../../../assets/singinwhitgoogle.png")}
                  />
                </TouchableOpacity>
              </View> */}


              <View style={styles.containerLogin}>
                {/* <Text style={[{ fontSize: 45 }]}>Welcome</Text>
                <Text style={[{ fontSize: 20 }, { fontWeight: "bold" }]}>
                  Fullname
                </Text>
                <Image style={styles.perfil} source={{}}></Image>
                <TouchableOpacity
                  onPress={() => {
                    handdleLogout();
                  }}
                  style={[styles.miniButtonLogout]}
                >
                  <Text style={[styles.buttonText]}>Logout</Text>
                </TouchableOpacity> */}

                <TouchableOpacity
                  style={[styles.miniButton]}
                  onPress={() =>
                    navigation.navigate("Register", { name: "Register" })
                  }
                >
                  <Text style={[styles.buttonText]}>Registro de USUARIO</Text>
                </TouchableOpacity>


                <Text style={[styles.buttonTextRegister]}>
                  Eres Profesional y quieres brindar tus servicios?
                </Text>
                <Text style={[styles.buttonTextRegister]}>
                  FORMA PARTE
                </Text>
                <Text style={[styles.buttonTextRegister]}>
                  Sumate a ReparaDito y empeza a disfrutar de todos los beneficios
                </Text>
                <Text style={[styles.buttonTextRegister]}>
                  CLUB DE EXPERTOS
                </Text>



                <TouchableOpacity
                  style={[styles.miniButton]}
                  onPress={() =>
                    navigation.navigate("CreateVideogame", { name: "CreateVideogame" })
                  }
                >
                  <Text style={[styles.buttonText]}>Registro de PROFESIONALES</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      }}
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

  logo: {
    marginTop: -30,
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
    height: "180%",
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

  title: {
    margin: 24,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  input: {
    textAlign: "center",
    height: 42,
    width: 315,
    marginTop: 8,
    borderColor: color_morado_c2,
    paddingHorizontal: 70,

    borderRadius: 5,
    backgroundColor: "#FFFFFF"
  },
  miniButton: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 16,
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
    backgroundColor: "#ACA9A9",
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
    backgroundColor: "#EA5B31",
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
    fontWeight: "normal",
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
  button: {
    padding: 10,

    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
  },
});
