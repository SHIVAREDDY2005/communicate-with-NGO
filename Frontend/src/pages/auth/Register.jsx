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

const predefinedSkills = [
  "Web Development",
  "UI/UX Design",
  "Graphic Design",
  "Content Writing",
  "Digital Marketing",
  "Video Editing",
  "Teaching",
  "Data Analysis",
  "Photography",
  "App Development",
];

const Register = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("volunteer");
  const [skills, setSkills] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const toggleSkill = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    const fullName = e.target.fullName?.value;
    const orgName = e.target.orgName?.value;
    const email = e.target.email?.value;
    const password = e.target.password?.value;
    const confirmPassword = e.target.confirmPassword?.value;
    const location = e.target.location?.value;
    const description = e.target.description?.value;
    const website = e.target.website?.value;

    if (!email) newErrors.email = "Email required";
    if (!password) newErrors.password = "Password required";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (role === "volunteer") {
      if (!fullName) newErrors.fullName = "Full name required";
      if (skills.length === 0)
        newErrors.skills = "Select at least one skill";
    }

    if (role === "ngo") {
      if (!orgName) newErrors.orgName = "Organization name required";
      if (!location) newErrors.location = "Location required";
      if (!description) newErrors.description = "Description required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);

        if (role === "ngo") {
          await api.post("/ngo/register", {
            organizationName: orgName,
            email,
            password,
            location,
            description,
            website,
          });
        } else {
          await api.post("/volunteer/register", {
            name: fullName,
            email,
            password,
            location,
            skills,
          });
        }

        alert("Registered Successfully!");
        navigate("/login");

      } catch (error) {
        alert(error.response?.data?.message || "Registration failed");
      } finally {
        setLoading(false);
      }
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
      padding: '16px',
      zIndex: 9999,
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        background: 'rgba(37, 99, 235, 0.03)',
        top: '-70px',
        right: '-70px',
        animation: 'float 25s infinite ease-in-out'
      }} />
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'rgba(37, 99, 235, 0.03)',
        bottom: '-100px',
        left: '-100px',
        animation: 'float 30s infinite ease-in-out reverse'
      }} />
      
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'rgba(37, 99, 235, 0.02)',
        top: '10%',
        left: '5%',
        animation: 'pulseGlow 8s infinite ease-in-out'
      }} />
      <div style={{
        position: 'absolute',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: 'rgba(37, 99, 235, 0.02)',
        bottom: '5%',
        right: '8%',
        animation: 'pulseGlow 10s infinite ease-in-out reverse'
      }} />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(20px, -20px) rotate(120deg); }
          66% { transform: translate(-12px, 12px) rotate(240deg); }
        }
        
        @keyframes pulseGlow {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.02;
          }
          50% { 
            transform: scale(1.1);
            opacity: 0.04;
          }
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
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { background-position: -600px 0; }
          100% { background-position: 600px 0; }
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

        /* Custom scrollbar for form */
        .form-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .form-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .form-scroll::-webkit-scrollbar-thumb {
          background: #2563eb;
          border-radius: 10px;
        }
        .form-scroll::-webkit-scrollbar-thumb:hover {
          background: #1d4ed8;
        }

        /* Custom scrollbar for skills */
        .skills-scroll::-webkit-scrollbar {
          width: 3px;
        }
        .skills-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .skills-scroll::-webkit-scrollbar-thumb {
          background: #2563eb;
          border-radius: 10px;
        }
      `}</style>

      <div style={{
        width: '100%',
        maxWidth: '420px',
        margin: '0 auto',
        animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          transform: 'translateY(0)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 25px 45px -15px rgba(37, 99, 235, 0.25)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 20px 40px -12px rgba(0, 0, 0, 0.2)';
        }}>
          
          {/* Header - Compact */}
          <div style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #2563eb 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 10s ease infinite',
            padding: '20px 20px 16px',
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
              backgroundSize: '600px 100%',
              animation: 'shimmer 5s infinite linear'
            }} />
            
            {/* Decorative circles */}
            <div style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              top: '-40px',
              right: '-40px',
              animation: 'pulseGlow 8s infinite'
            }} />
            <div style={{
              position: 'absolute',
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              bottom: '-25px',
              left: '-25px',
              animation: 'pulseGlow 10s infinite reverse'
            }} />
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '8px',
              position: 'relative'
            }}>
              {/* Logo */}
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(5px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px -4px rgba(0,0,0,0.15)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'rotate(5deg) scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
              }}>
                <SkillBridgeLogo size={28} />
              </div>
              
              <h1 style={{
                fontSize: '24px',
                fontWeight: '800',
                color: 'white',
                margin: 0,
                letterSpacing: '-0.3px',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                SkillBridge
              </h1>
            </div>
            
            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: 'white',
              margin: '0 0 2px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}>
              Create Your Account 🚀
            </h2>
            
            <p style={{
              color: 'rgba(255,255,255,0.95)',
              fontSize: '12px',
              margin: 0,
              fontWeight: '400',
              letterSpacing: '0.2px'
            }}>
              Join our community of changemakers
            </p>
          </div>

          {/* Form Section - Scrollable with compact height */}
          <div className="form-scroll" style={{ 
            padding: '16px 20px 20px',
            maxHeight: '380px',
            overflowY: 'auto'
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* JOIN AS */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px'
                }}>
                  JOIN AS
                </label>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setRole("volunteer")}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '30px',
                      fontWeight: '600',
                      fontSize: '12px',
                      border: '2px solid',
                      borderColor: role === "volunteer" ? '#2563eb' : '#e5e7eb',
                      cursor: 'pointer',
                      backgroundColor: role === "volunteer" ? '#2563eb' : 'white',
                      color: role === "volunteer" ? 'white' : '#4b5563',
                      transition: 'all 0.2s ease',
                      transform: role === "volunteer" ? 'scale(1.01)' : 'scale(1)',
                      boxShadow: role === "volunteer" ? '0 4px 8px -4px rgba(37, 99, 235, 0.3)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                    onMouseEnter={(e) => {
                      if(role !== "volunteer") {
                        e.target.style.backgroundColor = '#f8fafc';
                        e.target.style.borderColor = '#2563eb';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if(role !== "volunteer") {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.borderColor = '#e5e7eb';
                      }
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    Volunteer
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setRole("ngo")}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '30px',
                      fontWeight: '600',
                      fontSize: '12px',
                      border: '2px solid',
                      borderColor: role === "ngo" ? '#2563eb' : '#e5e7eb',
                      cursor: 'pointer',
                      backgroundColor: role === "ngo" ? '#2563eb' : 'white',
                      color: role === "ngo" ? 'white' : '#4b5563',
                      transition: 'all 0.2s ease',
                      transform: role === "ngo" ? 'scale(1.01)' : 'scale(1)',
                      boxShadow: role === "ngo" ? '0 4px 8px -4px rgba(37, 99, 235, 0.3)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                    onMouseEnter={(e) => {
                      if(role !== "ngo") {
                        e.target.style.backgroundColor = '#f8fafc';
                        e.target.style.borderColor = '#2563eb';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if(role !== "ngo") {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.borderColor = '#e5e7eb';
                      }
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 7V3H2v14h5v4h14V7h-9zm-8 8v-2h2v2H4zm0-4V9h2v2H4zm0-4V5h2v2H4zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2z"/>
                    </svg>
                    NGO
                  </button>
                </div>
              </div>

              {/* VOLUNTEER FORM */}
              {role === "volunteer" && (
                <>
                  {/* Full Name */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}>
                      Full Name
                    </label>
                    <div style={{ position: 'relative' }}>
                      <svg style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '14px',
                        height: '14px',
                        color: '#9ca3af',
                        transition: 'color 0.2s ease',
                        zIndex: 1
                      }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <input
                        name="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        style={{
                          width: '100%',
                          padding: '10px 12px 10px 36px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '30px',
                          fontSize: '12px',
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
                    {errors.fullName && (
                      <p style={{ 
                        color: '#ef4444', 
                        fontSize: '10px', 
                        marginTop: '2px', 
                        fontWeight: '500',
                        marginLeft: '4px'
                      }}>
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}>
                      Email Address
                    </label>
                    <div style={{ position: 'relative' }}>
                      <svg style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '14px',
                        height: '14px',
                        color: '#9ca3af',
                        transition: 'color 0.2s ease',
                        zIndex: 1
                      }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        defaultValue="naveenbajjuri2818@gmail.com"
                        style={{
                          width: '100%',
                          padding: '10px 12px 10px 36px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '30px',
                          fontSize: '12px',
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
                        fontSize: '10px', 
                        marginTop: '2px', 
                        fontWeight: '500',
                        marginLeft: '4px'
                      }}>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}>
                      Location
                    </label>
                    <div style={{ position: 'relative' }}>
                      <svg style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '14px',
                        height: '14px',
                        color: '#9ca3af',
                        transition: 'color 0.2s ease',
                        zIndex: 1
                      }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <input
                        name="location"
                        type="text"
                        placeholder="Enter your location"
                        style={{
                          width: '100%',
                          padding: '10px 12px 10px 36px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '30px',
                          fontSize: '12px',
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
                  </div>

                  {/* Skills */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '6px'
                    }}>
                      Skills (Select at least one)
                    </label>
                    <div className="skills-scroll" style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      padding: '10px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '16px',
                      backgroundColor: '#fafafa',
                      maxHeight: '80px',
                      overflowY: 'auto'
                    }}>
                      {predefinedSkills.map((skill) => (
                        <span
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          style={{
                            padding: '5px 12px',
                            borderRadius: '30px',
                            fontSize: '11px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            backgroundColor: skills.includes(skill) ? '#2563eb' : '#e5e7eb',
                            color: skills.includes(skill) ? 'white' : '#374151',
                            transition: 'all 0.2s ease',
                            boxShadow: skills.includes(skill) ? '0 2px 6px -2px rgba(37, 99, 235, 0.3)' : 'none'
                          }}
                          onMouseEnter={(e) => {
                            if(!skills.includes(skill)) {
                              e.target.style.backgroundColor = '#d1d5db';
                              e.target.style.transform = 'scale(1.02)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if(!skills.includes(skill)) {
                              e.target.style.backgroundColor = '#e5e7eb';
                              e.target.style.transform = 'scale(1)';
                            }
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    {errors.skills && (
                      <p style={{ 
                        color: '#ef4444', 
                        fontSize: '10px', 
                        marginTop: '2px', 
                        fontWeight: '500',
                        marginLeft: '4px'
                      }}>
                        {errors.skills}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* NGO FORM */}
              {role === "ngo" && (
                <>
                  {/* Organization Name */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}>
                      Organization Name
                    </label>
                    <div style={{ position: 'relative' }}>
                      <svg style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '14px',
                        height: '14px',
                        color: '#9ca3af',
                        transition: 'color 0.2s ease',
                        zIndex: 1
                      }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <input
                        name="orgName"
                        type="text"
                        placeholder="Enter organization name"
                        style={{
                          width: '100%',
                          padding: '10px 12px 10px 36px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '30px',
                          fontSize: '12px',
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
                    {errors.orgName && (
                      <p style={{ 
                        color: '#ef4444', 
                        fontSize: '10px', 
                        marginTop: '2px', 
                        fontWeight: '500',
                        marginLeft: '4px'
                      }}>
                        {errors.orgName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}>
                      Organization Email
                    </label>
                    <div style={{ position: 'relative' }}>
                      <svg style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '14px',
                        height: '14px',
                        color: '#9ca3af',
                        transition: 'color 0.2s ease',
                        zIndex: 1
                      }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <input
                        name="email"
                        type="email"
                        placeholder="Enter organization email"
                        defaultValue="naveenbajjuri2818@gmail.com"
                        style={{
                          width: '100%',
                          padding: '10px 12px 10px 36px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '30px',
                          fontSize: '12px',
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
                  </div>

                  {/* Location */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}>
                      Organization Location
                    </label>
                    <div style={{ position: 'relative' }}>
                      <svg style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '14px',
                        height: '14px',
                        color: '#9ca3af',
                        transition: 'color 0.2s ease',
                        zIndex: 1
                      }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <input
                        name="location"
                        type="text"
                        placeholder="Enter organization location"
                        style={{
                          width: '100%',
                          padding: '10px 12px 10px 36px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '30px',
                          fontSize: '12px',
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
                    {errors.location && (
                      <p style={{ 
                        color: '#ef4444', 
                        fontSize: '10px', 
                        marginTop: '2px', 
                        fontWeight: '500',
                        marginLeft: '4px'
                      }}>
                        {errors.location}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}>
                      Description
                    </label>
                    <textarea
                      name="description"
                      placeholder="Describe your organization's mission"
                      rows="2"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '16px',
                        fontSize: '12px',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        boxSizing: 'border-box',
                        backgroundColor: '#fafafa',
                        resize: 'vertical',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#2563eb';
                        e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                        e.target.style.backgroundColor = 'white';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                        e.target.style.backgroundColor = '#fafafa';
                      }}
                    />
                    {errors.description && (
                      <p style={{ 
                        color: '#ef4444', 
                        fontSize: '10px', 
                        marginTop: '2px', 
                        fontWeight: '500',
                        marginLeft: '4px'
                      }}>
                        {errors.description}
                      </p>
                    )}
                  </div>

                  {/* Website */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}>
                      Website (Optional)
                    </label>
                    <div style={{ position: 'relative' }}>
                      <svg style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '14px',
                        height: '14px',
                        color: '#9ca3af',
                        transition: 'color 0.2s ease',
                        zIndex: 1
                      }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <input
                        name="website"
                        type="text"
                        placeholder="https://example.org"
                        style={{
                          width: '100%',
                          padding: '10px 12px 10px 36px',
                          border: '2px solid #e5e7eb',
                          borderRadius: '30px',
                          fontSize: '12px',
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
                  </div>
                </>
              )}

              {/* Password Fields - Common for both */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '4px'
                }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <svg style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '14px',
                    height: '14px',
                    color: '#9ca3af',
                    transition: 'color 0.2s ease',
                    zIndex: 1
                  }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 36px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '30px',
                      fontSize: '12px',
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
                    fontSize: '10px', 
                    marginTop: '2px', 
                    fontWeight: '500',
                    marginLeft: '4px'
                  }}>
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '4px'
                }}>
                  Confirm Password
                </label>
                <div style={{ position: 'relative' }}>
                  <svg style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '14px',
                    height: '14px',
                    color: '#9ca3af',
                    transition: 'color 0.2s ease',
                    zIndex: 1
                  }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 36px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '30px',
                      fontSize: '12px',
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
                {errors.confirmPassword && (
                  <p style={{ 
                    color: '#ef4444', 
                    fontSize: '10px', 
                    marginTop: '2px', 
                    fontWeight: '500',
                    marginLeft: '4px'
                  }}>
                    {errors.confirmPassword}
                  </p>
                )}
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
                  fontSize: '13px',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: loading ? 0.7 : 1,
                  transform: 'scale(1)',
                  boxShadow: '0 6px 14px -6px rgba(37, 99, 235, 0.4)',
                  letterSpacing: '0.3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  marginTop: '4px'
                }}
                onMouseEnter={(e) => {
                  if(!loading) {
                    e.target.style.transform = 'scale(1.01)';
                    e.target.style.boxShadow = '0 10px 18px -8px rgba(37, 99, 235, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if(!loading) {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 6px 14px -6px rgba(37, 99, 235, 0.4)';
                  }
                }}
              >
                {loading ? (
                  <>
                    <svg style={{ animation: 'spin 1s linear infinite', width: '14px', height: '14px' }} viewBox="0 0 24 24">
                      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    Create Account
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>

              {/* Login Link */}
              <p style={{
                textAlign: 'center',
                color: '#6b7280',
                fontSize: '11px',
                margin: '8px 0 0',
                position: 'relative',
                paddingTop: '8px'
              }}>
                <span style={{
                  position: 'absolute',
                  top: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '40px',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, #e5e7eb, transparent)'
                }} />
                
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  style={{
                    color: '#2563eb',
                    fontWeight: '700',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    borderBottom: '1px solid transparent',
                    padding: '1px 0',
                    marginLeft: '4px',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderBottomColor = '#2563eb';
                    e.target.style.color = '#1d4ed8';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderBottomColor = 'transparent';
                    e.target.style.color = '#2563eb';
                  }}
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;