import axios from "axios";
import {useState} from "react";

function TaskForm({getTasks}){
 const [title,setTitle]=useState("");
 const [description,setDescription]=useState("");
 const [status,setStatus]=useState("");

 const addTask=async()=>{
  await axios.post(
   "http://localhost:5000/api/tasks",
   {title,description,status},
   {
    headers:{
     Authorization:localStorage.getItem("token")
    }
   }
  );
  getTasks();
 }

 return(
  <div>
   <input placeholder="Title"
    onChange={e=>setTitle(e.target.value)}/>
   <input placeholder="Description"
    onChange={e=>setDescription(e.target.value)}/>
   <input placeholder="Status"
    onChange={e=>setStatus(e.target.value)}/>
   <button onClick={addTask}>Add Task</button>
  </div>
 )
}
export default TaskForm;
