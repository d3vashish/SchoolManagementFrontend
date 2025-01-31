import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Teachers from "./components/Teacher";
import Students from "./components/Students";
import Classes from "./components/Classes";
import  Dashboard  from "./components/Dashboard";

const App = () => {
  return (
    <Router>
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
        {/* Sidebar Component */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-10">
          <Routes>
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/classes" element={<Classes />} />
            <Route
              path="/"
              element={<h1 className="text-white">Welcome to SchoolMS</h1>}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
