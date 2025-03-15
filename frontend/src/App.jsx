import './App.css';
import axios from 'axios';
import TodoItem from './components/TodoItem';
import { useState } from 'react'; //curly braces are related to not being defined as a defualt component
import { useEffect } from 'react';
import IonIcon from '@reacticons/ionicons'

const borderColors = ["#DDA853", "#96CEB4", "#9DBDFF", "#F05A7E", "#FABC3F", "#7077A1","#C599B6","#C8AAAA","#727D73"];

const getRandomBorderColor = () => {
  return borderColors[Math.floor(Math.random() * borderColors.length)];
};


function App() {  
    let [todosList,setTodosList] = useState([]);

    useEffect(() => {    //useEffect(do,while)
      
      axios.get('http://127.0.0.1:8000/api/v1/todos')   //axios use
      .then((res) => {  
      setTodosList(res.data);
       })
    }, []);

    function addTodo(e){
      e.preventDefault();
      const todo = {
                    'title' : e.target[0].value, 
                    'descr' : e.target[1].value, 
                    'status' : e.target[2].value}
      e.target[0].value = ''; //title
      e.target[1].value = ''; //descr
      e.target[2].value = ''; //status
      axios.post('http://127.0.0.1:8000/api/v1/todos/createTodo',todo)   //second parameter is the body 
      .then((res) => {  
      setTodosList([...todosList,todo]);
      })
    }
 
  return (
    <div className="App">
      
      <h1 id='heading'>TaskFlow</h1>
      <form className='addTodo' onSubmit={(e) => addTodo(e)}>
        <input className='todoInput' id = 'add_title' placeholder='Enter Title'></input>
        <input className='todoInput' id = 'add_desc' placeholder='Enter Desc'></input>
        <input className='todoInput' id = 'add_status' placeholder='Enter Status'></input>
        <button id='addTodoBtn'><IonIcon id='btnIcon' name='add-circle'></IonIcon></button>
      </form>
      
      <div className="divider"></div> {/*Line drawn after the heading*/}
      
      

      <div className="todoList">
       { 
      todosList.map((todo) => 
        <TodoItem title = {todo.title}  descr = {todo.descr} status = {todo.status} borderColor={getRandomBorderColor()} /> )    
        //we cant print a object directly in react i will give error, so we acces the each individual item in its primitive form using map
       }
      {/* <TodoItem title = 'Wake up'  descr = 'wake up now' status = 'completed' createAt = '17-02-2025 02:00PM' borderColor={getRandomBorderColor()} /> */}
      
      </div>
    </div>
  );
}

export default App;
