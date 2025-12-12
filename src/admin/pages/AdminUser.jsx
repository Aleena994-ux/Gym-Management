import React, { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { toast } from 'react-toastify';
import { getAllRequestsAPI, approveRequestAPI, rejectRequestAPI, getAllTrainerAPI } from '../../services/allAPI';

function AdminUser() {
  const [token, setToken] = useState("");
  const [allRequests, setAllRequests] = useState([]);
  const [allTrainers, setAllTrainers] = useState([]);

  // Fetch all requests
  const getAllRequests = async () => {
    try {
      const reqHeader = { "Authorization": `Bearer ${token}` };
      const result = await getAllRequestsAPI(reqHeader);
      console.log(result);
      if (result.status === 200) {
        setAllRequests(result.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load requests");
    }
  };

  // Fetch all trainers
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

  // Approve request
  const approveRequest = async (id) => {
    console.log(id);
    try {
      const reqHeader = { "Authorization": `Bearer ${token}` };
      const result = await approveRequestAPI(id, reqHeader);
      console.log(result);
      if (result.status === 200) {
        toast.success("Request approved!");
        getAllRequests(); // Refresh list
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to approve request");
    }
  };

  // Reject request
  const rejectRequest = async (id) => {
    console.log(id);
    try {
      const reqHeader = { "Authorization": `Bearer ${token}` };
      const result = await rejectRequestAPI(id, reqHeader);
      console.log(result);
      if (result.status === 200) {
        toast.success("Request rejected!");
        getAllRequests(); // Refresh list
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to reject request");
    }
  };

  // Helper to get trainer name by ID
  const getTrainerDetails = (trainerId) => {
    const trainer = allTrainers.find(t => t._id === trainerId);
    return trainer ? `${trainer.name} (${trainer.specialization})` : "Unknown Trainer";
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (token) {
      getAllRequests();
      getAllTrainers();
    }
  }, [token]);

  return (
    <div className="flex bg-black min-h-screen text-white">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <h1 className="text-center text-3xl font-bold mb-8">User Requests</h1>

        {/* Request List */}
        <div className="md:grid grid-cols-3 w-full my-5">
          {allRequests?.length > 0 ? (
            allRequests.map((request, index) => (
              <div key={index} className="shadow rounded p-4 m-4 bg-gray-800">
                <p className="text-white font-bold">User: {request?.userName}</p>
                <p className="text-gray-300">Time Slot: {request?.timeSlot}</p>
                <p className="text-gray-300">Goal: {request?.bodyTypeGoal}</p>
                <p className="text-gray-300">Trainer: {getTrainerDetails(request?.preferredTrainer)}</p>
                <p className="text-gray-300">Plan: {request?.plan}</p>
                <p className="text-gray-300">Duration: {request?.duration}</p>
                <p className="text-gray-300">Status: {request?.status}</p>

                {request?.status === "pending" && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => approveRequest(request?._id)}
                      className="w-full p-2 rounded bg-green-700 text-white hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectRequest(request?._id)}
                      className="w-full p-2 rounded bg-red-700 text-white hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}

                {request?.status === "approved" && (
                  <div className="w-full flex justify-end mt-3">
                    <img
                      src="https://media.istockphoto.com/id/496603666/vector/flat-icon-check.jpg?s=612x612&w=0&k=20&c=BMYf-7moOtevP8t46IjHHbxJ4x4I0ZoFReIp9ApXBqU="
                      style={{ width: "50px", borderRadius: "50%" }}
                      alt="Approved"
                    />
                  </div>
                )}

                {request?.status === "rejected" && (
                  <div className="w-full flex justify-end mt-3">
                    <img
                      src="https://img.icons8.com/color/48/cancel.png" // Added rejected image (red X icon)
                      style={{ width: "50px", borderRadius: "50%" }}
                      alt="Rejected"
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-red-700 font-semibold text-center mt-10 text-xl">
              No requests available...
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminUser;