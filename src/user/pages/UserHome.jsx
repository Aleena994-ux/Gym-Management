import React from "react";
import UserSidebar from "../components/UserSidebar";

export default function UserHome() {
  return (
    <div className="flex bg-black min-h-screen text-white">

      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <main className="flex-1 p-10">

        {/* Page Title */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-2">Welcome Back 👋</h2>
        </div>

        {/* 3 Stats Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">

          {/* Membership */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-lg font-semibold mb-3">Membership</h3>
            <p className="text-2xl font-bold text-red-900">Basic</p>
            <p className="text-gray-400 mt-2 text-sm">Active</p>
          </div>

          {/* Trainer */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-lg font-semibold mb-3">Trainer</h3>
            <p className="text-2xl font-bold text-red-900">Rahul</p>
            <p className="text-gray-400 mt-2 text-sm">Strength Coach</p>
          </div>

          {/* Days Left */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-lg font-semibold mb-3">Days Left</h3>
            <p className="text-3xl font-bold text-red-900">22 Days</p>
          </div>

        </div>

        {/* Membership Details Box */}
        <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 mb-10">
          <h3 className="text-xl font-semibold mb-6">Membership Details</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400">Start Date</p>
              <p className="text-lg font-semibold">1 Nov 2025</p>
            </div>

            <div>
              <p className="text-gray-400">End Date</p>
              <p className="text-lg font-semibold">1 Dec 2025</p>
            </div>

            <div>
              <p className="text-gray-400">Amount Paid</p>
              <p className="text-lg font-semibold">₹ 999</p>
            </div>

            <div>
              <p className="text-gray-400">Payment Status</p>
              <p className="text-green-400 font-semibold">Paid</p>
            </div>
          </div>

          <button className="mt-6 bg-red-900 px-5 py-2 rounded-lg hover:bg-red-700">
            Renew Membership
          </button>
        </div>

        {/* Trainer Summary Box */}
        <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 mb-10">
          <h3 className="text-xl font-semibold mb-6">Your Trainer</h3>

          <p className="text-lg font-bold">Rahul</p>
          <p className="text-gray-400">Experience: 5 years</p>
          <p className="text-gray-400">Email: rahul@gmail.com</p>
        </div>

        {/* Payment History */}
        <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
          <h3 className="text-xl font-semibold mb-6">Recent Payments</h3>
<table className="w-full text-left border-collapse">
  <thead>
    <tr className="border-b border-gray-700 text-gray-300">
      <th className="p-3">Plan</th>
      <th className="p-3">Date</th>
      <th className="p-3">Amount</th>
      <th className="p-3">Status</th>
      <th className="p-3">Action</th>
    </tr>
  </thead>

  <tbody>
    <tr className="border-b border-gray-800">
      <td className="p-3">Monthly</td>
      <td className="p-3">1 Nov 2025</td>
      <td className="p-3">₹999</td>
      <td className="p-3 text-green-400 font-semibold">Paid</td>
      <td className="p-3">
        <button className="text-white  hover:bg-red-900 px-3 py-1 rounded">
          Download Receipt
        </button>
      </td>
    </tr>
  </tbody>
</table>

        </div>

      </main>
    </div>
  );
}
