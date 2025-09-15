import { useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import axios from "axios"

function Register() {
  const [user_name, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    if(!user_name || !password){
      alert("user name dan password wajib diisi!!")
      return
    }
    try{
      await axios.post("http://localhost:600/regis", {
        user_name,
        password,
      });
      alert("Registrasi Berhasil Silahkan Login.")
      navigate("/")
    }catch (err){
      alert(err.response?.data?.message || "Registrasi GAGAL!!!")
    }
  }


  return (
    <div className="h-screen flex justify-center items-center bg-slate-400">
      <form 
      onSubmit={handleRegister}
      className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input
        type="text"
        placeholder="Username"
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
        <button className="w-full bg-green-500 text-white p-2 rounded cursor-pointer">
          Register
        </button>
        <p className="text-sm text-center mt-4">
        Sudah Punya Akun?{" "}
        <Link to="/" className="text-blue-800">
        Login
        </Link>
        </p>
      </form>
    </div>
  )
}

export default Register