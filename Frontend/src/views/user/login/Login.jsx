import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isInstructorLogin, setIsInstructorLogin] = useState(false);
    const [role, setRole] = useState('user'); // default
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setRole(isInstructorLogin ? "instructor" : "user");
    }, [isInstructorLogin]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://127.0.0.1:3000/user/login", {
                email,
                password,
                role
            });

            localStorage.setItem("token", res.data.token);
            navigate("/profile");
            setEmail('');
            setPassword('');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-900 via-blue-900 to-gray-700 p-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md rounded-3xl bg-white/10 p-8 shadow-2xl backdrop-blur-lg border border-white/20"
            >
                <h2 className="mb-6 text-center text-3xl font-bold text-white drop-shadow-lg">
                    {isInstructorLogin ? "Instructor Login" : "Login to Your Account"}
                </h2>

                {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-yellow-400"
                    />
                    <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-yellow-400"
                    />

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        type="submit"
                        className="w-full rounded-xl bg-yellow-500 px-4 py-3 text-gray-900 font-bold transition hover:bg-yellow-600"
                    >
                        {isInstructorLogin ? "Login as Instructor" : "Login"}
                    </motion.button>
                </form>

                <p className="mt-6 text-center text-white/80 text-sm">
                    {isInstructorLogin ? "Want to login as user?" : "Are you an instructor?"}
                    <span
                        className="ml-1 cursor-pointer font-semibold text-yellow-400 hover:underline"
                        onClick={() => setIsInstructorLogin(!isInstructorLogin)}
                    >
                        {isInstructorLogin ? "Login as User" : "Login as Instructor"}
                    </span>
                </p>

                <p className="mt-3 text-center text-white/70 text-sm">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate('/signup')}
                        className="text-yellow-400 cursor-pointer hover:underline"
                    >
                        Sign up
                    </span>
                </p>
            </motion.div>
        </div>
    );
}
