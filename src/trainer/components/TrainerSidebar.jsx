import React from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const TrainerSidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold">Trainer Panel</h2>
        <nav className="flex flex-col space-y-4 mt-6">
          <Link to="/trainer-home" className="hover:text-red-400">Home</Link>
          <Link to="/assigned-users" className="hover:text-red-400">Assigned Users</Link>
          <Link to="/workout-plan" className="hover:text-red-400">Workout Plan</Link>
          <Link to="/trainer-chat" className="hover:text-red-400">Trainer Chat</Link>
        </nav>
      </div>

      {/* Logout Button */}
      <div>
        <button className="flex items-center gap-2 w-full hover:text-red-400 cursor-pointer">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default TrainerSidebar;
