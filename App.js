import React, { useState, useEffect, useRef } from 'react';
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

  const [key, setKey] = useState('');
  const inputRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [user, setUser] = useState(null);



  //buscar as tarefas que ja existem no banco de dados
  useEffect(()=>{
    function getUser(){
      if(!user){
        return;
      }
      
      firebase.database().ref('tarefas').child(user).once('value', (snapshot)=>{
        setTasks([]);

        snapshot?.forEach((childItem)=>{
          let data={
            key: childItem.key,
            nome: childItem.val().nome
          }
          
          setTasks((oldTasks)=>[...oldTasks, data]);
          
        })
      })

    }

    getUser();

  },[user]);



  // funçâo que cria um novo usuario e uma nova tarefa no banco de dados.
  function handleAdd(){
    if(newTask ===''){
      return;
    }

    //Usuario edita uma tarefa
    if(key!==''){
      firebase.database().ref('tarefas').child(user).child(key).update({
        nome: newTask
      })
      .then(()=>{
        const taskIndex = tasks.findIndex( item=> item.key === key)
        let taskClone = tasks;
        taskClone[taskIndex].nome = newTask

        setTasks([...taskClone]);

      })

      Keyboard.dismiss();
      setNewTask('');
      setKey('');
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
      
    setTasks(oldTasks => [...oldTasks, data])    
    })

    Keyboard.dismiss();
    setNewTask('');

  }
  


  //funçâo que deleta uma tarefa
  function handleDelete(key){
    firebase.database().ref('tarefas').child(user).child(key).remove()
    .then(()=>{
      const findTasks = tasks.filter( item => item.key !== key)
      setTasks(findTasks);
    })
  }



  //funçâo que edita a tarefa
  function handleEdit(data){
    setKey(data.key);
    setNewTask(data.nome);
    inputRef.current.focus();
    
  }



  //condição se nãohouver usuário logado então, 
  //troca o componente Login para o componente cadastrar usuario.  
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
        ref={inputRef}
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