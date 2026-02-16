import axios from "axios";

function TaskList({tasks,getTasks}){

 const deleteTask=async(id)=>{
  await axios.delete(
   `http://localhost:5000/api/tasks/${id}`,
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
   {tasks.map(t=>(
    <div key={t._id}>
     <h4>{t.title}</h4>
     <p>{t.description}</p>
     <button onClick={()=>deleteTask(t._id)}>
      Delete
     </button>
    </div>
   ))}
  </div>
 )
}
export default TaskList;
