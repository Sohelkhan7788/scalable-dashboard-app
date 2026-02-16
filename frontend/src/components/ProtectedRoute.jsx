import {useContext,useEffect,useState} from "react";
import {Navigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import api from "../utils/api";

const ProtectedRoute=({children})=>{

 const {token}=useContext(AuthContext);
 const [loading,setLoading]=useState(true);
 const [valid,setValid]=useState(false);

 useEffect(()=>{

  const verify=async()=>{

   try{
    await api.get(
     "/tasks",
     {
      headers:{
       Authorization:token
      }
     }
    );
    setValid(true);
   }catch{
    setValid(false);
   }finally{
    setLoading(false);
   }
  }

  if(token){
    verify();
  }else{
    setLoading(false);
  }

 },[]);

 if(loading) return <h2>Loading...</h2>;

 if(!valid) return <Navigate to="/" />

 return children;
}

export default ProtectedRoute;
