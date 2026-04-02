import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import { addNotification } from "../../utils/notificationUtils";
import Navbar from "../../layouts/Navbar";
import NGOSidebar from "../../layouts/NGOSidebar";
import { Users, CheckCircle, XCircle, Mail, Briefcase, MessageSquare, Calendar } from "lucide-react";

// SkillBridge logo component
const SkillBridgeLogo = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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

export default function Applicants() {
  const { id } = useParams();

  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);

        let res;

        if (id) {
          // applicants for specific opportunity
          res = await api.get(`/application/opportunity/${id}`);
        } else {
          // all applicants for NGO
          res = await api.get("/application/ngo");
        }

        setApps(res.data);

      } catch (err) {
        console.log("Error fetching applicants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

  const update = async (appId, status) => {
    try {
      await api.put(`/application/${appId}`, { status });

      setApps(apps.map(a =>
        a._id === appId ? { ...a, status } : a
      ));
      const volunteerName = apps.find(a => a._id === appId)?.volunteer?.name || "Volunteer";
      if (status === "accepted") {
        addNotification(`Accepted ${volunteerName}'s application`, "application");
      } else {
        addNotification(`Rejected ${volunteerName}'s application`, "application");
      }

    } catch (err) {
      console.log("Error updating application:", err);
      alert("Failed to update application status");
    }
  };

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

  if (loading) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: 'relative'
      }}>
        <Navbar />
        <NGOSidebar />
        
        <div style={{ 
          marginLeft: 'var(--sidebar-width)',
          paddingTop: '70px',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '28px',
            padding: '60px',
            textAlign: 'center',
            boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
            backdropFilter: 'blur(10px)'
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
              color: '#111111'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '3px solid #111111',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: '0 0 8px' }}>
              Loading Applicants
            </h3>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
              Please wait while we fetch the applications...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative'
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
      <NGOSidebar />
      
      {/* Main Content - with left margin for fixed sidebar */}
      <div style={{ 
        marginLeft: 'var(--sidebar-width)', // Same as sidebar width
        paddingTop: '70px', // Height of navbar
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ 
          padding: '24px',
          animation: 'slideUp 0.6s ease-out'
        }}>
          {/* Header with gradient and logo */}
          <div style={{
            background: 'linear-gradient(135deg, #111111 0%, #2b2b2b 50%, #111111 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 10s ease infinite',
            borderRadius: '24px',
            padding: '28px 32px',
            marginBottom: '24px',
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
                <Users size="32" color="white" />
              </div>
              <div>
                <h2 style={{ 
                  fontSize: '28px', 
                  fontWeight: '700', 
                  margin: '0 0 6px',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                }}>
                  {id ? "Opportunity Applicants" : "All Applicants"}
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
                  Review and manage volunteer applications
                </p>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '20px',
            marginBottom: '28px'
          }}>
            <div style={{
              padding: '24px',
              background: 'white',
              borderRadius: '20px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 8px 20px -8px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 15px 30px -10px rgba(0,0,0,0.12)';
              e.currentTarget.style.borderColor = '#111111';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px -8px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 8px', fontWeight: '500' }}>Total Applications</p>
              <p style={{ 
                fontSize: '36px', 
                fontWeight: '800', 
                color: '#1f2937', 
                margin: 0,
                background: 'linear-gradient(135deg, #111111 0%, #2b2b2b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {apps.length}
              </p>
            </div>

            <div style={{
              padding: '24px',
              background: 'white',
              borderRadius: '20px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 8px 20px -8px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 15px 30px -10px rgba(245, 158, 11, 0.2)';
              e.currentTarget.style.borderColor = '#f59e0b';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px -8px rgba(0,0,0,0.1)';
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
              padding: '24px',
              background: 'white',
              borderRadius: '20px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 8px 20px -8px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 15px 30px -10px rgba(16, 185, 129, 0.2)';
              e.currentTarget.style.borderColor = '#10b981';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px -8px rgba(0,0,0,0.1)';
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

            <div style={{
              padding: '24px',
              background: 'white',
              borderRadius: '20px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 8px 20px -8px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 15px 30px -10px rgba(239, 68, 68, 0.2)';
              e.currentTarget.style.borderColor = '#ef4444';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px -8px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 8px', fontWeight: '500' }}>Rejected</p>
              <p style={{ 
                fontSize: '36px', 
                fontWeight: '800', 
                color: '#1f2937', 
                margin: 0,
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {apps.filter(a => a.status === 'rejected').length}
              </p>
            </div>
          </div>

          {/* Applicants List */}
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            {apps.length === 0 ? (
              <div style={{
                padding: '80px 40px',
                textAlign: 'center',
                background: '#f9fafb',
                borderRadius: '20px',
                border: '2px dashed #e5e7eb'
              }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '30px',
                  background: 'linear-gradient(135deg, #f2f2f2 0%, #e6e6e6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  color: '#111111'
                }}>
                  <Users size="50" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: '0 0 8px' }}>
                  No applications yet
                </h3>
                <p style={{ fontSize: '15px', color: '#6b7280', margin: 0 }}>
                  When volunteers apply to your opportunities, they'll appear here
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {apps.map((a, index) => {
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
                      e.currentTarget.style.borderColor = '#111111';
                      e.currentTarget.style.boxShadow = '0 12px 24px -10px rgba(0,0,0,0.12)';
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
                        background: 'radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%)',
                        borderRadius: '50%',
                        transform: 'translate(50px, -50px)',
                        zIndex: 0
                      }} />

                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'start', 
                        marginBottom: '16px',
                        position: 'relative',
                        zIndex: 1
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, #111111 0%, #2b2b2b 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '24px',
                            fontWeight: '700',
                            boxShadow: '0 8px 16px -8px rgba(0,0,0,0.22)'
                          }}>
                            {a.volunteer?.name?.charAt(0) || 'V'}
                          </div>
                          <div>
                            <h4 style={{ 
                              fontSize: '20px', 
                              fontWeight: '700', 
                              color: '#1f2937', 
                              margin: '0 0 6px',
                              background: 'linear-gradient(135deg, #111111 0%, #2b2b2b 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent'
                            }}>
                              {a.volunteer?.name}
                            </h4>
                            <p style={{ 
                              fontSize: '14px', 
                              color: '#6b7280', 
                              margin: 0, 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '6px' 
                            }}>
                              <Mail size="14" />
                              {a.volunteer?.email}
                            </p>
                          </div>
                        </div>
                        <span style={{
                          padding: '8px 20px',
                          background: statusColors.gradient,
                          borderRadius: '30px',
                          fontSize: '14px',
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

                      <div style={{
                        marginBottom: '20px',
                        padding: '16px',
                        background: '#f9fafb',
                        borderRadius: '16px',
                        border: '1px solid #e5e7eb',
                        position: 'relative',
                        zIndex: 1
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                          <Briefcase size="18" color="#111111" />
                          <span style={{ fontSize: '15px', fontWeight: '600', color: '#1f2937' }}>
                            {a.opportunity?.title}
                          </span>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <MessageSquare size="18" color="#6b7280" style={{ marginTop: '2px' }} />
                          <p style={{ fontSize: '14px', color: '#4b5563', margin: 0, lineHeight: '1.6' }}>
                            {a.message}
                          </p>
                        </div>
                      </div>

                      {a.status === "pending" && (
                        <div style={{ 
                          display: 'flex', 
                          gap: '12px', 
                          position: 'relative', 
                          zIndex: 1,
                          borderTop: '1px solid #e5e7eb',
                          paddingTop: '20px'
                        }}>
                          <button
                            onClick={() => update(a._id, "accepted")}
                            style={{
                              flex: 1,
                              padding: '14px',
                              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                              border: 'none',
                              borderRadius: '30px',
                              color: 'white',
                              fontSize: '15px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                              transition: 'all 0.2s ease',
                              boxShadow: '0 4px 10px -4px rgba(16, 185, 129, 0.3)'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = 'scale(1.02)';
                              e.target.style.boxShadow = '0 8px 16px -6px rgba(16, 185, 129, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = 'scale(1)';
                              e.target.style.boxShadow = '0 4px 10px -4px rgba(16, 185, 129, 0.3)';
                            }}
                          >
                            <CheckCircle size="18" />
                            Accept Application
                          </button>

                          <button
                            onClick={() => update(a._id, "rejected")}
                            style={{
                              flex: 1,
                              padding: '14px',
                              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                              border: 'none',
                              borderRadius: '30px',
                              color: 'white',
                              fontSize: '15px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                              transition: 'all 0.2s ease',
                              boxShadow: '0 4px 10px -4px rgba(239, 68, 68, 0.3)'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = 'scale(1.02)';
                              e.target.style.boxShadow = '0 8px 16px -6px rgba(239, 68, 68, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = 'scale(1)';
                              e.target.style.boxShadow = '0 4px 10px -4px rgba(239, 68, 68, 0.3)';
                            }}
                          >
                            <XCircle size="18" />
                            Reject Application
                          </button>
                        </div>
                      )}

                      {a.status !== "pending" && (
                        <div style={{
                          padding: '16px',
                          background: statusColors.bg,
                          borderRadius: '16px',
                          textAlign: 'center',
                          border: `1px solid ${statusColors.dot}40`,
                          position: 'relative',
                          zIndex: 1
                        }}>
                          <p style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: statusColors.text,
                            margin: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                          }}>
                            {a.status === 'accepted' ? (
                              <CheckCircle size="18" />
                            ) : (
                              <XCircle size="18" />
                            )}
                            Application {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                          </p>
                        </div>
                      )}
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


