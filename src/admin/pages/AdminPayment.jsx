import React from 'react'
import AdminSidebar from '../components/AdminSidebar'

function AdminPayment() {
  return (
    <div className="flex bg-black min-h-screen text-white">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-10">

        {/* Page Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-2">Payments Management</h2>
        </div>

        {/* Payments Table */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold mb-6">Payment History</h3>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700 text-gray-300">
                <th className="p-3">User</th>
                <th className="p-3">Plan</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Transaction ID</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b border-gray-800">
                <td className="p-3">Arjun</td>
                <td className="p-3">Monthly</td>
                <td className="p-3">₹999</td>
                <td className="p-3">12 Nov 2025</td>
                <td className="p-3 text-green-500">Paid</td>
                <td className="p-3">TXN3849201</td>
              </tr>

              <tr className="border-b border-gray-800">
                <td className="p-3">Sneha</td>
                <td className="p-3">Quarterly</td>
                <td className="p-3">₹2,499</td>
                <td className="p-3">11 Nov 2025</td>
                <td className="p-3 text-green-500">Paid</td>
                <td className="p-3">TXN3927492</td>
              </tr>

              <tr className="border-b border-gray-800">
                <td className="p-3">Vishnu</td>
                <td className="p-3">Yearly</td>
                <td className="p-3">₹7,999</td>
                <td className="p-3">10 Nov 2025</td>
                <td className="p-3 text-green-500">Paid</td>
                <td className="p-3">TXN4358273</td>
              </tr>

            </tbody>
          </table>
        </div>

      </main>
    </div>
  )
}

export default AdminPayment
