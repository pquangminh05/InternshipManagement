import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <nav style={{
      background: "#fff",
      borderBottom: "1px solid #e5e5e5",
      padding: "0 24px",
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: "#1a1a1a" }}>
          Quản lý Thực tập
        </h1>
        <div style={{ display: "flex", gap: "24px" }}>
          <button 
            onClick={() => navigate("/")}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px" }}
          >
            Dashboard
          </button>
          <button 
            onClick={() => navigate("/internships")}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px" }}
          >
            Thực tập
          </button>
          <button 
            onClick={() => navigate("/students")}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px" }}
          >
            Sinh viên
          </button>
          <button 
            onClick={() => navigate("/companies")}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px" }}
          >
            Công ty
          </button>
        </div>
      </div>
      
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span style={{ fontSize: "14px", color: "#666" }}>
          {user?.fullName} ({user?.role})
        </span>
        <button 
          onClick={handleLogout}
          style={{
            background: "#dc3545",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          Đăng xuất
        </button>
      </div>
    </nav>
  );
}
