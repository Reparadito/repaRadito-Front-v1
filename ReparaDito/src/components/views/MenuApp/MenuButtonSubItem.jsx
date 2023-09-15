import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//linea para llamar a modo DARK
import { ThemeContext } from '../../utils/theme/ThemeProvider';
import  { useContext} from 'react';

const MenuButtonSubItem = ({nombre, onPress,icon}) => {

  //linea para setear el modo dark
  const { StringsDark } = useContext(ThemeContext);
  return (
    <TouchableOpacity 
        style={styles.buttonContainer}
        onPress={onPress}>
      <MaterialCommunityIcons name={icon} color={ StringsDark.menuDrawner_ico }  size={20}/> 
     <View style={styles.ItemContainer}>
     <Text style={[styles.text,{color:StringsDark.menuDrawner_ico}]}>{nombre}</Text>
        <View style={styles.separator}/>
     </View>
     

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
        marginLeft:40
},
    ItemContainer:{
        flexDirection:'column',
        width: '100%',
        // marginLeft:2
    },
    text:{
        fontSize:20,
        fontWeight: 'bold',
        marginLeft:20,
        fontFamily: 'Roboto',
        textAlign:'justify',
        alignContent: 'flex-start'
        //  color: color_azul

    },
    separator: {
      //  marginVertical: 30,
      margin:2,
      height: 0,
      width: '100%',
      marginLeft:20,
      borderColor:'#6B35E8',
      borderWidth:1,
      borderBottomWidth:0,
      opacity: .31,
      
    },
  
})
export default MenuButtonSubItem