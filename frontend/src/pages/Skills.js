import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/skills.css";
import AOS from "aos";
import "aos/dist/aos.css";



function Skills() {
  const [skills, setSkills] = useState([]);
  const [editSkill, setEditSkill] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const res = await API.get("/skills");
    setSkills(res.data);
  };

  const deleteSkill = async (id) => {
    await API.delete(`/skills/${id}`);
    fetchSkills();
  };

  const updateSkill = async () => {
    await API.put(`/skills/${editSkill._id}`, editSkill);
    setEditSkill(null);
    fetchSkills();
  };

  // 🔥 FILTER LOGIC
  const filteredSkills =
    filter === "All"
      ? skills
      : skills.filter((s) => s.category === filter);

  // 🔥 GROUPING AFTER FILTER
  const grouped = filteredSkills.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="skills-container">
      <h2>Skills</h2>

      {/* 🔥 FILTER BUTTONS */}
      <div className="filters">
        {["All", "Frontend", "Backend", "Database", "Tools"].map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)}>
            {cat}
          </button>
        ))}
      </div>

      {Object.keys(grouped).map((category) => (
        <div key={category}>
          <h3 className="category-title">{category}</h3>

          {grouped[category].map((skill) => (
            <div 
  className="skill-card" 
  key={skill._id}
  data-aos="fade-up"
>
              <div className="skill-info">
                <p>{skill.name}</p>

                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${skill.proficiency}%` }}
                  ></div>
                </div>
              </div>

              <div className="actions">
                <button onClick={() => setEditSkill(skill)}>Edit</button>
                <button onClick={() => deleteSkill(skill._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* 🔥 EDIT MODAL */}
      {editSkill && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Skill</h3>

            <input
              value={editSkill.name}
              onChange={(e) =>
                setEditSkill({ ...editSkill, name: e.target.value })
              }
            />

            <select
              value={editSkill.category}
              onChange={(e) =>
                setEditSkill({ ...editSkill, category: e.target.value })
              }
            >
              <option>Frontend</option>
              <option>Backend</option>
              <option>Database</option>
              <option>Tools</option>
              <option>Other</option>
            </select>

            <input
              type="number"
              value={editSkill.proficiency}
              onChange={(e) =>
                setEditSkill({
                  ...editSkill,
                  proficiency: Number(e.target.value),
                })
              }
            />

            <div className="modal-buttons">
              <button onClick={updateSkill}>Update</button>
              <button onClick={() => setEditSkill(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Skills;