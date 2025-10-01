"use client";
import React from "react";

export default function LoginPopup({
  mode,
  setMode,
  loginForm,
  setLoginForm,
  handleSubmit,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-4 text-center">
          {mode === "login" ? "Login" : "Create Account"}
        </h2>

        {mode === "create" && (
          <input
            type="text"
            placeholder="Name"
            required
            value={loginForm.name}
            onChange={(e) =>
              setLoginForm({ ...loginForm, name: e.target.value })
            }
            className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          required
          value={loginForm.email}
          onChange={(e) =>
            setLoginForm({ ...loginForm, email: e.target.value })
          }
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={loginForm.password}
          onChange={(e) =>
            setLoginForm({ ...loginForm, password: e.target.value })
          }
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-500"
        >
          {mode === "login" ? "Login" : "Create Account"}
        </button>

        {mode === "login" ? (
          <button
            type="button"
            onClick={() => setMode("create")}
            className="w-full bg-green-600 py-2 rounded hover:bg-green-500 mt-2"
          >
            Create Account
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setMode("login")}
            className="w-full bg-green-600 py-2 rounded hover:bg-green-500 mt-2"
          >
            Login Account
          </button>
        )}
      </form>
    </div>
  );
}
