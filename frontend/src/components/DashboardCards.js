import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/dashboard.css";

function DashboardCards() {
  const [skillsCount, setSkillsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const skillsRes = await API.get("/skills");
      const projectsRes = await API.get("/projects");

      setSkillsCount(skillsRes.data.length);
      setProjectsCount(projectsRes.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cards">
      <div className="card" data-aos="fade-up">
        <h3>Total Skills</h3>
        <p>{skillsCount}</p>
      </div>

      <div className="card" data-aos="fade-up">
        <h3>Total Projects</h3>
        <p>{projectsCount}</p>
      </div>
    </div>
  );
}

export default DashboardCards;