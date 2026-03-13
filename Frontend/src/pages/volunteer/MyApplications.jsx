import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";
import { useEffect, useState } from "react";
import api from "../../utils/api";

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
    <circle cx="20" cy="20" r="18" fill="#2563eb" fillOpacity="0.2" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 4" />
    <path
      d="M12 20L18 26L28 14"
      stroke="#2563eb"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="20" cy="20" r="6" stroke="#2563eb" strokeWidth="2" fill="none" />
    <path
      d="M20 8V12M20 28V32M32 20H28M12 20H8M28.5 11.5L25.5 14.5M14.5 25.5L11.5 28.5M28.5 28.5L25.5 25.5M14.5 14.5L11.5 11.5"
      stroke="#2563eb"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default function MyApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/application/my");
        setApps(res.data);
      } catch (err) {
        console.log("Error fetching applications:", err);
      }
    };
    fetch();
  }, []);

  const undo = async (id) => {
    try {
      await api.delete(`/application/undo/${id}`);
      setApps(apps.filter(a => a.opportunity._id !== id));
    } catch (err) {
      console.log("Withdraw error:", err);
    }
  };

  // Status color mapping
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending':
        return { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b', gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' };
      case 'accepted':
        return { bg: '#d1fae5', text: '#065f46', dot: '#10b981', gradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' };
      case 'rejected':
        return { bg: '#fee2e2', text: '#991b1b', dot: '#ef4444', gradient: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)' };
      default:
        return { bg: '#f3f4f6', text: '#4b5563', dot: '#6b7280', gradient: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)' };
    }
  };

  return (
    <div className="dashboard-wrapper" style={{ 
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'fixed',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'rgba(37, 99, 235, 0.03)',
        top: '-150px',
        right: '-150px',
        animation: 'float 25s infinite ease-in-out',
        zIndex: 0
      }} />
      <div style={{
        position: 'fixed',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'rgba(37, 99, 235, 0.03)',
        bottom: '-200px',
        left: '-200px',
        animation: 'float 30s infinite ease-in-out reverse',
        zIndex: 0
      }} />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(40px, -40px) rotate(120deg); }
          66% { transform: translate(-25px, 25px) rotate(240deg); }
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
        
        @keyframes shimmer {
          0% { background-position: -500px 0; }
          100% { background-position: 500px 0; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
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
  marginLeft: '260px',   // ⭐ ADD THIS LINE
  overflowY: 'auto',
  animation: 'slideUp 0.6s ease-out'
}}>
          <div className="card" style={{
            background: 'white',
            borderRadius: '28px',
            padding: '28px',
            boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
            backdropFilter: 'blur(10px)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative pattern */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(37,99,235,0.03) 0%, transparent 70%)',
              borderRadius: '50%',
              transform: 'translate(100px, -150px)',
              zIndex: 0
            }} />

            {/* Header with gradient and logo */}
            <div style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #2563eb 100%)',
              backgroundSize: '200% 200%',
              animation: 'gradientShift 10s ease infinite',
              margin: '-28px -28px 24px -28px',
              padding: '32px 32px',
              borderRadius: '28px 28px 0 0',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
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

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 1 }}>
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
                  <h3 style={{ 
                    fontSize: '26px', 
                    fontWeight: '700', 
                    margin: '0 0 6px',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    My Applications
                  </h3>
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
                    Track and manage your volunteer applications
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Summary - Enhanced */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginBottom: '28px',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                padding: '20px',
                background: 'white',
                borderRadius: '20px',
                textAlign: 'center',
                border: '1px solid #e5e7eb',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 10px -4px rgba(0,0,0,0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 24px -10px rgba(37, 99, 235, 0.2)';
                e.currentTarget.style.borderColor = '#2563eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 10px -4px rgba(0,0,0,0.05)';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 8px', fontWeight: '500' }}>Total Applications</p>
                <p style={{ 
                  fontSize: '36px', 
                  fontWeight: '800', 
                  color: '#1f2937', 
                  margin: 0,
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {apps.length}
                </p>
              </div>
              
              <div style={{
                padding: '20px',
                background: 'white',
                borderRadius: '20px',
                textAlign: 'center',
                border: '1px solid #e5e7eb',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 10px -4px rgba(0,0,0,0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 24px -10px rgba(245, 158, 11, 0.2)';
                e.currentTarget.style.borderColor = '#f59e0b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 10px -4px rgba(0,0,0,0.05)';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 8px', fontWeight: '500' }}>Pending</p>
                <p style={{ 
                  fontSize: '36px', 
                  fontWeight: '800', 
                  color: '#1f2937', 
                  margin: 0,
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {apps.filter(a => a.status === 'pending').length}
                </p>
              </div>
              
              <div style={{
                padding: '20px',
                background: 'white',
                borderRadius: '20px',
                textAlign: 'center',
                border: '1px solid #e5e7eb',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 10px -4px rgba(0,0,0,0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 24px -10px rgba(16, 185, 129, 0.2)';
                e.currentTarget.style.borderColor = '#10b981';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 10px -4px rgba(0,0,0,0.05)';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 8px', fontWeight: '500' }}>Accepted</p>
                <p style={{ 
                  fontSize: '36px', 
                  fontWeight: '800', 
                  color: '#1f2937', 
                  margin: 0,
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {apps.filter(a => a.status === 'accepted').length}
                </p>
              </div>
            </div>

            {apps.length === 0 ? (
              <div style={{
                padding: '80px 40px',
                textAlign: 'center',
                background: '#f9fafb',
                borderRadius: '24px',
                border: '2px dashed #e5e7eb',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '30px',
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  color: '#2563eb',
                  animation: 'pulse 3s infinite ease-in-out'
                }}>
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round"/>
                  </svg>
                </div>
                <h4 style={{ fontSize: '22px', fontWeight: '700', color: '#1f2937', margin: '0 0 8px' }}>
                  No applications yet
                </h4>
                <p style={{ fontSize: '15px', color: '#6b7280', margin: '0 0 24px', maxWidth: '400px', margin: '0 auto' }}>
                  Start exploring opportunities and apply to your first volunteer position!
                </p>
                <button
                  onClick={() => window.location.href = '/opportunities'}
                  style={{
                    padding: '14px 32px',
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    border: 'none',
                    borderRadius: '30px',
                    color: 'white',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 8px 16px -6px rgba(37, 99, 235, 0.4)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.02)';
                    e.target.style.boxShadow = '0 12px 20px -8px rgba(37, 99, 235, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 8px 16px -6px rgba(37, 99, 235, 0.4)';
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M12 4v16M20 12H4" strokeLinecap="round"/>
                  </svg>
                  Browse Opportunities
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 1 }}>
               {apps
                .filter(a => a.opportunity)   // prevents null opportunity
                .map((a, index) => {
                  const statusColors = getStatusColor(a.status);
                  return (
                    <div key={a._id} style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '20px',
                      padding: '24px',
                      transition: 'all 0.3s ease',
                      background: 'white',
                      animation: `slideUp 0.5s ease-out ${index * 0.1}s both`,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#2563eb';
                      e.currentTarget.style.boxShadow = '0 12px 24px -10px rgba(37, 99, 235, 0.2)';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}>
                      {/* Decorative element */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '150px',
                        height: '150px',
                        background: 'radial-gradient(circle, rgba(37,99,235,0.03) 0%, transparent 70%)',
                        borderRadius: '50%',
                        transform: 'translate(50px, -50px)',
                        zIndex: 0
                      }} />

                      {/* Header with title and status */}
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'start', 
                        marginBottom: '20px',
                        position: 'relative',
                        zIndex: 1
                      }}>
                        <h4 style={{ 
                          fontSize: '20px', 
                          fontWeight: '700', 
                          color: '#1f2937', 
                          margin: 0,
                          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}>
                          {a.opportunity.title}
                        </h4>
                        <span style={{
                          padding: '6px 16px',
                          background: statusColors.gradient,
                          borderRadius: '30px',
                          fontSize: '13px',
                          fontWeight: '700',
                          color: statusColors.text,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          border: `1px solid ${statusColors.dot}40`,
                          boxShadow: `0 4px 10px -4px ${statusColors.dot}`
                        }}>
                          <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: statusColors.dot,
                            display: 'inline-block',
                            boxShadow: `0 0 10px ${statusColors.dot}`
                          }} />
                          {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                        </span>
                      </div>

                      {/* Organization Info - Enhanced */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        background: '#f9fafb',
                        borderRadius: '14px',
                        marginBottom: '20px',
                        position: 'relative',
                        zIndex: 1,
                        border: '1px solid #e5e7eb'
                      }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '14px',
                          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '20px',
                          fontWeight: '700',
                          boxShadow: '0 8px 16px -8px rgba(37, 99, 235, 0.4)'
                        }}>
                          {a.opportunity.ngo?.name?.charAt(0) || 'N'}
                        </div>
                        <div>
                          <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px', fontWeight: '500' }}>Organization</p>
                          <p style={{ fontSize: '16px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                            {a.opportunity.ngo?.name || "NGO"}
                          </p>
                        </div>
                      </div>

                      {/* Details Grid - Enhanced */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '12px',
                        marginBottom: '20px',
                        position: 'relative',
                        zIndex: 1
                      }}>
                        <div style={{
                          padding: '14px',
                          background: '#f9fafb',
                          borderRadius: '14px',
                          border: '1px solid #e5e7eb',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#2563eb';
                          e.currentTarget.style.background = '#f3f4f6';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#e5e7eb';
                          e.currentTarget.style.background = '#f9fafb';
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#2563eb">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                            </svg>
                            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, fontWeight: '500' }}>Location</p>
                          </div>
                          <p style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0, paddingLeft: '24px' }}>
                            {a.opportunity.location || "Remote"}
                          </p>
                        </div>

                        <div style={{
                          padding: '14px',
                          background: '#f9fafb',
                          borderRadius: '14px',
                          border: '1px solid #e5e7eb',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#2563eb';
                          e.currentTarget.style.background = '#f3f4f6';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#e5e7eb';
                          e.currentTarget.style.background = '#f9fafb';
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#2563eb">
                              <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 4h4v3h-4V4z"/>
                            </svg>
                            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, fontWeight: '500' }}>Opportunity Status</p>
                          </div>
                          <p style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0, paddingLeft: '24px' }}>
                            {a.opportunity.status}
                          </p>
                        </div>
                      </div>

                      {/* Skills Tags - Enhanced */}
                      {a.opportunity.skillsRequired && a.opportunity.skillsRequired.length > 0 && (
                        <div style={{ marginBottom: '20px', position: 'relative', zIndex: 1 }}>
                          <p style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="#2563eb">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            Required Skills
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {a.opportunity.skillsRequired.slice(0, 4).map((skill, index) => (
                              <span key={index} style={{
                                padding: '6px 14px',
                                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                                borderRadius: '30px',
                                fontSize: '12px',
                                fontWeight: '600',
                                color: '#2563eb',
                                border: '1px solid #bfdbfe',
                                transition: 'all 0.2s ease',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.02)';
                                e.target.style.boxShadow = '0 4px 10px -4px rgba(37, 99, 235, 0.3)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = 'none';
                              }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="#2563eb">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                                {skill}
                              </span>
                            ))}
                            {a.opportunity.skillsRequired.length > 4 && (
                              <span style={{
                                padding: '6px 14px',
                                background: '#f3f4f6',
                                borderRadius: '30px',
                                fontSize: '12px',
                                fontWeight: '500',
                                color: '#6b7280',
                                border: '1px solid #e5e7eb'
                              }}>
                                +{a.opportunity.skillsRequired.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Applied Date - Enhanced */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 16px',
                        background: '#f9fafb',
                        borderRadius: '30px',
                        marginBottom: '20px',
                        position: 'relative',
                        zIndex: 1,
                        border: '1px solid #e5e7eb'
                      }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '10px',
                          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="#2563eb">
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.1.8-1.2-4.5-2.7V7z"/>
                          </svg>
                        </div>
                        <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>
                          Applied on <strong>{new Date(a.appliedAt || Date.now()).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</strong>
                        </p>
                      </div>

                      {/* Action Buttons - Enhanced */}
                      <div style={{ display: 'flex', gap: '12px', position: 'relative', zIndex: 1 }}>
                        {a.status === "pending" && (
                          <button
                            onClick={() => undo(a.opportunity._id)}
                            style={{
                              padding: '12px 24px',
                              background: 'transparent',
                              border: '2px solid #ef4444',
                              borderRadius: '30px',
                              color: '#ef4444',
                              fontSize: '14px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '10px',
                              flex: 1
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = '#fef2f2';
                              e.target.style.transform = 'scale(1.02)';
                              e.target.style.boxShadow = '0 8px 16px -6px rgba(239, 68, 68, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'transparent';
                              e.target.style.transform = 'scale(1)';
                              e.target.style.boxShadow = 'none';
                            }}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round"/>
                            </svg>
                            Withdraw Application
                          </button>
                        )}
                        
                        {a.status === "accepted" && (
                          <button
                            style={{
                              padding: '12px 24px',
                              background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                              border: '1px solid #6ee7b7',
                              borderRadius: '30px',
                              color: '#065f46',
                              fontSize: '14px',
                              fontWeight: '700',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '10px',
                              cursor: 'default',
                              flex: 1,
                              boxShadow: '0 4px 10px -4px #10b981'
                            }}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M5 13l4 4L19 7" strokeLinecap="round"/>
                            </svg>
                            Application Accepted
                          </button>
                        )}

                        {a.status === "rejected" && (
                          <button
                            style={{
                              padding: '12px 24px',
                              background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                              border: '1px solid #fca5a5',
                              borderRadius: '30px',
                              color: '#991b1b',
                              fontSize: '14px',
                              fontWeight: '700',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '10px',
                              cursor: 'default',
                              flex: 1,
                              boxShadow: '0 4px 10px -4px #ef4444'
                            }}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round"/>
                            </svg>
                            Application Rejected
                          </button>
                        )}

                        <button
                          onClick={() => window.location.href = `/opportunity/${a.opportunity._id}`}
                          style={{
                            padding: '12px',
                            background: 'white',
                            border: '2px solid #e5e7eb',
                            borderRadius: '30px',
                            color: '#4b5563',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '48px'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = '#f3f4f6';
                            e.target.style.borderColor = '#2563eb';
                            e.target.style.color = '#2563eb';
                            e.target.style.transform = 'scale(1.02)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'white';
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.color = '#4b5563';
                            e.target.style.transform = 'scale(1)';
                          }}
                          title="View Opportunity"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}