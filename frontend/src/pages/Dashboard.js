import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import "../styles/dashboard.css";

import AOS from "aos";
import "aos/dist/aos.css";

function Dashboard({ dark, setDark }) {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="container">

      <Sidebar />

      <div className="main">

        {/* 🔥 PASS DARK MODE */}
        <Navbar dark={dark} setDark={setDark} />

        <h2 data-aos="fade-down">Dashboard</h2>

        <DashboardCards />

      </div>

    </div>
  );
}

export default Dashboard;