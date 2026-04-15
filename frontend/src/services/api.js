import axios from "axios";

const API = axios.create({
  baseURL: "https://portfolio-backend-yp27.onrender.com/api",
});

// Attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});


// 🔹 Skills (FIXED)
export const getSkills = () => API.get("/skills");
export const createSkill = (data) => API.post("/skills", data);
export const deleteSkill = (id) => API.delete(`/skills/${id}`);
export const updateSkill = (id, data) => API.put(`/skills/${id}`, data);


// 🔹 Projects (FIXED)
export const getProjects = () => API.get("/projects");
export const createProject = (data) => API.post("/projects", data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);


// 🔹 Auth
export const loginAdmin = (data) => API.post("/auth/login", data);


// 🔹 Contact
export const sendMessage = (data) => API.post("/contact", data);

export default API;