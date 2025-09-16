"use client";
import { useState } from "react";

export default function Login({ db, setCurrentUser }) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = () => {
    const foundUser = db.users.find(
      (u) => u.email === loginData.email && u.password === loginData.password
    );
    if (foundUser) {
      setCurrentUser(foundUser);
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl w-96 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
        />
        {error && <p className="text-red-400 mb-3">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded text-white font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}
