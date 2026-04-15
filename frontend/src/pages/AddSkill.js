import { useState } from "react";
import API from "../services/api";
import "../styles/form.css";


function AddSkill() {
  const [form, setForm] = useState({
    name: "",
    category: "Frontend",
    proficiency: ""
  });

  const addSkill = async () => {
    if (!form.name || form.proficiency === "") {
      alert("All fields required");
      return;
    }

    await API.post("/skills", form);
    window.location.href = "/admin/skills";
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Add Skill</h2>

        <input
          placeholder="Skill Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <select
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
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
          placeholder="Proficiency (0-100)"
          onChange={(e) =>
            setForm({ ...form, proficiency: e.target.value })
          }
        />

       

     

   


        <button onClick={addSkill}>Add Skill</button>
      </div>
    </div>
  );
}





export default AddSkill;