import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import api from "../../utils/api";
import { addNotification } from "../../utils/notificationUtils";

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

export default function OpportunityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showClosedPopup, setShowClosedPopup] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [checkingApplication, setCheckingApplication] = useState(true);

  const isOpportunityOpen =
    String(opportunity?.status || "").toLowerCase() === "open";

  const checkApplication = useCallback(async () => {
    try {
      setCheckingApplication(true);
      const res = await api.get("/application/my");

      const applied = res.data.some(
        (a) => a.opportunity && a.opportunity._id === id
      );

      setAlreadyApplied(applied);
    } catch (err) {
      console.log("Application check error:", err);
    } finally {
      setCheckingApplication(false);
    }
  }, [id]);

  useEffect(() => {

  const fetch = async () => {
    try {
      const res = await api.get("/opportunity");
      const opp = res.data.find(o => o._id === id);
      setOpportunity(opp);
    } catch (err) {
      console.log(err);
    }
  };

  fetch();
  checkApplication();

}, [id, checkApplication]);
  const apply = async () => {
    if (checkingApplication || alreadyApplied) {
      return;
    }

    if (!isOpportunityOpen) {
      setShowClosedPopup(true);
      return;
    }

    if (!message.trim()) {
      alert("Please enter a message before applying.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/application", {
        opportunity: id,
        message
      });

      addNotification(`Applied to "${opportunity?.title || "opportunity"}" successfully!`, "application");
      alert("Applied Successfully");
      setMessage("");
      setAlreadyApplied(true);

    } catch (err) {
      alert(err.response?.data?.message || "Apply failed");
    } finally {
      setLoading(false);
    }
  };

  if (!opportunity) {
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
          background: 'rgba(0,0,0,0.02)',
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
          background: 'rgba(0,0,0,0.02)',
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
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>

        <Navbar />
        <div className="dashboard-body" style={{ display: 'flex', position: 'relative', zIndex: 1 }}>
          <Sidebar />
          <div className="main-content" style={{ 
  flex: 1,
  padding: '28px',
  marginLeft: 'var(--sidebar-width)',
  animation: 'slideUp 0.6s ease-out'
}}>
            <div className="card" style={{
              background: 'white',
              borderRadius: '28px',
              padding: '60px',
              boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(10px)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #f2f2f2 0%, #e6e6e6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                color: '#111111',
                animation: 'spin 2s infinite linear'
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 6v6l4 2" strokeLinecap="round"/>
                  <circle cx="12" cy="12" r="10"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: '0 0 8px' }}>
                Loading Opportunity Details
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                Please wait while we fetch the information...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        background: 'rgba(0,0,0,0.02)',
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
        background: 'rgba(0,0,0,0.02)',
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
  marginLeft: 'var(--sidebar-width)',
  animation: 'slideUp 0.6s ease-out'
}}>
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              marginBottom: '24px',
              background: 'white',
              border: '2px solid #e5e7eb',
              borderRadius: '30px',
              color: '#4b5563',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 10px -4px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f3f4f6';
              e.target.style.borderColor = '#111111';
              e.target.style.color = '#111111';
              e.target.style.transform = 'translateX(-3px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'white';
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.color = '#4b5563';
              e.target.style.transform = 'translateX(0)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Opportunities
          </button>

          <div className="card" style={{
            background: 'white',
            borderRadius: '28px',
            padding: '32px',
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
              background: 'radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%)',
              borderRadius: '50%',
              transform: 'translate(100px, -150px)',
              zIndex: 0
            }} />

            {/* Header with Status and Logo */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
              marginBottom: '28px',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '18px',
                  background: 'linear-gradient(135deg, #111111 0%, #2b2b2b 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 20px -8px rgba(0,0,0,0.22)'
                }}>
                  <SkillBridgeLogo size={36} />
                </div>
                <div>
                  <h2 style={{ 
                    fontSize: '32px', 
                    fontWeight: '800', 
                    color: '#1f2937', 
                    margin: '0 0 8px',
                    background: 'linear-gradient(135deg, #111111 0%, #2b2b2b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {opportunity.title}
                  </h2>
                  
                  {/* NGO Info */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#111111',
                      fontSize: '18px',
                      fontWeight: '700'
                    }}>
                      {opportunity.ngo?.name?.charAt(0) || 'N'}
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px', fontWeight: '500' }}>Organization</p>
                      <p style={{ fontSize: '16px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                        {opportunity.ngo?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>

  {/* Existing Status Badge */}
  <span style={{
    padding: '8px 20px',
    background: isOpportunityOpen 
      ? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' 
      : 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
    borderRadius: '30px',
    fontSize: '14px',
    fontWeight: '700',
    color: isOpportunityOpen ? '#065f46' : '#991b1b',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: isOpportunityOpen ? '1px solid #6ee7b7' : '1px solid #fca5a5',
    boxShadow: isOpportunityOpen 
      ? '0 4px 10px -4px rgba(16, 185, 129, 0.3)' 
      : '0 4px 10px -4px rgba(239, 68, 68, 0.3)'
  }}>
    <span style={{
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: isOpportunityOpen ? '#10b981' : '#ef4444',
      display: 'inline-block',
      boxShadow: isOpportunityOpen 
        ? '0 0 10px #10b981' 
        : '0 0 10px #ef4444'
    }} />
    {isOpportunityOpen ? 'Open for Applications' : 'Closed'}
  </span>

  {/* Already Applied Badge */}
  {alreadyApplied && (
    <span style={{
      padding: '6px 18px',
      background: 'linear-gradient(135deg,#e0e7ff,#c7d2fe)',
      borderRadius: '30px',
      fontSize: '13px',
      fontWeight: '700',
      color: '#3730a3',
      border: '1px solid #a5b4fc',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <span style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: '#6366f1'
      }} />
      Already Applied
    </span>
  )}

</div>
            </div>

            {/* Description Card */}
            <div style={{
              background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
              borderRadius: '20px',
              padding: '28px',
              marginBottom: '28px',
              position: 'relative',
              zIndex: 1,
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '700', 
                color: '#1f2937', 
                margin: '0 0 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2">
                  <path d="M4 6h16M4 10h16M4 14h16M4 18h16" strokeLinecap="round"/>
                </svg>
                Description
              </h3>
              <p style={{ 
                fontSize: '15px', 
                color: '#4b5563', 
                margin: 0,
                lineHeight: '1.8'
              }}>
                {opportunity.description}
              </p>
            </div>

            {/* Details Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
              marginBottom: '28px',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                padding: '20px',
                background: 'white',
                borderRadius: '18px',
                border: '1px solid #e5e7eb',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 10px -4px rgba(0,0,0,0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#111111';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 20px -8px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 10px -4px rgba(0,0,0,0.05)';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #f2f2f2 0%, #e6e6e6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#111111">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    </svg>
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#374151', margin: 0 }}>Location</p>
                </div>
                <p style={{ fontSize: '16px', color: '#1f2937', margin: 0, fontWeight: '500', paddingLeft: '52px' }}>
                  {opportunity.location || "Remote"}
                </p>
              </div>

              <div style={{
                padding: '20px',
                background: 'white',
                borderRadius: '18px',
                border: '1px solid #e5e7eb',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 10px -4px rgba(0,0,0,0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#111111';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 20px -8px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 10px -4px rgba(0,0,0,0.05)';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #f2f2f2 0%, #e6e6e6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#111111">
                      <path d="M20 7h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 4h4v3h-4V4z"/>
                    </svg>
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#374151', margin: 0 }}>Category</p>
                </div>
                <p style={{ fontSize: '16px', color: '#1f2937', margin: 0, fontWeight: '500', paddingLeft: '52px' }}>
                  {opportunity.category || "Not specified"}
                </p>
              </div>

              <div style={{
                padding: '20px',
                background: 'white',
                borderRadius: '18px',
                border: '1px solid #e5e7eb',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 10px -4px rgba(0,0,0,0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#111111';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 20px -8px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 10px -4px rgba(0,0,0,0.05)';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #f2f2f2 0%, #e6e6e6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#111111">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#374151', margin: 0 }}>Volunteers Needed</p>
                </div>
                <p style={{ fontSize: '16px', color: '#1f2937', margin: 0, fontWeight: '500', paddingLeft: '52px' }}>
                  {opportunity.volunteersNeeded || "Not specified"}
                </p>
              </div>

              <div style={{
                padding: '20px',
                background: 'white',
                borderRadius: '18px',
                border: '1px solid #e5e7eb',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 10px -4px rgba(0,0,0,0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#111111';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 20px -8px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 10px -4px rgba(0,0,0,0.05)';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #f2f2f2 0%, #e6e6e6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#111111">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.1.8-1.2-4.5-2.7V7z"/>
                    </svg>
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#374151', margin: 0 }}>Deadline</p>
                </div>
                <p style={{ fontSize: '16px', color: '#1f2937', margin: 0, fontWeight: '500', paddingLeft: '52px' }}>
                  {opportunity.applyDeadline ? new Date(opportunity.applyDeadline).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Flexible'}
                </p>
              </div>
            </div>

            {/* Skills Section */}
            {opportunity.skillsRequired && opportunity.skillsRequired.length > 0 && (
              <div style={{ 
                marginBottom: '28px',
                position: 'relative',
                zIndex: 1
              }}>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '700', 
                  color: '#1f2937', 
                  margin: '0 0 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  Required Skills
                </h3>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '10px'
                }}>
                  {opportunity.skillsRequired.map((skill, index) => (
                    <span key={index} style={{
                      padding: '10px 20px',
                      background: 'linear-gradient(135deg, #f2f2f2 0%, #e6e6e6 100%)',
                      borderRadius: '30px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#111111',
                      border: '1px solid #d1d1d1',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 10px -4px rgba(0,0,0,0.12)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.02)';
                      e.target.style.boxShadow = '0 8px 16px -6px rgba(0,0,0,0.18)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = '0 4px 10px -4px rgba(0,0,0,0.12)';
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#111111">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
              borderRadius: '20px',
              padding: '28px',
              border: '1px solid #e5e7eb'
            }}>
              {checkingApplication ? (
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                  Checking application status...
                </p>
              ) : alreadyApplied ? (
                <>
                  <p style={{ fontSize: '15px', color: '#374151', margin: '0 0 16px' }}>
                    You already applied to this opportunity. You can track status in My Applications.
                  </p>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <button
                      onClick={() => navigate("/my-applications")}
                      style={{
                        flex: 1,
                        padding: '16px 24px',
                        background: 'linear-gradient(135deg, #111111 0%, #2b2b2b 100%)',
                        border: 'none',
                        borderRadius: '30px',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        boxShadow: '0 8px 16px -6px rgba(0,0,0,0.22)'
                      }}
                    >
                      View My Applications
                    </button>
                    <button
                      onClick={() => navigate(-1)}
                      style={{
                        padding: '16px 32px',
                        background: 'transparent',
                        border: '2px solid #e5e7eb',
                        borderRadius: '30px',
                        color: '#4b5563',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Go Back
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '700', 
                    color: '#1f2937', 
                    margin: '0 0 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Application Message
                  </h3>

                  <textarea
                    placeholder="Why do you want to apply for this opportunity? Share your motivation and relevant experience..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '16px',
                      border: '2px solid #e5e7eb',
                      marginBottom: '20px',
                      minHeight: '140px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      transition: 'all 0.2s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#111111';
                      e.target.style.boxShadow = '0 0 0 4px rgba(0,0,0,0.08)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                    }}
                  />

                  <div style={{ display: 'flex', gap: '16px' }}>
                    <button
                      onClick={apply}
                      disabled={loading || checkingApplication || alreadyApplied || !isOpportunityOpen}
                      style={{
                        flex: 1,
                        padding: '16px 24px',
                        background: 'linear-gradient(135deg, #111111 0%, #2b2b2b 100%)',
                        border: 'none',
                        borderRadius: '30px',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: '700',
                        cursor: (loading || checkingApplication || alreadyApplied || !isOpportunityOpen) ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                        opacity: (loading || checkingApplication || alreadyApplied || !isOpportunityOpen) ? 0.6 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        boxShadow: '0 8px 16px -6px rgba(0,0,0,0.22)'
                      }}
                      onMouseEnter={(e) => {
                        if (!loading && isOpportunityOpen) {
                          e.target.style.transform = 'scale(1.02)';
                          e.target.style.boxShadow = '0 12px 24px -8px rgba(0,0,0,0.28)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!loading && isOpportunityOpen) {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.boxShadow = '0 8px 16px -6px rgba(0,0,0,0.22)';
                        }
                      }}
                    >
                      {loading ? (
                        <>
                          <svg style={{ animation: 'spin 1s linear infinite', width: '18px', height: '18px' }} viewBox="0 0 24 24">
                            <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Applying...</span>
                        </>
                      ) : (
                        <>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 4v16M20 12H4" strokeLinecap="round"/>
                          </svg>
                          {!isOpportunityOpen ? "Closed" : "Apply Now"}
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => navigate(-1)}
                      style={{
                        padding: '16px 32px',
                        background: 'transparent',
                        border: '2px solid #e5e7eb',
                        borderRadius: '30px',
                        color: '#4b5563',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
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
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Go Back
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Closed Popup */}
      {showClosedPopup && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(5px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          animation: "slideUp 0.3s ease-out"
        }}>
          <div style={{
            background: "white",
            padding: "40px",
            borderRadius: "28px",
            textAlign: "center",
            width: "380px",
            boxShadow: "0 30px 60px -20px rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.3)",
            animation: "slideUp 0.4s ease-out"
          }}>
            <div style={{
              width: "80px",
              height: "80px",
              borderRadius: "24px",
              background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              color: "#dc2626"
            }}>
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="9" />
                <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" strokeLinecap="round" />
              </svg>
            </div>

            <h3 style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#1f2937",
              margin: "0 0 8px"
            }}>
              Opportunity Closed
            </h3>

            <p style={{
              fontSize: "15px",
              color: "#6b7280",
              margin: "0 0 24px",
              lineHeight: "1.6"
            }}>
              Applications for this opportunity are no longer accepted.
            </p>

            <button
              onClick={() => setShowClosedPopup(false)}
              style={{
                padding: "14px 32px",
                background: "linear-gradient(135deg, #111111 0%, #2b2b2b 100%)",
                border: "none",
                borderRadius: "30px",
                color: "white",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 8px 16px -6px rgba(0,0,0,0.22)",
                width: "100%"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.02)";
                e.target.style.boxShadow = "0 12px 20px -8px rgba(0,0,0,0.28)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 8px 16px -6px rgba(0,0,0,0.22)";
              }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}



