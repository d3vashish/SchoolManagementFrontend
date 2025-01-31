import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ path, icon, label, onClick }) => {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          `flex items-center gap-4 px-6 py-4 rounded-2xl ${
            isActive
              ? "bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 text-indigo-400"
              : "text-slate-400 hover:bg-slate-800/30 hover:text-indigo-400"
          } transition-all duration-300`
        }
        onClick={onClick}
      >
        <span className="material-symbols-outlined text-2xl">{icon}</span>
        <span className="text-lg font-medium">{label}</span>
      </NavLink>
    </li>
  );
};

export default NavItem;
