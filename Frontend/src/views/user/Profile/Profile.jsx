import { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 relative">
      {/* User Info Section */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 flex justify-between items-center relative">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900">John Doe</h2>
          <p className="text-gray-500">johndoe@example.com</p>
        </motion.div>
        <button onClick={toggleMenu} className="text-gray-600 hover:text-black text-xl">
          <FaBars size={26} />
        </button>
      </div>

      {/* Sidebar Menu */}
      {menuOpen && (
        <motion.div
          ref={menuRef}
          initial={{ x: 200 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 w-64 h-full bg-white shadow-xl p-6 z-50"
        >
          <ul className="space-y-6 text-lg font-medium">
            <li className="hover:text-purple-600 cursor-pointer">Your Courses</li>
            <li className="hover:text-purple-600 cursor-pointer">Support</li>
            <li className="hover:text-purple-600 cursor-pointer">Logout</li>
          </ul>
        </motion.div>
      )}

      {/* Courses Section */}
      <div className="mt-8 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((course, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition border-t-4 border-purple-500"
          >
            <h3 className="text-xl font-semibold text-gray-800">Course {index + 1}</h3>
            <p className="text-gray-600">Instructor: John Smith</p>
            <p className="text-gray-500">Category: Web Development</p>
            <p className="text-purple-600 font-bold mt-2 text-lg">$49.99</p>
          </motion.div>
        ))}
      </div>

      {/* Motivational Quote */}
      <div className="mt-8 p-6 bg-purple-100 text-purple-800 rounded-lg text-center w-full max-w-3xl text-lg font-semibold">
        "Keep learning, keep growing. Success follows effort!"
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-500 text-sm">© 2025 CourseCamp. All Rights Reserved.</footer>
    </div>
  );
}