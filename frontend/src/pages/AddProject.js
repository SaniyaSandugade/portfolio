import { useState } from "react";
import API from "../services/api";
import "../styles/form.css";

function AddProject() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
    status: "Completed"
  });

  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    const data = new FormData();

    data.append("title", form.title);
    data.append("description", form.description);
    data.append("technologies", form.technologies);
    data.append("githubUrl", form.githubUrl);
    data.append("liveUrl", form.liveUrl);
    data.append("status", form.status);
    data.append("image", image);

    await API.post("/api/projects", data);

    alert("Project Added");
    window.location.href = "/admin/projects";
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Add Project</h2>

        <input placeholder="Title"
          onChange={(e) => setForm({...form, title: e.target.value})} />

        <textarea placeholder="Description"
          onChange={(e) => setForm({...form, description: e.target.value})} />

        <input type="file"
          onChange={(e) => setImage(e.target.files[0])} />

        <input placeholder="Technologies (React,Node)"
          onChange={(e) => setForm({...form, technologies: e.target.value})} />

        <input placeholder="GitHub URL"
          onChange={(e) => setForm({...form, githubUrl: e.target.value})} />

    

        <select onChange={(e) => setForm({...form, status: e.target.value})}>
          <option>Completed</option>
          <option>Ongoing</option>
        </select>

        <button onClick={handleSubmit}>Add Project</button>
      </div>
    </div>
  );
}

export default AddProject;