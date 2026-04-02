import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageCircle,
  Settings,
  User
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const navItems = [
    { path: "/volunteer-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/opportunities", label: "Opportunities", icon: Briefcase },
    { path: "/my-applications", label: "My Applications", icon: FileText },
    { path: "/volunteer-profile", label: "Profile", icon: User },
    { path: "/messages", label: "Messages", icon: MessageCircle },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="aw-sidebar">
      <div className="aw-sidebar-top">
        <div className="aw-sidebar-title">
          <div className="aw-sidebar-title-mark">V</div>
          <span>{user.name || "Volunteer"}</span>
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
            {user.name?.charAt(0)?.toUpperCase() || "V"}
          </div>
          <div className="aw-user-meta">
            <div className="aw-user-name">{user.name || "Volunteer"}</div>
            <div className="aw-user-role">Volunteer</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
