import { useState } from "react";

import api from "../services/api";

function AdminSettings() {

  // USERNAME
  const [username, setUsername] = useState("");

  const [currentPasswordForUsername, setCurrentPasswordForUsername] = useState("");

  // PASSWORDS
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: ""
  });

  // SHOW / HIDE PASSWORD
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  // CHANGE USERNAME
  const updateUsername = async () => {

    if (!username) {
      return alert("Enter username");
    }

    if (!currentPasswordForUsername) {
      return alert("Enter current password");
    }

    try {

      await api.patch("/auth/username", {
        username,
        currentPassword: currentPasswordForUsername
      });

      alert("✅ Username updated");

      setUsername("");

      setCurrentPasswordForUsername("");

    } catch (err) {

      alert(
        err.response?.data?.error ||
        "Username update failed"
      );

    }

  };

  // CHANGE PASSWORD
  const updatePassword = async () => {

    if (
      !passwords.currentPassword ||
      !passwords.newPassword
    ) {
      return alert("Fill all fields");
    }

    try {

      await api.patch("/auth/password", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });

      alert("✅ Password updated");

      setPasswords({
        currentPassword: "",
        newPassword: ""
      });

    } catch (err) {

      alert(
        err.response?.data?.error ||
        "Password update failed"
      );

    }

  };

  return (

    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">

      <div className="max-w-3xl mx-auto space-y-8">

        {/* TITLE */}
        <div>

          <h1 className="text-4xl font-extrabold">
            ⚙️ Admin Settings
          </h1>

          <p className="text-slate-400 mt-2">
            Manage admin account settings securely
          </p>

        </div>

        {/* CHANGE USERNAME */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">

          <h2 className="text-2xl font-bold">
            ✏️ Change Username
          </h2>

          {/* USERNAME */}
          <input
            type="text"
            placeholder="New Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
          />

          {/* CURRENT PASSWORD */}
          <div className="relative">

            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Current Password"
              value={currentPasswordForUsername}
              onChange={(e) =>
                setCurrentPasswordForUsername(e.target.value)
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 pr-14 outline-none focus:border-blue-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowCurrentPassword(!showCurrentPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showCurrentPassword ? "🙈" : "👁️"}
            </button>

          </div>

          {/* BUTTON */}
          <button
            onClick={updateUsername}
            className="bg-blue-500 hover:bg-blue-600 transition px-6 py-4 rounded-2xl font-semibold shadow-lg"
          >
            Update Username
          </button>

        </div>

        {/* CHANGE PASSWORD */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">

          <h2 className="text-2xl font-bold">
            🔐 Change Password
          </h2>

          {/* CURRENT PASSWORD */}
          <div className="relative">

            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Current Password"
              value={passwords.currentPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  currentPassword: e.target.value
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 pr-14 outline-none focus:border-green-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowCurrentPassword(!showCurrentPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showCurrentPassword ? "🙈" : "👁️"}
            </button>

          </div>

          {/* NEW PASSWORD */}
          <div className="relative">

            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  newPassword: e.target.value
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 pr-14 outline-none focus:border-green-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowNewPassword(!showNewPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showNewPassword ? "🙈" : "👁️"}
            </button>

          </div>

          {/* BUTTON */}
          <button
            onClick={updatePassword}
            className="bg-green-500 hover:bg-green-600 transition px-6 py-4 rounded-2xl font-semibold shadow-lg"
          >
            Update Password
          </button>

        </div>

      </div>

    </div>

  );

}

export default AdminSettings;