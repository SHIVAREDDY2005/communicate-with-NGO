import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function EditProfileVolunteer() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    location: "",
    skills: []
  });

  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get("/user/me");
      setForm(res.data);
    };
    fetch();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    await api.put("/volunteer/profile", form);
    setMsg("Profile updated");
    setTimeout(() => {
      navigate("/volunteer-dashboard");
    }, 1500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '16px',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        background: 'white',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
        animation: 'slideUp 0.5s ease-out'
      }}>
        <style>{`
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

        {/* Header with gradient */}
        <div style={{
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          padding: '32px 32px 24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '150px',
            height: '150px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            transform: 'translate(50px, -50px)'
          }} />
          
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '36px',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            border: '3px solid rgba(255,255,255,0.3)'
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: 'white',
            margin: '0 0 4px',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Edit Profile
          </h2>
          
          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.9)',
            margin: 0
          }}>
            Update your personal information
          </p>
        </div>

        {/* Form Section */}
        <div style={{ padding: '32px' }}>
          {/* Name Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '6px'
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
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 42px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '14px',
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

          {/* Location Field */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '6px'
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
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Enter your location"
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 42px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '14px',
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

          {/* Skills Display (Read-only) */}
          {form.skills && form.skills.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Your Skills
              </label>
              <div style={{
                padding: '16px',
                background: '#f9fafb',
                borderRadius: '14px',
                border: '2px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {form.skills.map((skill, index) => (
                    <span key={index} style={{
                      padding: '6px 14px',
                      background: '#eff6ff',
                      borderRadius: '30px',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#2563eb',
                      border: '1px solid #dbeafe',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#2563eb">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <p style={{ fontSize: '11px', color: '#6b7280', marginTop: '6px' }}>
                Skills can be managed in your profile settings
              </p>
            </div>
          )}

          {/* Save Button */}
          <button
            onClick={save}
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              border: 'none',
              borderRadius: '14px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '16px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)';
              e.target.style.transform = 'scale(1.02)';
              e.target.style.boxShadow = '0 10px 20px -5px rgba(37, 99, 235, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)';
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Save Changes
          </button>

          {/* Success Message */}
          {msg && (
            <div style={{
              padding: '14px',
              background: '#d1fae5',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animation: 'slideUp 0.3s ease-out'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '12px',
                background: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round"/>
                </svg>
              </div>
              <p style={{ fontSize: '14px', color: '#065f46', margin: 0, fontWeight: '500' }}>
                {msg}! Redirecting to dashboard...
              </p>
            </div>
          )}

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            style={{
              width: '100%',
              padding: '12px',
              background: 'transparent',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              color: '#4b5563',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginTop: '8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f3f4f6';
              e.target.style.borderColor = '#2563eb';
              e.target.style.color = '#2563eb';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.color = '#4b5563';
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}