import React, { useState, useEffect } from "react";
import Header from "../../common/components/Header";
import Footer from "../../common/components/Footer";
import { toast } from "react-toastify";
import { getAllTrainerAPI, submitRequestAPI } from "../../services/allAPI";

function UserRequest() {
  const [requestDetails, setRequestDetails] = useState({
    userName: "",
    timeSlot: "",
    bodyTypeGoal: "",
    preferredTrainer: "",
    plan: "",
    duration: ""
  });
  const [allTrainers, setAllTrainers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all trainers (public access)
  const getAllTrainers = async () => {
    setLoading(true);
    try {
      const result = await getAllTrainerAPI();
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
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmitRequest = async () => {
    const { userName, timeSlot, bodyTypeGoal, preferredTrainer, plan, duration } = requestDetails;
    if (!userName || !timeSlot || !bodyTypeGoal || !preferredTrainer || !plan || !duration) {
      toast.info("Fill the form completely");
      return;
    }

    try {
      const result = await submitRequestAPI(requestDetails);
      if (result?.status === 200) {
        toast.success("Request sent successfully!");
        setRequestDetails({
          userName: "",
          timeSlot: "",
          bodyTypeGoal: "",
          preferredTrainer: "",
          plan: "",
          duration: ""
        });
      } else {
        toast.error(result?.data || "Error in sending request");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data || "Something went wrong");
    }
  };

  // Fetch trainers on component mount
  useEffect(() => {
    getAllTrainers();
  }, []);

  return (
    <>
      <Header />
      <div className="flex bg-black min-h-screen text-white">
        {/* Main Content */}
        <main className="flex-1 p-10">
          {/* Page Title */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">Membership inquiry</h2>
            <p className="text-gray-400 text-sm">
              Simply complete this form and we will get in touch.
            </p>
          </div>

          {/* Request Form */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <form className="grid md:grid-cols-2 gap-6">
              {/* User Name */}
              <div>
                <label className="block text-gray-300 mb-2">User Name</label>
                <input
                  type="text"
                  value={requestDetails.userName}
                  onChange={(e) =>
                    setRequestDetails({ ...requestDetails, userName: e.target.value })
                  }
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                  placeholder="Enter user name"
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

              {/* Body Type Goal */}
              <div>
                <label className="block text-gray-300 mb-2">Body Type Goal</label>
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

              {/* Preferred Trainer */}
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
                    allTrainers.map((trainer) => (
                      <option key={trainer._id} value={trainer._id}>
                        {trainer.name} ({trainer.specialization})
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Plan */}
              <div>
                <label className="block text-gray-300 mb-2">Plan</label>
                <select
                  value={requestDetails.plan}
                  onChange={(e) =>
                    setRequestDetails({ ...requestDetails, plan: e.target.value })
                  }
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                >
                  <option value="">Select plan</option>
                  <option value="Basic">Basic</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-gray-300 mb-2">Duration</label>
                <select
                  value={requestDetails.duration}
                  onChange={(e) =>
                    setRequestDetails({ ...requestDetails, duration: e.target.value })
                  }
                  className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                >
                  <option value="">Select duration</option>
                  <option value="Monthly">Monthly</option>
                  <option value="3 Months">3 Months</option>
                  <option value="6 Months">6 Months</option>
                </select>
              </div>
            </form>

            {/* Submit Button */}
            <button
              onClick={handleSubmitRequest}
              className="mt-6 bg-red-800 px-8 py-3 rounded-lg font-semibold hover:bg-red-900"
            >
              Send Request
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default UserRequest;