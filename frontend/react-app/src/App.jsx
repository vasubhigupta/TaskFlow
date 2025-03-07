import './App.css';
import axios from 'axios';
import TodoItem from './components/TodoItem';
import { useState } from 'react'; //curly braces are related to not being defined as a defualt component
import { useEffect } from 'react';

const borderColors = ["#DDA853", "#96CEB4", "#9DBDFF", "#F05A7E", "#FABC3F", "#7077A1","#C599B6","#C8AAAA","#727D73"];

const getRandomBorderColor = () => {
  return borderColors[Math.floor(Math.random() * borderColors.length)];
};


function App() {  
    let [todosList,setTodosList] = useState([]);

    //useEffect(do,while)
    useEffect(() => {
      //axios use
      axios.get('http://127.0.0.1:8000/api/v1/todos')
      .then((res) => {  
      setTodosList(res.data);
      console.log(res.data)
      })
    }, []);
    
  return (
    <div className="App">
      
      <h1 id='heading'>Tasks</h1>

      <div className="divider"></div> {/*Line drawn after the heading*/}
      
      {/* <button onClick={getTodos}></button> */}

      <div className="todoList">
       { 
      todosList.map((todo) => 
        <TodoItem title = {todo.title}  descr = {todo.descr} status = {todo.status} borderColor={getRandomBorderColor()} /> )
       }
      {/* <TodoItem title = 'Wake up'  descr = 'wake up now' status = 'completed' createAt = '17-02-2025 02:00PM' borderColor={getRandomBorderColor()} /> */}
      
      </div>
    </div>
  );
}

export default App;
