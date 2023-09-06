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