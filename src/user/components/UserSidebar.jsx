import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";

function UserSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user data
    sessionStorage.removeItem("existingUser");
    sessionStorage.removeItem("token");
    sessionStorage.clear();   


    // Toast success message
    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 2000,
    });

    // Redirect after 2 sec
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const requestApproved = true;

  return (
    <div className="w-64 bg-gray-900 min-h-screen p-6 border-r border-gray-800 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-white mb-8">User Panel</h2>

        <nav className="flex flex-col gap-5 text-gray-300">
          <Link to="/user-home" className="hover:text-red-400">
            User Home
          </Link>

          <Link to="/user-attendances" className="hover:text-red-400">
           Attendance
          </Link>

          <Link to="/user-workoutplan" className="hover:text-red-400">
            My WorkoutPlan
          </Link>
        </nav>
      </div>

      {/* Logout Button */}
      <div>
        <button
          className="flex items-center gap-2 w-full text-gray-300 hover:text-red-400 cursor-pointer"
          onClick={handleLogout}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}

export default UserSidebar;
