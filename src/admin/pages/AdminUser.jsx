import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { toast } from "react-toastify";
import {
  addUserAPI,
  getAllUsersAPI,
  deleteUserAPI,
  getAllTrainerAPI
} from "../../services/allAPI";
import { FaTrash } from "react-icons/fa";

function AdminUser() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",          // 🔒 fixed role
    assignedTrainer: ""
  });

  const [token, setToken] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [allTrainers, setAllTrainers] = useState([]);
  const [activeTab, setActiveTab] = useState("add");
  const [viewSubTab, setViewSubTab] = useState("registered");

  // 🔄 Reset form
  const reset = () => {
    setUserDetails({
      username: "",
      email: "",
      password: "",
      role: "user",
      assignedTrainer: ""
    });
  };

  // ➕ Add user
  const handleAddUser = async () => {
    const { username, email, password, role, assignedTrainer } = userDetails;

    if (!username || !email || !password) {
      toast.info("Fill the form completely");
      return;
    }

    try {
      const result = await addUserAPI(
        { username, email, password, role, assignedTrainer },
        { Authorization: `Bearer ${token}` }
      );

      if (result.status === 200) {
        toast.success("User added successfully");
        reset();
        getAllUsers();
      } else {
        toast.error("Error adding user");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // 📥 Get all users
  const getAllUsers = async () => {
    try {
      const result = await getAllUsersAPI({
        Authorization: `Bearer ${token}`
      });

      if (result.status === 200) {
        setAllUsers(result.data);
      }
    } catch (error) {
      toast.error("Failed to load users");
    }
  };

  // 🧑‍🏫 Get all trainers
  const getAllTrainers = async () => {
    try {
      const result = await getAllTrainerAPI({
        Authorization: `Bearer ${token}`
      });

      if (result.status === 200) {
        setAllTrainers(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ❌ Delete user
  const handleDeleteUser = async (id) => {
    try {
      const result = await deleteUserAPI(id, {
        Authorization: `Bearer ${token}`
      });

      if (result.status === 200) {
        toast.success("User deleted");
        getAllUsers();
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // 🔍 Filters
  const getUsersByStatus = (status) =>
    allUsers.filter((user) => user.status === status);

  const getRegisteredUsers = () =>
    getUsersByStatus("registered").filter((u) => u.role !== "admin");

  const getActiveMembers = () =>
    getUsersByStatus("active-member");

  const getTrainerDetails = (trainerId) => {
    const trainer = allTrainers.find((t) => t._id === trainerId);
    return trainer ? `${trainer.name} (${trainer.specialization})` : "Not Assigned";
  };

  // 🔐 Load token
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) setToken(storedToken);
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
        {/* Tabs */}
        <div className="flex justify-center gap-10 mb-10">
          <p
            onClick={() => setActiveTab("add")}
            className={`cursor-pointer ${
              activeTab === "add" ? "text-blue-500 border-b" : ""
            }`}
          >
            Add User
          </p>
          <p
            onClick={() => setActiveTab("view")}
            className={`cursor-pointer ${
              activeTab === "view" ? "text-blue-500 border-b" : ""
            }`}
          >
            View User
          </p>
        </div>

        {/* ➕ ADD USER */}
        {activeTab === "add" && (
          <>
            <h2 className="text-3xl font-bold mb-6">Add User</h2>

            <div className="bg-gray-900 p-6 rounded-xl">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  placeholder="Username"
                  className="p-3 bg-black border rounded"
                  value={userDetails.username}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, username: e.target.value })
                  }
                />

                <input
                  placeholder="Email"
                  className="p-3 bg-black border rounded"
                  value={userDetails.email}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, email: e.target.value })
                  }
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="p-3 bg-black border rounded"
                  value={userDetails.password}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, password: e.target.value })
                  }
                />

                <select
                  className="p-3 bg-black border rounded"
                  value={userDetails.assignedTrainer}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      assignedTrainer: e.target.value
                    })
                  }
                >
                  <option value="">Assign Trainer</option>
                  {allTrainers.map((trainer) => (
                    <option key={trainer._id} value={trainer._id}>
                      {trainer.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button onClick={reset} className="bg-yellow-700 px-5 py-2 rounded">
                  Reset
                </button>
                <button
                  onClick={handleAddUser}
                  className="bg-green-700 px-5 py-2 rounded"
                >
                  Add User
                </button>
              </div>
            </div>
          </>
        )}

        {/* 👁 VIEW USERS */}
        {activeTab === "view" && (
          <>
            <div className="flex justify-center gap-10 mb-8">
              <p onClick={() => setViewSubTab("registered")} className="cursor-pointer">
                Registered
              </p>
              <p onClick={() => setViewSubTab("approved")} className="cursor-pointer">
                Approved
              </p>
              <p onClick={() => setViewSubTab("active")} className="cursor-pointer">
                Active
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {(viewSubTab === "registered"
                ? getRegisteredUsers()
                : viewSubTab === "approved"
                ? getUsersByStatus("approved")
                : getActiveMembers()
              ).map((user) => (
                <div key={user._id} className="bg-gray-800 p-4 rounded">
                  <h3 className="text-xl">{user.username}</h3>
                  <p>Email: {user.email}</p>
                  <p>Trainer: {getTrainerDetails(user.assignedTrainer)}</p>

                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="mt-4 bg-red-600 p-2 rounded"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default AdminUser;
