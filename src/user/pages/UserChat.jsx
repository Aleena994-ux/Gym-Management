import React from "react";
import UserSidebar from "../components/UserSidebar";

function UserChat() {
  return (
    <>
      <div className="flex bg-black min-h-screen text-white">
        {/* Sidebar */}
        <UserSidebar />

        {/* Main Content */}
        <main className="flex-1 p-10">
          {/* Title */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">Chat With Trainer</h2>
            <p className="text-gray-400 text-sm">
              Ask any doubts about your workout, diet, or plan.
            </p>
          </div>

          {/* Chat Container */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex flex-col h-[70vh]">
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">


              {/* User Message */}
              <div className="flex justify-end">
                <div className="bg-red-900 p-3 rounded-lg max-w-xs border border-red-900">
                  <p className="text-sm">I have doubt in today's workout plan.</p>
                </div>
              </div>

            </div>

            {/* Input Box */}
            <div className="mt-4 flex gap-3">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-black border border-gray-700 p-3 rounded-lg outline-none text-white"
              />
              <button className="bg-red-900 px-6 py-3 rounded-lg font-semibold hover:bg-red-700">
                Send
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default UserChat;
