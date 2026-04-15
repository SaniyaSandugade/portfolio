import axios from "axios";

const API = axios.create({
  baseURL: "https://portfolio-backend-yp27.onrender.com",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});


// 🔹 Skills APIs
export const getSkills = () => API.get("/skills");
export const createSkill = (data) => API.post("/skills", data);
export const deleteSkill = (id) => API.delete(`/skills/${id}`);

// 🔹 Projects APIs
export const getProjects = () => API.get("/projects");
export const createProject = (data) => API.post("/projects", data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

// 🔹 Contact API
export const sendMessage = (data) => API.post("/contact", data);

export default API;

