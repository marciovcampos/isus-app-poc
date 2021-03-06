import React from 'react';
import { Title } from 'react-native-paper';
import { FlatList, StyleSheet } from 'react-native';
import Boletins from '../../../assets/icons/forcaTarefa/boletins.svg';
import NotificacaoDeCasos from '../../../assets/icons/forcaTarefa/notificacaoDeCasos.svg';
import FarmacoVigilancia from '../../../assets/icons/forcaTarefa/farmacoVigilancia.svg';
import NotasTecnicas from '../../../assets/icons/forcaTarefa/notasTecnicas.svg';
import CentralDeVentiladores from '../../../assets/icons/forcaTarefa/centralDeVentiladores.svg';
import CartaoHome from '../cartaoHome';

function NovaForcaTarefa({ navigation }) {
  const listaForcaTarefaAntiCorona = [
    {
      id: 'acao-1',
      titulo: 'Boletins',
      icone: Boletins,
      navegacao: {
        componente: 'webview',
        titulo: 'Boletins',
        url: 'https://coronavirus.ceara.gov.br/boletins/'
      }
    },
    {
      id: 'acao-2',
      titulo: 'Notificação de casos',
      icone: NotificacaoDeCasos,
      navegacao: {
        componente: 'webview',
        titulo: 'Notificações de casos',
        url: 'https://notifica.saude.gov.br/login'
      }
    },
    {
      id: 'acao-3',
      titulo: 'Farmaco-vigilância',
      icone: FarmacoVigilancia,
      navegacao: {
        componente: 'webview',
        titulo: 'Farmaco-vigilância',
        url: 'https://coronavirus.ceara.gov.br/isus/farmacovigilancia/'
      }
    },
    {
      id: 'acao-4',
      titulo: 'Notas Técnicas',
      icone: NotasTecnicas,
      navegacao: {
        componente: 'webview',
        titulo: 'Notas Técnicas',
        url: 'https://coronavirus.ceara.gov.br/profissional/documentos/notas-tecnicas/'
      }
    },
    {
      id: 'acao-5',
      titulo: 'Central de Ventiladores',
      icone: CentralDeVentiladores,
      navegacao: {
        componente: 'webview',
        titulo: 'Central de Ventiladores',
        url: 'https://coronavirus.ceara.gov.br/centraldeventiladores/'
      }
    }
  ];

  return (
    <>
      <Title style={estilos.titulo}>Força-tarefa Anticorona</Title>

      <FlatList
        horizontal
        data={listaForcaTarefaAntiCorona}
        keyExtractor={(item, index) => `${index}`}
        style={{
          flexDirection: 'row',
          alignSelf: 'center'
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CartaoHome
            key={item.id}
            titulo={item.titulo}
            Icone={item.icone}
            onPress={() => navigation.navigate(item.navegacao.componente, {
              title: item.navegacao.titulo,
              url: item.navegacao.url
            })}
          />
        )}
      />
    </>
  );
}

const estilos = StyleSheet.create({
  titulo: {
    marginHorizontal: 16, fontSize: 20, fontWeight: '500', color: 'rgba(0, 0, 0, 0.6)'
  }
});

export default NovaForcaTarefa;
