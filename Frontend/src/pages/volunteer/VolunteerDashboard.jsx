import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api";

// Add SkillBridge logo component (same as login/register)
const SkillBridgeLogo = ({ size = 24, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="20" cy="20" r="18" fill="#111111" fillOpacity="0.2" stroke="#111111" strokeWidth="2" strokeDasharray="4 4" />
    <path
      d="M12 20L18 26L28 14"
      stroke="#111111"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="20" cy="20" r="6" stroke="#111111" strokeWidth="2" fill="none" />
    <path
      d="M20 8V12M20 28V32M32 20H28M12 20H8M28.5 11.5L25.5 14.5M14.5 25.5L11.5 28.5M28.5 28.5L25.5 25.5M14.5 14.5L11.5 11.5"
      stroke="#111111"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const VolunteerDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const navigate = useNavigate();
  const [opps, setOpps] = useState([]);
  const [stats, setStats] = useState({
    applications: 0,
    accepted: 0,
    pending: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch opportunities
        const res = await api.get("/opportunity");
        setOpps(res.data);

        // Fetch volunteer applications
        const appsRes = await api.get("/application/my");
        const apps = appsRes.data || [];

        setStats({
          applications: apps.length,
          accepted: apps.filter(a => a.status === "accepted").length,
          pending: apps.filter(a => a.status === "pending").length
        });
        // Recent activity
        setRecentActivity(apps.slice(0,3));

      } catch (err) {
        console.log("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-wrapper" style={{ 
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'fixed',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.02)',
        top: '-100px',
        right: '-100px',
        animation: 'float 25s infinite ease-in-out',
        zIndex: 0
      }} />
      <div style={{
        position: 'fixed',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.02)',
        bottom: '-150px',
        left: '-150px',
        animation: 'float 30s infinite ease-in-out reverse',
        zIndex: 0
      }} />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        @keyframes shimmer {
          0% { background-position: -500px 0; }
          100% { background-position: 500px 0; }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <Navbar />

      <div className="dashboard-body" style={{ display: 'flex', position: 'relative', zIndex: 1 }}>
        <Sidebar />

        <div className="main-content" style={{ 
  flex: 1,
  padding: '28px',
  marginLeft: 'var(--sidebar-width)',   // <-- ADD THIS LINE
  overflowY: 'auto',
  animation: 'slideUp 0.6s ease-out'
}}>
          {/* Welcome Banner - Enhanced */}
          <div style={{
            background: 'linear-gradient(135deg, #111111 0%, #2b2b2b 50%, #111111 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 10s ease infinite',
            borderRadius: '24px',
            padding: '28px 32px',
            marginBottom: '28px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.22)'
          }}>
            {/* Shimmer overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
              backgroundSize: '500px 100%',
              animation: 'shimmer 8s infinite linear'
            }} />
            
            {/* Decorative circles */}
            <div style={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              top: '-80px',
              right: '-80px',
              animation: 'pulse 8s infinite ease-in-out'
            }} />
            <div style={{
              position: 'absolute',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              bottom: '-60px',
              left: '-60px',
              animation: 'pulse 10s infinite ease-in-out reverse'
            }} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '18px',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <SkillBridgeLogo size={36} />
              </div>
              <div>
                <h2 style={{ 
                  fontSize: '26px', 
                  fontWeight: '700', 
                  margin: '0 0 6px',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                }}>
                  Welcome back, {user.name || "Volunteer"}!
                </h2>
                <p style={{ 
                  fontSize: '15px', 
                  opacity: 0.95, 
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#10b981',
                    display: 'inline-block',
                    boxShadow: '0 0 10px #10b981'
                  }} />
                  Here's what's happening with your volunteer journey today.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards - Enhanced */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '20px', 
            marginBottom: '28px' 
          }}>
            {/* Applications Card */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 8px 20px -8px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              animation: 'slideUp 0.5s ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 30px -12px rgba(0,0,0,0.18)';
              e.currentTarget.style.borderColor = '#111111';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px -8px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #f2f2f2 0%, #e6e6e6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#111111'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                  <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
                  <path d="M14 3v5h5" />
                  <path d="M9 13h6M9 17h4" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 4px', fontWeight: '500' }}>Applications</p>
                <h3 style={{ 
                  fontSize: '32px', 
                  fontWeight: '800', 
                  color: '#1f2937', 
                  margin: 0,
                  background: 'linear-gradient(135deg, #111111 0%, #2b2b2b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {stats.applications}
                </h3>
              </div>
            </div>

            {/* Accepted Card */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 8px 20px -8px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              animation: 'slideUp 0.5s ease-out 0.1s both'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 30px -12px rgba(0,0,0,0.18)';
              e.currentTarget.style.borderColor = '#111111';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px -8px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#059669'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M20 7L10 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 4px', fontWeight: '500' }}>Accepted</p>
                <h3 style={{ 
                  fontSize: '32px', 
                  fontWeight: '800', 
                  color: '#1f2937', 
                  margin: 0,
                  background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {stats.accepted}
                </h3>
              </div>
            </div>

            {/* Pending Card */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 8px 20px -8px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              animation: 'slideUp 0.5s ease-out 0.2s both'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 30px -12px rgba(0,0,0,0.18)';
              e.currentTarget.style.borderColor = '#111111';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px -8px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#d97706'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 4px', fontWeight: '500' }}>Pending</p>
                <h3 style={{ 
                  fontSize: '32px', 
                  fontWeight: '800', 
                  color: '#1f2937', 
                  margin: 0,
                  background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {stats.pending}
                </h3>
              </div>
            </div>
          </div>

          {/* PROFILE CARD - Enhanced */}
          <div className="card" style={{
            background: 'white',
            borderRadius: '24px',
            padding: '28px',
            marginBottom: '28px',
            boxShadow: '0 8px 20px -8px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.3)',
            backdropFilter: 'blur(10px)',
            animation: 'slideUp 0.5s ease-out 0.3s both'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '24px' 
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '700', 
                color: '#1f2937', 
                margin: 0,
                background: 'linear-gradient(135deg, #111111 0%, #2b2b2b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Profile Overview
              </h3>
              <button
                onClick={() => navigate("/volunteer-profile")}
                style={{
                  padding: '8px 16px',
                  background: '#f2f2f2',
                  border: 'none',
                  borderRadius: '30px',
                  color: '#111111',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#e6e6e6';
                  e.target.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#f2f2f2';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Edit Profile
              </button>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '20px', 
              marginBottom: '24px',
              padding: '20px',
              background: '#f9fafb',
              borderRadius: '20px'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #111111 0%, #2b2b2b 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '32px',
                fontWeight: '700',
                boxShadow: '0 10px 20px -8px rgba(0,0,0,0.22)'
              }}>
                {user.name?.charAt(0) || 'V'}
              </div>
              <div>
                <h3 style={{ 
                  fontSize: '22px', 
                  fontWeight: '700', 
                  color: '#1f2937', 
                  margin: '0 0 6px'
                }}>
                  {user.name || "Volunteer User"}
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#6b7280', 
                  margin: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px' 
                }}>
                  <span style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#10b981',
                    display: 'inline-block',
                    boxShadow: '0 0 10px #10b981'
                  }} />
                  Active Now
                </p>
              </div>
            </div>

            <div>
              <h4 style={{ 
                fontSize: '15px', 
                fontWeight: '600', 
                color: '#374151', 
                margin: '0 0 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#111111">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Your Skills
              </h4>
              {user.skills && user.skills.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {user.skills.map((skill, index) => (
                    <span key={index} style={{
                      padding: '8px 18px',
                      background: 'linear-gradient(135deg, #f2f2f2 0%, #e6e6e6 100%)',
                      borderRadius: '30px',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#111111',
                      border: '1px solid #d1d1d1',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                      transition: 'all 0.2s ease',
                      cursor: 'default'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.02)';
                      e.target.style.boxShadow = '0 4px 10px rgba(0,0,0,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.08)';
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ 
                  fontSize: '14px', 
                  color: '#9ca3af', 
                  margin: 0,
                  padding: '16px',
                  background: '#f9fafb',
                  borderRadius: '16px',
                  textAlign: 'center'
                }}>
                  No skills added yet
                </p>
              )}

              <h4 style={{ 
                fontSize: '15px', 
                fontWeight: '600', 
                color: '#374151', 
                margin: '24px 0 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#111111">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 2h6v2h-6V6zm0 4h6v2h-6v-2zm-6 0h4v2H6v-2zm10 4h-4v-2h4v2zm-10 0h4v2H6v-2zm10 4h-4v-2h4v2zm-10 0h4v2H6v-2z"/>
                </svg>
                Recent Activity
              </h4>

              {recentActivity.length === 0 ? (
                <div style={{
                  background: '#f9fafb',
                  borderRadius: '20px',
                  padding: '24px',
                  textAlign: 'center'
                }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="#9ca3af">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 2h6v2h-6V6zm0 4h6v2h-6v-2zm-6 0h4v2H6v-2zm10 4h-4v-2h4v2zm-10 0h4v2H6v-2zm10 4h-4v-2h4v2zm-10 0h4v2H6v-2z"/>
                  </svg>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: '16px 0 0' }}>
                    No recent activity to show
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {recentActivity.map((app) => (
                    <div
                      key={app._id}
                      style={{
                        background: '#f9fafb',
                        borderRadius: '16px',
                        padding: '16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.2s ease',
                        border: '1px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f3f4f6';
                        e.currentTarget.style.borderColor = '#111111';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#f9fafb';
                        e.currentTarget.style.borderColor = 'transparent';
                      }}
                    >
                      <div>
                        <p style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1f2937',
                          margin: '0 0 4px'
                        }}>
                          Applied to {app.opportunity?.title}
                        </p>
                        <p style={{
                          fontSize: '12px',
                          color: '#6b7280',
                          margin: 0,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="#6b7280">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.1.8-1.2-4.5-2.7V7z"/>
                          </svg>
                          {new Date(app.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span style={{
                        padding: '6px 14px',
                        borderRadius: '30px',
                        fontSize: '12px',
                        fontWeight: '700',
                        background: app.status === 'accepted' ? '#d1fae5' : app.status === 'rejected' ? '#fee2e2' : '#fef3c7',
                        color: app.status === 'accepted' ? '#065f46' : app.status === 'rejected' ? '#991b1b' : '#92400e',
                        border: app.status === 'accepted' ? '1px solid #a7f3d0' : app.status === 'rejected' ? '1px solid #fecaca' : '1px solid #fde68a'
                      }}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* OPPORTUNITIES SECTION - Enhanced */}
          <div className="card" style={{
            background: 'white',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 8px 20px -8px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.3)',
            backdropFilter: 'blur(10px)',
            animation: 'slideUp 0.5s ease-out 0.4s both'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '16px' 
            }}>
              <div>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '700', 
                  color: '#1f2937', 
                  margin: '0 0 4px',
                  background: 'linear-gradient(135deg, #111111 0%, #2b2b2b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Find Opportunities
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                  Discover volunteering opportunities that match your skills
                </p>
              </div>
              <button
                onClick={() => navigate("/opportunities")}
                style={{
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #111111 0%, #2b2b2b 100%)',
                  border: 'none',
                  borderRadius: '30px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 16px -6px rgba(0,0,0,0.22)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.02)';
                  e.target.style.boxShadow = '0 12px 20px -8px rgba(0,0,0,0.28)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 8px 16px -6px rgba(0,0,0,0.22)';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 4v16M20 12H4" strokeLinecap="round"/>
                </svg>
                Browse All
              </button>
            </div>

            {/* Dynamic Opportunities */}
            {opps.length === 0 ? (
              <div style={{
                padding: '60px',
                textAlign: 'center',
                background: '#f9fafb',
                borderRadius: '20px',
                marginTop: '20px'
              }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="#9ca3af">
                  <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4z"/>
                </svg>
                <p style={{ fontSize: '15px', color: '#6b7280', margin: '20px 0 4px', fontWeight: '500' }}>
                  No opportunities available right now
                </p>
                <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>
                  Check back later for new opportunities
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                {opps.slice(0, 3).map((o, index) => {
                  const statusLabel = String(o.status || "open");
                  const isOpen = statusLabel.toLowerCase() === "open";

                  return (
                  <div key={o._id} style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '20px',
                    padding: '24px',
                    transition: 'all 0.3s ease',
                    background: 'white',
                    animation: `slideUp 0.5s ease-out ${0.5 + index * 0.1}s both`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#111111';
                    e.currentTarget.style.boxShadow = '0 12px 24px -10px rgba(0,0,0,0.12)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'start', 
                      marginBottom: '16px' 
                    }}>
                      <h4 style={{ 
                        fontSize: '18px', 
                        fontWeight: '700', 
                        color: '#1f2937', 
                        margin: 0 
                      }}>
                        {o.title}
                      </h4>
                      <span style={{
                        padding: '6px 14px',
                        background: isOpen
                          ? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)'
                          : 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                        borderRadius: '30px',
                        fontSize: '12px',
                        fontWeight: '700',
                        color: isOpen ? '#065f46' : '#991b1b',
                        border: isOpen ? '1px solid #6ee7b7' : '1px solid #fca5a5'
                      }}>
                        {statusLabel}
                      </span>
                    </div>
                    
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '20px', 
                      marginBottom: '16px',
                      padding: '12px 16px',
                      background: '#f9fafb',
                      borderRadius: '14px'
                    }}>
                      <span style={{ fontSize: '13px', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#6b7280">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                        </svg>
                        <span style={{ fontWeight: '600' }}>NGO:</span> {o.ngo?.name || "Organization"}
                      </span>
                    </div>

                    <p style={{ 
                      fontSize: '14px', 
                      color: '#4b5563', 
                      margin: '0 0 20px', 
                      lineHeight: '1.6',
                      padding: '0 4px'
                    }}>
                      {o.description?.length > 120 ? o.description.substring(0, 120) + '...' : o.description}
                    </p>

                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '8px', 
                      marginBottom: '20px' 
                    }}>
                      {o.skillsRequired?.slice(0, 4).map((skill, idx) => (
                        <span key={idx} style={{
                          padding: '6px 14px',
                          background: '#f3f4f6',
                          borderRadius: '30px',
                          fontSize: '12px',
                          fontWeight: '500',
                          color: '#4b5563',
                          border: '1px solid #e5e7eb',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#111111';
                          e.target.style.color = 'white';
                          e.target.style.borderColor = '#111111';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = '#f3f4f6';
                          e.target.style.color = '#4b5563';
                          e.target.style.borderColor = '#e5e7eb';
                        }}>
                          {skill}
                        </span>
                      ))}
                      {o.skillsRequired?.length > 4 && (
                        <span style={{
                          padding: '6px 14px',
                          background: '#f3f4f6',
                          borderRadius: '30px',
                          fontSize: '12px',
                          color: '#6b7280',
                          border: '1px solid #e5e7eb'
                        }}>
                          +{o.skillsRequired.length - 4}
                        </span>
                      )}
                    </div>

                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      borderTop: '1px solid #e5e7eb',
                      paddingTop: '20px',
                      marginTop: '8px'
                    }}>
                      <div style={{ display: 'flex', gap: '24px' }}>
                        <span style={{ 
                          fontSize: '13px', 
                          color: '#6b7280', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '6px' 
                        }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="#6b7280">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                          </svg>
                          {o.location || "Remote"}
                        </span>
                        <span style={{ 
                          fontSize: '13px', 
                          color: '#6b7280', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '6px' 
                        }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="#6b7280">
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.1.8-1.2-4.5-2.7V7z"/>
                          </svg>
                          {o.applyDeadline ? new Date(o.applyDeadline).toLocaleDateString() : 'Flexible'}
                        </span>
                      </div>

                      <button
                        onClick={() => navigate(`/opportunity/${o._id}`)}
                        style={{
                          padding: '10px 20px',
                          background: 'transparent',
                          border: '2px solid #e5e7eb',
                          borderRadius: '30px',
                          color: '#4b5563',
                          fontSize: '13px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#111111';
                          e.target.style.borderColor = '#111111';
                          e.target.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.color = '#4b5563';
                        }}
                      >
                        View Details
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                );
                })}

                {opps.length > 3 && (
                  <div style={{ textAlign: 'center', marginTop: '12px' }}>
                    <button
                      onClick={() => navigate("/opportunities")}
                      style={{
                        padding: '12px 24px',
                        background: 'transparent',
                        border: '2px solid #e5e7eb',
                        borderRadius: '30px',
                        color: '#4b5563',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#f3f4f6';
                        e.target.style.borderColor = '#111111';
                        e.target.style.color = '#111111';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.color = '#4b5563';
                      }}
                    >
                      View All Opportunities ({opps.length})
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;


