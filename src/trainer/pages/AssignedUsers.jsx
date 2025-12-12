import React from "react";
import TrainerSidebar from "../components/TrainerSidebar";

export default function AssignedUsers() {
  return (
    <div className="flex bg-black text-white min-h-screen">
      <TrainerSidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-4">Assigned Users</h1>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold mb-4">Users Assigned to You</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-300">
                  <th className="p-3">User</th>
                  <th className="p-3">Time Slot</th>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Contact</th>
                </tr>
              </thead>

              <tbody>
                {/* Static row - replace later with dynamic data */}
                <tr className="border-b border-gray-800">
                  <td className="p-3">Akhil</td>
                  <td className="p-3">6 AM - 7 AM</td>
                  <td className="p-3">Standard</td>
                  <td className="p-3">akil@gmail.com</td>
                  <td className="p-3 flex gap-2">

                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}
