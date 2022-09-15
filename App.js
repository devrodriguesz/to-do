import React, { useState, } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity, 
  FlatList,

} from 'react-native';

import Login from './src/components/Login';
import TaskList from './src/components/TaskList'

let tasks = [{
  key: '1',
  nome: 'Comprar coca cola'
},
{
  key: '2',
  nome: 'Estudar javascript'
},
{
  key: '3',
  nome: 'Estudar html'
}]

export default function App(){
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState('')

  if (!user){
    return <Login changeStatus={(user)=> setUser(user)}/>
  }

  function handleDelete(key){
    console.log(key);
  }
  
  function handleEdit(data){
    console.log('Item clicado', data);
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
        <TouchableOpacity style={styles.botaoAdd}>
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