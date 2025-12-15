import React, { useEffect, useState } from 'react';
import UserSidebar from "../components/UserSidebar";
import { toast } from 'react-toastify';
import { getUserWorkoutPlansAPI } from '../../services/allAPI';

function UserWorkoutPlan() {
  const [plans, setPlans] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const getUserPlans = async () => {
    try {
      const result = await getUserWorkoutPlansAPI({ Authorization: `Bearer ${token}` });
      if (result.status === 200) {
        setPlans(result.data);
      }
    } catch (error) {
      toast.error("Failed to load plans");
    }
  };

  useEffect(() => {
    if (token) getUserPlans();
  }, [token]);

  return (
    <div className="flex bg-black min-h-screen text-white">
      <UserSidebar />

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">My Workout Plans</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {plans.length > 0 ? (
            plans.map((plan) => (
              <div key={plan._id} className="bg-gray-900 p-5 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold">Plan: {plan.planType}</h3>
                <p className="text-gray-400">Assigned By: {plan.assignedBy?.name}</p>
                <p className="mt-2">{plan.workoutDetails}</p>
                <p className="mt-2">{plan.dietDetails}</p>
              </div>
            ))
          ) : (
            <p>No workout plans assigned yet.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default UserWorkoutPlan;