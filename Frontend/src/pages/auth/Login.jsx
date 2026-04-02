import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";

const roleCopy = {
  volunteer: {
    title: "Volunteer Access",
    subtitle: "Apply faster and track every application in one place.",
  },
  ngo: {
    title: "NGO Access",
    subtitle: "Manage opportunities, applicants, and conversations.",
  },
};

const Login = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("volunteer");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const endpoint = role === "ngo" ? "/ngo/login" : "/volunteer/login";

      const response = await api.post(endpoint, {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "ngo") {
        navigate("/ngo-dashboard");
      } else {
        navigate("/volunteer-dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
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
        @keyframes loginFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes loginFade {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .login-shell {
          width: min(1080px, 100%);
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          border: 1px solid #141414;
          border-radius: 26px;
          background: #f8f8f8;
          box-shadow: 0 30px 60px -32px rgba(0, 0, 0, 0.35);
          overflow: hidden;
          animation: loginFade 420ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .login-hero {
          position: relative;
          padding: 42px 40px;
          background: #151515;
          color: #f4f4f4;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 620px;
        }

        .hero-orb {
          position: absolute;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), rgba(255,255,255,0.03));
          animation: loginFloat 5.5s ease-in-out infinite;
        }

        .login-form-pane {
          padding: 40px 34px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #f8f8f8;
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
          animation: loginFade 280ms ease;
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

        @media (max-width: 980px) {
          .login-shell {
            grid-template-columns: 1fr;
            max-width: 560px;
          }

          .login-hero {
            min-height: auto;
            padding: 30px 26px;
          }

          .login-form-pane {
            padding: 30px 22px;
          }
        }
      `}</style>

      <div className="login-shell">
        <section className="login-hero">
          <div
            className="hero-orb"
            style={{ width: "180px", height: "180px", top: "-48px", right: "-52px" }}
          />
          <div
            className="hero-orb"
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
              Welcome Back
            </h1>
            <p style={{ margin: "12px 0 0", fontSize: "15px", color: "#c9c9c9", maxWidth: "360px" }}>
              One login, two journeys. Choose your mode and continue where you left off.
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
                Active Mode
              </p>
              <p style={{ margin: "6px 0 0", fontSize: "18px", fontWeight: 700 }}>
                {role === "volunteer" ? "Volunteer Workspace" : "NGO Workspace"}
              </p>
            </div>
          </div>
        </section>

        <section className="login-form-pane">
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ margin: 0, fontSize: "30px", letterSpacing: "-0.02em" }}>Login</h2>
            <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#6b6b6b" }}>
              Use your registered email and password.
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
                  onClick={() => setRole("volunteer")}
                >
                  Volunteer
                </button>
                <button
                  type="button"
                  className={`role-btn${role === "ngo" ? " active" : ""}`}
                  onClick={() => setRole("ngo")}
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

            <div>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: 600 }}>Email</label>
              <input
                className="field"
                type="email"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "13px", fontWeight: 600 }}>Password</label>
              <input
                className="field"
                type="password"
                value={formData.password}
                onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#6f6f6f", textAlign: "center" }}>
              Do not have an account?{" "}
              <Link to="/register" style={{ color: "#111", fontWeight: 700, textDecoration: "none" }}>
                Create account
              </Link>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
