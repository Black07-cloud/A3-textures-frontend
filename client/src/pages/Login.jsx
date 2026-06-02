import { useState } from "react";

import api from "../services/api";

import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // HANDLE INPUT
  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value

    });

  };

  // LOGIN
  const handleLogin = async () => {

    try {

      setLoading(true);

      setError("");

      await api.post(
        "/auth/login",
        form
      );

    navigate("/admin", {
  replace: true
});

    } catch (err) {

      setError(

        err.response?.data?.error ||

        "Login failed"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur border border-slate-800 rounded-3xl p-8 shadow-2xl">

        {/* TITLE */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-extrabold text-white">
            🔐 Admin Login
          </h1>

         

        </div>

        {/* USERNAME */}
        <div className="mb-5">

          <label className="block text-slate-300 mb-3 font-medium">
            Username
          </label>

          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={form.username}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-green-500 transition"
          />

        </div>

        {/* PASSWORD */}
        <div className="mb-5">

          <label className="block text-slate-300 mb-3 font-medium">
            Password
          </label>

          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 pr-14 text-white outline-none focus:border-green-500 transition"
            />

            {/* EYE BUTTON */}
            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition text-xl"
            >

              {showPassword
                ? "🙈"
                : "👁️"}

            </button>

          </div>

        </div>

        {/* ERROR */}
        {error && (

          <div className="bg-red-500/10 border border-red-500 text-red-400 rounded-2xl px-4 py-3 mb-5 text-sm">

            {error}

          </div>

        )}

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 active:scale-[0.99] transition py-4 rounded-2xl text-lg font-bold shadow-lg disabled:opacity-50"
        >

          {loading
            ? "Logging in..."
            : "🚀 Login"}

        </button>

      </div>

    </div>

  );

}