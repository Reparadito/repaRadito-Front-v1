import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'

 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../../utils/theme/ThemeProvider';
import  { useContext} from 'react';
//linea para llamar a modo DARK
// import { ThemeContext } from '../../../../../../../ProyectoFinal_GameShop/GameShop/GameShop/client/src/components/Theme/ThemeProvider';


const MenuButton = ({nombre, onPress, icon}) => {

  //linea para setear el modo dark
 const { StringsDark } = useContext(ThemeContext);
 
  return (
    <TouchableOpacity 
        style={styles.buttonContainer}
        onPress={onPress}>
     <MaterialCommunityIcons name={icon} color={ StringsDark.menuDrawner_ico }  size={20}/>
      <Text style={[styles.text,{color:StringsDark.menuDrawner_ico}]}>{nombre}</Text>


    </TouchableOpacity>
  )
}
const styles=StyleSheet.create({
    buttonContainer:{
        flexDirection:'row',
        padding: 5,
        width: '100%',
        alignContent: 'center',
        alignItems:'center',
        marginLeft:10
    },
    text:{
        fontSize:21,
        fontWeight: 'bold',
        marginLeft:20,
        fontFamily: 'Roboto',
        
    },

})


export default MenuButton