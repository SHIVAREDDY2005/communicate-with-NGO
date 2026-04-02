import {
  LayoutDashboard,
  Briefcase,
  MessageCircle,
  Settings,
  User,
  Users
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const NGOSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const navItems = [
    { path: "/ngo-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/my-opportunities", label: "My Opportunities", icon: Briefcase },
    { path: "/applicants", label: "Applicants", icon: Users },
    ...(user?.ngoRole === "admin"
      ? [{ path: "/ngo-team", label: "Team Members", icon: Users }]
      : []),
    { path: "/ngo-profile", label: "Profile", icon: User },
    { path: "/ngo-messages", label: "Messages", icon: MessageCircle },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="aw-sidebar">
      <div className="aw-sidebar-top">
        <div className="aw-sidebar-title">
          <div className="aw-sidebar-title-mark">N</div>
          <span>{user.organizationName || "NGO Account"}</span>
        </div>
      </div>

      <div className="aw-sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              type="button"
              className={`aw-nav-btn${isActive ? " active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <Icon size={17} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="aw-sidebar-bottom">
        <div className="aw-user-card">
          <div className="aw-avatar" style={{ width: "34px", height: "34px", borderRadius: "10px" }}>
            {user.organizationName?.charAt(0)?.toUpperCase() || "N"}
          </div>
          <div className="aw-user-meta">
            <div className="aw-user-name">{user.organizationName || "NGO"}</div>
            <div className="aw-user-role">Organization</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default NGOSidebar;
