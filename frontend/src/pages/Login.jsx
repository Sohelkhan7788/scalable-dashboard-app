import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {

  const [form,setForm]=useState({
    email:"",
    password:""
  });

  const [loading,setLoading]=useState(false);

  const navigate=useNavigate();
  const {login}=useContext(AuthContext);

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    if(!form.email || !form.password){
      toast.warning("All fields required");
      return;
    }

    try{
      setLoading(true);

      const res=await api.post(
        "/auth/login",
        form
      );

      // store token in context + localStorage
      login(res.data);

      toast.success("Login Successful");

      navigate("/dashboard");

    }catch(err){
      toast.error("Invalid Credentials");
    }finally{
      setLoading(false);
    }
  }

  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <motion.div
        initial={{opacity:0,scale:0.9}}
        animate={{opacity:1,scale:1}}
        className="bg-white p-8 rounded-xl shadow-xl w-96"
      >

        <h2 className="text-xl font-bold mb-4 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
          />

          <button
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded"
          >
            {loading?"Logging...":"Login"}
          </button>

        </form>

        {/* Signup Option */}
        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="underline">
            Signup
          </Link>
        </p>

      </motion.div>

    </div>
  )
}

export default Login;
