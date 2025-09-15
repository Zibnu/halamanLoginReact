import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Profile() {
  // const {username} = useParams()
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda harus login dulu");
      navigate("/");
      return;
    }
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:600/profile", {
          headers: {
            Authorization: `Bearer ${token}`, //kirim token ke backend
          },
        });
        setProfile(res.data); //data dari backend
      } catch (err) {
        console.error(err);
        alert("Sesi login sudah habis/ token tidak valid");
        localStorage.removeItem("token");
        navigate("/");
      }
    };
    fetchProfile();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="h-screen flex justify-center items-center bg-green-400">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 rounded px-5 py-2 cursor-pointer bg-lime-400 hover:bg-lime-600 text-center"
      >
        Logout
      </button>
      {/* Kotak Profile */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Profile user</h1>
        {profile? (
        <div className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-semibold mb-1">Username :</label>
            <input 
            type="text"
            value={profile.data.user_name}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
            />
          </div>
        </div>
        ) : ( <p>Loading Profile....</p>)}
      </div>
    </div>
  );
}

export default Profile;
