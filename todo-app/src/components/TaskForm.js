import React, { useState } from 'react';
import api from '../api';

const TaskForm = ({ onTaskAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/tasks', { title });
      onTaskAdd(response.data);
      setTitle('');
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };
  const handleReload = () => {
    window.location.reload();
  }
  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
        required
      />
      <button type="submit" onClick={handleReload}>Add Task</button>
    </form>
  );
};

export default TaskForm;
