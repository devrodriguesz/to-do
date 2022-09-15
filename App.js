import React, { useState, } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  Keyboard

} from 'react-native';

import Login from './src/components/Login';
import TaskList from './src/components/TaskList';
import firebase from './src/services/firebaseConnection'


export default function App(){
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);



  function handleAdd(){
    if(newTask ===''){
      return;
    }
    
    let tarefas = firebase.database().ref('tarefas').child(user);
    let chave = tarefas.push().key;

    tarefas.child(chave).set({
      nome: newTask
    }).then( ()=> {
      const data={
        key: chave,
        nome: newTask
      };
      
    setTasks(oldtasks => [...oldtasks, data])    
    })

    
    Keyboard.dismiss();
    setNewTask('');


  }

  function handleDelete(key){
    console.log(key);
  }
  
  function handleEdit(data){
    console.log('Item clicado', data);
  }

  if (!user){
    return <Login changeStatus={(user)=> setUser(user)}/>
  }

  return(
    <SafeAreaView style={styles.container}>
     
      <View style={styles.containerTasks}>
        <TextInput
        style={styles.input}
        placeholder= "Digite aqui uma tarefa"
        onChangeText={(text)=> setNewTask(text)}
        value={newTask}
        />
        <TouchableOpacity style={styles.botaoAdd} onPress={handleAdd} >
          <Text style={styles.botaoText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
      data={tasks}
      keyExtractor={(item)=> item.key}
      renderItem={({item})=>(
        <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit}/>
      )}
      
      />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: '#f2f6fc'
  },
  containerTasks:{
    flexDirection: 'row',
  },
  input:{
    flex:1,
    marginBottom:10,
    padding:10,
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#141414',
    height: 45
  },
  botaoAdd:{
    backgroundColor: '#141414',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    marginLeft: 5,
    borderRadius: 4
  },
  botaoText:{
    color:'#FFF',
    fontSize: 22
  }

})