import './App.css';
import axios from 'axios';
import TodoItem from './components/TodoItem';


const borderColors = ["#DDA853", "#96CEB4", "#9DBDFF", "#F05A7E", "#FABC3F", "#7077A1"];

const getRandomBorderColor = () => {
  return borderColors[Math.floor(Math.random() * borderColors.length)];
};


//axios use
let todosList = [];
axios.get('http://127.0.0.1:8000/api/v1/todos')
     .then((res) => { todosList = res.data })


function App() {  
  return (
    <div className="App">
      
      <h1 id='heading'>ToDo List</h1>
      <div className="divider"></div>
      <div className="todoList">
       { 
      todosList.map((todo) => <TodoItem title = {todo.title}  desc = {todo.desc} status = {todo.status} borderColor={getRandomBorderColor()} /> )
       }
      <TodoItem title = 'Wake up'  desc = 'wake up now' status = 'completed' createAt = '17-02-2025 02:00PM' borderColor={getRandomBorderColor()} />
      
      </div>
    </div>
  );
}

export default App;
