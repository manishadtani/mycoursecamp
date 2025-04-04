import { motion } from "framer-motion";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.post('http://127.0.0.1:3000/admin/login', {
                email,
                password
            });

            localStorage.setItem('token', resp.data.token);
            navigate("/admin/profile"); // change if your route is different
        } catch (err) {
            console.error('Login error:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Invalid credentials');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-900 via-blue-900 to-gray-700 p-6">
            {error && <h3 className="font-semibold text-red-500 mb-4">{error}</h3>}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md rounded-3xl bg-white/10 p-8 shadow-2xl backdrop-blur-lg border border-white/20"
            >
                <h2 className="mb-6 text-center text-3xl font-bold text-white drop-shadow-lg">
                    Admin Login
                </h2>

                <form className="space-y-4" onSubmit={handleLogin}>
                    <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="email"
                        placeholder="Admin Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-gray-300 focus:border-yellow-400 focus:outline-none"
                    />
                    <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-gray-300 focus:border-yellow-400 focus:outline-none"
                    />

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        type="submit"
                        className="w-full rounded-xl bg-yellow-500 px-4 py-3 text-gray-900 font-bold transition hover:bg-yellow-600 shadow-lg"
                    >
                        Login
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
