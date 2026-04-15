import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/projects.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

function Projects() {
  const [projects, setProjects] = useState([]);

  // 🔥 NEW STATES
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  const deleteProject = async (id) => {
    await API.delete(`/projects/${id}`);
    fetchProjects();
  };

  // 🔥 FILTER LOGIC
  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) =>
          p.technologies.includes(filter)
        );

  return (
    <div className="projects-container">

      {/* 🔥 SEO + META TAGS */}
      <Helmet>
        <title>Projects | My Portfolio</title>
        <meta name="description" content="Explore my portfolio projects built using MERN stack and modern technologies." />

        {/* 🔥 OPEN GRAPH (for sharing) */}
        <meta property="og:title" content="Projects | My Portfolio" />
        <meta property="og:description" content="Check out my latest projects and live demos." />
        <meta property="og:type" content="website" />
      </Helmet>

      <h2>Projects</h2>

      {/* 🔥 FILTER BUTTONS */}
      <div className="filters">
        {["All", "React", "Node", "MongoDB"].map((tech) => (
          <button key={tech} onClick={() => setFilter(tech)}>
            {tech}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {filteredProjects.map((project) => (
          <div
            className="project-card"
            key={project._id}
            data-aos="zoom-in"
            onClick={() => setSelectedProject(project)}
          >
            {/* Image */}
            <img
              src={`https://portfolio-backend-yp27.onrender.com/uploads/${project.image}`}
              alt="project"
              loading="lazy"
            />

            {/* Content */}
            <div className="project-content">
              <h3>{project.title}</h3>

              <p>{project.description}</p>

              {/* Tech Tags */}
              <div className="tags">
                {project.technologies.map((tech, i) => (
                  <span key={i}>{tech}</span>
                ))}
              </div>

              {/* Status */}
              <div className={`status ${project.status}`}>
                {project.status}
              </div>

              {/* Links */}
              <div className="links">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                )}

                {/* 🔥 NEW LIVE LINK */}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    Live
                  </a>
                )}
              </div>

              {/* Delete */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // 🔥 prevent modal open
                  deleteProject(project._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 PROJECT MODAL */}
      {selectedProject && (
        <div
          className="modal"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedProject.title}</h2>

            <img
              src={`https://portfolio-backend-yp27.onrender.com/uploads/${selectedProject.image}`}
              alt=""
              style={{ width: "100%", borderRadius: "10px" }}
            />

            <p>{selectedProject.description}</p>

            <div className="tags">
              {selectedProject.technologies.map((tech, i) => (
                <span key={i}>{tech}</span>
              ))}
            </div>

            <div className="links">
              {selectedProject.githubUrl && (
                <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              )}

              {selectedProject.liveUrl && (
                <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              )}
            </div>

            <button onClick={() => setSelectedProject(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;