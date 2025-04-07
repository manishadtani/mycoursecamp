import { FaGoogle, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default user role
    const [isInstructorForm, setIsInstructorForm] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setRole(isInstructorForm ? "instructor" : "user");
    }, [isInstructorForm]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Sending data:", { username, email, password, role });

        try {
            const resp = await axios.post('http://127.0.0.1:3000/user/register', {
                username,
                email,
                password,
                role
            });
            localStorage.setItem('token', resp.data.token);
            navigate("/profile");
            setUsername("");
            setEmail("");
            setPassword("");
        } catch (err) {
            console.error('Error creating user:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Error creating user');
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
                    {isInstructorForm ? "Become an Instructor" : "Create Your Account"}
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-gray-300 focus:border-yellow-400 focus:outline-none"
                    />
                    <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="email"
                        placeholder="Email Address"
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

                    {isInstructorForm && (
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            placeholder="Your Expertise (e.g. Web Development)"
                            className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-gray-300 focus:border-yellow-400 focus:outline-none"
                        />
                    )}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="w-full rounded-xl bg-yellow-500 px-4 py-3 text-gray-900 font-bold transition hover:bg-yellow-600 shadow-lg"
                    >
                        {isInstructorForm ? "Apply as Instructor" : "Sign Up"}
                    </motion.button>
                </form>

                <div className="my-6 flex items-center">
                    <div className="h-px flex-1 bg-white/30"></div>
                    <span className="mx-4 text-white/80">or</span>
                    <div className="h-px flex-1 bg-white/30"></div>
                </div>

                <div className="flex flex-col space-y-3">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center justify-center gap-2 rounded-xl border border-white/30 px-4 py-3 text-white transition hover:bg-white/20"
                    >
                        <FaGoogle className="text-red-400" /> Sign up with Google
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center justify-center gap-2 rounded-xl border border-white/30 px-4 py-3 text-white transition hover:bg-white/20"
                    >
                        <FaGithub className="text-gray-300" /> Sign up with GitHub
                    </motion.button>
                </div>

                <p className="mt-6 text-center text-white/80 text-sm">
                    {isInstructorForm ? "Want to sign up as a user? " : "Want to become an instructor? "}
                    <span
                        className="cursor-pointer font-semibold text-yellow-400 hover:underline"
                        onClick={() => setIsInstructorForm(!isInstructorForm)}
                    >
                        {isInstructorForm ? "Sign up as User" : "Apply as Instructor"}
                    </span>
                </p>

                {/* 🔽 Added Login Buttons */}
                <p className="mt-4 text-center text-white/80 text-sm">
                    Already have an account?
                </p>
                <div className="mt-2 flex justify-center gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => navigate('/login')} // 👈 user login route
                        className="rounded-xl bg-white/20 text-white px-4 py-2 text-sm font-medium hover:bg-white/30 transition border border-white/30"
                    >
                        Login as User
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => navigate('/admin/login')} // 👈 instructor/admin login route
                        className="rounded-xl bg-white/20 text-white px-4 py-2 text-sm font-medium hover:bg-white/30 transition border border-white/30"
                    >
                        Login as Instructor
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
