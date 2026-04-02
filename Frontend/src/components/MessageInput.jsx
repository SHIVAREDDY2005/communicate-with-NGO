import React from "react";

const MessageInput = ({
  message,
  setMessage,
  sendMessage,
  socketConnected = true,
  canCompose = true,
  onTyping,
  onStopTyping,
}) => {
  const handleKey = (event) => {
    if (event.key === "Enter" && !event.shiftKey && canCompose) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <footer
      style={{
        padding: "12px 14px",
        borderTop: "1px solid #d7d7d7",
        background: "#f7f7f7",
      }}
    >
      {!socketConnected && (
        <div
          style={{
            marginBottom: "10px",
            border: "1px solid #bfbfbf",
            borderRadius: "10px",
            padding: "7px 10px",
            background: "#ececec",
            fontSize: "12px",
            color: "#595959",
          }}
        >
          Live socket disconnected. Sending in fallback mode.
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 44px", gap: "8px" }}>
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKey}
          onFocus={() => {
            if (socketConnected && onTyping) {
              onTyping();
            }
          }}
          onBlur={() => {
            if (socketConnected && onStopTyping) {
              onStopTyping();
            }
          }}
          placeholder={canCompose ? "Write a message" : "Select a conversation first"}
          disabled={!canCompose}
          style={{
            width: "100%",
            height: "44px",
            borderRadius: "12px",
            border: "1px solid #cfcfcf",
            background: canCompose ? "#fff" : "#f0f0f0",
            padding: "0 14px",
            fontSize: "14px",
            color: "#111",
            outline: "none",
            opacity: canCompose ? 1 : 0.65,
          }}
        />

        <button
          type="button"
          onClick={sendMessage}
          disabled={!canCompose || !message.trim()}
          title={canCompose ? "Send" : "Select conversation first"}
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            border: "1px solid #111",
            background: canCompose && message.trim() ? "#111" : "#e0e0e0",
            color: canCompose && message.trim() ? "#fff" : "#898989",
            cursor: canCompose && message.trim() ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <line x1="22" y1="2" x2="11" y2="13" strokeLinecap="round" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default MessageInput;
