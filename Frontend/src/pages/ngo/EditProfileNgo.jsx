import Navbar from "../../layouts/Navbar";
import NGOSidebar from "../../layouts/NGOSidebar";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Building2, MapPin, FileText, Globe, Edit2, Save } from "lucide-react";

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

export default function EditProfileNgo() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    description: "",
    website: ""
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
        console.log("Error fetching NGO profile:", err);
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

  const save = async () => {
    try {
      setLoading(true);
      await api.put("/ngo/profile", form);
      
      // Update localStorage with new NGO data
      const currentUser = JSON.parse(localStorage.getItem("user")) || {};
      const updatedUser = {
        ...currentUser,
        name: form.name,
        location: form.location,
        description: form.description,
        website: form.website
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      setOriginalForm(form);
      setSuccessMsg("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/ngo-dashboard");
      }, 1500);
    } catch (err) {
      console.log("Error updating profile:", err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !form.name) {
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
          marginLeft: '260px',
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
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              color: '#2563eb'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '3px solid #2563eb',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: '0 0 8px' }}>
              Loading NGO Profile
            </h3>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
              Please wait while we fetch your organization information...
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
      <NGOSidebar />
      
      {/* Main Content - with left margin for fixed sidebar */}
      <div style={{ 
        marginLeft: '260px', // Same as sidebar width
        paddingTop: '70px', // Height of navbar
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '650px',
          background: 'white',
          borderRadius: '28px',
          boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)',
          border: '1px solid rgba(255,255,255,0.3)',
          backdropFilter: 'blur(10px)',
          overflow: 'hidden',
          animation: 'slideUp 0.6s ease-out',
          position: 'relative'
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
            padding: '36px 32px',
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
              zIndex: 1,
              justifyContent: 'center'
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
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: 'white',
                  margin: '0 0 6px',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                }}>
                  NGO Profile
                </h2>
                
                <p style={{
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.95)',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#10b981',
                    display: 'inline-block',
                    boxShadow: '0 0 10px #10b981'
                  }} />
                  {isEditing ? 'Edit your organization information' : 'View and manage your organization profile'}
                </p>
              </div>
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
              margin: '20px 24px 0',
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
                  {successMsg} Redirecting to dashboard...
                </p>
              </div>
            </div>
          )}

          {/* Form Section */}
          <div style={{ padding: '32px', position: 'relative', zIndex: 1 }}>
            {/* Organization Avatar Section */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '28px',
              paddingBottom: '24px',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '32px',
                fontWeight: '700',
                boxShadow: '0 10px 20px -8px rgba(37, 99, 235, 0.4)'
              }}>
                {form.name?.charAt(0) || 'N'}
              </div>
              <div>
                <h3 style={{ 
                  fontSize: '22px', 
                  fontWeight: '700', 
                  color: '#1f2937', 
                  margin: '0 0 6px',
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {form.name || "Organization Name"}
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#6b7280', 
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
                  Non-Governmental Organization
                </p>
              </div>
            </div>

            {/* Organization Name */}
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
                Organization Name
              </label>
              <div style={{ position: 'relative' }}>
                <Building2 style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '18px',
                  height: '18px',
                  color: isEditing ? '#2563eb' : '#9ca3af',
                  transition: 'color 0.2s ease',
                  zIndex: 1
                }} />
                {isEditing ? (
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter organization name"
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

            {/* Email (Read-only) */}
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
                <Building2 style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '18px',
                  height: '18px',
                  color: '#9ca3af',
                  zIndex: 1
                }} />
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
              <p style={{ 
                fontSize: '11px', 
                color: '#6b7280', 
                marginTop: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginLeft: '4px'
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#6b7280">
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
                <MapPin style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '18px',
                  height: '18px',
                  color: isEditing ? '#2563eb' : '#9ca3af',
                  transition: 'color 0.2s ease',
                  zIndex: 1
                }} />
                {isEditing ? (
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Enter organization location"
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

            {/* Description */}
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
                Description
              </label>
              <div style={{ position: 'relative' }}>
                <FileText style={{
                  position: 'absolute',
                  left: '14px',
                  top: '16px',
                  width: '18px',
                  height: '18px',
                  color: isEditing ? '#2563eb' : '#9ca3af',
                  transition: 'color 0.2s ease',
                  zIndex: 1
                }} />
                {isEditing ? (
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe your organization's mission and work"
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
                ) : (
                  <div style={{
                    width: '100%',
                    padding: '14px 14px 14px 45px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '20px',
                    fontSize: '14px',
                    backgroundColor: '#f9fafb',
                    color: '#1f2937',
                    minHeight: '120px',
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.6'
                  }}>
                    {form.description || "No description provided"}
                  </div>
                )}
              </div>
            </div>

            {/* Website */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '700',
                color: '#374151',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.3px'
              }}>
                Website
              </label>
              <div style={{ position: 'relative' }}>
                <Globe style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '18px',
                  height: '18px',
                  color: isEditing ? '#2563eb' : '#9ca3af',
                  transition: 'color 0.2s ease',
                  zIndex: 1
                }} />
                {isEditing ? (
                  <input
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="https://www.example.org"
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
                    color: '#2563eb',
                    fontWeight: '500'
                  }}>
                    {form.website ? (
                      <a href={form.website} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>
                        {form.website}
                      </a>
                    ) : "Not provided"}
                  </div>
                )}
              </div>
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
                <Edit2 size="20" />
                Edit Profile
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '16px' }}>
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
                      <Save size="20" />
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
                      e.target.style.transform = 'scale(1.02)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if(!loading) {
                      e.target.style.background = 'transparent';
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.color = '#4b5563';
                      e.target.style.transform = 'scale(1)';
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
                Your organization information is securely stored and protected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}