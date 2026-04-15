import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import "../styles/dashboard.css";

import AOS from "aos";
import "aos/dist/aos.css";

// 🔥 Sentry import
import * as Sentry from "@sentry/react";

function Dashboard({ dark, setDark }) {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="container">

      {/* Sidebar */}
      <Sidebar />

      <div className="main">

        {/* Navbar */}
        <Navbar dark={dark} setDark={setDark} />

        <h2 data-aos="fade-down">Dashboard</h2>

        {/* Dashboard Cards */}
        <DashboardCards />

        {/* 🔥 SENTRY TEST SECTION */}
        <div style={{ marginTop: "25px", display: "flex", gap: "10px" }}>

          {/* ✅ SAFE SENTRY TEST (RECOMMENDED) */}
          <button
            onClick={() => {
              Sentry.captureException(
                new Error("🔥 Manual Sentry Test from Dashboard")
              );
            }}
            style={{
              padding: "10px 15px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px"
            }}
          >
            Test Sentry (Safe)
          </button>

          {/* ❌ OPTIONAL CRASH TEST (ONLY FOR DEBUG) */}
          <button
            onClick={() => {
              throw new Error("🔥 Crash Test Error (React)");
            }}
            style={{
              padding: "10px 15px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px"
            }}
          >
            Crash Test
          </button>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;