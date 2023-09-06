import React , {useState , useEffect} from "react";
import "./AddTask.css"

const AddTask=({onAddTask , setShowAddForm, selectedStatus , editingTask})=>{

    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [ErrorMsg,setErrorMsg]=useState("")


    useEffect(() => {
      if (editingTask) {
        setNewTask({ title: editingTask.title, description: editingTask.description });
      }
    }, [editingTask]);


    const handleAddTask = () => {
        if (newTask.title && newTask.description) {
          onAddTask(newTask,selectedStatus);
          setNewTask({ title: '', description: '' });
          setShowAddForm(false);
        }
        else{
            setErrorMsg("All Fields are required")
        }
      };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setNewTask(prevTask => ({ ...prevTask, [name]: value }));
      };


    return(
        <div className="add-form">
            <h2 className="form-header">Add New Task</h2>
            <input type="text" name="title" placeholder="Title" value={newTask.title} onChange={handleInputChange} className="title-input"/>
            <textarea name="description" placeholder="Description" value={newTask.description} onChange={handleInputChange} className="description-input"/>
            <button onClick={handleAddTask} className="addTask-button">Add Task</button>
            <p className="error">{ErrorMsg}</p>
      </div>
    )
}

export default AddTask