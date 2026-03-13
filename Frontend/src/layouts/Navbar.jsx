import { useNavigate } from "react-router-dom";

// Add SkillBridge logo component
const SkillBridgeLogo = ({ size = 24, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="20" cy="20" r="18" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
    <path
      d="M12 20L18 26L28 14"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="20" cy="20" r="6" stroke="white" strokeWidth="2" fill="none" />
    <path
      d="M20 8V12M20 28V32M32 20H28M12 20H8M28.5 11.5L25.5 14.5M14.5 25.5L11.5 28.5M28.5 28.5L25.5 25.5M14.5 14.5L11.5 11.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const Navbar = () => {
  const navigate = useNavigate();

  // ✅ Get user object
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="navbar" style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
      padding: '14px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 4px 20px -8px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div 
        className="logo" 
        onClick={() => navigate("/")}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '20px',
          fontWeight: '800',
          color: '#1f2937',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 16px -8px rgba(37, 99, 235, 0.4)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'rotate(5deg) scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
        }}>
          <SkillBridgeLogo size={24} />
        </div>
        <span style={{
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          SkillBridge
        </span>
      </div>

      <div className="nav-right" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
        {/* Show role with enhanced badge */}
        <span className="role-badge" style={{
          padding: '6px 16px',
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          borderRadius: '30px',
          fontSize: '13px',
          fontWeight: '700',
          color: '#2563eb',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          border: '1px solid #bfdbfe',
          boxShadow: '0 4px 10px -4px rgba(37, 99, 235, 0.2)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.boxShadow = '0 6px 14px -4px rgba(37, 99, 235, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 10px -4px rgba(37, 99, 235, 0.2)';
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#2563eb">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          {user.role === "ngo" ? "NGO Account" : "Volunteer Account"}
        </span>

        {/* User avatar (if name exists) */}
        {user.name && (
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: '700',
            color: '#2563eb',
            border: '2px solid #e5e7eb',
            transition: 'all 0.2s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#2563eb';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e5e7eb';
            e.currentTarget.style.transform = 'scale(1)';
          }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}

        <button 
          className="secondary-btn" 
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            background: 'transparent',
            border: '2px solid #e5e7eb',
            borderRadius: '30px',
            color: '#4b5563',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#f3f4f6';
            e.target.style.borderColor = '#2563eb';
            e.target.style.color = '#2563eb';
            e.target.style.transform = 'scale(1.02)';
            e.target.style.boxShadow = '0 8px 16px -6px rgba(37, 99, 235, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.borderColor = '#e5e7eb';
            e.target.style.color = '#4b5563';
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round"/>
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;