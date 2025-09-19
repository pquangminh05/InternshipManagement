import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    // Tạm thời chỉ điều hướng về dashboard để test
    navigate("/");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f7f7f7",
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          width: 360,
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ fontSize: 22, marginBottom: 12 }}>Đăng nhập</h1>

        <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #ddd",
            borderRadius: 8,
            marginBottom: 12,
          }}
        />

        <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>
          Mật khẩu
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #ddd",
            borderRadius: 8,
            marginBottom: 16,
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px 12px",
            border: 0,
            borderRadius: 10,
            background: "#111",
            color: "#fff",
          }}
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
