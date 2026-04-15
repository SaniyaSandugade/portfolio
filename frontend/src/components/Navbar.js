import "../styles/dashboard.css";

function Navbar({ dark, setDark }) {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="navbar">

      <h3>Portfolio Admin</h3>

      {/* 🔥 RIGHT SIDE BUTTONS */}
      <div className="nav-actions">

        {/* DARK MODE BUTTON */}
        <button
          className="dark-btn"
          onClick={() => setDark((prev) => !prev)}
        >
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* LOGOUT BUTTON */}
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;