import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const nav = useNavigate();

  const login = () => {
    const saved = JSON.parse(localStorage.getItem("user"));

    if (!saved) return alert("Signup first!");

    if (
      saved.email === form.email &&
      saved.password === form.password
    ) {
      onLogin(saved);
      nav("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 w-96 shadow rounded">
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={login}
          className="bg-blue-600 text-white p-2 w-full rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
