import React from "react";
import { FaUsers, FaUserTie, FaMoneyBill, FaHome, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user data from session storage
    sessionStorage.removeItem("existingUser");
    sessionStorage.removeItem("token");
    
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="w-64 bg-gray-900 p-6 space-y-6 min-h-screen flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold">Gym Admin</h1>

        <nav className="space-y-4 mt-6">
          <Link to={"/admin-home"} className="flex items-center gap-3 hover:text-red-400 cursor-pointer">
            <FaHome /> Dashboard
          </Link>
          <Link to={"/admin-user"} className="flex items-center gap-3 hover:text-red-400 cursor-pointer">
            <FaUsers /> Enquiry
          </Link>
          <Link to={"/admin-trainer"} className="flex items-center gap-3 hover:text-red-400 cursor-pointer">
            <FaUserTie /> Trainers
          </Link>
          <Link to={"/nn"} className="flex items-center gap-3 hover:text-red-400 cursor-pointer">
            <FaUserTie /> Members
          </Link>
          <Link to={"/admin-payment"} className="flex items-center gap-3 hover:text-red-400 cursor-pointer">
            <FaMoneyBill /> Payments
          </Link>
        </nav>
      </div>

      {/* Logout Button */}
      <div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full hover:text-red-400 cursor-pointer"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}
