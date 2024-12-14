import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  const handleTaskAdd = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <TaskForm onTaskAdd={handleTaskAdd} />
      <TaskList />
    </div>
  );
}

export default App;