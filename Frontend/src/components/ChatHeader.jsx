import React from "react";

const avatarTone = (name = "") => {
  const tones = ["#111", "#303030", "#4b4b4b", "#5f5f5f", "#242424", "#3b3b3b"];
  const index = name ? name.charCodeAt(0) % tones.length : 0;
  return tones[index];
};

const ChatHeader = ({ user, isTyping }) => {
  if (!user?.name) {
    return (
      <div
        style={{
          minHeight: "76px",
          borderBottom: "1px solid #d9d9d9",
          background: "#f7f7f7",
          padding: "0 22px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <p style={{ margin: 0, fontSize: "14px", color: "#7e7e7e" }}>
          Select a conversation to start messaging.
        </p>
      </div>
    );
  }

  const tone = avatarTone(user.name);

  return (
    <header
      style={{
        minHeight: "76px",
        borderBottom: "1px solid #d9d9d9",
        background: "#f7f7f7",
        padding: "12px 22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "14px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: tone,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "15px",
            fontWeight: 700,
          }}
        >
          {user.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <p style={{ margin: 0, fontSize: "15px", fontWeight: 700 }}>{user.name}</p>
          <p style={{ margin: "2px 0 0", fontSize: "12px", color: isTyping ? "#202020" : "#7e7e7e" }}>
            {isTyping ? "typing..." : "online"}
          </p>
        </div>
      </div>

      {user.role && (
        <span
          style={{
            border: "1px solid #d0d0d0",
            borderRadius: "999px",
            padding: "5px 10px",
            fontSize: "11px",
            fontWeight: 700,
            color: "#565656",
            background: "#fff",
            textTransform: "uppercase",
            letterSpacing: "0.03em",
          }}
        >
          {user.role}
        </span>
      )}
    </header>
  );
};

export default ChatHeader;
