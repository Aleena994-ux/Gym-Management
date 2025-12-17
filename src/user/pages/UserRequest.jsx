import React, { useEffect, useState } from "react";
import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";
import { toast } from "react-toastify";
import { getAllTrainerAPI, submitRequestAPI } from "../../services/allAPI";
import { useNavigate } from "react-router-dom";

function UserRequest() {
  const navigate = useNavigate();

  const [requestDetails, setRequestDetails] = useState({
    userName: "",
    timeSlot: "",
    bodyTypeGoal: "",
    preferredTrainer: ""
 
  });

  const [allTrainers, setAllTrainers] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔐 Check login & load trainers
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.info("Please login to send enquiry");
      navigate("/login");
      return; 

    } else {
      const user = JSON.parse(sessionStorage.getItem("existingUser"));
      if (user) {
        setRequestDetails(prev => ({
          ...prev,
          userName: user.username
        }));
      }
      getAllTrainers();
    }
  }, []);

  // Fetch all trainers
  const getAllTrainers = async () => {
    setLoading(true);
    try {
      const result = await getAllTrainerAPI();
      if (result.status === 200) {
        setAllTrainers(result.data);
      } else {
        toast.error("Failed to load trainers");
      }
    } catch (error) {
      toast.error("Trainer fetch failed");
    } finally {
      setLoading(false);
    }
  };

  // Submit enquiry
  const handleSubmitRequest = async () => {
    const { timeSlot, bodyTypeGoal, preferredTrainer} = requestDetails;

    if (!timeSlot || !bodyTypeGoal || !preferredTrainer ) {
      toast.info("Fill the form completely");
      return;
    }

    const token = sessionStorage.getItem("token");

    const reqHeader = {
      Authorization: `Bearer ${token}`
    };

    try {
      const result = await submitRequestAPI(requestDetails, reqHeader);

      if (result.status === 200) {
        toast.success("Enquiry sent. Please wait for admin approval");
              } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Request failed");
    }
  };

  return (
    <>
      <Header />
      <div className="flex bg-black min-h-screen text-white">
        <main className="flex-1 p-10">

          <h2 className="text-3xl font-bold mb-2">Membership Enquiry</h2>
          <p className="text-gray-400 mb-8">Fill the form and wait for admin approval</p>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <form className="grid md:grid-cols-2 gap-6">

              {/* Username (Auto-filled) */}
              <div>
                <label className="block text-gray-300 mb-2">User Name</label>
                <input
                  type="text"
                  value={requestDetails.userName}
                  disabled
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white cursor-not-allowed"
                />
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-gray-300 mb-2">Time Slot</label>
                <select
                  value={requestDetails.timeSlot}
                  onChange={(e) =>
                    setRequestDetails({ ...requestDetails, timeSlot: e.target.value })
                  }
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                >
                  <option value="">Select time slot</option>
                  <option value="6 AM - 7 AM">6 AM - 7 AM</option>
                  <option value="7 AM - 8 AM">7 AM - 8 AM</option>
                  <option value="5 PM - 6 PM">5 PM - 6 PM</option>
                </select>
              </div>

              {/* Body Goal */}
              <div>
                <label className="block text-gray-300 mb-2">Body Goal</label>
                <select
                  value={requestDetails.bodyTypeGoal}
                  onChange={(e) =>
                    setRequestDetails({ ...requestDetails, bodyTypeGoal: e.target.value })
                  }
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                >
                  <option value="">Select goal</option>
                  <option value="Fat Loss">Fat Loss</option>
                  <option value="Muscle Gain">Muscle Gain</option>
                  <option value="Body Recomposition">Body Recomposition</option>
                </select>
              </div>

              {/* Trainer */}
              <div>
                <label className="block text-gray-300 mb-2">Preferred Trainer</label>
                <select
                  value={requestDetails.preferredTrainer}
                  onChange={(e) =>
                    setRequestDetails({ ...requestDetails, preferredTrainer: e.target.value })
                  }
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                >
                  <option value="">Select trainer</option>
                  {loading ? (
                    <option>Loading...</option>
                  ) : (
                    allTrainers.map(trainer => (
                      <option key={trainer._id} value={trainer._id}>
                        {trainer.name}
                      </option>
                    ))
                  )}
                </select>
              </div>


            </form>

            <button
              onClick={handleSubmitRequest}
              className="mt-6 bg-red-800 px-8 py-3 rounded-lg font-semibold hover:bg-red-900"
            >
              Send Enquiry
            </button>
          </div>

        </main>
      </div>
      <Footer />
    </>
  );
}

export default UserRequest;
