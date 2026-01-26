// src/App.jsx (Main Admin Panel)
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Background from "./components/MagicUi/Background";
import AdminNavbar from "./components/Navbar";
import AdminLogin, { STORAGE_KEY } from "./components/login";

import TeachersList from "./components/TeachersList";
import ParentsList from "./components/StudentsList";
import JobApplications from "./components/JobApplications";
import ContactSubmissions from "./components/SRequest";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return !!localStorage.getItem(STORAGE_KEY);
    } catch {
      return false;
    }
  });
  

  // optional: keep auth in sync if some other tab logs in/out
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        setIsAuthenticated(!!e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen">
      <div
        className="absolute -z-20 aspect-square top-0 left-0 w-full h-40 bg-gradient-to-r
        from-pink-300/40 via-violet-300/40 to-sky-300/40 blur-3xl filter rounded-b-full"
      ></div>
      <Background
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={0.5}
        className={[
          "mask-image:radial-gradient(500px_circle_at_center,white,transparent)",
          "inset-x-0 inset-y-[-30%] h-[220%] skew-y-12",
        ]}
      />
      <AdminNavbar onLogout={handleLogout} />
      <div className="pt-24">
        <Routes>
          <Route path="/" element={<Navigate to="/teachers" replace />} />
          <Route path="/teachers" element={<TeachersList />} />
          <Route path="/parents" element={<ParentsList />} />
          <Route path="/jobs" element={<JobApplications />} />
          <Route path="/contacts" element={<ContactSubmissions />} />
          <Route path="*" element={<Navigate to="/teachers" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
