import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import api from "../utils/api";

const Signup = () => {

  const [form,setForm]=useState({
    name:"",
    email:"",
    password:""
  });

  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    if(!form.name || !form.email || !form.password){
      toast.warning("All fields required");
      return;
    }

    if(form.password.length<6){
      toast.warning("Password must be 6 characters");
      return;
    }

    try{
      setLoading(true);

      await api.post("/auth/signup",form);

      toast.success("Signup Successful");

      navigate("/");

    }catch(err){
      toast.error("Signup Failed");
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
          Signup
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full border p-2 mb-3"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-2 mb-3"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border p-2 mb-3"
          />

          <button
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded"
          >
            {loading?"Signing Up...":"Signup"}
          </button>

        </form>

        <p className="text-sm mt-4 text-center">
          Already have account?{" "}
          <Link to="/" className="underline">
            Login
          </Link>
        </p>

      </motion.div>

    </div>
  )
}

export default Signup;
