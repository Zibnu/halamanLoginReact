import React from "react";
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route} from "react-router-dom"
import "./index.css"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/profile/:username" element={<Profile/>}></Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
)