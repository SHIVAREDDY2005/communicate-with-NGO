import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import NotificationModal from "../components/NotificationModal";
import {
  getNotifications,
  deleteNotification,
  clearAllNotifications,
  getUnreadCount,
  markNotificationAsRead,
} from "../utils/notificationUtils";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(() => getNotifications());
  const [unreadCount, setUnreadCount] = useState(() => getUnreadCount());

  const refreshNotifications = useCallback(() => {
    setNotifications(getNotifications());
    setUnreadCount(getUnreadCount());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, [refreshNotifications]);

  useEffect(() => {
    if (!showNotifications) {
      return;
    }

    const list = getNotifications();
    list.forEach((item) => {
      if (!item.read) {
        markNotificationAsRead(item.id);
      }
    });

    setTimeout(() => {
      refreshNotifications();
    }, 0);
  }, [showNotifications, refreshNotifications]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("notifications");
    navigate("/login");
  };

  const handleDeleteNotification = (id) => {
    deleteNotification(id);
    refreshNotifications();
  };

  const handleClearAll = () => {
    clearAllNotifications();
    refreshNotifications();
  };

  const accountType = user.role === "ngo" ? "NGO" : "Volunteer";

  return (
    <header className="aw-navbar">
      <div style={{ display: "inline-flex", alignItems: "center" }}>
        <div className="aw-brand" onClick={() => navigate("/")}>
          <div className="aw-brand-mark">S.</div>
          <span className="aw-brand-label">SkillBridge</span>
        </div>

        <nav className="aw-navbar-links" aria-label="Main">
          <button className="aw-navbar-link" type="button">Explore</button>
          <button className="aw-navbar-link" type="button">Directory</button>
          <button className="aw-navbar-link" type="button">Market</button>
        </nav>
      </div>

      <div className="aw-search" role="search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#676767" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20L16.65 16.65" strokeLinecap="round" />
        </svg>
        <input
          aria-label="Search"
          placeholder="Search opportunities, NGOs, volunteers"
          readOnly
          value=""
        />
      </div>

      <div className="aw-navbar-actions">
        <span className="aw-chip">{accountType} Account</span>

        <button
          type="button"
          className="aw-icon-btn"
          onClick={() => {
            refreshNotifications();
            setShowNotifications((prev) => !prev);
          }}
          aria-label="Notifications"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#202020" strokeWidth="2">
            <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          {unreadCount > 0 && (
            <span className="aw-badge-dot">{unreadCount > 9 ? "9+" : unreadCount}</span>
          )}
        </button>

        {user.name && (
          <div className="aw-avatar" title={user.name}>
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}

        <button type="button" className="aw-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <NotificationModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onDeleteNotification={handleDeleteNotification}
        onClearAll={handleClearAll}
      />
    </header>
  );
};

export default Navbar;
