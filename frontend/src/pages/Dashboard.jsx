import {useEffect,useState,useContext} from "react";
import api from "../utils/api";
import {AuthContext} from "../context/AuthContext";

const Dashboard=()=>{

 const {token,logout}=useContext(AuthContext);

 const [tasks,setTasks]=useState([]);
 const [title,setTitle]=useState("");
 const [description,setDescription]=useState("");
 const [status,setStatus]=useState("");
 const [search,setSearch]=useState("");
 const [user,setUser]=useState(null);

 const handleLogout=()=>{
  logout();
  window.location.href="/";
 }

 const getProfile=async()=>{
  const res=await api.get("/auth/profile",{
   headers:{Authorization:token}
  });
  setUser(res.data);
 }

 const getTasks=async()=>{
  const res=await api.get("/tasks",{
   headers:{Authorization:token}
  });
  setTasks(res.data);
 }

 useEffect(()=>{
  getTasks();
  getProfile();
 },[]);

 const addTask=async()=>{
  await api.post("/tasks",
   {title,description,status},
   {headers:{Authorization:token}}
  );
  getTasks();
 }

 const deleteTask=async(id)=>{
  await api.delete(`/tasks/${id}`,{
   headers:{Authorization:token}
  });
  getTasks();
 }

 const filteredTasks=tasks.filter(t=>
  t.title.toLowerCase().includes(search.toLowerCase())
 );

 return(
  <div className="min-h-screen bg-gray-100 p-4">

   {/* CARD CONTAINER */}
   <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6">

    {/* HEADER */}
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
     <h2 className="text-2xl font-bold">Dashboard</h2>

     <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-lg"
     >
      Logout
     </button>
    </div>

    {/* PROFILE CARD */}
    {user && (
     <div className="mb-6 bg-gray-50 border rounded-xl p-4">
      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
     </div>
    )}

    {/* SEARCH */}
    <input
     placeholder="Search Task"
     onChange={e=>setSearch(e.target.value)}
     className="w-full border rounded-lg px-4 py-2 mb-6"
    />

    {/* ADD TASK */}
    <div className="grid md:grid-cols-4 gap-3 mb-6">

     <input
      placeholder="Title"
      onChange={e=>setTitle(e.target.value)}
      className="border rounded-lg px-3 py-2"
     />

     <input
      placeholder="Description"
      onChange={e=>setDescription(e.target.value)}
      className="border rounded-lg px-3 py-2"
     />

     <input
      placeholder="Status"
      onChange={e=>setStatus(e.target.value)}
      className="border rounded-lg px-3 py-2"
     />

     <button
      onClick={addTask}
      className="bg-black text-white rounded-lg"
     >
      Add Task
     </button>

    </div>

    {/* TASK TABLE */}
    <div className="overflow-x-auto">

     <table className="min-w-full border rounded-lg">

      <thead className="bg-gray-200">
       <tr>
        <th className="p-2">Title</th>
        <th className="p-2">Description</th>
        <th className="p-2">Status</th>
        <th className="p-2">Delete</th>
       </tr>
      </thead>

      <tbody>
       {filteredTasks.map(t=>(
        <tr key={t._id} className="text-center border-t">
         <td className="p-2">{t.title}</td>
         <td className="p-2">{t.description}</td>
         <td className="p-2">{t.status}</td>
         <td className="p-2">
          <button
           onClick={()=>deleteTask(t._id)}
           className="bg-red-500 text-white px-3 py-1 rounded"
          >
           Delete
          </button>
         </td>
        </tr>
       ))}
      </tbody>

     </table>

    </div>

   </div>

  </div>
 )
}

export default Dashboard;
