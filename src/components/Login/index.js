import React, { useState, } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';

import firebase from '../../services/firebaseConnection';

export default function Login( {changeStatus} ){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('login');

    function handleLogin(){
        if(type==='login'){
          const user = firebase.auth().signInWithEmailAndPassword(email,password)
          .then((user)=>{
            changeStatus(user.user.uid)
          })
          .catch((error)=>{
            console.log(error);
            alert('Ops parece que deu algo errado!');
            return;
          })

        }else{
          const user = firebase.auth().createUserWithEmailAndPassword(email,password)
          .then((user)=>{
            changeStatus(user.user.uid);
          })
          .catch((error)=>{
            console.log(error);
            alert('Ops parece que deu algo errado!');
            return;
          })
        }
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
      style={[styles.handleLogin, {backgroundColor: type === 'login' ? '#3ea6f2' : '#141414'}]}
      onPress={handleLogin}
      >
        <Text style={styles.text}>
            { type === 'login' ? 'Acessar' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> setType(type => type==='login' ? 'cadastrar' : 'login' )}>
        <Text style={{textAlign: 'center'}}>
            {type === 'login' ? 'Criar uma conta' : 'Ja possuo uma conta'}
        </Text>
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
    height: 45,
    marginBottom: 10
  },
  text:{
    color: '#fff',
    fontSize: 17
  }
})