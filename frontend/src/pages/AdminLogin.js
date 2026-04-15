import { useState } from "react";
import API from "../services/api";   // ✅ USE THIS
import "../styles/form.css";





function AdminLogin({ dark, setDark }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const login = async () => {
    try {
      if (!form.email || !form.password) {
        alert("All fields are required");
        return;
      }

      // ✅ FIXED API CALL
      const res = await API.post("/api/auth/login", form);

      localStorage.setItem("token", res.data.token);

      alert("Login Successful ✅");
      window.location.href = "/admin/dashboard";

    } catch (err) {
      alert("Login Failed ❌");
    }
  };

  return (
    <div className="form-container">

      {/* 🌙 DARK MODE BUTTON */}
      <button
        className="dark-btn"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px"
        }}
        onClick={() => setDark(!dark)}
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      <div className="form-box">
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;