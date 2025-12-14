import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { toast } from "react-toastify";
import { addUserAPI, getAllUsersAPI, deleteUserAPI, getAllTrainerAPI } from "../../services/allAPI";
import { FaTrash } from 'react-icons/fa';

function AdminUser() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
    assignedTrainer: "",
    startDate: "",
    endDate: "",
    plan: "",
    duration: ""
  });
  const [token, setToken] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [allTrainers, setAllTrainers] = useState([]);
  const [activeTab, setActiveTab] = useState("add"); // Tabs: add, view
  const [viewSubTab, setViewSubTab] = useState("registered"); // Sub-tabs: registered, approved, active

  // Reset form
  const reset = () => {
    setUserDetails({ username: "", email: "", password: "", role: "user", assignedTrainer: "", startDate: "", endDate: "", plan: "", duration: "" });
  };

  // Add user
  const handleAddUser = async () => {
    const { username, email, password, role, assignedTrainer, startDate, endDate, plan, duration } = userDetails;
    if (!username || !email || !password || !role) {
      toast.info("Fill the form completely");
      return;
    }

    try {
      const result = await addUserAPI(
        { username, email, password, role, assignedTrainer, startDate, endDate, plan, duration },
        { Authorization: `Bearer ${token}` }
      );

      if (result?.status === 200) {
        toast.success("User added successfully!");
        reset();
        getAllUsers();
      } else {
        toast.error(result?.data || "Error in adding user");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data || "Something went wrong");
    }
  };

  // View all users
  const getAllUsers = async () => {
    console.log("Fetching users...");
    try {
      const reqHeader = { "Authorization": `Bearer ${token}` };
      const result = await getAllUsersAPI(reqHeader);
      console.log("Users API result:", result);
      if (result.status === 200) {
        setAllUsers(result.data);
        console.log("All users:", result.data);
      } else {
        toast.error("Failed to load users");
      }
    } catch (error) {
      console.log("Error fetching users:", error);
      toast.error("Failed to load users");
    }
  };

  // View all trainers
  const getAllTrainers = async () => {
    try {
      const reqHeader = { "Authorization": `Bearer ${token}` };
      const result = await getAllTrainerAPI(reqHeader);
      if (result.status === 200) {
        setAllTrainers(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const result = await deleteUserAPI(id, reqHeader);
      if (result.status === 200) {
        toast.success("User deleted successfully!");
        getAllUsers();
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting");
    }
  };

  // Filter users by status
  const getUsersByStatus = (status) => {
    const filtered = allUsers.filter(user => user.status === status);
    console.log(`Users with status ${status}:`, filtered);
    return filtered;
  };

  // Registered users: status "registered" and role not "admin"
  const getRegisteredUsers = () => getUsersByStatus("registered").filter(user => user.role !== "admin");

  // Active members: status "active-member"
  const getActiveMembers = () => getUsersByStatus("active-member");

  // Helper to get trainer name
  const getTrainerDetails = (trainerId) => {
    const trainer = allTrainers.find(t => t._id === trainerId);
    return trainer ? `${trainer.name} (${trainer.specialization})` : "No Trainer Assigned";
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    console.log("Token from sessionStorage:", storedToken);
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getAllUsers();
      getAllTrainers();
    }
  }, [token]);

  return (
    <div className="flex bg-black min-h-screen text-white">
      <AdminSidebar />

      <main className="flex-1 p-10">
        {/* Tab buttons for switching */}
        <div className="flex justify-center items-center my-8 font-medium text-lg">
          <p
            onClick={() => setActiveTab("add")}
            className={
              activeTab === "add"
                ? "text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer"
                : "p-4 border-b border-gray-200 cursor-pointer"
            }
          >
            Add User
          </p>
          <p
            onClick={() => setActiveTab("view")}
            className={
              activeTab === "view"
                ? "text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer"
                : "p-4 border-b border-gray-200 cursor-pointer"
            }
          >
            View User
          </p>
        </div>

        {/* Add User Section */}
        {activeTab === "add" && (
          <>
            <h2 className="text-3xl font-bold mb-6">Add User</h2>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Username</label>
                  <input
                    type="text"
                    value={userDetails.username}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, username: e.target.value })
                    }
                    className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                    placeholder="Enter username"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={userDetails.email}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, email: e.target.value })
                    }
                    className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                    placeholder="Enter email"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Password</label>
                  <input
                    type="password"
                    value={userDetails.password}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, password: e.target.value })
                    }
                    className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                    placeholder="Enter password"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Role</label>
                  <select
                    value={userDetails.role}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, role: e.target.value })
                    }
                    className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="trainer">Trainer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Assigned Trainer</label>
                  <select
                    value={userDetails.assignedTrainer}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, assignedTrainer: e.target.value })
                    }
                    className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                  >
                    <option value="">Select Trainer</option>
                    {allTrainers.map((trainer) => (
                      <option key={trainer._id} value={trainer._id}>
                        {trainer.name} ({trainer.specialization})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={userDetails.startDate}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, startDate: e.target.value })
                    }
                    className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">End Date</label>
                  <input
                    type="date"
                    value={userDetails.endDate}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, endDate: e.target.value })
                    }
                    className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Plan</label>
                  <input
                    type="text"
                    value={userDetails.plan}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, plan: e.target.value })
                    }
                    className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                    placeholder="Enter plan"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Duration</label>
                  <input
                    type="text"
                    value={userDetails.duration}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, duration: e.target.value })
                    }
                    className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                    placeholder="Enter duration"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={reset}
                  className="bg-amber-700 text-white rounded px-5 py-3 hover:border hover:border-amber-700 hover:text-amber-700 hover:bg-white"
                >
                  Reset
                </button>
                <button
                  onClick={handleAddUser}
                  className="bg-green-700 text-white rounded px-5 py-3 hover:border hover:border-green-700 hover:text-green-700 hover:bg-white"
                >
                  Add User
                </button>
              </div>
            </div>
          </>
        )}

        {/* View User Section */}
        {activeTab === "view" && (
          <>
            <h2 className="text-3xl font-bold mb-6">View Users</h2>
            {/* Sub-tabs for filtering */}
            <div className="flex justify-center items-center my-8 font-medium text-lg">
              <p
                onClick={() => setViewSubTab("registered")}
                className={
                  viewSubTab === "registered"
                    ? "text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer"
                    : "p-4 border-b border-gray-200 cursor-pointer"
                }
              >
                Registered Users
              </p>
              <p
                onClick={() => setViewSubTab("approved")}
                className={
                  viewSubTab === "approved"
                    ? "text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer"
                    : "p-4 border-b border-gray-200 cursor-pointer"
                }
              >
                Approved Users
              </p>
              <p
                onClick={() => setViewSubTab("active")}
                className={
                  viewSubTab === "active"
                    ? "text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer"
                    : "p-4 border-b border-gray-200 cursor-pointer"
                }
              >
                Active Members
              </p>
            </div>

            {/* Registered Users */}
            {viewSubTab === "registered" && (
              <div className="grid md:grid-cols-3 gap-6">
                {getRegisteredUsers().map((user, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg shadow">
                    <h3 className="text-xl font-semibold">{user.username}</h3>
                    <p className="text-gray-300">Email: {user.email}</p>
                    <p className="text-gray-300">Role: {user.role}</p>
                    <p className="text-gray-300">Trainer: {getTrainerDetails(user.assignedTrainer)}</p>
                    <p className="text-gray-300">Start: {user.startDate ? new Date(user.startDate).toLocaleDateString() : "N/A"}</p>
                    <p className="text-gray-300">End: {user.endDate ? new Date(user.endDate).toLocaleDateString() : "N/A"}</p>
                    <p className="text-gray-300">Plan: {user.plan || "N/A"}</p>
                    <p className="text-gray-300">Duration: {user.duration || "N/A"}</p>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="p-2 rounded bg-red-600 text-white hover:bg-gray-200 hover:text-red-600 hover:border hover:border-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Approved Users */}
            {viewSubTab === "approved" && (
              <div className="grid md:grid-cols-3 gap-6">
                {getUsersByStatus("approved").map((user, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg shadow">
                    <h3 className="text-xl font-semibold">{user.username}</h3>
                    <p className="text-gray-300">Email: {user.email}</p>
                    <p className="text-gray-300">Role: {user.role}</p>
                    <p className="text-gray-300">Trainer: {getTrainerDetails(user.assignedTrainer)}</p>
                    <p className="text-gray-300">Start: {user.startDate ? new Date(user.startDate).toLocaleDateString() : "N/A"}</p>
                    <p className="text-gray-300">End: {user.endDate ? new Date(user.endDate).toLocaleDateString() : "N/A"}</p>
                    <p className="text-gray-300">Plan: {user.plan || "N/A"}</p>
                    <p className="text-gray-300">Duration: {user.duration || "N/A"}</p>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="p-2 rounded bg-red-600 text-white hover:bg-gray-200 hover:text-red-600 hover:border hover:border-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Active Members */}
            {viewSubTab === "active" && (
              <div className="grid md:grid-cols-3 gap-6">
                {getActiveMembers().map((user, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg shadow">
                    <h3 className="text-xl font-semibold">{user.username}</h3>
                    <p className="text-gray-300">Email: {user.email}</p>
                    <p className="text-gray-300">Role: {user.role}</p>
                    <p className="text-gray-300">Trainer: {getTrainerDetails(user.assignedTrainer)}</p>
                    <p className="text-gray-300">Start: {user.startDate ? new Date(user.startDate).toLocaleDateString() : "N/A"}</p>
                    <p className="text-gray-300">End: {user.endDate ? new Date(user.endDate).toLocaleDateString() : "N/A"}</p>
                    <p className="text-gray-300">Plan: {user.plan || "N/A"}</p>
                    <p className="text-gray-300">Duration: {user.duration || "N/A"}</p>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="p-2 rounded bg-red-600 text-white hover:bg-gray-200 hover:text-red-600 hover:border hover:border-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default AdminUser;