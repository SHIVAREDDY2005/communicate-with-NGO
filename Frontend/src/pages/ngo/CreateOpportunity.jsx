import Navbar from "../../layouts/Navbar";
import NGOSidebar from "../../layouts/NGOSidebar";
import { useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Briefcase, FileText, MapPin, Tag, Users, Calendar, PlusCircle } from "lucide-react";

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

export default function CreateOpportunity() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    skillsRequired: "",
    volunteersNeeded: 1,
    applyDeadline: ""
  });

  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await api.post("/opportunity", {
        ...form,
        skillsRequired: form.skillsRequired
          .split(",")
          .map((s) => s.trim())
          .filter(s => s !== "")
      });

      alert("Opportunity created successfully!");
      navigate("/my-opportunities");
    } catch (err) {
      console.log(err);
      alert("Create failed");
    } finally {
      setLoading(false);
    }
  };

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
        marginLeft: '260px', // Same as sidebar width
        paddingTop: '70px', // Height of navbar
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ 
          padding: '24px',
          display: 'flex',
          justifyContent: 'center',
          animation: 'slideUp 0.6s ease-out'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '28px',
            padding: '32px',
            boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
            backdropFilter: 'blur(10px)',
            width: '100%',
            maxWidth: '700px',
            margin: '20px auto',
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
              margin: '-32px -32px 28px -32px',
              padding: '36px 32px',
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
                    Create Opportunity
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
                    Post a new volunteer opportunity for your organization
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 1 }}>
              
              {/* Title Field */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#374151',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px'
                }}>
                  Opportunity Title <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Briefcase style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '18px',
                    height: '18px',
                    color: '#9ca3af',
                    transition: 'color 0.2s ease',
                    zIndex: 1
                  }} />
                  <input
                    placeholder="e.g., Website Redesign for NGO"
                    value={form.title}
                    onChange={(e)=>setForm({...form,title:e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '14px 14px 14px 45px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '30px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      boxSizing: 'border-box',
                      backgroundColor: '#fafafa'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2563eb';
                      e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)';
                      e.target.style.backgroundColor = 'white';
                      e.target.previousSibling.style.color = '#2563eb';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                      e.target.style.backgroundColor = '#fafafa';
                      e.target.previousSibling.style.color = '#9ca3af';
                    }}
                  />
                </div>
              </div>

              {/* Description Field */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#374151',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px'
                }}>
                  Description <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <FileText style={{
                    position: 'absolute',
                    left: '14px',
                    top: '16px',
                    width: '18px',
                    height: '18px',
                    color: '#9ca3af',
                    transition: 'color 0.2s ease',
                    zIndex: 1
                  }} />
                  <textarea
                    placeholder="Describe the opportunity, responsibilities, and requirements"
                    value={form.description}
                    onChange={(e)=>setForm({...form,description:e.target.value})}
                    required
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '14px 14px 14px 45px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '20px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      boxSizing: 'border-box',
                      backgroundColor: '#fafafa',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                      lineHeight: '1.6'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2563eb';
                      e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)';
                      e.target.style.backgroundColor = 'white';
                      e.target.previousSibling.style.color = '#2563eb';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                      e.target.style.backgroundColor = '#fafafa';
                      e.target.previousSibling.style.color = '#9ca3af';
                    }}
                  />
                </div>
              </div>

              {/* Location Field */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#374151',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px'
                }}>
                  Location
                </label>
                <div style={{ position: 'relative' }}>
                  <MapPin style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '18px',
                    height: '18px',
                    color: '#9ca3af',
                    transition: 'color 0.2s ease',
                    zIndex: 1
                  }} />
                  <input
                    placeholder="e.g., New York, NY or Remote"
                    value={form.location}
                    onChange={(e)=>setForm({...form,location:e.target.value})}
                    style={{
                      width: '100%',
                      padding: '14px 14px 14px 45px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '30px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      boxSizing: 'border-box',
                      backgroundColor: '#fafafa'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2563eb';
                      e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)';
                      e.target.style.backgroundColor = 'white';
                      e.target.previousSibling.style.color = '#2563eb';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                      e.target.style.backgroundColor = '#fafafa';
                      e.target.previousSibling.style.color = '#9ca3af';
                    }}
                  />
                </div>
              </div>

              {/* Category Field */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#374151',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px'
                }}>
                  Category
                </label>
                <div style={{ position: 'relative' }}>
                  <Tag style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '18px',
                    height: '18px',
                    color: '#9ca3af',
                    transition: 'color 0.2s ease',
                    zIndex: 1
                  }} />
                  <input
                    placeholder="e.g., Education, Environment, Healthcare"
                    value={form.category}
                    onChange={(e)=>setForm({...form,category:e.target.value})}
                    style={{
                      width: '100%',
                      padding: '14px 14px 14px 45px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '30px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      boxSizing: 'border-box',
                      backgroundColor: '#fafafa'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2563eb';
                      e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)';
                      e.target.style.backgroundColor = 'white';
                      e.target.previousSibling.style.color = '#2563eb';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                      e.target.style.backgroundColor = '#fafafa';
                      e.target.previousSibling.style.color = '#9ca3af';
                    }}
                  />
                </div>
              </div>

              {/* Skills Required Field */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#374151',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px'
                }}>
                  Skills Required
                </label>
                <div style={{ position: 'relative' }}>
                  <Briefcase style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '18px',
                    height: '18px',
                    color: '#9ca3af',
                    transition: 'color 0.2s ease',
                    zIndex: 1
                  }} />
                  <input
                    placeholder="e.g., Web Development, Design, Writing"
                    value={form.skillsRequired}
                    onChange={(e)=>setForm({...form,skillsRequired:e.target.value})}
                    style={{
                      width: '100%',
                      padding: '14px 14px 14px 45px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '30px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      boxSizing: 'border-box',
                      backgroundColor: '#fafafa'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2563eb';
                      e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)';
                      e.target.style.backgroundColor = 'white';
                      e.target.previousSibling.style.color = '#2563eb';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                      e.target.style.backgroundColor = '#fafafa';
                      e.target.previousSibling.style.color = '#9ca3af';
                    }}
                  />
                </div>
                <p style={{ 
                  fontSize: '11px', 
                  color: '#6b7280', 
                  marginTop: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#6b7280">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  Separate multiple skills with commas
                </p>
              </div>

              {/* Volunteers Needed Field */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#374151',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px'
                }}>
                  Volunteers Needed
                </label>
                <div style={{ position: 'relative' }}>
                  <Users style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '18px',
                    height: '18px',
                    color: '#9ca3af',
                    transition: 'color 0.2s ease',
                    zIndex: 1
                  }} />
                  <input
                    type="number"
                    min="1"
                    placeholder="Number of volunteers needed"
                    value={form.volunteersNeeded}
                    onChange={(e)=>setForm({...form,volunteersNeeded:e.target.value})}
                    style={{
                      width: '100%',
                      padding: '14px 14px 14px 45px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '30px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      boxSizing: 'border-box',
                      backgroundColor: '#fafafa'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2563eb';
                      e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)';
                      e.target.style.backgroundColor = 'white';
                      e.target.previousSibling.style.color = '#2563eb';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                      e.target.style.backgroundColor = '#fafafa';
                      e.target.previousSibling.style.color = '#9ca3af';
                    }}
                  />
                </div>
              </div>

              {/* Application Deadline Field */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#374151',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px'
                }}>
                  Application Deadline
                </label>
                <div style={{ position: 'relative' }}>
                  <Calendar style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '18px',
                    height: '18px',
                    color: '#9ca3af',
                    transition: 'color 0.2s ease',
                    zIndex: 1
                  }} />
                  <input
                    type="date"
                    value={form.applyDeadline}
                    onChange={(e)=>setForm({...form,applyDeadline:e.target.value})}
                    style={{
                      width: '100%',
                      padding: '14px 14px 14px 45px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '30px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      boxSizing: 'border-box',
                      backgroundColor: '#fafafa'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2563eb';
                      e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)';
                      e.target.style.backgroundColor = 'white';
                      e.target.previousSibling.style.color = '#2563eb';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                      e.target.style.backgroundColor = '#fafafa';
                      e.target.previousSibling.style.color = '#9ca3af';
                    }}
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div style={{ 
                display: 'flex', 
                gap: '16px',
                marginTop: '24px'
              }}>
                <button 
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 2,
                    padding: '16px',
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    border: 'none',
                    borderRadius: '30px',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'all 0.2s ease',
                    opacity: loading ? 0.7 : 1,
                    boxShadow: '0 8px 16px -6px rgba(37, 99, 235, 0.4)'
                  }}
                  onMouseEnter={(e) => {
                    if(!loading) {
                      e.target.style.transform = 'scale(1.02)';
                      e.target.style.boxShadow = '0 12px 24px -8px rgba(37, 99, 235, 0.5)';
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
                      <svg style={{ animation: 'spin 1s linear infinite', width: '20px', height: '20px' }} viewBox="0 0 24 24">
                        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle size="20" />
                      Create Opportunity
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/my-opportunities")}
                  style={{
                    flex: 1,
                    padding: '16px',
                    background: 'transparent',
                    border: '2px solid #e5e7eb',
                    borderRadius: '30px',
                    color: '#4b5563',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f3f4f6';
                    e.target.style.borderColor = '#ef4444';
                    e.target.style.color = '#ef4444';
                    e.target.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.color = '#4b5563';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  Cancel
                </button>
              </div>

            </form>

            {/* Required Fields Note */}
            <div style={{
              marginTop: '24px',
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '16px',
              border: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              position: 'relative',
              zIndex: 1
            }}>
              <span style={{
                width: '20px',
                height: '20px',
                borderRadius: '6px',
                background: '#ef4444',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '700'
              }}>*</span>
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                margin: 0
              }}>
                Required fields must be filled before submitting
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}