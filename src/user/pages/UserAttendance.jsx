import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getUserAttendancesAPI } from '../../services/allAPI';
import UserSidebar from '../components/UserSidebar';

function UserAttendance() {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userAttendances, setUserAttendances] = useState([]);

  // Get user attendances
  const getUserAttendances = async () => {
    try {
      const reqHeader = { "Authorization": `Bearer ${token}` };
      const result = await getUserAttendancesAPI(userId, reqHeader);
      console.log("API Result:", result);
      if (result.status === 200) {
        console.log("Data received:", result.data);
        setUserAttendances(result.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load your attendances");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
      // Decode token to get userId
      const decoded = JSON.parse(atob(sessionStorage.getItem("token").split('.')[1]));
      setUserId(decoded.userId);
    }
  }, []);

  useEffect(() => {
    if (token && userId) {
      getUserAttendances();
    }
  }, [token, userId]);

  console.log("Rendering UserAttendance, userAttendances:", userAttendances);

  return (
    <div className="flex bg-black min-h-screen text-white">
      <UserSidebar/>
      <main className="flex-1 p-10">
        <h1 className="text-center text-3xl font-bold mb-8">My Attendance</h1>

        {/* Attendance List */}
        <div className="md:grid grid-cols-3 w-full my-5">
          {userAttendances && userAttendances.length > 0 ? (
            userAttendances.map((attendance, index) => (
              <div key={attendance._id || index} className="shadow rounded p-4 m-4 bg-gray-800">
                <p className="text-white font-bold">Date: {attendance?.date ? new Date(attendance.date).toLocaleDateString() : "Invalid Date"}</p>
                <p className="text-gray-300">Status: {attendance?.status || "N/A"}</p>
                <p className="text-gray-300">Marked By: {attendance?.markedBy || "N/A"}</p>
              </div>
            ))
          ) : (
            <p className="text-red-700 font-semibold text-center mt-10 text-xl">
              No attendance records...
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default UserAttendance;