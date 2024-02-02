import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingTask, setEditingTask] = useState();
  const [search, setsearch] = useState('');
  const [reset, setreset] = useState([]);

  function handleSubmit() {
    if (editingTask !== undefined) {
      const updatedTodos = [...todos];
      updatedTodos[editingTask] = { text: inputValue, completed:false };
      setTodos(updatedTodos);
      setEditingTask(undefined);

    } else if (inputValue.trim() !== '') {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setreset([...reset, { text: inputValue, completed: false }]);
    }
    setInputValue('');
  }
  const handleDelete = (value) => {
    const updatedTasks = todos.filter((todo) => todo.text !== value);
    setTodos(updatedTasks);
  };
  const handleEdit = (index) => {
    setInputValue(todos[index].text);
    setEditingTask(index);
  };
  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = { ...updatedTodos[index], completed: !updatedTodos[index].completed };
    setTodos(updatedTodos);
  };

  const Clickbtn = () => {
    const click = [...reset];
    var data = click.filter((todo) => {
      return todo.text === search;
    })
    setTodos(data);
    setsearch("");
  };
  const Combtn = () => {
    const completebtn = todos.filter((todo) => {
      return todo.completed == true;
    });
    setTodos(completebtn);
  };
  const unCombtn = () => {
    const completebtn = todos.filter((todo) => {
      return todo.completed == false;
    });
    setTodos(completebtn);
  };
  const allbtn = () => {
    setTodos([...reset]);
  }
  return (
    <div className='btn'>
      <h1 style={{ fontSize: '30px' }}>To do List</h1>
      <div>
        <input type='text' placeholder='Enter Task...' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button style={{ marginLeft: '10px' }} onClick={handleSubmit}>Add</button>
      </div>
      <ul>
        <div>
          <input type='text' placeholder='search..' value={search} onChange={(e) => setsearch(e.target.value)}>
          </input>
        </div>
        <div className='allbtn'>
          <button onClick={allbtn}>All</button>
          <button onClick={Clickbtn}>Search</button>
            <button onClick={Combtn}>Completed</button>
            <button onClick={unCombtn}>Uncompleted</button>
        </div>
        <div> 
          {todos.map((todo, index) => (
            <li key={index} style={{ listStyle: 'none' }}>
              <div >
                <input type='checkbox' checked={todo.completed} onChange={() => toggleComplete(index)} style={{ margin: '10px 10px' }}></input>
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
              </div>
              <div >
                <button onClick={() => handleDelete(todo.text)}>Delete</button>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
export default App;

