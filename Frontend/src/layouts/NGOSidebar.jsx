import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageCircle,
  Settings,
  User,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const NGOSidebar = () => {
  const navigate = useNavigate();

  /* ⭐ GET USER ROLE */
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="sidebar" style={{
      width: '260px',
      background: 'white',
      borderRight: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'fixed', // Changed from 'relative' to 'fixed'
      left: 0,
      top: 0,
      bottom: 0,
      boxShadow: '2px 0 8px -2px rgba(0,0,0,0.05)',
      zIndex: 1000
    }}>
      {/* Organization Name Header */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid #e5e7eb',
        marginBottom: '8px'
      }}>
        <h3 className="org-name" style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#1f2937',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            N
          </div>
          {user.organizationName || "HopeForAll Foundation"}
        </h3>
      </div>

      <hr style={{
        border: 'none',
        borderTop: '1px solid #e5e7eb',
        margin: '0 20px 16px'
      }} />

      <div className="sidebar-links" style={{
        flex: 1,
        padding: '0 16px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        {/* DASHBOARD */}
        <button
          onClick={() => navigate("/ngo-dashboard")}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            width: '100%',
            border: 'none',
            borderRadius: '10px',
            background: 'transparent',
            color: '#4b5563',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textAlign: 'left'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.color = '#2563eb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#4b5563';
          }}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        {/* MY OPPORTUNITIES */}
        <button
          onClick={() => navigate("/my-opportunities")}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            width: '100%',
            border: 'none',
            borderRadius: '10px',
            background: 'transparent',
            color: '#4b5563',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textAlign: 'left'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.color = '#2563eb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#4b5563';
          }}
        >
          <Briefcase size={18} />
          My Opportunities
        </button>

        {/* VIEW APPLICANTS */}
        <button
          onClick={() => navigate("/applicants")}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            width: '100%',
            border: 'none',
            borderRadius: '10px',
            background: 'transparent',
            color: '#4b5563',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textAlign: 'left'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.color = '#2563eb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#4b5563';
          }}
        >
          <Users size={18} />
          View Applicants
        </button>

        {/* PROFILE */}
        <button
          onClick={() => navigate("/ngo-profile")}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            width: '100%',
            border: 'none',
            borderRadius: '10px',
            background: 'transparent',
            color: '#4b5563',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textAlign: 'left'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.color = '#2563eb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#4b5563';
          }}
        >
          <User size={18} />
          Profile
        </button>

        {/* MESSAGES */}
        <button
          onClick={() => navigate("/messages")}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            width: '100%',
            border: 'none',
            borderRadius: '10px',
            background: 'transparent',
            color: '#4b5563',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textAlign: 'left'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.color = '#2563eb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#4b5563';
          }}
        >
          <MessageCircle size={18} />
          Messages
        </button>

        {/* SETTINGS */}
        <button
          onClick={() => navigate("/settings")}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            width: '100%',
            border: 'none',
            borderRadius: '10px',
            background: 'transparent',
            color: '#4b5563',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textAlign: 'left'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.color = '#2563eb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#4b5563';
          }}
        >
          <Settings size={18} />
          Settings
        </button>
      </div>

      {/* User Info at Bottom */}
      <div style={{
        padding: '20px 16px',
        borderTop: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: '#e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#4b5563',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          {user.organizationName?.charAt(0) || 'N'}
        </div>
        <div style={{
          flex: 1,
          overflow: 'hidden'
        }}>
          <div style={{
            fontSize: '13px',
            fontWeight: '600',
            color: '#1f2937',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {user.organizationName || "NGO"}
          </div>
          <div style={{
            fontSize: '11px',
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#10b981',
              display: 'inline-block'
            }} />
            NGO
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOSidebar;