import { View, Text,StyleSheet } from 'react-native'
import { useDispatch } from "react-redux";
import {useState, useContext} from 'react'

import { Searchbar } from 'react-native-paper';
import {getvGamebyName,getvideoGames,clearAllFilters} from "../../../redux/videogamesActions"
import { color_blanco, color_gris_595959, color_gris_c, color_gris_cdcdcd } from '../../utils/theme/stringsColors';
import { ThemeContext } from '../../utils/theme/ThemeProvider';

const SearchBar = (props) => {

    const dispatch = useDispatch()

    const [searchQuery, setSearchQuery] = useState('');
    const { StringsDark, isDarkMode } = useContext(ThemeContext);

    //funcion de busqueda

    const onChangeSearch = (query) => {
          setSearchQuery(query);
          console.log("estas bsucando",query)
          
            dispatch(getvGamebyName(query))
          
    }


    const onCloseSearch = () => {
        // console.log("limpiando valores de busqueda");
        setSearchQuery("");
        dispatch(clearAllFilters()) 
        
    }


      function handleSubmit() {
         dispatch(getvGamebyName(searchQuery));
      }


    return (
        // <View style={[styles.Container, isDarkMode && styles.DarkContainer]}>
          <View style={[styles.Container,
            { backgroundColor: StringsDark.Titulo_Screen_fondo },
          ]}>
            
          <Searchbar
            autoFocus={true}
            placeholder={"Search"}
            onChangeText={onChangeSearch}
            onIconPress={handleSubmit}
            onClearIconPress={onCloseSearch}
            value={searchQuery}
            inputStyle={[styles.SearchbarText, ]}
            style={[styles.Searchbarfondo,]}
            iconColor={'#FFFFFF'}
            placeholderTextColor={color_gris_595959}
          />
        </View>
      )
}
const styles = StyleSheet.create({
  Container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end', // Agrega esta línea
    flexDirection: 'row',
    marginRight:8
  },

    Searchbarfondo:{
        marginLeft:'5%', 
        height: 46,
        width:200,
        marginRight:8,
        // backgroundColor: color_azul,
        // borderColor: color_blanco,
        borderRadius: 5,
        alignContent:'center',
        backgroundColor: '#987bdc',
        

    }

    ,SearchbarText:{
        fontSize:16,
        color:color_blanco,
        alignSelf: 'center',
        fontWeight:'bold',
        

    },
})
export default SearchBar;