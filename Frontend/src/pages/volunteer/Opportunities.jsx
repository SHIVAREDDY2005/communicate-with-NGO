import { useEffect, useState } from "react";
import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";
import api from "../../utils/api";
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

export default function Opportunities() {
  const [opps, setOpps] = useState([]);
  const [skill, setSkill] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const res = await api.get("/opportunity", {
        params: { skill, location, duration }
      });
      setOpps(res.data);
    } catch (err) {
      console.log("Error fetching opportunities:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const clearFilters = () => {
    setSkill("");
    setLocation("");
    setDuration("");
    fetchOpportunities();
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
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
            {/* Decorative header pattern */}
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
              margin: '-28px -28px 28px -28px',
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

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '16px',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <SkillBridgeLogo size={32} />
                </div>
                <div>
                  <h3 style={{
                    fontSize: '26px',
                    fontWeight: '700',
                    margin: '0 0 6px',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    All Opportunities
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
                    Discover and apply for volunteering opportunities
                  </p>
                </div>
              </div>
            </div>

            {/* FILTER BAR - Enhanced */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '28px',
              flexWrap: 'wrap',
              alignItems: 'center',
              background: '#f9fafb',
              padding: '20px',
              borderRadius: '20px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
                <svg style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '16px',
                  height: '16px',
                  color: '#9ca3af',
                  zIndex: 1
                }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  placeholder="Search by skill"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 40px',
                    borderRadius: '30px',
                    border: '2px solid #e5e7eb',
                    fontSize: '14px',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2563eb';
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
                <svg style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '16px',
                  height: '16px',
                  color: '#9ca3af',
                  zIndex: 1
                }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 40px',
                    borderRadius: '30px',
                    border: '2px solid #e5e7eb',
                    fontSize: '14px',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2563eb';
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
                <svg style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '16px',
                  height: '16px',
                  color: '#9ca3af',
                  zIndex: 1
                }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <input
                  placeholder="Duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 40px',
                    borderRadius: '30px',
                    border: '2px solid #e5e7eb',
                    fontSize: '14px',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2563eb';
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={fetchOpportunities}
                  disabled={loading}
                  style={{
                    padding: '12px 28px',
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '30px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 8px 16px -6px rgba(37, 99, 235, 0.4)',
                    opacity: loading ? 0.7 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    if(!loading) {
                      e.target.style.transform = 'scale(1.02)';
                      e.target.style.boxShadow = '0 12px 20px -8px rgba(37, 99, 235, 0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if(!loading) {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = '0 8px 16px -6px rgba(37, 99, 235, 0.4)';
                    }
                  }}
                >
                  {loading ? (
                    <>
                      <svg style={{ animation: 'spin 1s linear infinite', width: '16px', height: '16px' }} viewBox="0 0 24 24">
                        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" />
                      </svg>
                      Search
                    </>
                  )}
                </button>

                {(skill || location || duration) && (
                  <button
                    onClick={clearFilters}
                    style={{
                      padding: '12px',
                      background: '#f3f4f6',
                      color: '#4b5563',
                      border: '1px solid #e5e7eb',
                      borderRadius: '30px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '44px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#e5e7eb';
                      e.target.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#f3f4f6';
                      e.target.style.transform = 'scale(1)';
                    }}
                    title="Clear filters"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Results count */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              padding: '0 8px'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#6b7280">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
                Found <strong style={{ color: '#2563eb' }}>{opps.length}</strong> opportunities
              </p>
            </div>

            {/* Opportunities List - Enhanced */}
            {opps.length === 0 ? (
              <div style={{
                padding: '80px 40px',
                textAlign: 'center',
                background: '#f9fafb',
                borderRadius: '24px',
                border: '2px dashed #e5e7eb'
              }}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="#9ca3af" style={{ marginBottom: '20px' }}>
                  <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4z"/>
                </svg>
                <h4 style={{ fontSize: '18px', color: '#374151', margin: '0 0 8px', fontWeight: '600' }}>
                  No opportunities found
                </h4>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                  Try adjusting your filters or check back later
                </p>
                {(skill || location || duration) && (
                  <button
                    onClick={clearFilters}
                    style={{
                      marginTop: '20px',
                      padding: '10px 24px',
                      background: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '30px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#1d4ed8';
                      e.target.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#2563eb';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {opps.map((o, index) => (
                  <div key={o._id} style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '20px',
                    padding: '24px',
                    background: 'white',
                    transition: 'all 0.3s ease',
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
                    {/* Status indicator */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '100px',
                      height: '100px',
                      background: 'linear-gradient(135deg, rgba(37,99,235,0.03) 0%, transparent 70%)',
                      borderRadius: '50%',
                      transform: 'translate(40px, -40px)'
                    }} />

                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'start', 
                      marginBottom: '16px' 
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
                        {o.title}
                      </h4>
                      <span style={{
                        padding: '6px 16px',
                        background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                        borderRadius: '30px',
                        fontSize: '12px',
                        fontWeight: '700',
                        color: '#065f46',
                        border: '1px solid #6ee7b7',
                        boxShadow: '0 2px 6px rgba(16, 185, 129, 0.2)'
                      }}>
                        {o.status || 'Open'}
                      </span>
                    </div>
                    
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '24px', 
                      marginBottom: '16px',
                      padding: '12px 16px',
                      background: '#f9fafb',
                      borderRadius: '14px',
                      flexWrap: 'wrap'
                    }}>
                      <span style={{ fontSize: '14px', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#6b7280">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                        </svg>
                        <span style={{ fontWeight: '600' }}>NGO:</span> {o.ngo?.name || "Organization"}
                      </span>
                      
                      <span style={{ fontSize: '14px', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#6b7280">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                        </svg>
                        <span style={{ fontWeight: '600' }}>Location:</span> {o.location || "Remote"}
                      </span>
                    </div>

                    <p style={{ 
                      fontSize: '14px', 
                      color: '#4b5563', 
                      margin: '0 0 20px', 
                      lineHeight: '1.7',
                      padding: '0 4px'
                    }}>
                      {o.description?.length > 200 ? o.description.substring(0, 200) + '...' : o.description}
                    </p>

                    {/* Skills tags */}
                    {o.skillsRequired && o.skillsRequired.length > 0 && (
                      <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '8px', 
                        marginBottom: '20px' 
                      }}>
                        {o.skillsRequired.slice(0, 5).map((skill, idx) => (
                          <span key={idx} style={{
                            padding: '6px 16px',
                            background: '#eff6ff',
                            borderRadius: '30px',
                            fontSize: '12px',
                            fontWeight: '500',
                            color: '#2563eb',
                            border: '1px solid #bfdbfe',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = '#2563eb';
                            e.target.style.color = 'white';
                            e.target.style.transform = 'scale(1.02)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = '#eff6ff';
                            e.target.style.color = '#2563eb';
                            e.target.style.transform = 'scale(1)';
                          }}>
                            {skill}
                          </span>
                        ))}
                        {o.skillsRequired.length > 5 && (
                          <span style={{
                            padding: '6px 16px',
                            background: '#f3f4f6',
                            borderRadius: '30px',
                            fontSize: '12px',
                            color: '#6b7280',
                            border: '1px solid #e5e7eb'
                          }}>
                            +{o.skillsRequired.length - 5} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Additional details */}
                    <div style={{ 
                      display: 'flex', 
                      gap: '24px', 
                      marginBottom: '20px',
                      padding: '12px 16px',
                      background: '#f9fafb',
                      borderRadius: '14px',
                      flexWrap: 'wrap'
                    }}>
                      {o.duration && (
                        <span style={{ fontSize: '13px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="#6b7280">
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.1.8-1.2-4.5-2.7V7z"/>
                          </svg>
                          Duration: {o.duration}
                        </span>
                      )}
                      
                      {o.applyDeadline && (
                        <span style={{ fontSize: '13px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="#6b7280">
                            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                          </svg>
                          Deadline: {new Date(o.applyDeadline).toLocaleDateString()}
                        </span>
                      )}
                      
                      {o.positions && (
                        <span style={{ fontSize: '13px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="#6b7280">
                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-1 .05 1.16.84 2 1.87 2 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                          </svg>
                          {o.positions} positions available
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => navigate(`/opportunity/${o._id}`)}
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                        border: 'none',
                        borderRadius: '30px',
                        color: 'white',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 8px 16px -6px rgba(37, 99, 235, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
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
                      <span>View Full Details</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}