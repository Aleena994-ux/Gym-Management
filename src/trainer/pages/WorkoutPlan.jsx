import React, { useState } from "react";
import TrainerSidebar from "../components/TrainerSidebar";

const WorkoutPlan = () => {
  const [view, setView] = useState(""); // "", "assign", "previous"

  return (
    <div className="flex bg-black text-white min-h-screen">
      <TrainerSidebar />

      <div className="p-10 w-full space-y-8">
        <h1 className="text-3xl font-bold">Trainer Plans Dashboard</h1>

        {/* Assigned Plans Table */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-md overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-4">Assigned Plans</h2>
          <table className="min-w-full table-auto text-white">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Plan Type</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700 hover:bg-gray-800">
                <td className="px-4 py-2">Jane Smith</td>
                <td className="px-4 py-2">Workout + Diet</td>
                <td className="px-4 py-2">Active</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg"
                    onClick={() => setView("assign")}
                  >
                    Assign Plan
                  </button>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg"
                    onClick={() => setView("previous")}
                  >
                    Previously Assigned Plans
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Conditional Render: Assign Plan Form */}
        {view === "assign" && (
          <div className="bg-gray-900 p-6 rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-semibold">Assign New Plan to Jane Smith</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select className="p-3 rounded-lg bg-gray-800 text-white">
                <option>Plan Type</option>
                <option>Workout Only</option>
                <option>Diet Only</option>
                <option>Workout + Diet</option>
              </select>
              <button className="bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold">
                Assign
              </button>
              <button
                className="bg-gray-600 hover:bg-gray-700 py-3 rounded-lg font-bold"
                onClick={() => setView("")}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Conditional Render: Previously Assigned Plan Details */}
        {view === "previous" && (
          <div className="bg-gray-900 p-6 rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-semibold">Previously Assigned Plan for Jane Smith</h2>
            
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

            <button
              className="bg-gray-600 hover:bg-gray-700 py-2 px-4 rounded-lg font-bold"
              onClick={() => setView("")}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutPlan;
