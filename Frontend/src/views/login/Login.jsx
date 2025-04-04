import { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const navigate = useNavigate()
   
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')


    const handleSubmit = async (e)=>{
        e.preventDefault()

        
            try {
                const resp = await axios.post('http://127.0.0.1:3000/user/login',{
                    email,
                    password
                })
                localStorage.setItem('token',resp.data.token)
                localStorage.setItem('role',resp.data.role)

                navigate("/profile")
                setEmail("")
                setPassword("")
            } catch (err) {
                console.error('Error creating user:', err.response?.data?.message || err.message);
                setError('Error creating user:', err.response?.data?.message || err.message);
            }
        
    }


  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-900 via-blue-900 to-gray-700 p-4">
        {error && <h3 className="font-semibold text-red-500 mb-4">{error}</h3>}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md rounded-3xl bg-white/10 p-8 shadow-2xl backdrop-blur-lg border border-white/20"
      >
        <h2 className="mb-6 text-center text-3xl font-semibold text-white drop-shadow-lg">
          Welcome Back
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            className="w-full rounded-lg border border-gray-300 bg-white/50 px-4 py-2 focus:border-purple-500 focus:outline-none backdrop-blur-sm"
          />
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            className="w-full rounded-lg border border-gray-300 bg-white/50 px-4 py-2 focus:border-purple-500 focus:outline-none backdrop-blur-sm"
          />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full bg-yellow-500  rounded-lg bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700 shadow-lg"
          >
            Login
          </motion.button>
        </form>

        <div className="my-4 flex items-center">
          <div className="h-px flex-1 bg-gray-300"></div>
          <span className="mx-4 text-white/80">or</span>
          <div className="h-px flex-1 bg-gray-300"></div>
        </div>

        <div className="flex flex-col space-y-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-white/40 backdrop-blur-sm"
          >
            <FaGoogle className="text-red-500" /> Continue with Google
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-white/40 backdrop-blur-sm"
          >
            <FaGithub className="text-gray-800" /> Continue with GitHub
          </motion.button>
        </div>

        <p className="mt-4 text-center text-white/80 text-sm">
          Don't have an account? <span className="cursor-pointer font-medium text-white hover:underline">Sign Up</span>
        </p>
      </motion.div>
    </div>
  );
}