import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  assignWorkoutPlanAPI,
  getAllWorkoutPlansAPI,
  getAllUsersForTrainerAPI,
} from "../../services/allAPI";
import TrainerSidebar from "../components/TrainerSidebar";

function WorkoutPlan() {
  const [token, setToken] = useState("");
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [viewAssign, setViewAssign] = useState(true);

  const [planDetails, setPlanDetails] = useState({
    userId: "",
    planType: "",
    workoutDetails: "",
    dietDetails: "",
  });

  // Get token from session
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  // Fetch all active users assigned to this trainer
  const getAllUsers = async () => {
    if (!token) return;

    try {
      const result = await getAllUsersForTrainerAPI({
        Authorization: `Bearer ${token}`,
      });

      if (result.status === 200) {
        setUsers(result.data); // active members only already filtered on backend
      }
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  // Fetch all workout plans (plain, no populate)
  const getAllPlans = async () => {
    if (!token) return;

    try {
      const result = await getAllWorkoutPlansAPI({
        Authorization: `Bearer ${token}`,
      });

      if (result.status === 200) {
        setPlans(result.data);
      }
    } catch (error) {
      toast.error("Failed to fetch workout plans");
    }
  };

  useEffect(() => {
    if (token) {
      getAllUsers();
      getAllPlans();
    }
  }, [token]);

  // Assign plan to user
  const handleAssignPlan = async () => {
    const { userId, planType, workoutDetails, dietDetails } = planDetails;

    if (!userId || !planType || !workoutDetails || !dietDetails) {
      toast.info("Fill all fields");
      return;
    }

    try {
      const result = await assignWorkoutPlanAPI(planDetails, {
        Authorization: `Bearer ${token}`,
      });

      if (result.status === 200) {
        toast.success("Workout plan assigned");
        setPlanDetails({
          userId: "",
          planType: "",
          workoutDetails: "",
          dietDetails: "",
        });
        getAllPlans(); // refresh plans
      } else {
        toast.error("Failed to assign plan");
      }
    } catch (error) {
      toast.error("Error assigning plan");
    }
  };

  return (
    <div className="flex bg-black min-h-screen text-white">
      <TrainerSidebar />

      <main className="flex-1 p-10">
        {/* Tabs */}
        <div className="flex gap-6 mb-8">
          <button
            onClick={() => setViewAssign(true)}
            className={`px-6 py-2 rounded ${
              viewAssign ? "bg-red-700" : "bg-gray-700"
            }`}
          >
            Assign Plan
          </button>
          <button
            onClick={() => setViewAssign(false)}
            className={`px-6 py-2 rounded ${
              !viewAssign ? "bg-red-700" : "bg-gray-700"
            }`}
          >
            View Plans
          </button>
        </div>

        {/* ASSIGN PLAN */}
        {viewAssign && (
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h2 className="text-2xl font-bold mb-6">Assign Workout Plan</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <select
                value={planDetails.userId}
                onChange={(e) =>
                  setPlanDetails({ ...planDetails, userId: e.target.value })
                }
                className="p-3 bg-black border border-gray-700 rounded"
              >
                <option value="">Select User</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.username}
                  </option>
                ))}
              </select>

              <select
                value={planDetails.planType}
                onChange={(e) =>
                  setPlanDetails({ ...planDetails, planType: e.target.value })
                }
                className="p-3 bg-black border border-gray-700 rounded"
              >
                <option value="">Plan Type</option>
                <option value="Workout">Workout</option>
                <option value="Diet">Diet</option>
                <option value="Workout + Diet">Workout + Diet</option>
              </select>

              <textarea
                placeholder="Workout Details"
                value={planDetails.workoutDetails}
                onChange={(e) =>
                  setPlanDetails({
                    ...planDetails,
                    workoutDetails: e.target.value,
                  })
                }
                className="p-3 bg-black border border-gray-700 rounded col-span-2"
              />

              <textarea
                placeholder="Diet Details"
                value={planDetails.dietDetails}
                onChange={(e) =>
                  setPlanDetails({
                    ...planDetails,
                    dietDetails: e.target.value,
                  })
                }
                className="p-3 bg-black border border-gray-700 rounded col-span-2"
              />
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleAssignPlan}
                className="bg-green-700 px-6 py-3 rounded hover:bg-green-600"
              >
                Assign Plan
              </button>
            </div>
          </div>
        )}

        {/* VIEW PLANS */}
        {!viewAssign && (
          <div className="grid md:grid-cols-2 gap-6">
            {plans.length > 0 ? (
              plans.map((plan) => {
                const user = users.find((u) => u._id === plan.userId); // match userId
                return (
                  <div
                    key={plan._id}
                    className="bg-gray-900 p-5 rounded-lg border border-gray-800"
                  >
                    <h3 className="text-xl font-bold">
                      {user?.username || "Unknown"}
                    </h3>
                    <p className="text-gray-400">Plan: {plan.planType}</p>
                    <p className="mt-2">{plan.workoutDetails}</p>
                    <p className="mt-2">{plan.dietDetails}</p>
                  </div>
                );
              })
            ) : (
              <p>No workout plans found</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default WorkoutPlan;
