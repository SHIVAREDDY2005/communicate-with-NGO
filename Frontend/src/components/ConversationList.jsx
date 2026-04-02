import React from "react";

const avatarTone = (name = "") => {
  const tones = ["#111", "#303030", "#4b4b4b", "#5f5f5f", "#242424", "#3b3b3b"];
  const index = name ? name.charCodeAt(0) % tones.length : 0;
  return tones[index];
};

const timeAgo = (dateStr) => {
  if (!dateStr) {
    return "";
  }

  try {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "now";
    if (mins < 60) return `${mins}m`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;
    return new Date(dateStr).toLocaleDateString([], { month: "short", day: "numeric" });
  } catch {
    return "";
  }
};

const ConversationList = ({ conversations, onSelect, selectedId, loading }) => {
  return (
    <aside
      style={{
        width: "312px",
        minWidth: "312px",
        borderRight: "1px solid #d7d7d7",
        background: "#f3f3f3",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <header style={{ padding: "18px 16px 14px", borderBottom: "1px solid #dedede" }}>
        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700 }}>Conversations</h3>
        <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#6f6f6f" }}>
          {loading ? "Loading..." : `${conversations.length} contact${conversations.length !== 1 ? "s" : ""}`}
        </p>
      </header>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {loading ? (
          [1, 2, 3].map((idx) => (
            <div
              key={idx}
              style={{
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderBottom: "1px solid #ececec",
              }}
            >
              <div style={{ width: "40px", height: "40px", borderRadius: "11px", background: "#dedede" }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: "12px", borderRadius: "6px", background: "#dedede", marginBottom: "7px", width: "60%" }} />
                <div style={{ height: "10px", borderRadius: "6px", background: "#e8e8e8", width: "80%" }} />
              </div>
            </div>
          ))
        ) : conversations.length === 0 ? (
          <div style={{ textAlign: "center", padding: "44px 18px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                border: "1px solid #cecece",
                margin: "0 auto 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#666",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            <p style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>No conversations yet</p>
            <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#7e7e7e" }}>
              Conversations appear after an application is made
            </p>
          </div>
        ) : (
          conversations.map((conv) => {
            const isSelected = String(selectedId) === String(conv._id);
            const tone = avatarTone(conv.name || "U");

            return (
              <button
                key={conv._id}
                type="button"
                onClick={() => onSelect(conv)}
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: "1px solid #ececec",
                  background: isSelected ? "#111" : "transparent",
                  color: isSelected ? "#f7f7f7" : "#222",
                  textAlign: "left",
                  padding: "12px 16px",
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "11px",
                    background: tone,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {(conv.name || "?").charAt(0).toUpperCase()}
                </div>

                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        fontWeight: conv.unreadCount > 0 ? 700 : 600,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {conv.name}
                    </p>
                    {conv.lastMessageAt && (
                      <span style={{ fontSize: "11px", color: isSelected ? "#d0d0d0" : "#8b8b8b" }}>
                        {timeAgo(conv.lastMessageAt)}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", marginTop: "3px" }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "12px",
                        color: isSelected ? "#d9d9d9" : "#787878",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        flex: 1,
                      }}
                    >
                      {conv.lastMessage || "Start a conversation"}
                    </p>

                    {conv.unreadCount > 0 && (
                      <span
                        style={{
                          minWidth: "18px",
                          height: "18px",
                          borderRadius: "9px",
                          background: isSelected ? "#fff" : "#161616",
                          color: isSelected ? "#111" : "#fff",
                          fontSize: "10px",
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "0 5px",
                        }}
                      >
                        {conv.unreadCount > 99 ? "99+" : conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};

export default ConversationList;
