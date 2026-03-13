import React from "react";

const ConversationList = ({ conversations, onSelect }) => {
  return (
    <div className="w-1/3 bg-white border-r overflow-y-auto">

      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Messages</h2>
      </div>

      {conversations.map((conv) => (
        <div
          key={conv.id}
          onClick={() => onSelect(conv)}
          className="p-4 border-b hover:bg-gray-50 cursor-pointer transition"
        >
          <div className="flex items-center gap-3">

            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
              {conv.name.charAt(0)}
            </div>

            <div>
              <p className="font-medium">{conv.name}</p>
              <p className="text-sm text-gray-500">
                {conv.lastMessage}
              </p>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;