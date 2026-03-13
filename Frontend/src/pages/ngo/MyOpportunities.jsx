import Navbar from "../../layouts/Navbar";
import NGOSidebar from "../../layouts/NGOSidebar";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Briefcase, MapPin, Calendar, Users, Tag, Edit, Trash2, PlusCircle } from "lucide-react";

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

export default function MyOpportunities() {
  const [opps, setOpps] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await api.get("/opportunity/my");
      setOpps(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    if (window.confirm("Are you sure you want to delete this opportunity?")) {
      await api.delete(`/opportunity/${id}`);
      fetch();
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
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
      <NGOSidebar />
      
      {/* Main Content - with left margin for fixed sidebar */}
      <div style={{ 
        marginLeft: '260px', // Same as sidebar width
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
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #2563eb 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 10s ease infinite',
            borderRadius: '24px',
            padding: '28px 32px',
            marginBottom: '24px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 40px -15px rgba(37, 99, 235, 0.4)'
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
                  fontSize: '28px', 
                  fontWeight: '700', 
                  margin: '0 0 6px',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                }}>
                  My Opportunities
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
                  Manage and track all your posted volunteer opportunities
                </p>
              </div>
            </div>
          </div>

          {/* Stats Summary - Enhanced */}
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
              e.currentTarget.style.boxShadow = '0 15px 30px -10px rgba(37, 99, 235, 0.2)';
              e.currentTarget.style.borderColor = '#2563eb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px -8px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 8px', fontWeight: '500' }}>Total Opportunities</p>
              <p style={{ 
                fontSize: '36px', 
                fontWeight: '800', 
                color: '#1f2937', 
                margin: 0,
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {opps.length}
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
              <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 8px', fontWeight: '500' }}>Open</p>
              <p style={{ 
                fontSize: '36px', 
                fontWeight: '800', 
                color: '#1f2937', 
                margin: 0,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {opps.filter(o => o.status === 'open').length}
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
              <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 8px', fontWeight: '500' }}>Closed</p>
              <p style={{ 
                fontSize: '36px', 
                fontWeight: '800', 
                color: '#1f2937', 
                margin: 0,
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {opps.filter(o => o.status === 'closed').length}
              </p>
            </div>
          </div>

          {/* Create New Button */}
          <div style={{ marginBottom: '28px', textAlign: 'right' }}>
            <button
              onClick={() => navigate("/create-opportunity")}
              style={{
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                border: 'none',
                borderRadius: '30px',
                color: 'white',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.2s ease',
                boxShadow: '0 8px 16px -6px rgba(37, 99, 235, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.02)';
                e.target.style.boxShadow = '0 12px 24px -8px rgba(37, 99, 235, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 8px 16px -6px rgba(37, 99, 235, 0.4)';
              }}
            >
              <PlusCircle size="20" />
              Create New Opportunity
            </button>
          </div>

          {/* Opportunities List */}
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  background: '#eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: '#2563eb'
                }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    border: '3px solid #2563eb',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                </div>
                <p style={{ fontSize: '15px', color: '#6b7280' }}>Loading opportunities...</p>
              </div>
            ) : opps.length === 0 ? (
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
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  color: '#2563eb'
                }}>
                  <Briefcase size="50" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: '0 0 8px' }}>
                  No opportunities yet
                </h3>
                <p style={{ fontSize: '15px', color: '#6b7280', margin: '0 0 24px' }}>
                  Create your first volunteer opportunity to get started
                </p>
                <button
                  onClick={() => navigate("/create-opportunity")}
                  style={{
                    padding: '14px 32px',
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    border: 'none',
                    borderRadius: '30px',
                    color: 'white',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <PlusCircle size="18" />
                  Create Opportunity
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {opps.map((o, index) => (
                  <div key={o._id} style={{
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

                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'start', 
                      marginBottom: '16px',
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
                        {o.title}
                      </h4>
                      <span style={{
                        padding: '6px 16px',
                        background: o.status === 'open' 
                          ? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' 
                          : 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                        borderRadius: '30px',
                        fontSize: '13px',
                        fontWeight: '700',
                        color: o.status === 'open' ? '#065f46' : '#991b1b',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: o.status === 'open' ? '1px solid #6ee7b7' : '1px solid #fca5a5',
                        boxShadow: o.status === 'open' 
                          ? '0 4px 10px -4px #10b981' 
                          : '0 4px 10px -4px #ef4444'
                      }}>
                        <span style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: o.status === 'open' ? '#10b981' : '#ef4444',
                          display: 'inline-block',
                          boxShadow: o.status === 'open' 
                            ? '0 0 10px #10b981' 
                            : '0 0 10px #ef4444'
                        }} />
                        {o.status === 'open' ? 'Open' : 'Closed'}
                      </span>
                    </div>

                    <p style={{ 
                      fontSize: '14px', 
                      color: '#4b5563', 
                      margin: '0 0 20px', 
                      lineHeight: '1.7',
                      position: 'relative',
                      zIndex: 1,
                      padding: '0 4px'
                    }}>
                      {o.description}
                    </p>

                    {/* Details Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '12px',
                      marginBottom: '20px',
                      padding: '16px',
                      background: '#f9fafb',
                      borderRadius: '16px',
                      border: '1px solid #e5e7eb',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '10px',
                          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <MapPin size="16" color="#2563eb" />
                        </div>
                        <div>
                          <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 2px', fontWeight: '500' }}>Location</p>
                          <p style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                            {o.location || "Remote"}
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '10px',
                          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Tag size="16" color="#2563eb" />
                        </div>
                        <div>
                          <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 2px', fontWeight: '500' }}>Category</p>
                          <p style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                            {o.category || "Not specified"}
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '10px',
                          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Users size="16" color="#2563eb" />
                        </div>
                        <div>
                          <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 2px', fontWeight: '500' }}>Volunteers Needed</p>
                          <p style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                            {o.volunteersNeeded || "Not specified"}
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '10px',
                          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Calendar size="16" color="#2563eb" />
                        </div>
                        <div>
                          <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 2px', fontWeight: '500' }}>Deadline</p>
                          <p style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                            {o.applyDeadline ? new Date(o.applyDeadline).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            }) : 'Flexible'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Skills Tags */}
                    {o.skillsRequired && o.skillsRequired.length > 0 && (
                      <div style={{ marginBottom: '20px', position: 'relative', zIndex: 1 }}>
                        <p style={{ fontSize: '12px', fontWeight: '600', color: '#374151', margin: '0 0 10px' }}>
                          Required Skills
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {o.skillsRequired.map((skill, index) => (
                            <span key={index} style={{
                              padding: '6px 16px',
                              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                              borderRadius: '30px',
                              fontSize: '12px',
                              fontWeight: '600',
                              color: '#2563eb',
                              border: '1px solid #bfdbfe',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = 'scale(1.02)';
                              e.target.style.boxShadow = '0 4px 10px -4px rgba(37, 99, 235, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = 'scale(1)';
                              e.target.style.boxShadow = 'none';
                            }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '12px',
                      borderTop: '1px solid #e5e7eb',
                      paddingTop: '20px',
                      marginTop: '8px',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      <button
                        onClick={() => navigate(`/edit-opportunity/${o._id}`)}
                        style={{
                          padding: '12px',
                          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                          border: 'none',
                          borderRadius: '30px',
                          color: 'white',
                          fontSize: '13px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 4px 10px -4px rgba(37, 99, 235, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.02)';
                          e.target.style.boxShadow = '0 8px 16px -6px rgba(37, 99, 235, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.boxShadow = '0 4px 10px -4px rgba(37, 99, 235, 0.3)';
                        }}
                      >
                        <Edit size="16" />
                        Edit
                      </button>

                      <button
                        onClick={() => remove(o._id)}
                        style={{
                          padding: '12px',
                          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                          border: 'none',
                          borderRadius: '30px',
                          color: 'white',
                          fontSize: '13px',
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
                        <Trash2 size="16" />
                        Delete
                      </button>

                      <button
                        onClick={() => navigate(`/applicants/${o._id}`)}
                        style={{
                          padding: '12px',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          border: 'none',
                          borderRadius: '30px',
                          color: 'white',
                          fontSize: '13px',
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
                        <Users size="16" />
                        Applicants
                      </button>
                    </div>
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