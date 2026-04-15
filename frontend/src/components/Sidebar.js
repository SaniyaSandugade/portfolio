import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2>Admin Panel</h2>

      <Link to="/admin/dashboard">Dashboard</Link>

      <Link to="/admin/skills">Skills</Link>

      <Link to="/admin/add-skill">Add Skill</Link>

      <Link to="/admin/projects">Projects</Link>

      <Link to="/admin/add-project">Add Project</Link>

      <Link to="/contact">Contact</Link>

    </div>
  );
}

export default Sidebar;