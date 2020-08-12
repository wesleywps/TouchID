/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import TouchID from 'react-native-touch-id';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

const App: () => React$Node = () => {
  Icon.loadFont();
  const [supported, setSupported] = useState(null);
  const [nome, setNome] = useState('Anônimu');

  useEffect(() => {
    TouchID.isSupported()
      .then((sucesso) => {
        setSupported(true);
        console.log('TOUCH ID HABILITADO');
      })
      .catch((error) => {
        console.log('ERRO TOUCH: ' + error);
        alert('Touch ID não suportado/habilitado');
      });
  }, []);

  function handleLogin() {
    const configs = {
      title: 'Autenticação',
      color: '#ff0000',
      sensorErrorDescription: 'Touch ID Inválido',
    };
    TouchID.authenticate('Login App')
      .then((success) => {
        console.log('Seja Bem Vindo');
        setNome('Autenticado');
      })
      .catch((error) => {
        console.log('FALHA NA AUTENTICAÇÃO ' + error);
      });
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>App Touch-ID</Text>
      <Text style={styles.sectionDescription}>{nome}</Text>
      <View>
        <Icon name="telegram" size={55} color="#000"></Icon>
      </View>

      <TouchableHighlight style={styles.btn} onPress={handleLogin}>
        <Text style={[styles.highlight]}>Entrar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
    color: '#ffffff',
  },
  btn: {
    color: '#ffffff',
    borderRadius: 4,
    marginTop: 15,
    backgroundColor: '#0391d7',
    padding: 10,
    alignContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
});

export default App;
