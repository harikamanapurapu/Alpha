import React, { useState, useEffect } from 'react';
import AddTask from './Components/AddTask';
import axios from "axios"
import "./App.css"


const App = () => {
  const [tasksToDo, setTasksToDo] = useState([]);
  const [tasksDoing, setTasksDoing] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('To Do');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);



  const fetchTasks = async () => {
    try {
      const responseToDo = await axios.get('https://alphansat.onrender.com/api/tasks/To%20Do');
      setTasksToDo(responseToDo.data);

      const responseDoing = await axios.get('https://alphansat.onrender.com/api/tasks/Doing');
      setTasksDoing(responseDoing.data);

      const responseDone = await axios.get('https://alphansat.onrender.com/api/tasks/Done');
      setTasksDone(responseDone.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };



  const handleAddTask = async (newTask, status) => {
    try {
      if (editingTask) {
        await axios.patch(`https://alphansat.onrender.com/api/tasks/${editingTask._id}`, { ...newTask, status });
        setEditingTask(null);
      } else {
        await axios.post('https://alphansat.onrender.com/api/tasks', { ...newTask, status });
      }
      setShowAddForm(false);
      fetchTasks();
    } catch (error) {
      console.error('Error adding/updating task:', error);
    }
  };



  const handleEditTask = task => {
    setEditingTask(task);
    setSelectedStatus(task.status);
    setShowAddForm(true);
  };

  const handleDeleteTask = async (taskId, status) => {
    try {
      await axios.delete(`https://alphansat.onrender.com/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };


  const handleShowAddForm = status => {
    setEditingTask(null);
    setSelectedStatus(status);
    setShowAddForm(true);
  };

  return (
    <div className="App">
      <h1 className='heading'>Task Manager</h1>
      <div className='containers'>
        <div className="container">
          <h2 className='container-head'>To do</h2>
            {tasksToDo
          .map(task => (
            <div className="task" key={task._id}>
              <h3 className='taskTitle'>{task.title}</h3>
              <p className='taskDesc'>{task.description}</p>
              <div  className='box'>
                <button className='edit' onClick={()=>handleEditTask(task)}>Edit</button>
                <button className='delete' onClick={() => handleDeleteTask(task._id, task.status)}>Delete</button>
              </div>
            </div>
          ))}
          <button className="add-button1" onClick={() => handleShowAddForm('To Do')}> + Add Task</button> 
        </div>
        <div className="container">
          <h2 className='container-head'>Doing</h2>
          {tasksDoing
          .map((task) => (
            <div className="task" key={task._id}>
              <h3 className='taskTitle'>{task.title}</h3>
              <p className='taskDesc'>{task.description}</p>
              <div  className='box'>
                <button className='edit'onClick={() => handleEditTask(task)}>Edit</button>
                <button className='delete' onClick={() => handleDeleteTask(task._id, task.status)}>Delete</button>
              </div>
            </div>
          ))}
          <button className="add-button2" onClick={() => handleShowAddForm('Doing')}>+ Add Task</button>
        </div>
        <div className="container">
          <h2 className='container-head'>Done</h2>
          {tasksDone
          .map(task => (
            <div className="task" key={task._id}>
              <h3 className='taskTitle'>{task.title}</h3>
              <p className='taskDesc'>{task.description}</p>
              <div  className='box'>
                <button className='edit' onClick={() => handleEditTask(task)}>Edit</button>
                <button className='delete' onClick={() => handleDeleteTask(task._id, task.status)}>Delete</button>
              </div>
            </div>
          ))}
          <button className="add-button3" onClick={() => handleShowAddForm('Done')} >+ Add Task</button>
        </div>
    </div>
    {showAddForm && (<AddTask onAddTask={handleAddTask} setShowAddForm={setShowAddForm} selectedStatus={selectedStatus} editingTask={editingTask}  />)}
    </div>
  );
};

export default App;

