/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import TouchID from 'react-native-touch-id';

const App: () => React$Node = () => {
  const [supported, setSupported] = useState(null);
  const [nome, setNome] = useState('Anônimo');

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
      <TouchableHighlight onPress={handleLogin}>
        <Text style={[styles.highlight, styles.btn]}>Entrar</Text>
      </TouchableHighlight>

      <Text style={styles.sectionTitle}>App Touch-ID</Text>
      <Text style={styles.sectionDescription}>{nome}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 32,
    // paddingHorizontal: 24,
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
  },
  btn: {
    color: '#ffffff',
    borderRadius: 4,
    marginBottom: 15,
    backgroundColor: '#0391d7',
    padding: 15,
  },
});

export default App;
