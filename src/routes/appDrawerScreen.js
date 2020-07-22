import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AboutScreen from '../pages/About';
import AppTab from './appBottomTab';
import Heart from '../assets/icons/isus_hor.svg';
import FeedbackScreen from '../pages/FeedbackScreen';
import packageJson from '../../package.json';

function CustomDrawerContent(props) {
  const {
    navigation: { navigate },
    routeName
  } = props;

  const versaoSistema = packageJson.version;
  return (
    <>
      <SafeAreaView style={styles.droidSafeArea}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            borderBottomWidth: 0.5,
            borderBottomColor: '#C4C4C4',
          }}
        >
          <Heart size={40} style={{ margin: 10 }} />
        </View>
      </SafeAreaView>
      <DrawerContentScrollView {...props} style={{ marginTop: 0 }}>
        <DrawerItem
          icon={() => <FontAwesomeIcon name="home" size={20} color="#111" />}
          label="Home"
          labelStyle={{ fontWeight: 'bold', fontSize: 15 }}
          inactiveTintColor="#111"
          activeTintColor="#111"
          inactiveBackgroundColor="transparent"
          activeBackgroundColor="transparent"
          focused={routeName === 'HOME'}
          onPress={() => navigate('HOME', { screen: 'Home' })}
        />
        <DrawerItem
          icon={() => <Icon name="face" size={20} color="#111" />}
          label="Fale Conosco"
          labelStyle={{ fontWeight: 'bold', fontSize: 15 }}
          inactiveTintColor="#111"
          activeTintColor="#111"
          inactiveBackgroundColor="transparent"
          activeBackgroundColor="transparent"
          focused={routeName === 'FEEDBACK'}
          onPress={() => navigate('FEEDBACK')}
        />
        <DrawerItem
          icon={() => <Icon name="information-outline" size={20} color="#111" />}
          label="Sobre o iSUS"
          labelStyle={{ fontWeight: 'bold', fontSize: 15 }}
          inactiveTintColor="#111"
          activeTintColor="#111"
          inactiveBackgroundColor="transparent"
          activeBackgroundColor="transparent"
          focused={routeName === 'SOBRE'}
          onPress={() => navigate('SOBRE')}
        />
      </DrawerContentScrollView>
      {/* View é relativa a margem de porcentagem em relação a ultima opção do drawer */}
      {/* Caso adicione um item, a margemTop deve diminuir também */}
      <View style={styles.viewVersao}>
        <Text style={styles.textoVersao}>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          Versão { versaoSistema }
        </Text>
      </View>
    </>
  );
}

const Drawer = createDrawerNavigator();
export default function appDrawerScreen() {
  return (
    <Drawer.Navigator
      initialRouteName="SERVICE"
      drawerPosition="left"
      drawerStyle={{
        backgroundColor: '#fff',
        width: Dimensions.get('screen').width / 1.5
      }}
      drawerContent={props => (
        <CustomDrawerContent {...props} routeName={props.state.routeNames[props.state.index]} />
      )}
    >
      <Drawer.Screen name="HOME" component={AppTab} />
      <Drawer.Screen name="FEEDBACK" component={FeedbackStackScreen} />
      <Drawer.Screen name="SOBRE" component={AboutStackScreen} />
    </Drawer.Navigator>
  );
}

const AboutStack = createStackNavigator();
function AboutStackScreen() {
  return (
    <AboutStack.Navigator>
      <AboutStack.Screen name="SOBRE" component={AboutScreen} options={{ headerShown: true }} />
    </AboutStack.Navigator>
  );
}

const FeedbackStack = createStackNavigator();
function FeedbackStackScreen() {
  return (
    <FeedbackStack.Navigator>
      <FeedbackStack.Screen
        name="FEEDBACK"
        component={FeedbackScreen}
        options={{ headerShown: true }}
      />
    </FeedbackStack.Navigator>
  );
}

const styles = StyleSheet.create({
  viewVersao: {
    margin: 16,
  },
  textoVersao: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0.4,
    margin: Platform.OS === 'android' ? 10 : 20
  },
  droidSafeArea: {
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
});
