import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
      const responseToDo = await axios.get('http://localhost:4000/api/tasks/To%20Do');
      setTasksToDo(responseToDo.data);

      const responseDoing = await axios.get('http://localhost:4000/api/tasks/Doing');
      setTasksDoing(responseDoing.data);

      const responseDone = await axios.get('http://localhost:4000/api/tasks/Done');
      setTasksDone(responseDone.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };



  const handleAddTask = async (newTask, status) => {
    try {
      if (editingTask) {
        await axios.patch(`http://localhost:4000/api/tasks/${editingTask._id}`, { ...newTask, status });
        setEditingTask(null);
      } else {
        await axios.post('http://localhost:4000/api/tasks', { ...newTask, status });
      }
      setShowAddForm(false);
      fetchTasks();
    } catch (error) {
      console.error('Error adding/updating task:', error);
    }
  };


  const onDragEnd = async (result) => {
    const { source, destination } = result;
  
    if (!destination) return;
  
    const sourceTasks = getSourceTasks(source.droppableId);
    const destTasks = getDestTasks(destination.droppableId);
  
    const [draggedTask] = sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, draggedTask);
  
    // Update the status of the dragged task
    const newStatus = destination.droppableId === 'todo' ? 'To Do' : destination.droppableId;
    draggedTask.status = newStatus;
  
    // Update the tasks in the database
    try {
      await axios.patch(`http://localhost:4000/api/tasks/${draggedTask._id}`, {
        title: draggedTask.title,
        description: draggedTask.description,
        status: newStatus,
      });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  
    // Update the state to reflect the changes
    setTasksToDo([...tasksToDo]);
    setTasksDoing([...tasksDoing]);
    setTasksDone([...tasksDone]);
  };
  

  

  const getSourceTasks = (status) => {
    switch (status) {
      case 'todo':
        return tasksToDo;
      case 'doing':
        return tasksDoing;
      case 'done':
        return tasksDone;
      default:
        return [];
    }
  };

  const getDestTasks = (status) => {
    switch (status) {
      case ' todo':
        return tasksToDo;
      case 'doing':
        return tasksDoing;
      case 'done':
        return tasksDone;
      default:
        return [];
    }
  };

  const handleEditTask = task => {
    setEditingTask(task);
    setSelectedStatus(task.status);
    setShowAddForm(true);
  };

  const handleDeleteTask = async (taskId, status) => {
    try {
      await axios.delete(`http://localhost:4000/api/tasks/${taskId}`);
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
      <DragDropContext onDragEnd={onDragEnd}>
      <div className="containers">
        <Droppable droppableId="todo" >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="container">
              <h2 className="container-head">To Do</h2>
              {tasksToDo.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="task"
                    >
                      <h3 className='taskTitle'>{task.title}</h3>
                      <p className='taskDesc'>{task.description}</p>
                      <div className='box'>
                        <button className='edit' onClick={() => handleEditTask(task)}>Edit</button>
                        <button className='delete' onClick={() => handleDeleteTask(task._id, task.status)}>Delete</button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <button className="add-button1" onClick={() => handleShowAddForm('To Do')}> + Add Task</button>
            </div>
          )}
        </Droppable>
        <Droppable droppableId="doing" >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="container">
              <h2 className="container-head">Doing</h2>
              {tasksDoing.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="task"
                    >
                      <h3 className='taskTitle'>{task.title}</h3>
                      <p className='taskDesc'>{task.description}</p>
                      <div className='box'>
                        <button className='edit' onClick={() => handleEditTask(task)}>Edit</button>
                        <button className='delete' onClick={() => handleDeleteTask(task._id, task.status)}>Delete</button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <button className="add-button2" onClick={() => handleShowAddForm('Doing')}> + Add Task</button>
            </div>
          )}
        </Droppable>
        <Droppable droppableId="done" >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="container">
              <h2 className="container-head">Done</h2>
              {tasksDone.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="task"
                    >
                      <h3 className='taskTitle'>{task.title}</h3>
                      <p className='taskDesc'>{task.description}</p>
                      <div className='box'>
                        <button className='edit' onClick={() => handleEditTask(task)}>Edit</button>
                        <button className='delete' onClick={() => handleDeleteTask(task._id, task.status)}>Delete</button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <button className="add-button3" onClick={() => handleShowAddForm('Done')}> + Add Task</button>
            </div>
          )}
        </Droppable> 
        </div>
    </DragDropContext>
    {showAddForm && (<AddTask onAddTask={handleAddTask} setShowAddForm={setShowAddForm} selectedStatus={selectedStatus} editingTask={editingTask}  />)}
    </div>
  );
};

export default App;

