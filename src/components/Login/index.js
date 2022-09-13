import React, { useState, } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(){
        alert('teste');
    }

  return(
    <SafeAreaView style={styles.container}>

      <TextInput
      placeholder='Digite seu email'
      style={styles.input}
      value={email}
      onChangeText={ (text)=> setEmail(text) }
      />

      <TextInput
      placeholder='***********'
      style={styles.input}
      value={password}
      onChangeText={ (text)=> setPassword(text) }
      />
      
      <TouchableOpacity 
      style={styles.handleLogin}
      onPress={handleLogin}
      >
        <Text style={styles.text}>Acessar</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={{textAlign: 'center'}}>Criar uma conta</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#f2f6fc',
    paddingHorizontal: 10
  },
  input:{
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    height: 45,
    borderRadius: 4,
    padding: 10
  },
  handleLogin:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#141414',
    height: 45,
    marginBottom: 10
  },
  text:{
    color: '#fff',
    fontSize: 17
  }
})