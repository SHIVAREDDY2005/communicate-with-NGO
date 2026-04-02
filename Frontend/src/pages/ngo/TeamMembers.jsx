import Navbar from "../../layouts/Navbar";
import NGOSidebar from "../../layouts/NGOSidebar";
import { useState, useEffect } from "react";
import api from "../../utils/api";
import { Users, PlusCircle } from "lucide-react";

export default function TeamMembers() {

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const fetchMembers = async () => {
    try {
      const res = await api.get("/user/ngo/members");
      setMembers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const res = await api.get("/user/ngo/members");
        setMembers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadMembers();
  }, []);

  const handleAdd = async () => {
    try {
      await api.post("/user/ngo/add-member", form);
      setForm({ name: "", email: "", password: "" });
      fetchMembers();
      alert("Member added successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Error adding member");
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      minHeight: '100vh'
    }}>
      <Navbar />
      <NGOSidebar />

      <div style={{
        marginLeft: 'var(--sidebar-width)',
        paddingTop: '70px',
        padding: '24px'
      }}>

        {/* Header */}
        <h2 style={{
          fontSize: "26px",
          fontWeight: "700",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <Users /> Team Members
        </h2>

        {/* Only admins can see this */}
        {user?.ngoRole === "admin" && (
          <div style={{
            background: "white",
            padding: "24px",
            borderRadius: "20px",
            marginBottom: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
          }}>

            <h3 style={{ marginBottom: "16px" }}>Add New Member</h3>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <input
                placeholder="Name"
                value={form.name}
                onChange={(e)=>setForm({...form,name:e.target.value})}
                style={inputStyle}
              />

              <input
                placeholder="Email"
                value={form.email}
                onChange={(e)=>setForm({...form,email:e.target.value})}
                style={inputStyle}
              />

              <input
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e)=>setForm({...form,password:e.target.value})}
                style={inputStyle}
              />

              <button onClick={handleAdd} style={btnStyle}>
                <PlusCircle size={18}/> Add
              </button>
            </div>
          </div>
        )}

        {/* Members List */}
        <div style={{
          background: "white",
          padding: "24px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ marginBottom: "16px" }}>All Members</h3>

          {members.map((m) => (
            <div key={m._id} style={{
              padding: "12px",
              borderBottom: "1px solid #eee"
            }}>
              <b>{m.name}</b> - {m.email}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* styles */
const inputStyle = {
  padding: "10px 14px",
  border: "2px solid #e5e7eb",
  borderRadius: "30px",
  outline: "none"
};

const btnStyle = {
  padding: "10px 16px",
  background: "#111111",
  color: "white",
  border: "none",
  borderRadius: "30px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "6px"
};


