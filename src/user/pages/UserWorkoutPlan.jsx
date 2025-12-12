import React, { useState } from "react";
import UserSidebar from "../components/UserSidebar";

const UserWorkoutPlan = () => {
  const [viewPlan, setViewPlan] = useState(false);

  return (
    <div className="flex bg-black text-white min-h-screen">
      <UserSidebar />

      <div className="p-10 w-full space-y-8">
        <h1 className="text-3xl font-bold">My Workout & Diet Plans</h1>

        {/* Assigned Plans Table */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-md overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-4">Assigned Plans</h2>
          <table className="min-w-full table-auto text-white">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-4 py-2 text-left">Plan Type</th>
                <th className="px-4 py-2 text-left">Date Assigned</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700 hover:bg-gray-800">
                <td className="px-4 py-2">Workout + Diet</td>
                <td className="px-4 py-2">22 Nov 2025</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg"
                    onClick={() => setViewPlan(true)}
                  >
                    View Plan
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg">
                    Download PDF
                  </button>
                </td>
              </tr>

              <tr className="border-b border-gray-700 hover:bg-gray-800">
                <td className="px-4 py-2">Workout Only</td>
                <td className="px-4 py-2">20 Nov 2025</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg"
                    onClick={() => setViewPlan(true)}
                  >
                    View Plan
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg">
                    Download PDF
                  </button>
                </td>
              </tr>

              <tr className="border-b border-gray-700 hover:bg-gray-800">
                <td className="px-4 py-2">Diet Only</td>
                <td className="px-4 py-2">21 Nov 2025</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg"
                    onClick={() => setViewPlan(true)}
                  >
                    View Plan
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg">
                    Download PDF
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* View Plan Details */}
        {viewPlan && (
          <div className="bg-gray-900 p-6 rounded-xl shadow-md space-y-4 mt-6">
            <h2 className="text-2xl font-semibold">My Assigned Plan</h2>

            {/* Workout Plan */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Workout Plan</h3>
              <p>Bench Press - 3x12 - Rest 60s</p>
              <p>Squats - 4x10 - Rest 90s</p>
              <p>Pull-Ups - 3x8 - Rest 60s</p>
            </div>

            {/* Diet Plan */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Diet Plan</h3>
              <p>Breakfast: Oats with protein shake</p>
              <p>Lunch: Grilled chicken with brown rice</p>
              <p>Snacks: Nuts and fruits</p>
              <p>Dinner: Salmon with steamed veggies</p>
            </div>

            <div className="flex space-x-4 mt-4">
              <button
                className="bg-gray-600 hover:bg-gray-700 py-2 px-4 rounded-lg font-bold"
                onClick={() => setViewPlan(false)}
              >
                Close
              </button>
              <button className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg font-bold">
                Download PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserWorkoutPlan;
