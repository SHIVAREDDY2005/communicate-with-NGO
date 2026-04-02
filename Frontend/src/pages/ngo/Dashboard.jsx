// NGO Dashboard (e.g., Dashboard.jsx or NgoDashboard.jsx)
import Navbar from "../../layouts/Navbar";
import NGOSidebar from "../../layouts/NGOSidebar";
import { PlusCircle, Mail, Briefcase, Users, FileText, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

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

const Dashboard = () => {
  const [ngo, setNgo] = useState(null);
  const [stats, setStats] = useState({
    activeOpportunities: 0,
    totalApplications: 0,
    activeVolunteers: 0,
    pendingApplications: 0
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  const fetchData = async () => {
    try {
      // const ngoRes = await api.get("/user/me");
      const ngoRes = await api.get("/user/ngo/organization");

      setNgo(ngoRes.data);

      const oppRes = await api.get("/opportunity/my");
      const opportunities = oppRes.data || [];

      const appsRes = await api.get("/application/ngo");
      const apps = appsRes.data || [];

      setRecentApplications(apps.slice(0, 5));

      setStats({
        activeOpportunities: opportunities.filter(o => o.status === "open").length,
        totalApplications: apps.length,
        activeVolunteers: apps.filter(a => a.status === "accepted").length,
        pendingApplications: apps.filter(a => a.status === "pending").length
      });

    } catch (err) {
      console.log("Error fetching dashboard data:", err);
    }
  };

  fetchData();
}, []);

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending':
        return { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b' };
      case 'accepted':
        return { bg: '#d1fae5', text: '#065f46', dot: '#10b981' };
      case 'rejected':
        return { bg: '#fee2e2', text: '#991b1b', dot: '#ef4444' };
      default:
        return { bg: '#f3f4f6', text: '#4b5563', dot: '#6b7280' };
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <Navbar />
      <NGOSidebar />
      
      {/* Main Content - with left margin for fixed sidebar */}
      <div style={{ 
        marginLeft: 'var(--sidebar-width)', // Same as sidebar width
        paddingTop: '70px', // Height of navbar
        minHeight: '100vh'
      }}>
        <div style={{ 
          padding: '24px'
        }}>
          {/* Welcome Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #111111 0%, #2b2b2b 50%, #111111 100%)',
            borderRadius: '24px',
            padding: '28px 32px',
            marginBottom: '24px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.22)'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '200px',
              height: '200px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%',
              transform: 'translate(50px, -50px)'
            }} />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '150px',
              height: '150px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '50%',
              transform: 'translate(-50px, 50px)'
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
                  Welcome back, {ngo?.name || "Organization"}!
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
                  Here's what's happening with your organization today.
                </p>
              </div>
            </div>
          </div>

          {/* NGO INFO CARD */}
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '28px',
            marginBottom: '24px',
            boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)',
            border: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            gap: '24px'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '30px',
              background: 'linear-gradient(135deg, #111111 0%, #2b2b2b 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '42px',
              fontWeight: '700',
              boxShadow: '0 15px 30px -10px rgba(0,0,0,0.22)'
            }}>
              {ngo?.name?.charAt(0) || 'N'}
            </div>
            
            <div style={{ flex: 1 }}>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: '#1f2937', 
                margin: '0 0 8px',
                background: 'linear-gradient(135deg, #111111 0%, #2b2b2b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {ngo?.name || "Organization"}
              </h3>
              
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#111111">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span style={{ fontWeight: '500' }}>{ngo?.email || "rowdy123@gmail.com"}</span>
                </p>
                
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#111111">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  </svg>
                  <span style={{ fontWeight: '500' }}>{ngo?.location || "kodad"}</span>
                </p>
              </div>

              {ngo?.description && (
                <p style={{ 
                  fontSize: '14px', 
                  color: '#4b5563', 
                  margin: '12px 0 0', 
                  padding: '16px', 
                  background: '#f9fafb', 
                  borderRadius: '16px',
                  border: '1px solid #e5e7eb',
                  lineHeight: '1.6'
                }}>
                  {ngo.description || "Textile Business for Men and Women"}
                </p>
              )}
            </div>
          </div>

          {/* OVERVIEW STATS */}
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '28px',
            marginBottom: '24px',
            boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              color: '#1f2937', 
              margin: '0 0 24px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px'
            }}>
              <Briefcase size={22} color="#111111" />
              Overview
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px'
            }}>
              {/* Active Opportunities */}
              <div style={{
                padding: '24px',
                background: '#f9fafb',
                borderRadius: '20px',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#111111';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 15px 30px -10px rgba(0,0,0,0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #e6e6e6 0%, #d1d1d1 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#111111'
                  }}>
                    <Briefcase size="24" />
                  </div>
                  <h2 style={{ 
                    fontSize: '36px', 
                    fontWeight: '800', 
                    color: '#1f2937', 
                    margin: 0
                  }}>
                    {stats.activeOpportunities}
                  </h2>
                </div>
                <p style={{ fontSize: '15px', color: '#6b7280', margin: 0, fontWeight: '500' }}>Active Opportunities</p>
              </div>

              {/* Total Applications */}
              <div style={{
                padding: '24px',
                background: '#f9fafb',
                borderRadius: '20px',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#111111';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 15px 30px -10px rgba(0,0,0,0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #e6e6e6 0%, #d1d1d1 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#111111'
                  }}>
                    <FileText size="24" />
                  </div>
                  <h2 style={{ 
                    fontSize: '36px', 
                    fontWeight: '800', 
                    color: '#1f2937', 
                    margin: 0
                  }}>
                    {stats.totalApplications}
                  </h2>
                </div>
                <p style={{ fontSize: '15px', color: '#6b7280', margin: 0, fontWeight: '500' }}>Total Applications</p>
              </div>

              {/* Active Volunteers */}
              <div style={{
                padding: '24px',
                background: '#f9fafb',
                borderRadius: '20px',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#10b981';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 15px 30px -10px rgba(16, 185, 129, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10b981'
                  }}>
                    <Users size="24" />
                  </div>
                  <h2 style={{ 
                    fontSize: '36px', 
                    fontWeight: '800', 
                    color: '#1f2937', 
                    margin: 0
                  }}>
                    {stats.activeVolunteers}
                  </h2>
                </div>
                <p style={{ fontSize: '15px', color: '#6b7280', margin: 0, fontWeight: '500' }}>Active Volunteers</p>
              </div>

              {/* Pending Applications */}
              <div style={{
                padding: '24px',
                background: '#f9fafb',
                borderRadius: '20px',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#f59e0b';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 15px 30px -10px rgba(245, 158, 11, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f59e0b'
                  }}>
                    <Clock size="24" />
                  </div>
                  <h2 style={{ 
                    fontSize: '36px', 
                    fontWeight: '800', 
                    color: '#1f2937', 
                    margin: 0
                  }}>
                    {stats.pendingApplications}
                  </h2>
                </div>
                <p style={{ fontSize: '15px', color: '#6b7280', margin: 0, fontWeight: '500' }}>Pending Applications</p>
              </div>
            </div>
          </div>

          {/* RECENT APPLICATIONS */}
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '28px',
            marginBottom: '24px',
            boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              color: '#1f2937', 
              margin: '0 0 20px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px'
            }}>
              <FileText size={22} color="#111111" />
              Recent Applications
            </h3>
            
            {recentApplications.length === 0 ? (
              <div style={{
                padding: '48px',
                textAlign: 'center',
                background: '#f9fafb',
                borderRadius: '20px',
                border: '2px dashed #e5e7eb'
              }}>
                <FileText size="48" color="#9ca3af" style={{ marginBottom: '16px' }} />
                <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', margin: '0 0 8px' }}>
                  No applications yet
                </h4>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                  When volunteers apply to your opportunities, they'll appear here
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recentApplications.map((app) => {
                  const statusColors = getStatusColor(app.status);
                  
                  return (
                    <div
                      key={app._id}
                      style={{
                        padding: '16px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '16px',
                        background: '#f9fafb',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#111111';
                        e.currentTarget.style.transform = 'translateX(4px)';
                        e.currentTarget.style.boxShadow = '0 8px 16px -8px rgba(0,0,0,0.12)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, #111111 0%, #2b2b2b 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '16px',
                          fontWeight: '600'
                        }}>
                          {app.volunteer?.name?.charAt(0) || 'V'}
                        </div>
                        <div>
                          <p style={{
                            fontWeight: '600',
                            color: '#1f2937',
                            margin: '0 0 4px',
                            fontSize: '15px'
                          }}>
                            {app.volunteer?.name}
                          </p>
                          <p style={{
                            fontSize: '13px',
                            color: '#6b7280',
                            margin: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <Briefcase size="12" color="#9ca3af" />
                            {app.opportunity?.title}
                          </p>
                        </div>
                      </div>

                      <span style={{
                        padding: '6px 14px',
                        borderRadius: '30px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: statusColors.bg,
                        color: statusColors.text,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <span style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: statusColors.dot,
                          display: 'inline-block'
                        }} />
                        {app.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* QUICK ACTIONS */}
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              color: '#1f2937', 
              margin: '0 0 20px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px'
            }}>
              <PlusCircle size={22} color="#111111" />
              Quick Actions
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px'
            }}>
              <button
                onClick={() => navigate("/create-opportunity")}
                style={{
                  padding: '16px 24px',
                  background: 'linear-gradient(135deg, #111111 0%, #2b2b2b 100%)',
                  border: 'none',
                  borderRadius: '30px',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 8px 16px -6px rgba(0,0,0,0.22)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.02)';
                  e.target.style.boxShadow = '0 12px 24px -8px rgba(0,0,0,0.28)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 8px 16px -6px rgba(0,0,0,0.22)';
                }}
              >
                <PlusCircle size={18} />
                Create Opportunity
              </button>

              <button
                onClick={() => navigate("/messages")}
                style={{
                  padding: '16px 24px',
                  background: 'transparent',
                  border: '2px solid #e5e7eb',
                  borderRadius: '30px',
                  color: '#4b5563',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#f3f4f6';
                  e.target.style.borderColor = '#111111';
                  e.target.style.color = '#111111';
                  e.target.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.color = '#4b5563';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <Mail size={18} />
                View Messages
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


