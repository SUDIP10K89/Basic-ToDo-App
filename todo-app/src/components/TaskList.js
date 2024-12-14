import React, { useState, useEffect } from "react";
import api from '../api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
//Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);
  
//To complete
  const handleComplete = async (id) => {
    try {
      const response = await api.put(`/tasks/${id}`, { isCompleted: true });
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  //To delete
  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className={task.isCompleted ? 'completed' : ''}>
            <span
              style={{
                textDecoration: task.isCompleted ? "line-through" : "none",
              }}
            >
              {task.title}
            </span>
            <button className="complete" onClick={() => handleComplete(task._id)}>Complete</button>
            <button className="delete" onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
