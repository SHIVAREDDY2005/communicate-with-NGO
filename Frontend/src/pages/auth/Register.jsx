import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";

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

const roleCopy = {
  volunteer: {
    title: "Volunteer Registration",
    subtitle: "Build your profile and start applying to impact opportunities.",
  },
  ngo: {
    title: "NGO Registration",
    subtitle: "Publish opportunities and collaborate with skilled volunteers.",
  },
};

const Register = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("volunteer");
  const [skills, setSkills] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    orgName: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    description: "",
    website: "",
  });

  const updateField = (key) => (event) => {
    setFormData((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleRoleChange = (nextRole) => {
    setRole(nextRole);
    setErrors({});
  };

  const toggleSkill = (skill) => {
    setSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((item) => item !== skill)
        : [...prev, skill]
    );
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.email.trim()) {
      nextErrors.email = "Email required";
    }
    if (!formData.password) {
      nextErrors.password = "Password required";
    }
    if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match";
    }

    if (role === "volunteer") {
      if (!formData.fullName.trim()) {
        nextErrors.fullName = "Full name required";
      }
      if (skills.length === 0) {
        nextErrors.skills = "Select at least one skill";
      }
    }

    if (role === "ngo") {
      if (!formData.orgName.trim()) {
        nextErrors.orgName = "Organization name required";
      }
      if (!formData.location.trim()) {
        nextErrors.location = "Location required";
      }
      if (!formData.description.trim()) {
        nextErrors.description = "Description required";
      }
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);

      if (role === "ngo") {
        await api.post("/ngo/register", {
          organizationName: formData.orgName.trim(),
          email: formData.email.trim(),
          password: formData.password,
          location: formData.location.trim(),
          description: formData.description.trim(),
          website: formData.website.trim(),
        });
      } else {
        await api.post("/volunteer/register", {
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          password: formData.password,
          location: formData.location.trim(),
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
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background:
          "radial-gradient(circle at 15% 20%, rgba(0,0,0,0.06) 0, rgba(0,0,0,0.06) 1px, transparent 1px) 0 0 / 5px 5px, linear-gradient(180deg, #efefef 0%, #e5e5e5 100%)",
      }}
    >
      <style>{`
        @keyframes registerFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes registerFade {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .register-shell {
          width: min(1120px, 100%);
          display: grid;
          grid-template-columns: 1.03fr 0.97fr;
          border: 1px solid #141414;
          border-radius: 26px;
          background: #f8f8f8;
          box-shadow: 0 30px 60px -32px rgba(0, 0, 0, 0.35);
          overflow: hidden;
          animation: registerFade 420ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .register-hero {
          position: relative;
          padding: 42px 40px;
          background: #151515;
          color: #f4f4f4;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 680px;
        }

        .register-orb {
          position: absolute;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), rgba(255,255,255,0.03));
          animation: registerFloat 5.5s ease-in-out infinite;
        }

        .register-form-pane {
          padding: 34px 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #f8f8f8;
        }

        .register-scroll {
          max-height: 620px;
          overflow-y: auto;
          padding-right: 4px;
        }

        .register-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .register-scroll::-webkit-scrollbar-track {
          background: #e9e9e9;
          border-radius: 999px;
        }

        .register-scroll::-webkit-scrollbar-thumb {
          background: #b8b8b8;
          border-radius: 999px;
        }

        .field {
          width: 100%;
          height: 50px;
          border-radius: 14px;
          border: 1px solid #cfcfcf;
          background: #ffffff;
          padding: 0 14px;
          font-size: 14px;
          color: #101010;
          outline: none;
          transition: border-color 160ms ease, box-shadow 160ms ease;
        }

        .field:focus {
          border-color: #111;
          box-shadow: 0 0 0 3px rgba(17, 17, 17, 0.08);
        }

        .field-area {
          width: 100%;
          min-height: 96px;
          border-radius: 14px;
          border: 1px solid #cfcfcf;
          background: #ffffff;
          padding: 10px 14px;
          font-size: 14px;
          color: #101010;
          outline: none;
          resize: vertical;
          transition: border-color 160ms ease, box-shadow 160ms ease;
        }

        .field-area:focus {
          border-color: #111;
          box-shadow: 0 0 0 3px rgba(17, 17, 17, 0.08);
        }

        .role-switch {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          padding: 6px;
          border: 1px solid #d0d0d0;
          border-radius: 16px;
          background: #f1f1f1;
        }

        .role-slider {
          position: absolute;
          top: 6px;
          bottom: 6px;
          width: calc(50% - 9px);
          border-radius: 12px;
          background: #111;
          transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .role-btn {
          position: relative;
          z-index: 1;
          border: none;
          border-radius: 12px;
          padding: 10px 12px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          background: transparent;
          color: #676767;
          transition: color 180ms ease;
        }

        .role-btn.active {
          color: #f6f6f6;
        }

        .role-meta {
          margin-top: 12px;
          border: 1px dashed #c9c9c9;
          border-radius: 14px;
          padding: 12px;
          background: #ffffff;
          animation: registerFade 280ms ease;
        }

        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 9px;
        }

        .skill-chip {
          border: 1px solid #cfcfcf;
          border-radius: 999px;
          padding: 6px 11px;
          font-size: 12px;
          font-weight: 600;
          color: #5a5a5a;
          background: #fff;
          cursor: pointer;
          transition: all 160ms ease;
        }

        .skill-chip:hover {
          border-color: #111;
          color: #111;
        }

        .skill-chip.active {
          border-color: #111;
          background: #111;
          color: #f7f7f7;
          transform: translateY(-1px);
        }

        .submit-btn {
          width: 100%;
          height: 50px;
          border-radius: 999px;
          border: 1px solid #111;
          background: #111;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 160ms ease, box-shadow 160ms ease;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 10px 18px -12px rgba(0, 0, 0, 0.9);
        }

        .submit-btn:disabled {
          cursor: not-allowed;
          opacity: 0.65;
        }

        .error-text {
          margin: 5px 0 0;
          font-size: 11px;
          color: #c01f1f;
          font-weight: 600;
        }

        @media (max-width: 980px) {
          .register-shell {
            grid-template-columns: 1fr;
            max-width: 620px;
          }

          .register-hero {
            min-height: auto;
            padding: 30px 26px;
          }

          .register-form-pane {
            padding: 26px 20px;
          }

          .register-scroll {
            max-height: none;
            overflow: visible;
            padding-right: 0;
          }
        }
      `}</style>

      <div className="register-shell">
        <section className="register-hero">
          <div
            className="register-orb"
            style={{ width: "180px", height: "180px", top: "-48px", right: "-52px" }}
          />
          <div
            className="register-orb"
            style={{ width: "140px", height: "140px", bottom: "80px", left: "-50px", animationDelay: "1.2s" }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "22px", fontWeight: 700 }}>S.</span>
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "44px",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
              }}
            >
              Join SkillBridge
            </h1>
            <p style={{ margin: "12px 0 0", fontSize: "15px", color: "#c9c9c9", maxWidth: "360px" }}>
              Create your account and collaborate through structured volunteering and impactful opportunities.
            </p>
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "16px",
                padding: "14px",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <p style={{ margin: 0, fontSize: "12px", color: "#c6c6c6", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Registration Mode
              </p>
              <p style={{ margin: "6px 0 0", fontSize: "18px", fontWeight: 700 }}>
                {role === "volunteer" ? "Volunteer Onboarding" : "NGO Onboarding"}
              </p>
            </div>
          </div>
        </section>

        <section className="register-form-pane">
          <div className="register-scroll">
            <div style={{ marginBottom: "18px" }}>
              <h2 style={{ margin: 0, fontSize: "30px", letterSpacing: "-0.02em" }}>Create Account</h2>
              <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#6b6b6b" }}>
                Complete the details below to start.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <p
                  style={{
                    margin: "0 0 7px",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#5e5e5e",
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                  }}
                >
                  Choose Role
                </p>

                <div className="role-switch">
                  <div
                    className="role-slider"
                    style={{ transform: role === "volunteer" ? "translateX(0)" : "translateX(calc(100% + 6px))" }}
                  />

                  <button
                    type="button"
                    className={`role-btn${role === "volunteer" ? " active" : ""}`}
                    onClick={() => handleRoleChange("volunteer")}
                  >
                    Volunteer
                  </button>
                  <button
                    type="button"
                    className={`role-btn${role === "ngo" ? " active" : ""}`}
                    onClick={() => handleRoleChange("ngo")}
                  >
                    NGO
                  </button>
                </div>

                <div className="role-meta" key={role}>
                  <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#101010" }}>
                    {roleCopy[role].title}
                  </p>
                  <p style={{ margin: "3px 0 0", fontSize: "12px", color: "#6c6c6c" }}>
                    {roleCopy[role].subtitle}
                  </p>
                </div>
              </div>

              {role === "volunteer" ? (
                <>
                  <div>
                    <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: 600 }}>
                      Full Name
                    </label>
                    <input
                      className="field"
                      type="text"
                      value={formData.fullName}
                      onChange={updateField("fullName")}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && <p className="error-text">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: 600 }}>
                      Location (Optional)
                    </label>
                    <input
                      className="field"
                      type="text"
                      value={formData.location}
                      onChange={updateField("location")}
                      placeholder="City, State"
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "4px", fontSize: "13px", fontWeight: 600 }}>
                      Skills
                    </label>
                    <p style={{ margin: 0, fontSize: "12px", color: "#767676" }}>
                      Select at least one skill ({skills.length} selected)
                    </p>
                    <div className="skills-grid">
                      {predefinedSkills.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          className={`skill-chip${skills.includes(skill) ? " active" : ""}`}
                          onClick={() => toggleSkill(skill)}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                    {errors.skills && <p className="error-text">{errors.skills}</p>}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: 600 }}>
                      Organization Name
                    </label>
                    <input
                      className="field"
                      type="text"
                      value={formData.orgName}
                      onChange={updateField("orgName")}
                      placeholder="Enter organization name"
                    />
                    {errors.orgName && <p className="error-text">{errors.orgName}</p>}
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: 600 }}>
                      Location
                    </label>
                    <input
                      className="field"
                      type="text"
                      value={formData.location}
                      onChange={updateField("location")}
                      placeholder="City, State"
                    />
                    {errors.location && <p className="error-text">{errors.location}</p>}
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: 600 }}>
                      Website (Optional)
                    </label>
                    <input
                      className="field"
                      type="text"
                      value={formData.website}
                      onChange={updateField("website")}
                      placeholder="https://example.org"
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: 600 }}>
                      Description
                    </label>
                    <textarea
                      className="field-area"
                      value={formData.description}
                      onChange={updateField("description")}
                      placeholder="Briefly describe your organization"
                    />
                    {errors.description && <p className="error-text">{errors.description}</p>}
                  </div>
                </>
              )}

              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: 600 }}>
                  Email
                </label>
                <input
                  className="field"
                  type="email"
                  value={formData.email}
                  onChange={updateField("email")}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: 600 }}>
                  Password
                </label>
                <input
                  className="field"
                  type="password"
                  value={formData.password}
                  onChange={updateField("password")}
                  placeholder="Create a password"
                />
                {errors.password && <p className="error-text">{errors.password}</p>}
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: 600 }}>
                  Confirm Password
                </label>
                <input
                  className="field"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={updateField("confirmPassword")}
                  placeholder="Re-enter password"
                />
                {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#6f6f6f", textAlign: "center" }}>
                Already have an account?{" "}
                <Link to="/login" style={{ color: "#111", fontWeight: 700, textDecoration: "none" }}>
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
