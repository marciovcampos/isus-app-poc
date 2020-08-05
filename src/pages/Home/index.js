import React, { useLayoutEffect } from 'react';
import {
  ScrollView, TouchableOpacity, Dimensions, StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ForcaTarefaAntiCorona from './forcatarefaanticorona';
import ProviderDeVersaoDoManejo from '../ClinicalManagement/contexto/contextoVersaoManejo';
import Servicos from './servicos';
import Carrossel from './carrossel';

export default function HomeScreen() {
  const navigation = useNavigation();

  async function redirectToWelcome() {
    const item = await AsyncStorage.getItem('@show-tutorial');
    const resp = JSON.parse(item);
    if (resp !== false) {
      return navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }]
      });
    }
    return null;
  }

  redirectToWelcome();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'iSUS',
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.navigate('Buscar');
          }}
        >
          <Icon name="magnify" size={28} color="#FFF" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <Icon name="menu" size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
  });

  const { width } = Dimensions.get('screen');

  return (
    <ProviderDeVersaoDoManejo>
    <StatusBar backgroundColor="#4CAF50" />
    <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
      <Carrossel sliderWidth={width} itemWidth={width} />
      <Servicos navigation={navigation} />
      <ForcaTarefaAntiCorona navigation={navigation} />
    </ScrollView>
    </ProviderDeVersaoDoManejo>
  );
}
