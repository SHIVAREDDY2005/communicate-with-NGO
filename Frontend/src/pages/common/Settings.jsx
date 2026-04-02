import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";
import NGOSidebar from "../../layouts/NGOSidebar";

const readPrefs = () => {
  try {
    const raw = localStorage.getItem("ui_settings");
    if (!raw) {
      return {
        emailAlerts: true,
        inAppAlerts: true,
        compactMode: false,
      };
    }
    return JSON.parse(raw);
  } catch {
    return {
      emailAlerts: true,
      inAppAlerts: true,
      compactMode: false,
    };
  }
};

export default function SettingsPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role === "ngo" ? "ngo" : "volunteer";

  const [prefs, setPrefs] = useState(readPrefs);

  const profilePath = useMemo(
    () => (role === "ngo" ? "/ngo-profile" : "/volunteer-profile"),
    [role]
  );

  const dashboardPath = useMemo(
    () => (role === "ngo" ? "/ngo-dashboard" : "/volunteer-dashboard"),
    [role]
  );

  const setPreference = (key) => {
    setPrefs((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem("ui_settings", JSON.stringify(next));
      return next;
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      style={{
        background: "var(--aw-bg)",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      {role === "ngo" ? <NGOSidebar /> : <Sidebar />}

      <main
        style={{
          marginLeft: "var(--sidebar-width)",
          minHeight: "calc(100vh - var(--topbar-height))",
          padding: "22px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: "980px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <section
            style={{
              border: "1px solid #171717",
              borderRadius: "20px",
              background: "#f8f8f8",
              padding: "22px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color: "#666",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Settings
            </p>
            <h1 style={{ margin: "6px 0 0", fontSize: "34px", letterSpacing: "-0.02em" }}>
              Account & Preferences
            </h1>
            <p style={{ margin: "8px 0 0", color: "#666", fontSize: "14px" }}>
              Manage your profile access and app behavior for this workspace.
            </p>
          </section>

          <section
            style={{
              border: "1px solid #d4d4d4",
              borderRadius: "18px",
              background: "#fff",
              padding: "18px",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "19px" }}>Profile Access</h2>
            <div
              style={{
                marginTop: "12px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "14px",
                  padding: "14px",
                  background: "#f7f7f7",
                }}
              >
                <p style={{ margin: 0, fontSize: "12px", color: "#777" }}>Logged in as</p>
                <p style={{ margin: "6px 0 0", fontSize: "17px", fontWeight: 700, color: "#111" }}>
                  {role === "ngo" ? user.organizationName || "NGO" : user.name || "Volunteer"}
                </p>
                <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#666" }}>{user.email || "-"}</p>
              </div>

              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "14px",
                  padding: "14px",
                  background: "#f7f7f7",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ margin: 0, fontSize: "12px", color: "#777" }}>Quick actions</p>
                <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={() => navigate(profilePath)}
                    style={{
                      border: "1px solid #111",
                      borderRadius: "999px",
                      background: "#111",
                      color: "#fff",
                      fontSize: "12px",
                      fontWeight: 700,
                      padding: "8px 12px",
                      cursor: "pointer",
                    }}
                  >
                    Open Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(dashboardPath)}
                    style={{
                      border: "1px solid #cfcfcf",
                      borderRadius: "999px",
                      background: "#fff",
                      color: "#333",
                      fontSize: "12px",
                      fontWeight: 600,
                      padding: "8px 12px",
                      cursor: "pointer",
                    }}
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section
            style={{
              border: "1px solid #d4d4d4",
              borderRadius: "18px",
              background: "#fff",
              padding: "18px",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "19px" }}>Notifications</h2>
            <p style={{ margin: "6px 0 14px", fontSize: "13px", color: "#666" }}>
              These settings are saved locally for your current browser.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                {
                  key: "emailAlerts",
                  title: "Email alerts",
                  subtitle: "Receive important updates by email.",
                },
                {
                  key: "inAppAlerts",
                  title: "In-app alerts",
                  subtitle: "Show notifications in the app header.",
                },
                {
                  key: "compactMode",
                  title: "Compact mode",
                  subtitle: "Use denser spacing for cards and lists.",
                },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setPreference(item.key)}
                  style={{
                    width: "100%",
                    border: "1px solid #dedede",
                    borderRadius: "12px",
                    background: prefs[item.key] ? "#111" : "#f9f9f9",
                    color: prefs[item.key] ? "#fff" : "#222",
                    padding: "11px 12px",
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <span>
                    <span style={{ display: "block", fontSize: "13px", fontWeight: 700 }}>{item.title}</span>
                    <span style={{ display: "block", fontSize: "12px", opacity: prefs[item.key] ? 0.84 : 0.65 }}>
                      {item.subtitle}
                    </span>
                  </span>
                  <span
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "999px",
                      border: prefs[item.key] ? "1px solid #fff" : "1px solid #b9b9b9",
                      background: prefs[item.key] ? "#fff" : "transparent",
                      flexShrink: 0,
                    }}
                  />
                </button>
              ))}
            </div>
          </section>

          <section
            style={{
              border: "1px solid #d4d4d4",
              borderRadius: "18px",
              background: "#fff",
              padding: "18px",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "19px" }}>Session</h2>
            <p style={{ margin: "6px 0 12px", fontSize: "13px", color: "#666" }}>
              Sign out from this device if needed.
            </p>
            <button
              type="button"
              onClick={logout}
              style={{
                border: "1px solid #1f1f1f",
                borderRadius: "999px",
                background: "#1f1f1f",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 700,
                padding: "9px 14px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
