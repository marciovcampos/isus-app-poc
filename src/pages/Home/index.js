/* eslint-disable no-return-await */
import React, {
  useLayoutEffect, useCallback, useState
} from 'react';
import {
  ScrollView, TouchableOpacity, Dimensions, Button, Alert
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Feature } from '@paralleldrive/react-feature-toggles';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import ForcaTarefaAntiCorona from './forcatarefaanticorona';
import ProviderDeVersaoDoManejo from '../ClinicalManagement/contexto/contextoVersaoManejo';
import Servicos from './Servicos/servicos';
import Carrossel from './carrossel';
import BarraDeStatus from '../../components/barraDeStatus';
import NovoServicos from './Servicos/NovoServicos';
import { pegarTokenDoUsuarioNoStorage } from '../../services/autenticacao';
import { perfilUsuario } from '../../apis/apiCadastro';
import ExibirUsuario from './exibirUsuario';
import MeusConteudos from './MeusConteudos';
import NovaForcaTarefa from './ForcaTarefa/NovaForcaTarefa';

export default function HomeScreen() {
  crashlytics().log('App Montado.');

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

  const [dadosUsuario, alterarDadosUsuario] = useState({});
  const [tokenUsuario, alterarTokenUsuario] = useState({});

  useFocusEffect(
    useCallback(() => {
      async function pegarTokenUsuario() {
        const token = await pegarTokenDoUsuarioNoStorage();
        alterarTokenUsuario(token);
        try {
          const perfil = await perfilUsuario();
          console.log('retornar', perfil.data);
          alterarDadosUsuario(perfil.data);
        } catch (err) {
          console.log('ERRO', err);
        }
      }
      pegarTokenUsuario();
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: tokenUsuario ? '#FFF' : '#4CAF50',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: tokenUsuario ? '#000' : '#FFF',
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
          <Icon name="magnify" size={28} color={tokenUsuario ? '#4CAF50' : '#FFF'} />
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
          <Icon name="menu" size={28} color={tokenUsuario ? '#4CAF50' : '#FFF'} />
        </TouchableOpacity>
      )
    });
  });

  const { width } = Dimensions.get('screen');

  return (
    <>
      {tokenUsuario ? <ExibirUsuario dados={dadosUsuario} /> : <></>}
      <ProviderDeVersaoDoManejo>
        <BarraDeStatus backgroundColor={tokenUsuario ? '#FFF' : '#4CAF50'} barStyle={tokenUsuario ? 'dark-content' : 'light-content'} />
        <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>


          <Button title="Say Hi" onPress={() => Alert.alert('Hi.')} />
          <Button
            title="Call LogEvent"
            onPress={async () => await analytics().logEvent('botao_home', {
              event: 'click',
            })
            }
          />
          <Button
            title="Call LogScreenView"
            onPress={async () => await analytics().logScreenView({
              screen_name: 'screen_botao_home',
            })
            }
          />
          <Button title="Test Crash" onPress={() => { console.log('Test Crash'); crashlytics().crash(); }} />
          <Button
            title="Crash Personalizado"
            onPress={() => {
              console.log('Crash Personalizado');
              const err = new Error('Crash Personalizado');
              crashlytics().recordError(err);
            }}
          />

          <Carrossel sliderWidth={width} itemWidth={width} />
          <Feature
            name="302"
            inactiveComponent={() => <Servicos navigation={navigation} />}
            activeComponent={() => <NovoServicos navigation={navigation} />}
          />
          {
            tokenUsuario && (
              <Feature
                name="306"
                activeComponent={() => <MeusConteudos />}
              />
            )
          }
          <Feature
            name="315"
            inactiveComponent={() => <ForcaTarefaAntiCorona navigation={navigation} />}
            activeComponent={() => <NovaForcaTarefa navigation={navigation} />}
          />
        </ScrollView>
      </ProviderDeVersaoDoManejo>
    </>
  );
}
