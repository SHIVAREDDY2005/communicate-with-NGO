import React from "react";

const ChatHeader = ({ user }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b">

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">
          {user.name.charAt(0)}
        </div>

        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-green-500">Online</p>
        </div>

      </div>

    </div>
  );
};

export default ChatHeader;