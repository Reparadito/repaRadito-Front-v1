import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { StatusBar } from 'react-native';
import { ThemeContext } from '../../utils/theme/ThemeProvider';
import { LanguajeContext } from '../../utils/languaje/languajeProvider';
import {
  getvideoGames,
  applyPriceSortAsc,
  applyRatingSortDesc
} from '../../../redux/videogamesActions';
import Card from '../../utils/Card/Card';
import { loadItemAsyncStorage } from '../../helpers/functionsAsyncStorage';
import { checkLogedUser } from '../../../redux/userActions';
import Loading from '../../helpers/Loading';

const Landing = ({ navigation }) => {
  const { isDarkMode, StringsDark } = useContext(ThemeContext);
  const { StringsLanguaje, locale } = useContext(LanguajeContext);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      const logedData = await loadItemAsyncStorage("logedGameStack");
      if(logedData.user)
      dispatch(checkLogedUser(logedData)); 

    }
    fetchData();
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getvideoGames());
    dispatch(applyPriceSortAsc());
    dispatch(applyRatingSortDesc());
    setIsLoading(false);

  }, []);

  const videoGames = useSelector((state) => state.videogamesState.videoGames);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${StringsLanguaje.Welcome}`,
      // headerTitle: `Welcome`,
      headerTintColor: StringsDark.Titulo_Screen,
      headerStyle: {
        backgroundColor: StringsDark.Titulo_Screen_fondo,
      },
    });
  }, [isDarkMode, locale]);

  const [menu1Index, setMenu1Index] = useState(5);
  const [menu2Index, setMenu2Index] = useState(10);
  const [showMoreMenu1, setShowMoreMenu1] = useState(true);
  const [showMoreMenu2, setShowMoreMenu2] = useState(true);
  const [showCloseMenu1, setShowCloseMenu1] = useState(false);
  const [showCloseMenu2, setShowCloseMenu2] = useState(false);

  useEffect(() => {
    setMenu1Index(5);
    setMenu2Index(10);
    setShowMoreMenu1(true);
    setShowMoreMenu2(true);
    setShowCloseMenu1(false);
    setShowCloseMenu2(false);
  }, [videoGames]);

  const loadMoreGames = (menu) => {
    if (menu === 'menu1') {
      const newMenu1Index = menu1Index + 5;
      if (newMenu1Index >= videoGames.length) {
        setMenu1Index(videoGames.length);
        setShowMoreMenu1(false);
        setShowCloseMenu1(true);
      } else {
        setMenu1Index(newMenu1Index);
      }
    } else if (menu === 'menu2') {
      const newMenu2Index = menu2Index + 5;
      if (newMenu2Index >= videoGames.length) {
        setMenu2Index(videoGames.length);
        setShowMoreMenu2(false);
        setShowCloseMenu2(true);
      } else {
        setMenu2Index(newMenu2Index);
      }
    }
  };

  const renderSliderItem = ({ item }) => (
    <View style={styles.sliderItem}>
      <Image source={{ uri: item.image }} style={styles.sliderImage} resizeMode="cover" />
    </View>
  );

  const customKeyExtractor = (item, index) => {
    return index.toString();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: StringsDark.menuDrawner_c }]}>
      {isLoading ? (
        <Loading />
      ) : (
      <View style={styles.subContainer}>
      <StatusBar backgroundColor={StringsDark.status_bar} barStyle="light-content" />

      <View style={styles.gameStackButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeStack')}>
          {/* Cambiar el botón "Game Stack" por una imagen */}
          <Image source={require('../../../../assets/logo_experto_app.png')} style={styles.gameStackButton} />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={videoGames}
        keyExtractor={customKeyExtractor}
        // renderItem={renderSliderItem}
        contentContainerStyle={styles.sliderContainer}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
        snapToInterval={382}
        decelerationRate="fast"
      />

      <View style={[styles.menuContainer, { backgroundColor: '#280657' }]}>
        <Text style={[styles.menuTitle, styles.bestSellersTitle, { color: '#FFFFFF' }]}>Mejores Calificados</Text>
        <View style={styles.cardContainer}>
          {videoGames.slice(0, menu1Index).map((item, index) => (
            <Card key={index} videoG={item} nav={navigation} />
          ))}
        </View>
        {showMoreMenu1 && (
          <TouchableOpacity onPress={() => loadMoreGames('menu1')}>
            <View style={[styles.button, styles.menuButton]}>
              <Text style={[styles.buttonText, { color: StringsDark.boton_texto }]}>
                {menu1Index >= videoGames.length ? 'Close' : 'See more'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {showCloseMenu1 && (
          <TouchableOpacity onPress={() => setShowCloseMenu1(false)}>
            <View style={[styles.button, styles.menuButton]}>
              <Text style={[styles.buttonText, { color: StringsDark.boton_texto }]}>Close</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
{/* 
      <View style={[styles.menuContainer, { backgroundColor: '#3f13a4' }]}>
        <Text style={[styles.menuTitle, styles.lastestReleasesTitle, { color: '#FFFFFF' }]}>Lastest releases</Text>
        <View style={styles.cardContainer}>
          {videoGames.slice(5, menu2Index).map((item, index) => (
            <Card key={index} videoG={item} nav={navigation} />
          ))}
        </View>
        {showMoreMenu2 && (
          <TouchableOpacity onPress={() => loadMoreGames('menu2')}>
            <View style={[styles.button, styles.menuButton]}>
              <Text style={[styles.buttonText, { color: StringsDark.boton_texto }]}>
                {menu2Index >= videoGames.length ? 'Close' : 'See more'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {showCloseMenu2 && (
          <TouchableOpacity onPress={() => setShowCloseMenu2(false)}>
            <View style={[styles.button, styles.menuButton]}>
              <Text style={[styles.buttonText, { color: StringsDark.boton_texto }]}>Close</Text>
            </View>
          </TouchableOpacity>
        )}
      </View> */}
          </View>
          )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer:{
    alignItems:"center",
    backgroundColor: "#ACA9A9",

  },
  sliderContainer: {
    marginBottom: 100,
    marginTop: 16,
  },
  sliderItem: {
    width: 382,
    height: 235,
    justifyContent: 'center',
    marginBottom:8
  },
  sliderImage: {
    width: "100%",
    height: "100%",
  },
  menuContainer: {
    width:352,
    justifyContent:"center",
    alignItems:"center",
    marginBottom: 24,

    borderRadius: 8,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom:8
  },
  button: {
    marginBottom: 8,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    padding: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuButton: {
    width: '100%',
  },
  gameStackButtonContainer: {
    alignItems: 'center',
    marginTop:24,
    marginBottom: 8,
    width:315,
    height:42.57,
   },
  gameStackButton: {
    marginLeft: -30,
    width:415,
    height:140,
  },

  cardContainer: {

    justifyContent: "center",

  },
});

export default Landing;