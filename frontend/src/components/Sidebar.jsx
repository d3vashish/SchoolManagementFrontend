import React, { useState } from "react";
import NavItem from "./NavItem";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/", icon: "menu_book", label: "Dashboard" },
    { path: "/teachers", icon: "person_search", label: "Teachers" },
    { path: "/classes", icon: "class", label: "Classes" },
    { path: "/students", icon: "school", label: "Students" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-indigo-600 text-white rounded-md shadow-lg focus:outline-none"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 left-0 w-64 bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-lg text-slate-50 flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-80`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center gap-4 px-8 py-6 border-b border-slate-700/30">
          <svg
            className="w-12 h-12 transform hover:rotate-180 transition-all duration-500"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"
              className="fill-indigo-400"
            />
          </svg>
          <h1 className="text-2xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
              School
            </span>
            <span className="text-slate-200">MS</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-1 px-4">
          <ul className="space-y-3">
            {navItems.map((item) => (
              <NavItem
                key={item.path}
                path={item.path}
                icon={item.icon}
                label={item.label}
                onClick={() => setIsOpen(false)} // Close sidebar on click (mobile)
              />
            ))}
          </ul>
        </nav>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
