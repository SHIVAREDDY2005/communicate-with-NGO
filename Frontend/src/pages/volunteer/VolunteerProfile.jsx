import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";
import { useEffect, useState } from "react";
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

// Predefined skills from register page
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

export default function VolunteerProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    skills: []
  });

  const [originalForm, setOriginalForm] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await api.get("/user/me");
        setForm(res.data);
        setOriginalForm(res.data);
      } catch (err) {
        console.log("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setForm(originalForm);
    setIsEditing(false);
  };

  // Toggle skill selection (add/remove)
  const toggleSkill = (skill) => {
    if (form.skills.includes(skill)) {
      // Remove skill
      setForm({
        ...form,
        skills: form.skills.filter((s) => s !== skill)
      });
    } else {
      // Add skill
      setForm({
        ...form,
        skills: [...form.skills, skill]
      });
    }
  };

  const save = async () => {
    try {
      setLoading(true);
      await api.put("/user/profile", form);
      
      // Update localStorage with new user data
      const currentUser = JSON.parse(localStorage.getItem("user")) || {};
      const updatedUser = {
        ...currentUser,
        name: form.name,
        location: form.location,
        skills: form.skills
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      setOriginalForm(form);
      setSuccessMsg("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.log("Error updating profile:", err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !form.name) {
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
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}</style>

        <Navbar />
        <div className="dashboard-body" style={{ display: 'flex', position: 'relative', zIndex: 1 }}>
          <Sidebar />
          <div className="main-content" style={{ 
  flex: 1, 
  padding: '28px',
  marginLeft: '260px',   // ⭐ add this line
  overflowY: 'auto',
  display: 'flex',
  justifyContent: 'center',
  animation: 'slideUp 0.6s ease-out'
}}>
            <div style={{
              background: 'white',
              borderRadius: '28px',
              padding: '60px',
              boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(10px)',
              textAlign: 'center'
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
                animation: 'spin 2s infinite linear'
              }}>
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 6v6l4 2" strokeLinecap="round"/>
                  <circle cx="12" cy="12" r="10"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1f2937', margin: '0 0 8px' }}>
                Loading Your Profile
              </h3>
              <p style={{ fontSize: '15px', color: '#6b7280', margin: 0 }}>
                Please wait while we fetch your information...
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
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
          animation: 'slideUp 0.6s ease-out'
        }}>
          <div className="card max-w-xl" style={{
            background: 'white',
            borderRadius: '28px',
            padding: '32px',
            boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
            backdropFilter: 'blur(10px)',
            width: '100%',
            maxWidth: '600px',
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
              margin: '-32px -32px 24px -32px',
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
                gap: '20px',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '24px',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                  border: '2px solid rgba(255,255,255,0.3)'
                }}>
                  <SkillBridgeLogo size={48} />
                </div>
                <div>
                  <h3 style={{ 
                    fontSize: '28px', 
                    fontWeight: '800', 
                    margin: '0 0 6px',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.15)',
                    letterSpacing: '-0.5px'
                  }}>
                    Volunteer Profile
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
                    {isEditing ? 'Edit your personal information and skills' : 'View and manage your profile'}
                  </p>
                </div>
              </div>

              {/* Avatar overlay */}
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                right: '30px',
                width: '100px',
                height: '100px',
                borderRadius: '30px',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                fontWeight: '800',
                color: 'white',
                border: '4px solid rgba(255,255,255,0.3)',
                boxShadow: '0 15px 30px -10px rgba(0,0,0,0.3)',
                zIndex: 2
              }}>
                {form.name?.charAt(0).toUpperCase() || 'V'}
              </div>
            </div>

            {/* Success Message */}
            {successMsg && (
              <div style={{
                padding: '16px 20px',
                background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
                border: '1px solid #6ee7b7',
                boxShadow: '0 8px 16px -8px rgba(16, 185, 129, 0.3)',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '12px',
                  background: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  boxShadow: '0 4px 10px -4px #10b981'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: '15px', color: '#065f46', margin: 0, fontWeight: '600' }}>
                    Success!
                  </p>
                  <p style={{ fontSize: '13px', color: '#047857', margin: '2px 0 0' }}>
                    {successMsg}
                  </p>
                </div>
              </div>
            )}

            {/* Form Fields */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Full Name */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#374151',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px'
                }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <svg style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '18px',
                    height: '18px',
                    color: '#9ca3af',
                    transition: 'color 0.2s ease',
                    zIndex: 1
                  }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {isEditing ? (
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
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
                  ) : (
                    <div style={{
                      width: '100%',
                      padding: '14px 14px 14px 45px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '30px',
                      fontSize: '14px',
                      backgroundColor: '#f9fafb',
                      color: '#1f2937',
                      fontWeight: '500'
                    }}>
                      {form.name || "Not provided"}
                    </div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#374151',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px'
                }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <svg style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '18px',
                    height: '18px',
                    color: '#9ca3af',
                    zIndex: 1
                  }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div style={{
                    width: '100%',
                    padding: '14px 14px 14px 45px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '30px',
                    fontSize: '14px',
                    backgroundColor: '#f3f4f6',
                    color: '#6b7280',
                    cursor: 'not-allowed',
                    fontWeight: '500'
                  }}>
                    {form.email}
                  </div>
                </div>
                <p style={{ fontSize: '11px', color: '#6b7280', marginTop: '6px', marginLeft: '4px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#6b7280" style={{ display: 'inline', marginRight: '4px' }}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Email cannot be changed
                </p>
              </div>

              {/* Location */}
              <div style={{ marginBottom: '24px' }}>
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
                  <svg style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '18px',
                    height: '18px',
                    color: '#9ca3af',
                    transition: 'color 0.2s ease',
                    zIndex: 1
                  }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {isEditing ? (
                    <input
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="Enter your location"
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
                  ) : (
                    <div style={{
                      width: '100%',
                      padding: '14px 14px 14px 45px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '30px',
                      fontSize: '14px',
                      backgroundColor: '#f9fafb',
                      color: '#1f2937',
                      fontWeight: '500'
                    }}>
                      {form.location || "Not provided"}
                    </div>
                  )}
                </div>
              </div>

              {/* Skills Section */}
              <div style={{ marginBottom: '32px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#374151',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px'
                }}>
                  Your Skills
                </label>
                
                {/* Selected Skills Display */}
                <div style={{
                  padding: '20px',
                  background: '#f9fafb',
                  borderRadius: '20px',
                  border: '2px solid #e5e7eb',
                  minHeight: form.skills.length > 0 ? 'auto' : '100px',
                  marginBottom: isEditing ? '20px' : '0'
                }}>
                  {form.skills && form.skills.length > 0 ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {form.skills.map((skill, index) => (
                        <span key={index} style={{
                          padding: '8px 18px',
                          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                          borderRadius: '30px',
                          fontSize: '13px',
                          fontWeight: '600',
                          color: '#2563eb',
                          border: '1px solid #bfdbfe',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          boxShadow: '0 4px 10px -4px rgba(37, 99, 235, 0.2)',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.02)';
                          e.currentTarget.style.boxShadow = '0 6px 14px -4px rgba(37, 99, 235, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = '0 4px 10px -4px rgba(37, 99, 235, 0.2)';
                        }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="#2563eb">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          {skill}
                          {isEditing && (
                            <button
                              onClick={() => toggleSkill(skill)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0',
                                marginLeft: '4px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                color: '#ef4444',
                                transition: 'transform 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.2)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                              }}
                              title="Remove skill"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
                              </svg>
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%'
                    }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="#9ca3af">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <p style={{ fontSize: '13px', color: '#9ca3af', margin: '8px 0 0' }}>
                        {isEditing ? 'Click on skills below to add them' : 'No skills added yet'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Available Skills to Add (only in edit mode) */}
                {isEditing && (
                  <>
                    <p style={{ 
                      fontSize: '13px', 
                      fontWeight: '600', 
                      color: '#374151', 
                      margin: '20px 0 10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#2563eb">
                        <path d="M12 4v16M20 12H4" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Available Skills (click to add)
                    </p>
                    <div style={{
                      padding: '20px',
                      background: '#f9fafb',
                      borderRadius: '20px',
                      border: '2px dashed #2563eb',
                      maxHeight: '160px',
                      overflowY: 'auto'
                    }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {predefinedSkills
                          .filter(skill => !form.skills.includes(skill))
                          .map((skill, index) => (
                            <span
                              key={index}
                              onClick={() => toggleSkill(skill)}
                              style={{
                                padding: '8px 18px',
                                background: 'white',
                                borderRadius: '30px',
                                fontSize: '13px',
                                fontWeight: '500',
                                color: '#4b5563',
                                border: '2px solid #e5e7eb',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.background = '#eff6ff';
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
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 4v16M20 12H4" strokeLinecap="round"/>
                              </svg>
                              {skill}
                            </span>
                          ))}
                        
                        {/* If all skills are selected */}
                        {predefinedSkills.filter(skill => !form.skills.includes(skill)).length === 0 && (
                          <div style={{ textAlign: 'center', width: '100%', padding: '16px' }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="#10b981" style={{ marginBottom: '8px' }}>
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            <p style={{ fontSize: '13px', color: '#10b981', fontWeight: '600', margin: 0 }}>
                              You've added all available skills!
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <p style={{ 
                      fontSize: '11px', 
                      color: '#6b7280', 
                      marginTop: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#6b7280">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                      Click on any skill above to add it. Click the red ✕ on selected skills to remove them.
                    </p>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round"/>
                  </svg>
                  Edit Profile
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={save}
                    disabled={loading}
                    style={{
                      flex: 2,
                      padding: '16px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      border: 'none',
                      borderRadius: '30px',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: '700',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      opacity: loading ? 0.7 : 1,
                      boxShadow: '0 8px 16px -6px rgba(16, 185, 129, 0.4)'
                    }}
                    onMouseEnter={(e) => {
                      if(!loading) {
                        e.target.style.transform = 'scale(1.02)';
                        e.target.style.boxShadow = '0 12px 24px -8px rgba(16, 185, 129, 0.5)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if(!loading) {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = '0 8px 16px -6px rgba(16, 185, 129, 0.4)';
                      }
                    }}
                  >
                    {loading ? (
                      <>
                        <svg style={{ animation: 'spin 1s linear infinite', width: '20px', height: '20px' }} viewBox="0 0 24 24">
                          <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Save Changes
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={handleCancel}
                    disabled={loading}
                    style={{
                      flex: 1,
                      padding: '16px',
                      background: 'transparent',
                      border: '2px solid #e5e7eb',
                      borderRadius: '30px',
                      color: '#4b5563',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease',
                      opacity: loading ? 0.5 : 1
                    }}
                    onMouseEnter={(e) => {
                      if(!loading) {
                        e.target.style.background = '#f3f4f6';
                        e.target.style.borderColor = '#ef4444';
                        e.target.style.color = '#ef4444';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if(!loading) {
                        e.target.style.background = 'transparent';
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.color = '#4b5563';
                      }
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* Info Note */}
              <div style={{
                marginTop: '24px',
                padding: '16px',
                background: '#f9fafb',
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#6b7280">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
                <p style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  Your information is securely stored and protected. Only you can see and edit your profile details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}