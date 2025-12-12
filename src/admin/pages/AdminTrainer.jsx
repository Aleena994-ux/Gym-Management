import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { toast } from "react-toastify";
import { addTrainerAPI, getAllTrainerAPI, deleteTrainerAPI } from "../../services/allAPI"; // Added deleteTrainerAPI
import { FaTrash } from 'react-icons/fa'; // Import trash icon

function AdminTrainer() {
  const [trainerDetails, setTrainerDetails] = useState({
    name: "",
    email: "",
    experience: "",
    specialization: ""
  });
  const [token, setToken] = useState("");
  const [allTrainers, setAllTrainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addTrainerStatus, setAddTrainerStatus] = useState(true); // For tab switching
  const [viewTrainerStatus, setViewTrainerStatus] = useState(false); // For tab switching

  // Reset form
  const reset = () => {
    setTrainerDetails({ name: "", email: "", experience: "", specialization: "" });
  };

  // Add trainer
  const handleAddTrainer = async () => {
    const { name, email, experience, specialization } = trainerDetails;
    if (!name || !email || !experience || !specialization) {
      toast.info("Fill the form completely");
      return;
    }

    try {
      // Make API call
      const result = await addTrainerAPI(
        { name, email, experience, specialization },
        { Authorization: `Bearer ${token}` }
      );

      // Check if the request was successful
      if (result?.status === 200) {
        toast.success("Trainer added successfully!");
        reset(); // Reset the form
        getAllTrainers(); // Refresh the list after adding
      } else {
        toast.error(result?.data || "Error in adding trainer");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data || "Something went wrong");
    }
  };

  // View all trainers
  const getAllTrainers = async () => {
    if (!token) return; // Safeguard: Ensure token is available
    setLoading(true); // Show loading
    try {
      const result = await getAllTrainerAPI({ Authorization: `Bearer ${token}` });
      console.log(result);
      if (result.status === 200) {
        setAllTrainers(result.data);
      } else {
        toast.error("Failed to load trainers");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch trainers");
    } finally {
      setLoading(false); // Hide loading
    }
  };

  // Delete trainer
  const handleDeleteTrainer = async (id) => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const result = await deleteTrainerAPI(id, reqHeader);
      console.log(result);
      if (result.status === 200) {
        toast.success("Trainer deleted successfully!");
        getAllTrainers(); // Refresh the list after deleting
      } else {
        toast.error("Failed to delete trainer");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting");
    }
  };

  // Get token from session
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Fetch trainers when token is set
  useEffect(() => {
    if (token) {
      getAllTrainers();
    }
  }, [token]);

  return (
    <div className="flex bg-black min-h-screen text-white">
      <AdminSidebar />

      <main className="flex-1 p-10">
        {/* Tab buttons for switching between Add and View */}
        <div className="flex justify-center items-center my-8 font-medium text-lg">
          <p
            onClick={() => {
              setAddTrainerStatus(true);
              setViewTrainerStatus(false);
            }}
            className={
              addTrainerStatus
                ? "text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer"
                : "p-4 border-b border-gray-200 cursor-pointer"
            }
          >
            Add Trainer
          </p>
          <p
            onClick={() => {
              setViewTrainerStatus(true);
              setAddTrainerStatus(false);
            }}
            className={
              viewTrainerStatus
                ? "text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer"
                : "p-4 border-b border-gray-200 cursor-pointer"
            }
          >
            View Trainers
          </p>
        </div>

        {/* Add Trainer Section */}
        {addTrainerStatus && (
          <>
            <h2 className="text-3xl font-bold mb-6">Add Trainer</h2>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Trainer Name</label>
                  <input
                    type="text"
                    value={trainerDetails.name}
                    onChange={(e) =>
                      setTrainerDetails({ ...trainerDetails, name: e.target.value })
                    }
                    className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                    placeholder="Enter trainer name"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={trainerDetails.email}
                    onChange={(e) =>
                      setTrainerDetails({ ...trainerDetails, email: e.target.value })
                    }
                    className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                    placeholder="Enter email"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Experience</label>
                  <input
                    type="number"
                    value={trainerDetails.experience}
                    onChange={(e) =>
                      setTrainerDetails({ ...trainerDetails, experience: e.target.value })
                    }
                    className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                    placeholder="Years of experience"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Specialization</label>
                  <select
                    value={trainerDetails.specialization}
                    onChange={(e) =>
                      setTrainerDetails({ ...trainerDetails, specialization: e.target.value })
                    }
                    className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                  >
                    <option value="">Select specialization</option>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Strength Training">Strength Training</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Nutrition">Nutrition</option>
                    <option value="General Fitness">General Fitness</option>
                  </select>
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
                  onClick={handleAddTrainer}
                  className="bg-green-700 text-white rounded px-5 py-3 hover:border hover:border-green-700 hover:text-green-700 hover:bg-white"
                >
                  Add Trainer
                </button>
              </div>
            </div>
          </>
        )}

        {/* View Trainers Section */}
        {viewTrainerStatus && (
          <>
            <h2 className="text-3xl font-bold mb-6">All Trainers</h2>
            <div >
              {loading ? (
                <p className="text-gray-300">Loading trainers...</p>
              ) : allTrainers.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allTrainers.map((trainer, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg shadow">
                      <h3 className="text-xl font-semibold">{trainer.name}</h3>
                      <p className="text-gray-300">Email: {trainer.email}</p>
                      <p className="text-gray-300">Experience: {trainer.experience} years</p>
                      <p className="text-gray-300">Specialization: {trainer.specialization}</p>
                      <div className="flex justify-end mt-4">
                        <button
                          onClick={() => handleDeleteTrainer(trainer._id)}
                          className="p-2 rounded bg-red-600 text-white hover:bg-gray-200 hover:text-red-600 hover:border hover:border-red-600"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-300">No trainers found.</p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default AdminTrainer;