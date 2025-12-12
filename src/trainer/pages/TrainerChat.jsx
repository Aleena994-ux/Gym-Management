import React from "react";
import TrainerSidebar from "../components/TrainerSidebar";

export default function TrainerChat() {
  return (
    <div className="flex bg-black text-white min-h-screen">
      {/* Main Sidebar */}
      <TrainerSidebar />

      {/* Chat Area */}
      <main className="flex-1 p-10 flex">
        {/* User List Sidebar */}
        <div className="w-1/4 border-r border-gray-800 p-4 space-y-4">
          <h2 className="text-2xl font-bold mb-4">Users</h2>
          <div className="p-3 bg-gray-800 rounded-lg cursor-pointer">Aliina</div>
          <div className="p-3 bg-gray-900 rounded-lg cursor-pointer">John</div>
          <div className="p-3 bg-gray-900 rounded-lg cursor-pointer">Sara</div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col ml-6">
          {/* Header */}
          <div className="border-b border-gray-800 pb-4 mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold">Chat with Aliina</h3>
          </div>


          {/* Input Area */}
          <div className="flex gap-3">
            <input
              className="flex-1 p-3 bg-black border border-gray-700 rounded-lg"
              placeholder="Type a message..."
            />
            <button className="bg-red-800 px-6 rounded-lg hover:bg-red-900">Send</button>
          </div>
        </div>
      </main>
    </div>
  );
}
