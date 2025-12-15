import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { toast } from 'react-toastify';
import { getAllAttendancesAPI, markAttendanceAPI, getAllUsersAPI } from '../../services/allAPI';

function AdminAttendance() {
  const [token, setToken] = useState("");
  const [allAttendances, setAllAttendances] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [attendanceDetails, setAttendanceDetails] = useState({
    userId: "",
    date: "",
    status: "present"
  });

  // Get all attendances (with population)
  const getAllAttendances = async () => {
    try {
      const reqHeader = { "Authorization": `Bearer ${token}` };
      const result = await getAllAttendancesAPI(reqHeader);
      console.log(result);
      if (result.status === 200) {
        setAllAttendances(result.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load attendances");
    }
  };

  // Get all users
  const getAllUsers = async () => {
    try {
      const reqHeader = { "Authorization": `Bearer ${token}` };
      const result = await getAllUsersAPI(reqHeader);
      if (result.status === 200) {
        setAllUsers(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Mark attendance
  const handleMarkAttendance = async () => {
    const { userId, date, status } = attendanceDetails;
    if (!userId || !date || !status) {
      toast.info("Fill the form completely");
      return;
    }

    try {
      const reqHeader = { "Authorization": `Bearer ${token}` };
      const result = await markAttendanceAPI(attendanceDetails, reqHeader);
      console.log(result);
      if (result.status === 200) {
        toast.success("Attendance marked successfully!");
        setAttendanceDetails({ userId: "", date: "", status: "present" });
        getAllAttendances();
      } else {
        toast.error(result?.data || "Error marking attendance");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (token) {
      getAllAttendances();
      getAllUsers();
    }
  }, [token]);

  return (
    <div className="flex bg-black min-h-screen text-white">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <h1 className="text-center text-3xl font-bold mb-8">Admin Attendance</h1>

        {/* Mark Attendance Form */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-10">
          <h2 className="text-2xl font-bold mb-6">Mark Attendance</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">User</label>
              <select
                value={attendanceDetails.userId}
                onChange={(e) =>
                  setAttendanceDetails({ ...attendanceDetails, userId: e.target.value })
                }
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
              >
                <option value="">Select User</option>
                {allUsers.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Date</label>
              <input
                type="date"
                value={attendanceDetails.date}
                onChange={(e) =>
                  setAttendanceDetails({ ...attendanceDetails, date: e.target.value })
                }
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Status</label>
              <select
                value={attendanceDetails.status}
                onChange={(e) =>
                  setAttendanceDetails({ ...attendanceDetails, status: e.target.value })
                }
                className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={handleMarkAttendance}
              className="bg-green-700 text-white rounded px-5 py-3 hover:border hover:border-green-700 hover:text-green-700 hover:bg-white"
            >
              Mark Attendance
            </button>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-gray-900 rounded-lg border border-gray-800">
            <thead>
              <tr className="bg-gray-800 text-gray-300">
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Marked By</th>
              </tr>
            </thead>
            <tbody>
              {allAttendances?.length > 0 ? (
                allAttendances.map((attendance, index) => (
                  <tr key={attendance._id || index} className="border-t border-gray-700 hover:bg-gray-800">
                    <td className="px-4 py-3 text-white">
                      {attendance?.userId?.username || "Unknown"}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {attendance?.date ? new Date(attendance.date).toLocaleDateString() : "Invalid Date"}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {attendance?.status || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {attendance?.markedBy || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-3 text-center text-red-700 font-semibold">
                    No attendances available...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default AdminAttendance;