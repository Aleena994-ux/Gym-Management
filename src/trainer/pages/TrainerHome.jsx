import React from "react";
import TrainerSidebar from "../components/TrainerSidebar";

const TrainerHome = () => {
  return (
    <div className="flex bg-black text-white min-h-screen">
      <TrainerSidebar />

      <div className="p-10 w-full space-y-6">
        <h1 className="text-3xl font-bold">Welcome Trainer</h1>

        {/* Trainer Details Card */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Your Profile Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Name</p>
              <p className="text-lg font-bold">John Doe</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Specialization</p>
              <p className="text-lg font-bold">Weight Loss</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Experience</p>
              <p className="text-lg font-bold">4 Years</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Assigned Users</p>
              <p className="text-lg font-bold">12 Users</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default TrainerHome;
