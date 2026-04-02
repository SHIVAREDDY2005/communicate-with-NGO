import { useEffect, useState } from "react";
import Navbar from "../../layouts/Navbar";
import NGOSidebar from "../../layouts/NGOSidebar";
import api from "../../utils/api";

const baseInputStyle = {
  width: "100%",
  height: "46px",
  borderRadius: "12px",
  border: "1px solid #d0d0d0",
  background: "#fff",
  padding: "0 12px",
  fontSize: "14px",
  color: "#111",
  outline: "none",
};

export default function NGOProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    description: "",
    website: "",
  });
  const [originalForm, setOriginalForm] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get("/user/ngo/organization");
        const data = res.data || {};

        const nextForm = {
          name: data.organizationName || data.name || "",
          email: data.email || "",
          location: data.location || "",
          description: data.description || "",
          website: data.website || "",
        };

        setForm(nextForm);
        setOriginalForm(nextForm);
      } catch (err) {
        console.log("Error fetching NGO profile:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setSuccessMsg("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setForm(originalForm);
    setIsEditing(false);
  };

  const save = async () => {
    try {
      setLoading(true);
      await api.put("/user/profile", {
        organizationName: form.name,
        location: form.location,
        description: form.description,
        website: form.website,
      });

      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...currentUser,
          organizationName: form.name,
        })
      );

      setOriginalForm(form);
      setIsEditing(false);
      setSuccessMsg("Profile updated successfully.");
      setTimeout(() => setSuccessMsg(""), 2500);
    } catch (err) {
      console.log("Error updating profile:", err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "var(--aw-bg)", minHeight: "100vh" }}>
      <Navbar />
      <NGOSidebar />

      <main
        style={{
          marginLeft: "var(--sidebar-width)",
          minHeight: "calc(100vh - var(--topbar-height))",
          padding: "22px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: "960px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "14px" }}>
          <section
            style={{
              border: "1px solid #171717",
              borderRadius: "20px",
              background: "#f8f8f8",
              padding: "20px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color: "#666",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              NGO Profile
            </p>
            <h1 style={{ margin: "6px 0 0", fontSize: "34px", letterSpacing: "-0.02em" }}>
              {form.name || "Organization profile"}
            </h1>
            <p style={{ margin: "8px 0 0", color: "#666", fontSize: "14px" }}>
              Manage your organization details used across opportunities and applications.
            </p>
          </section>

          {successMsg && (
            <div
              style={{
                border: "1px solid #cfe8da",
                borderRadius: "12px",
                background: "#eef8f1",
                color: "#17663a",
                padding: "10px 12px",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              {successMsg}
            </div>
          )}

          <section
            style={{
              border: "1px solid #d4d4d4",
              borderRadius: "18px",
              background: "#fff",
              padding: "18px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px", flexWrap: "wrap" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "16px",
                  border: "1px solid #d5d5d5",
                  background: "#f4f4f4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "#111",
                }}
              >
                {(form.name || "N").charAt(0).toUpperCase()}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "20px", fontWeight: 700 }}>{form.name || "NGO"}</p>
                <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#676767" }}>{form.email || "-"}</p>
              </div>
            </div>

            {loading && !originalForm.name ? (
              <p style={{ margin: 0, fontSize: "14px", color: "#777" }}>Loading profile...</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "12px", color: "#666", fontWeight: 700 }}>
                    Organization Name
                  </label>
                  {isEditing ? (
                    <input
                      style={baseInputStyle}
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Organization name"
                    />
                  ) : (
                    <div style={{ ...baseInputStyle, display: "flex", alignItems: "center", background: "#f7f7f7" }}>
                      {form.name || "-"}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "12px", color: "#666", fontWeight: 700 }}>
                    Email
                  </label>
                  <div style={{ ...baseInputStyle, display: "flex", alignItems: "center", background: "#f7f7f7" }}>
                    {form.email || "-"}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "12px", color: "#666", fontWeight: 700 }}>
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      style={baseInputStyle}
                      name="location"
                      value={form.location || ""}
                      onChange={handleChange}
                      placeholder="City, State"
                    />
                  ) : (
                    <div style={{ ...baseInputStyle, display: "flex", alignItems: "center", background: "#f7f7f7" }}>
                      {form.location || "Not provided"}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "12px", color: "#666", fontWeight: 700 }}>
                    Website
                  </label>
                  {isEditing ? (
                    <input
                      style={baseInputStyle}
                      name="website"
                      value={form.website || ""}
                      onChange={handleChange}
                      placeholder="https://example.org"
                    />
                  ) : (
                    <div style={{ ...baseInputStyle, display: "flex", alignItems: "center", background: "#f7f7f7" }}>
                      {form.website || "Not provided"}
                    </div>
                  )}
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "12px", color: "#666", fontWeight: 700 }}>
                    Description
                  </label>
                  {isEditing ? (
                    <textarea
                      name="description"
                      value={form.description || ""}
                      onChange={handleChange}
                      placeholder="Describe your organization"
                      style={{
                        width: "100%",
                        minHeight: "110px",
                        borderRadius: "12px",
                        border: "1px solid #d0d0d0",
                        background: "#fff",
                        padding: "10px 12px",
                        fontSize: "14px",
                        color: "#111",
                        outline: "none",
                        resize: "vertical",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        minHeight: "110px",
                        borderRadius: "12px",
                        border: "1px solid #d0d0d0",
                        background: "#f7f7f7",
                        padding: "10px 12px",
                        fontSize: "14px",
                        color: "#222",
                        lineHeight: 1.5,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {form.description || "No description provided."}
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>

          <section
            style={{
              border: "1px solid #d4d4d4",
              borderRadius: "18px",
              background: "#fff",
              padding: "16px",
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {!isEditing ? (
              <button
                type="button"
                onClick={handleEdit}
                style={{
                  border: "1px solid #161616",
                  borderRadius: "999px",
                  background: "#161616",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: 700,
                  padding: "10px 14px",
                  cursor: "pointer",
                }}
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={save}
                  disabled={loading}
                  style={{
                    border: "1px solid #161616",
                    borderRadius: "999px",
                    background: "#161616",
                    color: "#fff",
                    fontSize: "13px",
                    fontWeight: 700,
                    padding: "10px 14px",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  style={{
                    border: "1px solid #cfcfcf",
                    borderRadius: "999px",
                    background: "#fff",
                    color: "#333",
                    fontSize: "13px",
                    fontWeight: 600,
                    padding: "10px 14px",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
