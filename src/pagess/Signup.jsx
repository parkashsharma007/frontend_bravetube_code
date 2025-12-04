import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ onSignup }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const nav = useNavigate();

  const submit = () => {
    if (!form.name || !form.email || !form.password) {
      alert("Fill all fields");
      return;
    }

    localStorage.setItem("user", JSON.stringify(form));
    onSignup(form);
    nav("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 w-96 shadow rounded">
        <h1 className="text-xl font-bold mb-4">Signup</h1>
<form>
        <input
          placeholder="Name"
          className="border p-2 w-full mb-3"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

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
          onClick={submit}
          className="bg-blue-600 text-white p-2 w-full rounded"
        >
          Signup
        </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
