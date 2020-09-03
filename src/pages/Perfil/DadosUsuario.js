import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { aplicaMascaraNumerica } from '../../utils/mascaras';

export default function DadosUsuario({ dados }) {
  return (
    <View style={estilos.espacamento}>
      <Text style={estilos.label}>NOME</Text>
      <Text style={estilos.dado}>
        {dados.nome}
        {' '}
        {dados.sobrenome}
      </Text>
      <Text style={estilos.label}>E-MAIL</Text>
      <Text style={estilos.dado}>{dados.email}</Text>
      <Text style={estilos.label}>TELEFONE</Text>
      <Text style={estilos.dado}>
        {dados.telefone ? aplicaMascaraNumerica(dados.telefone, '(##) #####-####') : '---'}
      </Text>
      <Text style={estilos.label}>CPF</Text>
      <Text style={estilos.dado}>
        {dados.cpf ? aplicaMascaraNumerica(dados.cpf, '###.###.###-##') : '---'}
      </Text>
      <Text style={estilos.label}>MUNICIPIO</Text>
      <Text style={estilos.dado}>{dados.cidade || 'Não informado'}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  label: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 1.5,
    color: 'rgba(0,0,0,0.6)'
  },
  dado: {
    marginTop: 1,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'normal',
    color: 'rgba(0,0,0,0.87)'
  },
  espacamento: {
    marginBottom: 10
  }
});
