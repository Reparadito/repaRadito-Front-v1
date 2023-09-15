import "react-native-gesture-handler";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Detail from "./Detail/Detail";
import VideoGames from "./VideoGames";
import SearchBar from "./SearchBar";
import ButtonCart from "./../../forms/Cart/ButtonCart"
import { useEffect ,useContext, useState} from 'react'
import { ThemeContext } from '../../utils/theme/ThemeProvider';
import { LanguajeContext } from '../../utils/languaje/languajeProvider';
import { useDispatch } from 'react-redux';

import Filter from "../../utils/Filters/Filter";

import {clearAllFilters,} from "../../../redux/videogamesActions"
import { color_blanco, color_morado_c2 } from "../../utils/theme/stringsColors";
const Stack = createNativeStackNavigator();

const HomeD =({ navigation, route})=>{
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Estado para controlar si el filtro está abierto
  const dispatch = useDispatch();
//linea para setear el modo dark
const { isDarkMode, StringsDark } = useContext(ThemeContext);
//linea para setear el lenguaje /obtener palabras de lenguaje
const {StringsLanguaje ,locale}= useContext(LanguajeContext)

const handleOpenFilter = () => {
  setIsFilterOpen(true);
};

const handleCloseFilter = () => {
  setIsFilterOpen(false);
};

const handleResetFilter = () => {
  // Lógica para restablecer los filtros

  dispatch(clearAllFilters());
};
  
  useEffect(()=>{
    // console.log("rellamando a cabecera en home x redux");
    navigation.setOptions({
        headerTitle: `${StringsLanguaje.allVideoG}`,
        // headerTitle: `All Videogames`,
        headerTintColor: `${StringsDark.Titulo_Screen}`,
        headerStyle: {
        backgroundColor: StringsDark.Titulo_Screen_fondo,
      },
       headerRight: () => <ButtonCart navigation={navigation} />, 
    })
  },[isDarkMode,locale])
  

  return (
    <View style={[{ flex: 1 },
    { backgroundColor: StringsDark.Titulo_Screen_fondo },
  ]}>
      <Stack.Navigator >
        <Stack.Screen
        
          name='VideoGames'
          component={VideoGames}
          
          options={{
            title: '',//va en blanco xq va la search bar
            headerStyle: {
              backgroundColor: StringsDark.Titulo_Screen_fondo
            },
            headerRight: () => (<SearchBar />),
            headerLeft: () => (
              <TouchableOpacity onPress={handleOpenFilter} style={styles.filterButton}>
                <Text style={styles.filterButtonText}>Filters</Text>
              </TouchableOpacity>
            ),
            

          }}
        >
        </Stack.Screen>
        <Stack.Screen
          name='Detail'
          component={Detail}
          options={{
            title: '',
            // headerStyle: {
            //   backgroundColor: StringsDark.backgroundTittle,
            // },
            // headerTintColor: StringsDark.titblanco,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25
            }
          }}
  
        >
        </Stack.Screen>

    </Stack.Navigator>
    {/* Renderizamos el componente Filter si el estado isFilterOpen es true */}
    {isFilterOpen && (
        <View style={{ flex: 1 }}>
          {/* Pasar la función handleResetFilter y handleCloseFilter como props al componente Filter */}
          <Filter
            handleResetFilter={handleResetFilter}
            handleCloseFilter={handleCloseFilter}
          />
        </View>
      )}
    </View>
    );

}

const styles = StyleSheet.create({
  
  filterButton: {
    backgroundColor: color_morado_c2,
    paddingHorizontal: 30,
    paddingVertical: 13, // Aumentar el valor aquí según tus necesidades
    borderRadius: 5,
    marginLeft:16
  },
  filterButtonText: {
    color: color_blanco,
    fontWeight: "bold",
  },

  container: {
    flex: 1,
    padding: 10,
    backgroundColor: color_morado_c2,
  },
});




export default HomeD