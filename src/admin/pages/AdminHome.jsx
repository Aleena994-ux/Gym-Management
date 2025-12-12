import React from "react";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminHome() {
  return (
    <div className="flex bg-black min-h-screen text-white">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-10">

        {/* Welcome Section */}
        <div className="bg-gray-900 rounded-xl p-8 mb-10 border border-gray-800">
          <h2 className="text-3xl font-bold mb-2">Welcome Back, Admin 👋</h2>
         
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-lg font-semibold mb-3">Total Members</h3>
            <p className="text-3xl font-bold text-red-800">49</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-lg font-semibold mb-3">Active Trainers</h3>
            <p className="text-3xl font-bold text-red-800">5</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-lg font-semibold mb-3">Revenue</h3>
            <p className="text-3xl font-bold text-red-800">₹ 85,000</p>
          </div>
        </div>

      </main>
    </div>
  );
}
