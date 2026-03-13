import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";

// Create a beautiful SVG logo for SkillBridge
const SkillBridgeLogo = ({ className, size = 40 }) => (
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

const Login = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("volunteer");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const endpoint =
        role === "ngo" ? "/ngo/login" : "/volunteer/login";

      const res = await api.post(endpoint, {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "ngo") navigate("/ngo-dashboard");
      else navigate("/volunteer-dashboard");

    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      margin: 0,
      padding: '20px',
      zIndex: 9999,
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        width: '280px',
        height: '280px',
        borderRadius: '50%',
        background: 'rgba(37, 99, 235, 0.03)',
        top: '-80px',
        right: '-80px',
        animation: 'float 25s infinite ease-in-out'
      }} />
      <div style={{
        position: 'absolute',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'rgba(37, 99, 235, 0.03)',
        bottom: '-120px',
        left: '-120px',
        animation: 'float 30s infinite ease-in-out reverse'
      }} />
      
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: 'rgba(37, 99, 235, 0.02)',
        top: '15%',
        left: '8%',
        animation: 'pulseGlow 8s infinite ease-in-out'
      }} />
      <div style={{
        position: 'absolute',
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        background: 'rgba(37, 99, 235, 0.02)',
        bottom: '8%',
        right: '10%',
        animation: 'pulseGlow 10s infinite ease-in-out reverse'
      }} />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(25px, -25px) rotate(120deg); }
          66% { transform: translate(-15px, 15px) rotate(240deg); }
        }
        
        @keyframes pulseGlow {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.02;
          }
          50% { 
            transform: scale(1.15);
            opacity: 0.04;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(25px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { background-position: -800px 0; }
          100% { background-position: 800px 0; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div style={{
        width: '100%',
        maxWidth: '420px',
        margin: '0 auto',
        animation: 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '28px',
          boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          transform: 'translateY(0)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 30px 50px -15px rgba(37, 99, 235, 0.25)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 20px 40px -12px rgba(0, 0, 0, 0.2)';
        }}>
          
          {/* Header - Reduced height */}
          <div style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #2563eb 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 10s ease infinite',
            padding: '24px 24px 20px',
            textAlign: 'center',
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
              backgroundSize: '800px 100%',
              animation: 'shimmer 6s infinite linear'
            }} />
            
            {/* Decorative circles */}
            <div style={{
              position: 'absolute',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              top: '-50px',
              right: '-50px',
              animation: 'pulseGlow 8s infinite'
            }} />
            <div style={{
              position: 'absolute',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              bottom: '-30px',
              left: '-30px',
              animation: 'pulseGlow 10s infinite reverse'
            }} />
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '10px',
              position: 'relative',
              animation: 'slideInRight 0.5s ease-out'
            }}>
              {/* Logo */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(5px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 12px -4px rgba(0,0,0,0.15)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'rotate(5deg) scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
              }}>
                <SkillBridgeLogo size={32} />
              </div>
              
              <h1 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: 'white',
                margin: 0,
                letterSpacing: '-0.5px',
                textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                SkillBridge
              </h1>
            </div>
            
            <h2 style={{
              fontSize: '22px',
              fontWeight: '700',
              color: 'white',
              margin: '0 0 4px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              animation: 'fadeIn 0.6s ease-out 0.2s both'
            }}>
              Welcome Back! 🥰
            </h2>
            
            <p style={{
              color: 'rgba(255,255,255,0.95)',
              fontSize: '13px',
              margin: 0,
              fontWeight: '400',
              animation: 'fadeIn 0.6s ease-out 0.3s both',
              letterSpacing: '0.2px'
            }}>
              Sign in to continue your journey with us
            </p>
          </div>

          {/* Form Section - Optimized spacing */}
          <div style={{ padding: '24px 24px 28px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Role Selection */}
              <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.4px'
                }}>
                  LOGIN AS
                </label>
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setRole("volunteer")}
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      borderRadius: '14px',
                      fontWeight: '600',
                      fontSize: '13px',
                      border: '2px solid',
                      borderColor: role === "volunteer" ? '#2563eb' : '#e5e7eb',
                      cursor: 'pointer',
                      backgroundColor: role === "volunteer" ? '#2563eb' : 'white',
                      color: role === "volunteer" ? 'white' : '#4b5563',
                      transition: 'all 0.2s ease',
                      transform: role === "volunteer" ? 'scale(1.01)' : 'scale(1)',
                      boxShadow: role === "volunteer" ? '0 6px 12px -6px rgba(37, 99, 235, 0.3)' : '0 2px 4px rgba(0,0,0,0.02)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                    onMouseEnter={(e) => {
                      if(role !== "volunteer") {
                        e.target.style.backgroundColor = '#f8fafc';
                        e.target.style.borderColor = '#2563eb';
                        e.target.style.transform = 'scale(1.01)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if(role !== "volunteer") {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    Volunteer
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setRole("ngo")}
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      borderRadius: '14px',
                      fontWeight: '600',
                      fontSize: '13px',
                      border: '2px solid',
                      borderColor: role === "ngo" ? '#2563eb' : '#e5e7eb',
                      cursor: 'pointer',
                      backgroundColor: role === "ngo" ? '#2563eb' : 'white',
                      color: role === "ngo" ? 'white' : '#4b5563',
                      transition: 'all 0.2s ease',
                      transform: role === "ngo" ? 'scale(1.01)' : 'scale(1)',
                      boxShadow: role === "ngo" ? '0 6px 12px -6px rgba(37, 99, 235, 0.3)' : '0 2px 4px rgba(0,0,0,0.02)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                    onMouseEnter={(e) => {
                      if(role !== "ngo") {
                        e.target.style.backgroundColor = '#f8fafc';
                        e.target.style.borderColor = '#2563eb';
                        e.target.style.transform = 'scale(1.01)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if(role !== "ngo") {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 7V3H2v14h5v4h14V7h-9zm-8 8v-2h2v2H4zm0-4V9h2v2H4zm0-4V5h2v2H4zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2z"/>
                    </svg>
                    NGO
                  </button>
                </div>
              </div>

              {/* Email Field */}
              <div style={{ animation: 'fadeIn 0.5s ease-out 0.1s both' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '5px'
                }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <svg style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '16px',
                    height: '16px',
                    color: '#9ca3af',
                    transition: 'color 0.2s ease',
                    zIndex: 1
                  }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    style={{
                      width: '100%',
                      padding: '11px 12px 11px 36px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '14px',
                      fontSize: '13px',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      boxSizing: 'border-box',
                      backgroundColor: '#fafafa'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2563eb';
                      e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
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
                {errors.email && (
                  <p style={{ 
                    color: '#ef4444', 
                    fontSize: '11px', 
                    marginTop: '4px', 
                    fontWeight: '500'
                  }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div style={{ animation: 'fadeIn 0.5s ease-out 0.15s both' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '5px'
                }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <svg style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '16px',
                    height: '16px',
                    color: '#9ca3af',
                    transition: 'color 0.2s ease',
                    zIndex: 1
                  }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    style={{
                      width: '100%',
                      padding: '11px 12px 11px 36px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '14px',
                      fontSize: '13px',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      boxSizing: 'border-box',
                      backgroundColor: '#fafafa'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2563eb';
                      e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
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
                {errors.password && (
                  <p style={{ 
                    color: '#ef4444', 
                    fontSize: '11px', 
                    marginTop: '4px', 
                    fontWeight: '500'
                  }}>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div style={{ 
                textAlign: 'right', 
                marginTop: '-4px',
                animation: 'fadeIn 0.5s ease-out 0.2s both'
              }}>
                <button
                  type="button"
                  style={{
                    fontSize: '12px',
                    color: '#2563eb',
                    fontWeight: '600',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    padding: '4px 8px',
                    borderRadius: '20px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#eff6ff';
                    e.target.style.gap = '6px';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.gap = '4px';
                  }}
                >
                  <span>Forgot password?</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  color: 'white',
                  padding: '12px 20px',
                  borderRadius: '30px',
                  fontWeight: '700',
                  fontSize: '14px',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: loading ? 0.7 : 1,
                  transform: 'scale(1)',
                  boxShadow: '0 8px 16px -6px rgba(37, 99, 235, 0.4)',
                  letterSpacing: '0.3px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  animation: 'fadeIn 0.5s ease-out 0.25s both',
                  marginTop: '4px'
                }}
                onMouseEnter={(e) => {
                  if(!loading) {
                    e.target.style.transform = 'scale(1.01)';
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
                    <svg style={{ 
                      animation: 'spin 1s linear infinite', 
                      width: '16px', 
                      height: '16px' 
                    }} viewBox="0 0 24 24">
                      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>

              {/* Register Link */}
              <p style={{
                textAlign: 'center',
                color: '#6b7280',
                fontSize: '13px',
                margin: '8px 0 0',
                animation: 'fadeIn 0.5s ease-out 0.3s both',
                position: 'relative',
                paddingTop: '12px'
              }}>
                <span style={{
                  position: 'absolute',
                  top: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '50px',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, #e5e7eb, transparent)'
                }} />
                
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  style={{
                    color: '#2563eb',
                    fontWeight: '700',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    borderBottom: '1px solid transparent',
                    padding: '2px 0',
                    marginLeft: '4px',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderBottomColor = '#2563eb';
                    e.target.style.color = '#1d4ed8';
                    e.target.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderBottomColor = 'transparent';
                    e.target.style.color = '#2563eb';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  Create account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;