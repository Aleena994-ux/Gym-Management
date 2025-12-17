import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllUsersForTrainerAPI } from "../../services/allAPI";
import TrainerSidebar from "../components/TrainerSidebar";

function AssignedUsers() {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const getAssignedUsers = async () => {
    try {
      const result = await getAllUsersForTrainerAPI({
        Authorization: `Bearer ${token}`,
      });

      if (result.status === 200) {
        setUsers(result.data);
      }
    } catch (error) {
      toast.error("Failed to fetch assigned users");
    }
  };

  useEffect(() => {
    if (token) {
      getAssignedUsers();
    }
  }, [token]);

  return (
    <div className="flex bg-black min-h-screen text-white">
      <TrainerSidebar />

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">My Assigned Users</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className="bg-gray-900 p-5 rounded-lg border border-gray-800"
              >
                <h3 className="text-xl font-bold">{user.username}</h3>
                <p className="text-gray-400">Email: {user.email}</p>
                <p className="text-gray-400">Status: {user.status}</p>
              </div>
            ))
          ) : (
            <p>No assigned users found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default AssignedUsers;
