import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProfile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/admin/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
      }
      
    };

    fetchProfile();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!profile) return <div className="text-white">Loading...</div>;

  return (
    <div className="text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
      <p><strong>Username:</strong> </p>
      <p><strong>Email:</strong> </p>
      <p><strong>Role:</strong></p>
    </div>
  );
}
