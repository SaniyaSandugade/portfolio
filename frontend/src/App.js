import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, Suspense, lazy } from "react";

// 🔥 LAZY LOADING (Code Splitting)
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Skills = lazy(() => import("./pages/Skills"));
const AddSkill = lazy(() => import("./pages/AddSkill"));
const Projects = lazy(() => import("./pages/Projects"));
const AddProject = lazy(() => import("./pages/AddProject"));
const Contact = lazy(() => import("./pages/Contact"));

function App() {
  const [dark, setDark] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", dark);
  }, [dark]);

  return (
    <BrowserRouter>
      <div className={dark ? "dark" : ""}>

        {/* 🔥 SUSPENSE WRAPPER */}
        <Suspense fallback={<h2 style={{ textAlign: "center" }}>Loading...</h2>}>

          <Routes>

            <Route
              path="/"
              element={<AdminLogin dark={dark} setDark={setDark} />}
            />

            <Route
              path="/admin/dashboard"
              element={<Dashboard dark={dark} setDark={setDark} />}
            />

            
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/admin/add-skill" element={<AddSkill />} />
            <Route path="/admin/add-project" element={<AddProject />} />
            <Route path="/contact" element={<Contact />} />

          </Routes>

        </Suspense>

      </div>
    </BrowserRouter>
  );
}

export default App;