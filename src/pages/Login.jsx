import { useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import axios from "axios"

function Login() {
  const [user_name, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if(!user_name || !password){
      alert("user name dan password wajib diisi!!")
      return
    }
    try{
      const res = await axios.post("http://localhost:600/login", {
        user_name,
        password,
      });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate(`/profile/${user_name}`)
      }
    }catch (err){
      alert(err.response?.data?.message || "Login Gagal")
    }
  }
  return (
    <div className="h-screen flex justify-center items-center bg-slate-400">
      <form 
      onSubmit={handleLogin}
      className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input 
        autoFocus
        type="text"
        placeholder="User Name"
        className="w-full p-2 mb-3 border rounded"
        value={user_name}
        onChange={(e) => setUsername(e.target.value)}
        />
        <input
        type="password"
        placeholder="Password" 
        className="w-full p-2 mb-3 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer">
          Login
        </button>
        <p className="text-sm text-center mt-4">
          Belum Punya Akun?{" "}
          <Link to="/register" className="text-blue-600">
          Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login